// Files to cache
var cacheName = 'avenue-fashion-pwa';
var staticAssets = [
    "/",
    "/index.html",

    "https://use.fontawesome.com/releases/v5.7.2/css/solid.css",
    "https://use.fontawesome.com/releases/v5.7.2/css/brands.css",
    "https://use.fontawesome.com/releases/v5.7.2/css/fontawesome.css",
    "https://fonts.googleapis.com/css?family=Montserrat:300,400,500,700,800",

    "/production/default.css",
    "/production/modernizr.css",

    "/assets/images/brand.img-logos.jpg",
    "/assets/images/brand.img001.fhd.jpg",
    "/assets/images/brand.img001.hd.jpg",
    "/assets/images/brand.img001.md.jpg",
    "/assets/images/brand.img001.jpg",
    "/assets/images/brand.img002.fhd.jpg",
    "/assets/images/brand.img002.hd.jpg",
    "/assets/images/brand.img002.md.jpg",
    "/assets/images/brand.img002.jpg",
    "/assets/images/brand.img003.fhd.jpg",
    "/assets/images/brand.img003.hd.jpg",
    "/assets/images/brand.img003.md.jpg",
    "/assets/images/brand.img003.jpg",

    "/assets/images/site-logo.svg",
    "/assets/images/homepage.ave-splash.svg",
    "/assets/images/background.homepage.jpg",
    "/assets/images/header_default_hi-res.jpg",
    "/assets/images/header_default-low-res.jpg",

    "/assets/images/lookbook.woman.png",
    "/assets/images/lookbook.man.png",
    "/assets/images/lookbook.you.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(staticAssets);
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) {
                return response;
            } else {
                return fetch(event.request);
            }
        })
    );
});