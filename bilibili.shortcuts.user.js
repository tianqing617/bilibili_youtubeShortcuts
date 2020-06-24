// ==UserScript==
// @name        哔哩哗哩仿youtube快捷键功能
// @homepageURL https://github.com/tianqing617/bilibili_youtubeShortcuts
// @namespace   interest
// @include     http*://www.bilibili.com/video/BV*
// @grant       none
// @version     1.1
// @author      刘天青
// @description 找不到仿youtube快捷键脚本，那么自己造一个
// @run-at      document-end
// ==/UserScript==

(function() {
  'use strict';
  // 注册快捷键对应的函数
  var shortcutMethodNames = {
    'f': 'fullScreenMode',
    'w': 'webScreenMode',
    't': 'threatreScreenMode',
    'm': 'muteMode',
    'c': 'barrageMode',
    'r': 'repeatMode',
  }

  // 根据class名称，获取dom对象
  function getBtnObjByClass(name) {
    var btnObj = document.querySelector('.' + name);
    if (btnObj) {
      return btnObj;
    } else {
      console.log('网页代码被改变，脚本已不适用！');
      return null;
    }
  }

  // 执行（单击）DOM对象
  function clickButton(button) {
    if (button) {
      button.click();
      return true;
    } else {
      console.log('网页代码被改变，脚本已不适用！');
      return false;
    }
  }

  // 点击快捷键，触发的方法
  var processMethods = {
    // 全屏
    fullScreenMode: function() {
      // console.log('full screen mode');
      // 找到功能键的容器
      return clickButton(getBtnObjByClass('bilibili-player-video-web-fullscreen'));
    },
    // 网页全屏
    webScreenMode: function() {
      return clickButton(getBtnObjByClass('bilibili-player-video-web-fullscreen'));
    },
    // 剧院模式
    threatreScreenMode: function() {
      return clickButton(getBtnObjByClass('bilibili-player-video-btn-widescreen'));
    },
    // 静音
    muteMode: function() {
      return clickButton(getBtnObjByClass('bilibili-player-iconfont-volume'));
    },
    // 字幕
    barrageMode: function() {
      // clickButton(getBtnObjByClass('bilibili-player-iconfont-subtitle'));
      return clickButton(getBtnObjByClass('bilibili-player-iconfont-subtitle'));
    },
    // 循环
    repeatMode: function() {
      return clickButton(getBtnObjByClass('bilibili-player-video-btn-repeat'));
    },
  }

  function init() {
    // console.log('init...');

    var pressKeyborder = function(e) {
      if (e && e.key) {
        var name = shortcutMethodNames[e.key];
        if (name) {
          return processMethods[name]();
        } else {
          return false;
        }
      }
    }

    // 注册事件
    document.addEventListener('keydown', pressKeyborder);

    // 默认打开网页模式
    var timer = setInterval(function() {
      var result = pressKeyborder({ key: 'w' });
      if (result) {
        clearInterval(timer);
      }
    }, 1000);
  }

  init();
})();