$(function () {
    // 点击按钮，切换登录注册按钮
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })


    // 自定义校验规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
        'pwd': [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        'repwd': function (value) {
            var pwd = $('.reg-box [name = password]').val()
            if (pwd !== value) {
                return '二次密码不一致'
            }
        }
    })

    // 注册功能
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val(),
            },
            success:function(res){
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }

                layer.msg(res.message)
                $('#link_login').click()
                $('#form_reg')[0].reset()
                $('#form_login')[0].reset()
            }
        })
    })

    //登录功能
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res){
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                localStorage.setItem('token',res.token)
                location.href = '/index.html'
            }
        })
    })

})