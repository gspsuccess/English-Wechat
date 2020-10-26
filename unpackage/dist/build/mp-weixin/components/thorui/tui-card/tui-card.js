(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/thorui/tui-card/tui-card"],{"0430":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={name:"tuiCard",props:{full:{type:Boolean,default:!1},image:{type:Object,default:function(){return{url:"",height:60,width:60,circle:!1}}},title:{type:Object,default:function(){return{text:"",size:30,color:"#7A7A7A"}}},tag:{type:Object,default:function(){return{text:"",size:24,color:"#b2b2b2"}}},header:{type:Object,default:function(){return{bgcolor:"#fff",line:!1}}},border:{type:Boolean,default:!1},index:{type:Number,default:0}},methods:{handleClick:function(){this.$emit("click",{index:this.index})},longTap:function(){this.$emit("longclick",{index:this.index})}}};e.default=u},"095b":function(t,e,n){"use strict";n.r(e);var u=n("0430"),c=n.n(u);for(var i in u)"default"!==i&&function(t){n.d(e,t,(function(){return u[t]}))}(i);e["default"]=c.a},"51ce":function(t,e,n){},bb2a:function(t,e,n){"use strict";var u,c=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"b",(function(){return c})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return u}))},cb4a:function(t,e,n){"use strict";var u=n("51ce"),c=n.n(u);c.a},cb55:function(t,e,n){"use strict";n.r(e);var u=n("bb2a"),c=n("095b");for(var i in c)"default"!==i&&function(t){n.d(e,t,(function(){return c[t]}))}(i);n("cb4a");var r,a=n("f0c5"),o=Object(a["a"])(c["default"],u["b"],u["c"],!1,null,"d537b2a6",null,!1,u["a"],r);e["default"]=o.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/thorui/tui-card/tui-card-create-component',
    {
        'components/thorui/tui-card/tui-card-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("cb55"))
        })
    },
    [['components/thorui/tui-card/tui-card-create-component']]
]);
