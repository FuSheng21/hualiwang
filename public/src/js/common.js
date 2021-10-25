"use strict";

jQuery(function ($) {
  /* 登录状态 */
  var login1 = $('.login1');
  var uname = $('.uname');
  var reg1 = $('.reg1');
  var exit = $('.exit');
  var exitBtn = $('.exitBtn');

  if (sessionStorage.getItem('userInfo')) {
    var username = JSON.parse(sessionStorage.getItem('userInfo')).username;
    uname.html(username);
    uname.css('display', 'inline-block');
    exit.css('display', 'inline-block');
    login1.css('display', 'none');
    reg1.css('display', 'none');
  } else {
    uname.css('display', 'none');
    exit.css('display', 'none');
    login1.css('display', 'inline-block');
    reg1.css('display', 'inline-block');
  }
  /* 退出登录 */


  exitBtn.on('click', function () {
    sessionStorage.removeItem('userInfo');
    sessionStorage.removeItem('cartlist');
    location.reload();
  });
  /* 当前导航 */

  var type = new URLSearchParams(location.search).get('type');
  var li = $('.nav li');
  var temp = location.href; //购物车页面没有导航

  if (temp.indexOf('cat') > 0) {
    return;
  }

  if (type == null) {
    li[0].className = 'targe';
  } else {
    li[type].className = 'targe';
  }
});