(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{0:function(n,e,t){t("qQbD"),n.exports=t("bBV7")},"33iF":function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=e.Reset=e.reset=void 0;var r=t("UutA");function o(){var n=i(["",""]);return o=function(){return n},n}function a(){var n=i(["\n/* http://meyerweb.com/eric/tools/css/reset/\n   v4.0 | 20180602\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmain, menu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, main, menu, nav, section {\n  display: block;\n}\n/* HTML5 hidden-attribute fix for newer browsers */\n*[hidden] {\n    display: none;\n}\nbody {\n  line-height: 1;\n}\nol, ul {\n  list-style: none;\n}\nblockquote, q {\n  quotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: '';\n  content: none;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n"]);return a=function(){return n},n}function i(n,e){return e||(e=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}}))}var u=(0,r.css)(a());e.reset=u;var c=(0,r.createGlobalStyle)(o(),u);e.Reset=c;var s=u;e.default=s},"6jsY":function(n,e,t){"use strict";var r=t("x9yg"),o=t("KBEF"),a=t("J/q3"),i=t("3esu"),u=t("8m4E"),c=t("Od8a"),s=t("UrUy"),l=t("PL1w");e.__esModule=!0,e.Container=function(n){0;return n.children},e.createUrl=h,e.default=void 0;var p=l(t("mXGw")),f=t("z4BS");function d(n){var e,t,r;return s.async((function(o){for(;;)switch(o.prev=o.next){case 0:return e=n.Component,t=n.ctx,o.next=3,s.awrap((0,f.loadGetInitialProps)(e,t));case 3:return r=o.sent,o.abrupt("return",{pageProps:r});case 5:case"end":return o.stop()}}))}e.AppInitialProps=f.AppInitialProps;var b=function(n){function e(){return o(this,e),i(this,u(e).apply(this,arguments))}return c(e,n),a(e,[{key:"componentDidCatch",value:function(n,e){throw n}},{key:"render",value:function(){var n=this.props,e=n.router,t=n.Component,o=n.pageProps,a=h(e);return p.default.createElement(t,r({},o,{url:a}))}}]),e}(p.default.Component);function h(n){var e=n.pathname,t=n.asPath,r=n.query;return{get query(){return r},get pathname(){return e},get asPath(){return t},back:function(){n.back()},push:function(e,t){return n.push(e,t)},pushTo:function(e,t){var r=t?e:"",o=t||e;return n.push(r,o)},replace:function(e,t){return n.replace(e,t)},replaceTo:function(e,t){var r=t?e:"",o=t||e;return n.replace(r,o)}}}e.default=b,b.origGetInitialProps=d,b.getInitialProps=d},hUgY:function(n,e,t){"use strict";t.r(e);var r=t("hHgk"),o=t.n(r);function a(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),o()(n,r.key,r)}}var i=t("t+lh"),u=t.n(i),c=t("XzKa"),s=t.n(c);function l(n){return(l="function"===typeof s.a&&"symbol"===typeof u.a?function(n){return typeof n}:function(n){return n&&"function"===typeof s.a&&n.constructor===s.a&&n!==s.a.prototype?"symbol":typeof n})(n)}function p(n){return(p="function"===typeof s.a&&"symbol"===l(u.a)?function(n){return l(n)}:function(n){return n&&"function"===typeof s.a&&n.constructor===s.a&&n!==s.a.prototype?"symbol":l(n)})(n)}function f(n,e){return!e||"object"!==p(e)&&"function"!==typeof e?function(n){if(void 0===n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}(n):e}var d=t("jDdP"),b=t.n(d),h=t("OKNm"),v=t.n(h);function y(n){return(y=v.a?b.a:function(n){return n.__proto__||b()(n)})(n)}var m=t("6Ndq"),g=t.n(m);function w(n,e){return(w=v.a||function(n,e){return n.__proto__=e,n})(n,e)}var _=t("o42t"),k=t.n(_),P=t("9fEB"),q=t.n(P),E=t("mXGw"),j=t.n(E),T=t("UutA"),x=t("33iF"),C=t("Nhdc");t.d(e,"default",(function(){return z}));var U=j.a.createElement,O={primary:"green"},z=function(n){function e(){return function(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),f(this,y(e).apply(this,arguments))}var t,r,o;return function(n,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");n.prototype=g()(e&&e.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),e&&w(n,e)}(e,n),t=e,(r=[{key:"render",value:function(){var n=this.props,e=n.Component,t=n.pageProps;return U(T.ThemeProvider,{theme:O},U(q.a,null,U("title",null,"universal-boilerplate")),U(x.Reset,null),U(C.e,null),U(e,t))}}])&&a(t.prototype,r),o&&a(t,o),e}(k.a)},o42t:function(n,e,t){n.exports=t("6jsY")},qQbD:function(n,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return t("hUgY")}])}},[[0,1,2,0,3]]]);