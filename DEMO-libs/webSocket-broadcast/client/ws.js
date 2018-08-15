export default class {
    constructor(selector, webSocketLink, type) {
        if (!selector || !webSocketLink) return;

        this.ws = this.init(webSocketLink);
        this.type = type || 'client';
        this.pingTimeout = 20 * 1000;

        this.open();
        this.message(selector);
        this.close();
        this.ping();

        return this.ws;
    }

    init(webSocketLink) {
        if ('WebSocket' in window) {
            return new WebSocket(webSocketLink);
        } else {
            // 用轮训实现
            return console.error('Error');
        }
    }

    open() {
        this.ws.onopen = () => console.log('Connection to server opened');
    }

    message(selector) {
        this.ws.onmessage = event => {
            console.log('Received message', event);
            const {data} = event;

            if (data === 'pong') return;

            document.querySelector(selector).value = data;
        }
    }

    ping() {
        setInterval(() => {
            this.ws.send('ping')
        }, this.pingTimeout);
    }

    close() {
        this.ws.onclose = () => console.log('Connection closed.');
    }
}