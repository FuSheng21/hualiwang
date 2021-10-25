"use strict";

jQuery(function ($) {
  //获取url参数
  var type = new URLSearchParams(location.search).get('type');
  var id = new URLSearchParams(location.search).get('id'); //图片路径
  console.log(type);
  console.log(id);

  var path = {
    1: './src/imgs/aiqing/',
    2: './src/imgs/yongsheng/',
    3: './src/imgs/zhangbei/',
    4: './src/imgs/lipin/'
  }; //存储商品信息

  var goods; //获取本地存储的商品信息

  var cartlist = JSON.parse(sessionStorage.getItem('cartlist')) || []; //根据商品id请求商品信息并渲染到商品详情页

  $.get('/hua/flower/details?id=' + id, function (data) {
    var datas = data.data;
    goods = datas[0];
    var goodslist = datas.map(function (item) {
      return "\n            <div class=\"det\">\n            <div class=\"fl\">\n                <img src=\"".concat(path[type]).concat(item.img_url, "\" width=\"100%\" height=\"100%\" alt=\"\">\n            </div>\n            <div class=\"fr\">\n                <h3 class=\"set\">").concat(item.Cpmc, "</h3>\n                <div class=\"tags\">\n                    <p class=\"tag\">").concat(item.tagName, "</p>\n                    <p class=\"goodname\">").concat(item.goodName, "</p>\n                </div>\n                <div class=\"sale\">\n                    <div class=\"sale-now\">\n                        <p>\u552E\u4EF7<span class=\"Price\">\uFFE5").concat(item.Price, "</span></p>\n                        <p>\u539F\u4EF7<span class=\"oldPrice\"><del>\uFFE5").concat(item.old_Price, "</del></span></p>\n                        \n                    </div>\n                    <p>\u5DF2\u552E&nbsp;<span class=\"sales\">").concat(item.Sales, "</span>&nbsp;\u4EF6</p>\n                </div>\n                <div class=\"buy\">\n                    <button type=\"button\" class=\"btn btn-primary add2cat\">\u52A0\u5165\u8D2D\u7269\u8F66</button>\n                    <button type=\"button\" class=\"btn btn-danger detbuy\">\u7ACB\u5373\u8D2D\u4E70</button>\n                </div>\n            </div>\n        </div>\n                ");
    }).join('');
    $('.details').html(goodslist);
  });
  /* 添加购物车 */

  $('.details').on('click', 'button', function () {
    if ($(this).hasClass('add2cat')) {
      //判断是否登录
      if (sessionStorage.getItem('userInfo')) {
        var _goods = goods,
            _id = _goods.id,
            img_url = _goods.img_url,
            goodName = _goods.goodName,
            old_Price = _goods.old_Price,
            Price = _goods.Price; // 判断当前商品是否存在购物中
        // 存在：数量+1
        // 不存在：添加

        var currentGoods = cartlist.find(function (item) {
          return item.id == _id;
        });

        if (currentGoods) {
          currentGoods.qty += 1;
          alert('商品数量加1');
        } else {
          cartlist.unshift({
            id: _id,
            type: type,
            img_url: img_url,
            goodName: goodName,
            old_Price: old_Price,
            Price: Price,
            qty: 1
          });
          alert('添加成功！');
        }

        sessionStorage.setItem('cartlist', JSON.stringify(cartlist));
        /* 添加商品同时写入数据库 */

        var currenCartlist = JSON.stringify(cartlist);
        var userId = JSON.parse(sessionStorage.getItem('userInfo')).id;
        $.post('http://localhost:3000/hua/user/cartlist?id=' + userId, {
          currenCartlist: currenCartlist
        }, function (req, res) {});
      } else {
        if (confirm('请登录后再添加购物车')) {
          location.href = "./login.html";
        }
      }
    }

    if ($(this).hasClass('detbuy')) {
      if (confirm("\u60A8\u5C06\u6D88\u8D39".concat($('.sales').html(), "\u5143\uFF1F"))) {}
    }
  });
});