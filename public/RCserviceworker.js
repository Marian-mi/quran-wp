

const cacheName = 'v84';
const self = this;
// eslint-disable-next-line 
const ignored = self.__WB_MANIFEST;


self.addEventListener('install', e => {

})

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(cacheNames => {
            Promise.all(
                cacheNames.map(name => {
                    if (name !== cacheName) {
                        return caches.delete(name)
                    }
                    return null
                })
            )
        })
    )
})


self.addEventListener('fetch', (e) => {
    e.respondWith(fetch(e.request).then(
        async res => {
            const resClone = res.clone();
            if (resClone.ok && resClone.status === 200) {
                const cache = await caches.open(cacheName);
                await cache.put(e.request, resClone);
            }
            return res
        }

    ).catch(
        async err => {
            let cache = await caches.open(cacheName);
            let offlineRespond = await cache.match(e.request);
            return offlineRespond;
        })
    );
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