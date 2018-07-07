const { createServer } = require('http');
const { parse } = require('url');

createServer((request, response) => {
    console.log('🚦', new Date(),request.url);

    const { callback } = parse(request.url, true).query;

    const test = "来自 http://127.0.0.1:8888 域的资源";
    const data = JSON.stringify({test});

    if (callback) {
        response.end(`${callback}(${data})`)
    } else {
        response.end(data);
    }
}).listen(8888, () => console.log('🤪 server is listen on 8888 ...\n'));

