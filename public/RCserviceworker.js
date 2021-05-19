

const cacheName = 'v15';
const self = this;
const statics = [
    '/static/js/bundle.js',
    '/static/js/main.chunk.js',
    '/static/js/vendors~main.chunk.js',
    '/static/media/fog.8bca4a29.jfif',
    '/static/media/bismillah.197e00bf.png',
    '/static/css/main.1ecc4a69.chunk.css',
    '/static/css/main.1ecc4a69.chunk.css.map'
]
// eslint-disable-next-line 
const ignored = self.__WB_MANIFEST;

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            cache.addAll(statics)
        }).catch(err => {
            console.log('error')
        })
    );
})

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(cacheNames => {
            Promise.all(
                cacheNames.map(name => {
                    if(name !== cacheName) {
                        return caches.delete(name)
                    }
                    return null
                })
            )
        })
    )
})


// self.addEventListener('fetch', e => {
//     e.respondWith(caches.open(cacheName).then(
//         cache => cache.match(e.request).then(resp => {
//             return resp || fetch(e.request).then(res => {
//                 const resClone = res.clone();
//                 caches.open(cacheName).then(cache => {
//                     cache.put(e.request, resClone)
//                 })
//                 return res
//             })
//         })
//     ))
// })



self.addEventListener('fetch', (e) => {

    if( !e.request.url.includes('.mp3') ) {
        e.respondWith(fetch(e.request).then(
            async res => {

                const reaClone = res.clone();
                const cache = await caches.open(cacheName);
                await cache.put(e.request, reaClone);

                return res
            }
            
            ).catch(
            async err => {
                let cache = await caches.open(cacheName);
                let offlineRespond = await cache.match(e.request);
                return offlineRespond;
            })
        );
    }
})
    
    // if(e.request.url === 'https://quranproject12.netlify.app/') {
    //     e.respondWith(fetch(e.request).then(
    //         res => res
    //     ).catch(async error => {
    //         console.log(error, 'serving from cache')
    //         let cache = await caches.open(cacheName);
    //         let offRespond = await cache.match('./index.html');
    //         return offRespond;
    //     }))
    // }
    // if (e.request.mode === 'navigate') {
    //     console.log(e.request.url)
    //     e.respondWith(fetch(e.request).then(
    //         res => res
    //     ).catch(
    //         async err => {
    //             let cache = await caches.open(cacheName);
    //             let offlineRespond = await cache.match('./index.html');
    //             return offlineRespond;
    //         }
    //     ))
    // } 
    // else {
    // 