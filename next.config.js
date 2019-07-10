const withOffline = require('next-offline')
const withManifest = require('next-manifest')

module.exports = withManifest(withOffline({
    experimental: {
        publicDirectory: true,
    },
    workboxOpts: {
        swDest: '../public/service-worker.js',
        navigateFallback: '/appshell',
        navigateFallbackBlacklist: [/^\/static/, /^\/_next/],
        globPatterns: ['static/**/*'],
        globDirectory: '.',
        skipWaiting: true,
        clientsClaim: true,
        importScripts: ['/warmup-cache.js'],
        runtimeCaching: [{
            urlPattern: new RegExp('^https://api.tvmaze.com/'),
            handler: 'NetworkFirst',
            options: {
                networkTimeoutSeconds: 10,
                cacheableResponse: {
                    statuses: [0, 200]
                }
            }

        }]
    },
    transformManifest: originalManifest => {
        return originalManifest.concat([{
            url: '/appshell',
            revision: Date.now().toString()
        }]);
    },
    manifest: {
        icons: [
            {
                "src": "/static/icon-144x144.png",
                "sizes": "144x144",
                "type": "image/png"
            }
        ]
    }
}))
