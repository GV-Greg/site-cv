#!/bin/bash
set -x  # Active le mode debug
set -e  # Quitte en cas d'erreur

# Couleurs pour les messages
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

if ! command -v lftp &> /dev/null; then
    echo -e "${RED}Erreur: LFTP n'est pas installé${NC}"
    exit 1
fi

# Vérifier si le fichier .env existe
if [ ! -f .env ]; then
    echo -e "${RED}Erreur: Fichier .env manquant${NC}"
    exit 1
fi

# Charger les variables d'environnement
source .env

# Vérifier les variables requises
if [ -z "$FTP_SERVER" ] || [ -z "$FTP_USERNAME" ] || [ -z "$FTP_PASSWORD" ]; then
    echo -e "${RED}Erreur: Variables FTP manquantes dans .env${NC}"
    echo "Ajoutez FTP_SERVER, FTP_USERNAME et FTP_PASSWORD dans votre fichier .env"
    exit 1
fi

# Dossier source à déployer (local)
LOCAL_DIR="./dist"  # Dossier racine du projet

# Vérifier si le dossier dist existe
if [ ! -d "$LOCAL_DIR" ]; then
    echo -e "${RED}Erreur: Le dossier $LOCAL_DIR n'existe pas${NC}"
    echo "Assurez-vous que le dossier dist est bien créé et contient les fichiers à déployer."
    exit 1
fi

# Appliquer les permissions AVANT le transfert
echo -e "${GREEN}🔧 Application des permissions locales...${NC}"
find "$LOCAL_DIR" -type d -exec chmod 755 {} \;  # Dossiers -> 755
find "$LOCAL_DIR" -type f -exec chmod 644 {} \;  # Fichiers -> 644
echo -e "${GREEN}✅ Permissions locales appliquées avec succès !${NC}"

# Déployer via FTP
echo -e "${GREEN}🚀 Déploiement vers O2Switch...${NC}"
lftp -c "
set ftp:ssl-allow no;  # Désactive SSL (si possible)
set ssl:verify-certificate no;  # Ignore la vérification du certificat
open ftp://$FTP_USERNAME:$FTP_PASSWORD@$FTP_SERVER
mirror -R --parallel=4 --delete --perms $LOCAL_DIR /dist/.
cd /dist/
# Appliquer 755 aux dossiers
chmod -R 755 .
chmod 644 index.html
chmod 644 favicon.ico
# Appliquer 644 aux fichiers uniquement (sans changer les dossiers)
cd css && glob -a chmod 644 * && cd ..
cd js && glob -a chmod 644 * && cd ..
cd assets && glob -a chmod 644 * && cd ..
cd images && glob -a chmod 644 * && cd ..
cd files && glob -a chmod 644 * && cd ..
bye
"

# Message de succès
echo -e "${GREEN}✅ Déploiement terminé avec succès !${NC}"