(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{415:function(o,i,e){"use strict";e.r(i);var t={name:"commodityChoiceDemo1",data:function(){return{visible:!1,result:{},prop:{commodityCode:"goodsCode",commodityName:"goodsName",commodityPrice:"commodityPrice",a:"a"}}},methods:{choiceActoin:function(o){this.result=o,console.log(o)}}},c=e(47),n=Object(c.a)(t,(function(){var o=this,i=o.$createElement,e=o._self._c||i;return e("div",[e("el-button",{attrs:{size:"mini"},on:{click:function(i){o.visible=!0}}},[o._v("测试单选")]),o._v(" "),e("commodity-choice",{attrs:{visible:o.visible,"commodity-list":[o.result],prop:o.prop},on:{"update:visible":function(i){o.visible=i},"choice-single":o.choiceActoin}}),o._v(" "),e("span",[o._v(o._s(JSON.stringify(o.result)))])],1)}),[],!1,null,null,null);i.default=n.exports}}]);