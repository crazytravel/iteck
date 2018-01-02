const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')
require('./server/db')

const Article = require('./server/routes/article')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()
app.prepare().then(() => {
    const server = new Koa()
    const router = new Router()

    router.get('/article/:id', async ctx => {
        const actualPage = '/article'
        await app.render(ctx.req, ctx.res, actualPage, ctx.params)
        ctx.respond = false
    })

    router.get('/api/articles', Article.list)
    router.get('/api/articles/:id', Article.findOne)

    router.get('*', async ctx => {
        await handle(ctx.req, ctx.res)
        ctx.respond = false
    })
    server.use(async (ctx, next) => {
        ctx.set('Access-Control-Allow-Origin', "*.iteck.cc")
        ctx.set('Access-Control-Allow-Credentials', 'true')
        ctx.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,PATCH')
        ctx.res.statusCode = 200
        await next()
    })
    server.use(router.routes())
    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})