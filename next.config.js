const withTypescript = require('@zeit/next-typescript')
const withOffline = require('next-offline')

module.exports = withOffline(withTypescript({
    exportPathMap: function () {
        return {
            '/appshell': {page: '/appshell'}
        }
    },
    workboxOpts: {
        navigateFallback: '/static/appshell.html',
        navigateFallbackBlacklist: [/^\/static/, /^\/_next/],
        globPatterns: ['static/**/*'],
        globIgnores: ['static/appshell.html'],
        globDirectory: '.',
        skipWaiting: true,
        clientsClaim: true
    },
    transformManifest: originalManifest => {
        return originalManifest.concat([{
            url: '/static/appshell.html',
            revision: Date.now().toString()
        }]);
    }
}))
