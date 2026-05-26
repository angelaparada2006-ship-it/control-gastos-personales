const archivos = [
  "index.html",
  "styles.css",
  "app.js",
  "manifest.json",
  "icon.svg"
];

self.addEventListener("install", function (evento) {
  evento.waitUntil(
    caches.open("control-gastos").then(function (cache) {
      return cache.addAll(archivos);
    })
  );
});

self.addEventListener("fetch", function (evento) {
  evento.respondWith(
    caches.match(evento.request).then(function (respuesta) {
      return respuesta || fetch(evento.request);
    })
  );
});
