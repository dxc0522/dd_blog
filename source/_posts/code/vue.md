---
title: 搭建Vue项目
categories: 开发
date: 2019-6-25 13:45:00
tags: 
 - Vue
---
## 创建项目
自行配置node环境
	npm i -g @vue/cli
	vue create project_name  （之后可以自行选择默认或者手动选择插件)
	eslint中的prettier选项为自动美化代码，不用操作直接撸。
安装相关插件后使用vue  add添加插件的配置就可以了
[配置选项（新建vue.config.js）](https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F)

## 移动端适配
### rem适配
[adaptive.js](https://github.com/finance-sh/adaptive)
``` js
npm install adaptive.js    -S
//在引入文件内引入该js
import adaptive from 'adaptive.js'
//直接设置各种配置
adaptive.desinWidth = 750;
adaptive.baseFont = 24;
adaptive.scaleType = 3; // 1为默认值，可以不用设置
adaptive.init();
//即可生效
```
``` 标签引入
window['adaptive'].desinWidth = 640;
window['adaptive'].baseFont = 24;
window['adaptive'].maxWidth = 480;
window['adaptive'].scaleType = 2;
window['adaptive'].init();
```
转换第三方框架px
[内置适配](https://segmentfault.com/a/1190000015238394)
[Px2remloader地址](https://www.npmjs.com/package/webpack-px2rem-loader)

``` js
var px2remLoader = {
  loader: 'px2rem-loader',
  options: {
    remUnit: 75, // (这里是指设计稿的宽度为 750 / 10)
    remPrecision:5,
    min:1,//最小minpx的再小的不设置
  }
}
```
### vw适配（推荐）
[传送门](https://www.w3cplus.com/mobile/vw-layout-in-vue.html)
注意：兼容第三方库就在设置里取消包含于ui库相同的字符串例
selectorBlackList: ['.ignore', '.hairlines','van'],

 yarn add cssnano   postcss-px-to-viewport   postcss-write-svg cssnano-preset-advanced -D

```json
"postcss": {
  "plugins": {
    "postcss-write-svg": {
      "utf8": false
    },
    "postcss-px-to-viewport": {
      "viewportWidth": 750,
      "viewportHeight": 1334,
      "unitPrecision": 3,
      "viewportUnit": "vw",
      "selectorBlackList": [
        ".ignore",
        ".hairlines",
        "van"
      ],
      "minPixelValue": 1,
      "mediaQuery": false
    },
    "cssnano": {
      "cssnano-preset-advanced": {
        "zindex": false,
        "autoprefixer": false
      }
    }
  }
},

```
## Better-scroll插件
npm install better-scroll --save
```js
<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  name: "scroll-view",
  props: {
    /** * 1 滚动的时候会派发scroll事件，会截流。 * 2 滚动的时候实时派发scroll事件，不会截流。 * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件 */
    probeType: {
      type: Number,
      default: 1
    },
    /** * 点击列表是否派发click事件 */

    click: { type: Boolean, default: true },
    /** * 是否开启横向滚动 */

    scrollX: { type: Boolean, default: false },
    /** * 是否派发滚动事件 */

    listenScroll: { type: Boolean, default: false },
    /** * 列表的数据 */
    data: { type: Array, default: null },
    /** * 是否派发滚动到底部的事件，用于上拉加载 */
    pullup: {
      type: Boolean,
      default: false
    },
    /** * 是否派发顶部下拉的事件，用于下拉刷新 */

    pulldown: {
      type: Boolean,
      default: false
    },
    /** * 是否派发列表滚动开始的事件 */

    beforeScroll: {
      type: Boolean,
      default: false
    },
    /** * 当数据更新后，刷新scroll的延时。 */

    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll();
    });
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      // better-scroll的初始化
      let setData = {
        probeType: this.probeType,
        click: this.click
      };
      if (this.scrollX) {
        Object.assign(setData, {
          scrollX: true,
          scrollY: false,
          eventPassthrough: "vertical"
        });
      } else {
        Object.assign(setData, {
          eventPassthrough: "horizontal"
        });
      }
      this.scroll = new BScroll(this.$refs.wrapper, setData);
      // 是否派发滚动事件
      if (this.listenScroll) {
        let me = this;
        this.scroll.on("scroll", pos => {
          me.$emit("scroll", pos);
        });
      }
      // 是否派发滚动到底部事件，用于上拉加载
      if (this.pullup) {
        const that=this;
        this.scroll.on("scrollEnd", () => {
          // 滚动到底部
          if (that.scroll.y <= that.scroll.maxScrollY + 50) {
            that.$emit("scrollToEnd");
          }
        });
      }
      // 是否派发顶部下拉事件，用于下拉刷新
      if (this.pulldown) {
        this.scroll.on("touchend", pos => {
          // 下拉动作
          if (pos.y > 50) {
            this.$emit("pulldown");
          }
        });
      }
      // 是否派发列表滚动开始的事件
      if (this.beforeScroll) {
        this.scroll.on("beforeScrollStart", () => {
          this.$emit("beforeScroll");
        });
      }
    },
    disable() {
      // 代理better-scroll的disable方法
      this.scroll && this.scroll.disable();
    },
    enable() {
      // 代理better-scroll的enable方法
      this.scroll && this.scroll.enable();
    },
    refresh() {
      // 代理better-scroll的refresh方法
      this.scroll && this.scroll.refresh();
    },
    scrollTo() {
      // 代理better-scroll的scrollTo方法
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    scrollToElement() {
      // 代理better-scroll的scrollToElement方法
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    }
  },
  watch: {
    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
    data() {
      setTimeout(() => {
        this.refresh();
      }, this.refreshDelay);
    }
  }
};
</script>
```
## vee-validate表单验证
yarn add vee-validate 
``` js
import VeeValidate, { Validator } from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN';
Validator.localize('zh_CN', zh_CN);
import * as validate from './validator'
Validator.extend('idCard', validate.idCard);
Vue.use(VeeValidate, {
  errorBagName: 'errors', // change if property conflicts.
  delay: 0,
  locale: 'zh_CN',
  messages: null,
  strict: true,
});
```
自定义验证文件validator.js
``` js
#getMessage方法为返回信息，validata方法为验证的方法,field为名称。
#身份证号
export const idCard = {
  getMessage: field => field + "不正确",
  validate: (value, args) => {
    return /\d{17}[\d|x]|\d{15}/.test(value)
  }
}
```
使用验证
```html
<input name="idCard" data-vv-as="身份证号" v-validate="'required|idCard|numeric'" v-model="form.idCard" type="text" placeholder="身份证号码">
```
## 其他
### 修改title
router.js
```js
routes: [
  {
      name:'home',
        path: '/home/:openname',
        component: Home,
        meta: {
          title: '首页'
      }
  }
]
```
### 全局守卫
``` js
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})
```
### css引入本地图片
```
background: url("~@/assets/img/shop/home_bg.png");
```