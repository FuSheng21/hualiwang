"use strict";

jQuery(function ($) {
  var type = new URLSearchParams(location.search).get('type');
  var paege = new URLSearchParams(location.search).get('paege') * 1;
  var urls = {
    1: '/hua/flower/pre-aiqing',
    2: '/hua/flower/pre-yongsheng',
    3: '/hua/flower/pre-zhangbei',
    4: '/hua/flower/pre-lipin'
  };
  var path = {
    1: './src/imgs/aiqing/',
    2: './src/imgs/yongsheng/',
    3: './src/imgs/zhangbei/',
    4: './src/imgs/lipin/'
  };
  $.get(urls[type] + '?&paege=' + paege, function (data) {
    var datas = data.data.data; // console.log(datas);

    var goodslist = datas.map(function (item) {
      return "\n                <div class=\"goods_item\">\n                    <a href=\"./details.html?type=".concat(type, "&id=").concat(item.id, "\">\n                        <div class=\"img-box\">\n                            <img src=\"").concat(path[type]).concat(item.img_url, "\" height=\"240\" width=\"220\" />\n                        </div>\n                        <div class=\"content\">\n                            <p class=\"title\">\u7231\u60C5\xB7").concat(item.Cpmc, "</p>\n                            <p class=\"price\">\n                                <span class=\"sign\">&yen;</span>\n                                <span class=\"num\">").concat(item.Price, "</span>\n                            </p>\n                            <p class=\"sell\">\u5DF2\u552E").concat(item.Sales, "\u4EF6</p>\n                        </div>\n                    </a>\n                </div>\n                ");
    }).join('');
    $('.goods').html(goodslist);
    /* 渲染页码 */

    var number = data.data.paeNum;
    var yemaGp = $('.yema');
    var lis = [];
    var ids = [];

    for (var i = 1; i <= number; i++) {
      //  href="/public/prefecture.html?type=${type}&paege=${i}"
      var li = $("<li class=\"page-item\"><a class=\"page-link heil\"  id=\"".concat(i, "\" href=\"/public/prefecture.html?type=").concat(type, "&paege=").concat(i, "\">").concat(i, "</a></li>"));
      ids.push(i);
      lis.push(li);
    }

    lis.map(function (item) {
      yemaGp.before(item);
    });
    /* 添加高亮 */

    ids.map(function (item) {
      if (item == paege) {
        var id = $("a[id=".concat(paege, "]"));
        id.css('backgroundColor', 'orange');
      }
    });
    /* 判断首末页*/

    var pro = $('.pro');
    var next = $('.next');

    if (paege == ids[0]) {
      pro.addClass('disabled');
    } else {
      pro.removeClass('disabled');
    }

    if (paege == ids.length) {
      next.addClass('disabled');
    } else {
      next.removeClass('disabled');
    }
    /* 上下页 */


    var up = $('.up');
    var down = $('.down');
    up.attr('href', "/prefecture.html?type=".concat(type, "&paege=") + (paege - 1));
    down.attr('href', "/prefecture.html?type=".concat(type, "&paege=") + (paege + 1));
  });
});