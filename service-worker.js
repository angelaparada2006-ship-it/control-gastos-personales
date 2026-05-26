const nombreCache = "control-gastos-v2";

const archivos = [
  "index.html",
  "styles.css",
  "app.js",
  "manifest.json",
  "icon.svg"
];

self.addEventListener("install", function (evento) {
  evento.waitUntil(
    caches.open(nombreCache).then(function (cache) {
      return cache.addAll(archivos);
    })
  );
});

self.addEventListener("activate", function (evento) {
  evento.waitUntil(
    caches.keys().then(function (nombres) {
      return Promise.all(
        nombres.map(function (nombre) {
          if (nombre !== nombreCache) {
            return caches.delete(nombre);
          }
        })
      );
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
