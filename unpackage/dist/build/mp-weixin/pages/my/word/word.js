(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/word/word"],{"0287":function(t,n,e){"use strict";(function(t){e("0540");u(e("66fd"));var n=u(e("02e0"));function u(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"02e0":function(t,n,e){"use strict";e.r(n);var u=e("6200"),o=e("377e");for(var i in o)"default"!==i&&function(t){e.d(n,t,(function(){return o[t]}))}(i);e("b6e6");var r,a=e("f0c5"),l=Object(a["a"])(o["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],r);n["default"]=l.exports},"377e":function(t,n,e){"use strict";e.r(n);var u=e("e3f4"),o=e.n(u);for(var i in u)"default"!==i&&function(t){e.d(n,t,(function(){return u[t]}))}(i);n["default"]=o.a},6200:function(t,n,e){"use strict";var u={tuiListView:function(){return e.e("components/thorui/tui-list-view/tui-list-view").then(e.bind(null,"4562"))},tuiListCell:function(){return e.e("components/thorui/tui-list-cell/tui-list-cell").then(e.bind(null,"6528"))},tuiLoadmore:function(){return e.e("components/thorui/tui-loadmore/tui-loadmore").then(e.bind(null,"8a24"))},tuiNomore:function(){return e.e("components/thorui/tui-nomore/tui-nomore").then(e.bind(null,"f5ec"))},tuiNoData:function(){return e.e("components/thorui/tui-no-data/tui-no-data").then(e.bind(null,"eab0"))}},o=function(){var t=this,n=t.$createElement,e=(t._self._c,t.count>0?t.__map(t.list,(function(n,e){var u=t.__get_orig(n),o=t._f("formatSeconds")(n.usetime),i=t._f("formatDateJoined")(n.date_joined);return{$orig:u,f0:o,f1:i}})):null);t.$mp.data=Object.assign({},{$root:{l0:e}})},i=[];e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return u}))},"9baf":function(t,n,e){},b6e6:function(t,n,e){"use strict";var u=e("9baf"),o=e.n(u);o.a},e3f4:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=e("d652"),o={data:function(){return{pageIndex:1,loadding:!1,pullUpOn:!0,list:[],count:0}},onLoad:function(){this.getAll()},methods:{getAll:function(){var t=this;this.tui.request("/user/wordresultinfo","GET",{page:this.pageIndex}).then((function(n){n.code===u.Config.SUCCESS&&(t.list=t.list.concat(n.results),t.count=n.count,t.pageIndex+=1)}))}},onReachBottom:function(){var t=this;this.pages>=this.pageIndex?(this.loadding=!0,this.pullUpOn=!0,this.getAll()):setTimeout((function(){t.loadding=!1,t.pullUpOn=!1}),1e3)},computed:{pages:function(){return Math.ceil(this.count/10)}}};n.default=o}},[["0287","common/runtime","common/vendor"]]]);