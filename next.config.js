const withTypescript = require('@zeit/next-typescript')
const withOffline = require('next-offline')
const withManifest = require('next-manifest')

module.exports = withManifest(withOffline(withTypescript({
    exportPathMap: function () {
        return {
            '/appshell': {page: '/appshell'}
        }
    },
    workboxOpts: {
        navigateFallback: '/static/appshell.html',
        navigateFallbackBlacklist: [/^\/static/, /^\/_next/],
        globPatterns: ['static/**/*'],
        globIgnores: ['static/appshell.html', 'static/warmup-cache.js'],
        globDirectory: '.',
        skipWaiting: true,
        clientsClaim: true,
        importScripts: ['/static/warmup-cache.js'],
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
            url: '/static/appshell.html',
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
})))
