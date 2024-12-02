const { createProxyMiddleware } = require('http-proxy-middleware');

const target = 'http://localhost:5074'

const context = [
    "/api"
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: target,
        secure: false,
        headers: {
            Connection: 'Keep-Alive'
        }
    });
    app.use(appProxy);
}