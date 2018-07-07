/**
 * http请求
 * @param {*} url 
 * @param {*} opts 
 */
export function http(url, ...opts) {
    if (!url) return;

    if (opts.length) return jsonp(url, ...opts);

    if ('fetch' in window) {
        return fetch(url)
            .then(res => res.json())
            .then(res => res)
            .catch(err => err);
    }
};

/**
 * jsonp
 * @param url
 * @param successFn
 */
function jsonp(url, successFn) {
    const cbName = `cb_${new Date().getTime()}`;

    // 创建script标签
    const script = createScript(`${url}?callback=${cbName}`);

    // 挂载全局方法，数据请求回调执行
    window[cbName] = res => {
        successFn(res);
        // window[cbName] = null;
    };
    
    document.querySelector('head').appendChild(script);
}

/**
 * create script node
 * @param {*} url 
 */
function createScript(url) {
    const node = document.createElement('script');
    node.setAttribute('src', url);
    return node;
}