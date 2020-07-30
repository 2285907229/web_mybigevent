// 每次调用ajax请求时候会先调用ajaxPrefilter这个函数
$.ajaxPrefilter(function (options) {
    // console.log(options.url)
    options.url = 'http://ajax.frontend.itheima.net' + options.url
})