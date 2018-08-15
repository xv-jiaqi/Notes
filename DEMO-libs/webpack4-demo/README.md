# webpack-and-spa-guide

[TOC]

---

## 项目

这是一个极简 SPA 的向导 Demo，同时配合 Webpack 让它跑起来。

## 依赖说明

### eslint

- eslint 
  
  ESLint最初是由Nicholas C. Zakas 于2013年6月创建的开源项目。它的目标是提供一个插件化的javascript代码检测工具。

- eslint-config-enough
  
  eslint-config-enough 是一个[可共享配置包](http://eslint.cn/docs/developer-guide/shareable-configs)，在 `extends` 属性中配置，可省略前缀前缀 `eslint-config-`。

- babel-eslint

  babel-eslint 是 eslint-config-enough 依赖的语法解析库，替代 eslint 默认的解析库以支持还未标准化的语法。比如 import()。通过 `parser`字段指定。

- eslint-loader

  用于在 webpack 编译的时候检查代码，如果有错误，webpack 会报错。在 webpack 的配置文件中有引入。

### webpack

- webpack

  webpack 即 webpack 核心库。它提供了很多 API, 通过 Node.js 脚本中 require('webpack') 的方式来使用 webpack。

- webpack-cli

  webpack-cli 是 webpack 的命令行工具。让我们可以不用写打包脚本，只需配置打包配置文件，然后在命令行输入 webpack-cli --config webpack.config.js 来使用 webpack, 简单很多。webpack 4 之前命令行工具是集成在 webpack 包中的，4.0 开始 webpack 包本身不再集成 cli。

- webpack-serve

  webpack-serve 是 webpack 提供的用来开发调试的服务器，让你可以用 http://127.0.0.1:8080/ 这样的 url 打开页面来调试，有了它就不用配置 nginx 了，方便很多。

- html-webpack-plugin

- html-loader

- css-loader 

- style-loader

- file-loader

  是打包二进制文件的插件

- url-loader 

  是打包二进制文件的插件

### babel

- babel-core 

  顾名思义是 babel 的核心编译器。
  
- babel-preset-env 

  是一个配置文件，我们可以使用这个配置文件转换 ES2015/ ES2016/ ES2017 到 ES5。

- babel-loader

  是 webpack 的插件

### connect-history-api-fallback

  SPA 的页面真实路径其实只有一个，一般指向 index.html，如果直接访问 SPA 的非首页或刷新操作，请求会发给服务器，返回404，connect-history-api-fallback 就是用来避免这该问题。