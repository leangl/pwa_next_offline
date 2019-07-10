import {createServer} from 'http'
import {parse} from 'url'
import next from 'next'
import {join} from "path"

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()
const root = process.cwd()

app.prepare().then(() => {
    createServer((req, res) => {
        const parsedUrl = parse(req.url!, true)
        const {pathname} = parsedUrl

        if (pathname === '/service-worker.js') {
            return app.serveStatic(req, res, join(root, '.next/service-worker.js'))
        } else {
            handle(req, res, parsedUrl)
        }
    }).listen(port)

    // tslint:disable-next-line:no-console
    console.log(
        `> Server listening at http://localhost:${port} as ${
            dev ? 'development' : process.env.NODE_ENV
            }`
    )
})
