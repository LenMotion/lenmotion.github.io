(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{416:function(i,t,e){"use strict";e.r(t);e(18);var o={name:"commodityChoiceDemo1",data:function(){return{visible:!1,result:[],confirm:!1}},methods:{choiceActoin:function(i){this.result=i},checkCommodity:function(i){return i.length%2==1?(this.result=i,Promise.resolve()):Promise.reject()}}},n=e(47),c=Object(n.a)(o,(function(){var i=this,t=i.$createElement,e=i._self._c||t;return e("div",[e("el-form",{attrs:{inline:!0,size:"mini"}},[e("el-form-item",{attrs:{label:"是否显示确认框"}},[e("el-button",{on:{click:function(t){i.confirm=!i.confirm}}},[i._v(i._s(1==i.confirm?"隐藏":"显示"))])],1),i._v(" "),e("el-form-item",[e("el-button",{attrs:{type:"primary"},on:{click:function(t){i.visible=!0}}},[i._v("测试多选")])],1)],1),i._v(" "),e("commodity-choice",{attrs:{"choice-type":2,visible:i.visible,"commodity-list":i.result,confirm:i.confirm,"check-commodity":i.checkCommodity},on:{"update:visible":function(t){i.visible=t}}}),i._v(" "),e("span",[i._v(i._s(JSON.stringify(i.result)))])],1)}),[],!1,null,null,null);t.default=c.exports}}]);