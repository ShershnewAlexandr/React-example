if ('function' === typeof importScripts) {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
  );
  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([]);

    /* custom cache rules*/
    workbox.routing.registerNavigationRoute('/index.html', {
      blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/],
    });

    workbox.routing.registerRoute(
      new RegExp(`\w`),
      new workbox.strategies.CacheFirst()
    );

    const api_url = 'http://rest-api.noveogroup.com/api/v1';

    workbox.routing.registerRoute(
      new RegExp(`${api_url}`),
      new workbox.strategies.NetworkFirst()
    );

    workbox.routing.registerRoute(
      new RegExp(`(?:\.png|\.jpg|\.gif|\.json|\.js|\.html|\.css)`),
      new workbox.strategies.CacheFirst()
    );
  } else {
    console.log('Workbox could not be loaded. No Offline support');
  }
}
