var version = 'v1::'

var offlineFundamentals = [
  '',
  '/',
  'dist/vendor.bundle.js',
  'dist/bundle.js'
]

var offLinePage = '<html><title>Opps we are Offline!!</title><body>Opps we are Offline!!</body></html>'

self.addEventListener('install', function (event) {
  console.log('Installing...')
  //OFFLINE -> Install all to require offline app

  event.waitUntil(
    caches.open(version + 'fundamentals').then(function (cache) {
      return cache.addAll(offlineFundamentals)
    }).catch(function () {
      console.log('opppsss!!')
    })
  )
})

self.addEventListener('activate', function (event) {
  console.log('Activating Service Worker')
})

self.addEventListener('fetch', function (event) {
  console.log('fetch Service Worker')
  console.log(event.request.url)
  const url = new URL(event.request.url)

  if (event.request.url === 'http://localhost:8080/img/arrow1.png') {
    console.log('TEST')
    return
  }
})