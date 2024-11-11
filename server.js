const http = require('http');
const server = http.createServer();

server.listen(8000, () => {
    console.log('service run: http://127.0.0.1:8000');
});

server.on('request', (req, res) => {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');

        const urls = req.url.split('?');
        const requestAddress = urls[0];
        console.log(`请求地址：${requestAddress}`);

        const callback = {
            '/test': () => {
                res.statusCode = 200;
                res.end(JSON.stringify({ text: '通过测试' }));
            },
            '/': () => {
                res.statusCode = 200;
                res.end(JSON.stringify({ text: 'hello world' }));
            }
        }

        if (callback[requestAddress] instanceof Function) {
            return callback[requestAddress]()
        }

        res.writeHead(200, '响应成功');
        res.end('成功收到请求');
    } catch (ex) {
        console.error(ex.message);
        res.statusCode = 500;
        res.end('service error');
    }
});