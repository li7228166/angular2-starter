### 项目特征：
- 支持TypeScript编译
- 支持LESS预处理器
- 实现组件级热更新
- 实现代码的热替换，浏览器实时刷新查看效果
- 分离业务功能代码和公共依赖代码
- 单独分离CSS样式文件
- 支持图片、图标字体等资源的编译
- 支持文件MD5戳，解决文件缓存问题
- 支持一键部署项目到服务器

### 项目说明：

Angular2.x的typescript语法webpack编译环境，只包含项目开发常用依赖，可根据项目需要自行install，公共依赖代码会按照package.json的dependencies配置，提取到vender.[hash:8].js  <br />
项目根目录下的config.json文件可配置本地web服务的host、远程部署服务器以及ajax跨域服务器的host、post

### 项目开始

```
$ git clone https://github.com/li7228166/angular2-ts-starter.git
$ cd react-starter
$ npm install（因为中国强，如果速度太慢，可尝试使用[cnpm](https://npm.taobao.org/)）
```

### 预置命令
#### 开发
```
$ npm start
```

浏览器会自动打开 [http://localhost:4100](http://localhost:4100) （默认）


#### 开发(开启ajax接口反向代理，跨域利器)
```
$ npm start:proxy
```
**注：需要先配置下你的根目录下的config.json**
```json
{
  "proxy": {
    "host": "xxx.xxx.xxx.xxx",
    "port": "xxxx"
  }
}
```
浏览器会自动打开 [http://localhost:4100](http://localhost:4100) (默认)   <br />本地服务会自动代理/api/开头的请求到proxy设置的服务器   <br />越来越多的前端开发采取前后端分离的单页应用，ajax跨域是个让人头痛的问题（chrome在PC上可以设置跨域，但是，问题来了，你在手机上真没进行测试？？，那么就用该命令吧）



#### build
```
$ npm run build
```

生成待部署文件到dist目录

#### 发布
```
$ npm run release
```

生成待部署文件到dist目录，并打开浏览器 [http://localhost:8080](http://localhost:8080) ，在本地预览待部署的项目


#### 部署
```
$ npm run deploy
```
**注：需要先配置下你的根目录下的config.json**
```json
{
  "ssh": {
    "host": "xx.xx.xx.xx",  //服务器IP
    "username": "xxx",      //用户名
    "password": "xxx",      //登录密码
    "port": "xxx",          //端口
    "remotePath": "/xx/xx"  //上传到服务器的哪个目录
  }
}
```
在生成待部署文件到dist目录，并直接部署到指定服务器