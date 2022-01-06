const swiper = new Swiper('.swiper', {
    effect: 'cube',
    grabCursor: true,

    // Option parameters for cube
    cubeEffect: {
        shadow: false,
        slideShadows: false,
    },

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});