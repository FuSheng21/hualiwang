"use strict";

jQuery(function ($) {
  //获取本地存储信息
  var cartlist = sessionStorage.getItem('cartlist');
  cartlist = JSON.parse(cartlist); //根据购物车状态显示或隐藏

  var cartShow = $('.cartlist-show');

  if (cartlist == null || cartlist.length == 0) {
    cartShow.removeClass('is-invalid');
    cartShow.addClass('is-valid');
    return;
  } else {
    cartShow.removeClass('is-valid');
    cartShow.addClass('is-invalid');
  } //动态的获取图片路径


  var path = {
    1: './src/imgs/aiqing/',
    2: './src/imgs/yongsheng/',
    3: './src/imgs/zhangbei/',
    4: './src/imgs/lipin/'
  }; //渲染购物车商品

  var temp = cartlist.map(function (item) {
    return "\n            <ul class=\"goodlist\">\n                <div class=\"fl\">\n                <input type=\"checkbox\" checked>\n                    <img src=\"".concat(path[item.type]).concat(item.img_url, "\" width=\"80\" height=\"88\" alt=\"\">\n                    <a href=\"./details.html?type=").concat(item.type, "&id=").concat(item.id, "\">").concat(item.goodName, "</a>\n                </div>\n                <div class=\"fr\">\n                        <li><del>\uFFE5").concat(item.old_Price, "</del></li>\n                        <li>\uFFE5").concat(item.Price, "</li>\n                        <span class=\"number\">\n                            <button class=\"jian\"><i>-</i></button>\n                            <input type=\"text\" maxlength=\"2\" class=\"form-control count\" data-id=\"").concat(item.id, "\" value=\"").concat(item.qty, "\"/>\n                            <button class=\"jia\"><i>+</i></button>\n                        </span>\n                        <button type=\"button\" class=\"btn btn-danger del\" data-id=\"").concat(item.id, "\">\u5220\u9664</button>\n                </div>\n             </ul>\n        ");
  });
  $('.tag').after(temp);

  function writeDb() {
    var currenCartlist = JSON.stringify(cartlist);
    var userId = JSON.parse(sessionStorage.getItem('userInfo')).id;
    $.post('http://localhost:3000/hua/user/cartlist?id=' + userId, {
      currenCartlist: currenCartlist
    }, function (req, res) {});
  }
  /* 删除商品 */


  $('.catlist').on('click', '.del', function () {
    var id = $(this).attr('data-id');
    cartlist = cartlist.filter(function (item) {
      return item.id != id;
    });
    sessionStorage.setItem('cartlist', JSON.stringify(cartlist));
    writeDb();
    location.reload();
  });
  /* 修改数量 */
  //加减

  $('.catlist').on('click', 'button', function () {
    var _this = this;

    console.log($(this).hasClass('jia'));

    if ($(this).hasClass('jia')) {
      var id = $(this).prev().attr('data-id');
      cartlist = cartlist.map(function (item) {
        if (item.id == id) {
          item.qty = $(_this).prev().val() * 1 + 1;
        }

        return item;
      });
    }

    if ($(this).hasClass('jian')) {
      var _id = $(this).next().attr('data-id');

      cartlist = cartlist.map(function (item) {
        if (item.id == _id) {
          item.qty = $(_this).next().val() * 1 - 1;
        }

        return item;
      });
    }

    sessionStorage.setItem('cartlist', JSON.stringify(cartlist));
    writeDb();
    location.reload();
  }); //输入

  $('.catlist').on('input', '.count', function () {
    var _this2 = this;

    var id = $(this).attr('data-id');
    cartlist = cartlist.map(function (item) {
      if (item.id == id) {
        item.qty = $(_this2).val();
      }

      return item;
    });
    sessionStorage.setItem('cartlist', JSON.stringify(cartlist));
    writeDb();
    location.reload();
  });
  /* 总价 */

  var total = cartlist.reduce(function (val, item) {
    // val: 上一次遍历的返回值
    return val + item.Price * item.qty;
  }, 0);
  $('.money').html(total.toFixed(2));
  /* 清空&购买 */

  $('.cartfool').on('click', 'button', function () {
    if ($(this).hasClass('empty')) {
      if (confirm('是否清空购物车?')) {
        cartlist = [];
        sessionStorage.setItem('cartlist', JSON.stringify(cartlist));
        writeDb();
      }
    }

    if ($(this).hasClass('buynow')) {
      if (confirm("\u60A8\u5C06\u6D88\u8D39".concat(total, "\u5143\uFF0C\u786E\u5B9A\u5241\u624B\uFF1F"))) {
        cartlist = [];
        sessionStorage.setItem('cartlist', JSON.stringify(cartlist));
        writeDb();
        alert('购买成功！');
      }
    }

    location.reload();
  });
});