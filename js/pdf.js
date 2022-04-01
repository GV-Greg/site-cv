function test() {
    alert('test')
}

function DownloadFile(fileName) {
    // Set the File URL.
    var url = "files/" + fileName;

    // Create XMLHTTP Request.
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "blob";
    req.onload = function () {
        //Convert the Byte Data to BLOB object.
        var blob = new Blob([req.response], { type: "application/octetstream" });

        //Check the Browser type and download the File.
        let isIE = !!document.documentMode;
        if (isIE) {
            window.navigator.msSaveBlob(blob, fileName);
        } else {
            let url = window.URL || window.webkitURL;
            link = url.createObjectURL(blob);
            let a = document.createElement("a");
            a.setAttribute("download", fileName);
            a.setAttribute("href", link);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };
    req.send();
}