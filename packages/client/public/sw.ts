const CACHE_NAME = 'my-site-cache-v1'

const URLS = ['index.html', 'src/index.scss', 'src/index.tsx']

export {}

declare const self: ServiceWorkerGlobalScope

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache')
        return cache.addAll(URLS)
      })
      .catch(err => {
        console.log(err)
        throw err
      })
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response
      } else {
        return fetch(event.request).then(res => {
          return caches.open(CACHE_NAME).then(cache => {
            console.log(event.request.url)
            cache.put(event.request.url, res.clone())
            return res
          })
        })
      }
    })
  )
})

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    })
  )
})
