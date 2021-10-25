"use strict";

jQuery(function ($) {
  var $username = $('#username');
  var $password = $('#password'); //获取用户注册的用户名

  var name = new URLSearchParams(location.search).get('username');
  $username.val(name);
  $('.btn').on('click', function (e) {
    login();
  }); //是否按下回车键

  $(document).keyup(function (e) {
    if (e.keyCode == 13) {
      login();
    }
  });

  function login() {
    $.post('/hua/login?username=' + $username.val() + '&password=' + $password.val(), function (res) {
      // console.log(res);
      if (res.code === 200) {
        //可登录
        var showData = res.data;
        console.log(showData.catlist);
        sessionStorage.setItem('userInfo', JSON.stringify(showData));
        sessionStorage.setItem('cartlist', showData.catlist);
        location.href = "./index.html";
      } else {
        $password.removeClass('is-valid');
        $password.addClass('is-invalid');
      }
    });
  }
});