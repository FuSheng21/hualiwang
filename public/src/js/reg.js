"use strict";

jQuery(function ($) {
  var $username = $('#username');
  var $password = $('#password');
  var $btn = $('.btn');
  $username.on('change', function () {
    $.get('/hua/reg/check?username=' + $username.val(), function (res) {
      if (res.code === 200) {
        //用户名已存在
        $username.removeClass('is-invalid');
        $username.addClass('is-valid');
        $btn.attr('disabled', false);
      } else {
        $username.removeClass('is-valid');
        $username.addClass('is-invalid');
        $btn.attr('disabled', 'disabled');
      }
    });
    $btn.on('click', function () {
      if ($password.val().length <= 0) {
        $password.addClass('is-invalid');
        return;
      }

      $.post('/hua/reg?username=' + $username.val() + '&' + 'password=' + $password.val(), function (res) {
        if (res.code === 200) {
          //注册成功
          location.href = "./login.html?username=" + $username.val();
        }
      });
    });
  });
});