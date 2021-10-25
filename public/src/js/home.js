"use strict";

jQuery(function ($) {
  var ailist = $('.f-lover .fl-products');
  var yongs = $('.f-immortal .fl-products');
  var zhangb = $('.f-elder .fl-products');
  var gifts = $('.f-gifts .fl-products');
  /* 爱情鲜花 */

  $.get('/hua/flower/aiqing', function (data) {
    var datas = data.data;
    var goodslist = datas.map(function (item) {
      return "\n                    <div class=\"fl-products-item\">\n                        <a href=\"./details.html?type=1&id=".concat(item.id, "\">\n                            <div class=\"img-box\">\n                                <img src=\"./src/imgs/aiqing/").concat(item.img_url, "\" height=\"240\" width=\"220\"/>\n                            </div>\n                            <div class=\"product-content\">\n                                <p class=\"product-title\">\u7231\u60C5\xB7").concat(item.Cpmc, "</p>\n                                <p class=\"product-price\">\n                                    <span class=\"price-sign\">&yen;</span>\n                                    <span class=\"price-num\">").concat(item.Price, "</span>\n                                </p>\n                                <p class=\"product-sell\">\u5DF2\u552E").concat(item.Sales, "\u4EF6</p>\n                            </div>\n                        </a>\n                    </div>\n                    ");
    }).join('');
    ailist.html(goodslist);
  });
  /* 永生花 */

  $.get('/hua/flower/yongsheng', function (data) {
    var datas = data.data;
    var goodslist = datas.map(function (item) {
      return "\n                    <div class=\"fl-products-item\">\n                        <a href=\"./details.html?type=2&id=".concat(item.id, "\">\n                            <div class=\"img-box\">\n                                <img src=\"./src/imgs/yongsheng/").concat(item.img_url, "\" height=\"240\" width=\"220\"/>\n                            </div>\n                            <div class=\"product-content\">\n                                <p class=\"product-title\">\u6C38\u751F\u82B1\xB7").concat(item.Cpmc, "</p>\n                                <p class=\"product-price\">\n                                    <span class=\"price-sign\">&yen;</span>\n                                    <span class=\"price-num\">").concat(item.Price, "</span>\n                                </p>\n                                <p class=\"product-sell\">\u5DF2\u552E").concat(item.Sales, "\u4EF6</p>\n                            </div>\n                        </a>\n                    </div>\n                    ");
    }).join('');
    yongs.html(goodslist);
  });
  /* 送长辈鲜花 */

  $.get('/hua/flower/zhangbei', function (data) {
    var datas = data.data;
    var goodslist = datas.map(function (item) {
      return "\n                    <div class=\"fl-products-item\">\n                        <a href=\"./details.html?type=3&id=".concat(item.id, "\">\n                            <div class=\"img-box\">\n                                <img src=\"./src/imgs/zhangbei/").concat(item.img_url, "\" height=\"240\" width=\"220\"/>\n                            </div>\n                            <div class=\"product-content\">\n                                <p class=\"product-title\">\u9001\u957F\u8F88\xB7").concat(item.Cpmc, "</p>\n                                <p class=\"product-price\">\n                                    <span class=\"price-sign\">&yen;</span>\n                                    <span class=\"price-num\">").concat(item.Price, "</span>\n                                </p>\n                                <p class=\"product-sell\">\u5DF2\u552E").concat(item.Sales, "\u4EF6</p>\n                            </div>\n                        </a>\n                    </div>\n                    ");
    }).join('');
    zhangb.html(goodslist);
  });
  /* 礼品 */

  $.get('/hua/flower/lipin', function (data) {
    var datas = data.data;
    var goodslist = datas.map(function (item) {
      return "\n                    <div class=\"fl-products-item\">\n                        <a href=\"./details.html?type=4&id=".concat(item.id, "\">\n                            <div class=\"img-box\">\n                                <img src=\"./src/imgs/lipin/").concat(item.img_url, "\" height=\"240\" width=\"220\"/>\n                            </div>\n                            <div class=\"product-content\">\n                                <p class=\"product-title\">\u793C\u54C1\xB7").concat(item.Cpmc, "</p>\n                                <p class=\"product-price\">\n                                    <span class=\"price-sign\">&yen;</span>\n                                    <span class=\"price-num\">").concat(item.Price, "</span>\n                                </p>\n                                <p class=\"product-sell\">\u5DF2\u552E").concat(item.Sales, "\u4EF6</p>\n                            </div>\n                        </a>\n                    </div>\n                    ");
    }).join('');
    gifts.html(goodslist);
  });
});