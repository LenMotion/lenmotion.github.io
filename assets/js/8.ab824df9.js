(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{414:function(e,i,t){"use strict";t.r(i);var o={name:"commodityChoiceDemo1",data:function(){return{visible:!1,result:[],maxChoice:2}},methods:{choiceActoin:function(e){this.result=e}}},c=t(47),n=Object(c.a)(o,(function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("div",[t("el-form",{attrs:{inline:!0,size:"mini"}},[t("el-form-item",{attrs:{label:"最大可选"}},[t("el-input",{model:{value:e.maxChoice,callback:function(i){e.maxChoice=i},expression:"maxChoice"}})],1),e._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:function(i){e.visible=!0}}},[e._v("测试多选")])],1)],1),e._v(" "),t("commodity-choice",{attrs:{"choice-type":2,visible:e.visible,"commodity-list":e.result,"max-choice":e.maxChoice,"choice-table-header":[1,2]},on:{"update:visible":function(i){e.visible=i},"choice-list":e.choiceActoin}}),e._v(" "),t("span",[e._v(e._s(JSON.stringify(e.result)))])],1)}),[],!1,null,null,null);i.default=n.exports}}]);