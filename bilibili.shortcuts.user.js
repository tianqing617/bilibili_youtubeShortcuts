// ==UserScript==
// @name        哔哩哗哩（bilibili.com）播放器快捷键 
// @namespace   interest
// @include     http*://www.bilibili.com/video/av*
// @grant       none
// @version     1.0
// @author      刘天青
// @description 找不到仿youtube快捷键脚本，那么自己造一个
// @run-at      document-end
// ==/UserScript==

(function() {
  // 注册快捷键对应的函数
  const shortcutMethodNames = {
    'f': 'fullScreenMode',
    'w': 'webScreenMode',
  }

  // 点击快捷键，触发的方法
  const processMethods = {
    // 全屏
    fullScreenMode: function() {
      console.log('full screen mode');
      // 找到功能键的容器
      const btnObjects = document.getElementsByClassName('bilibili-player-video-web-fullscreen');
      if (btnObjects && btnObjects.length === 1) {
        const myButton = btnObjects[0];
        if (myButton) myButton.click();
        // children为每个功能键容器下面的两个button
        // const children = btnObjects[0].children;
        // if (children && children.length === 2) {
        //   children[0].click();
        // }
      }
    },
    // 网页全屏
    webScreenMode: function() {
      console.log('web screen mode');
    }
  }

  function init() {
    console.log('init...');
    // 注册事件
    document.addEventListener('keydown', function(e) {
      if (e && e.key) {
        const name = shortcutMethodNames[e.key];
        if (name) {
          processMethods[name]();
        }
      }
    });
  }

  init();
})()