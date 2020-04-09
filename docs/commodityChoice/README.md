
普通单选
---
<el-card>
<commodityChoiceDemo-demo1></commodityChoiceDemo-demo1>
``` html
<commodity-choice
  :visible.sync="visible"
  :commodity-list="[result]"
  @choice-single="choiceActoin"
></commodity-choice>
```
</el-card>

普通多选
---
<el-card style="margin-top: 20px;">
<commodityChoiceDemo-demo2></commodityChoiceDemo-demo2>
``` html
<commodity-choice
  :choice-type="2"
  :visible.sync="visible"
  :commodity-list="result"
  @choice-list="choiceActoin"
></commodity-choice>
```
</el-card>

设置最大多选，设置选中显示列
---
<el-card style="margin-top: 20px;">
<commodityChoiceDemo-demo3></commodityChoiceDemo-demo3>
``` html
<commodity-choice
  :choice-type="2"
  :visible.sync="visible"
  :max-choice="maxChoice"
  :commodity-list="result"
  :choice-table-header="[1,2]"
  @choice-list="choiceActoin"
></commodity-choice>
```
</el-card>

设置自定义返回数据格式
---
<el-card style="margin-top: 20px;">
<commodityChoiceDemo-demo4></commodityChoiceDemo-demo4>
``` html
<commodity-choice
  :visible.sync="visible"
  :commodity-list="[result]"
  @choice-single="choiceActoin"
  :prop="prop"
></commodity-choice>
```
``` html
prop: {
  commodityCode: 'goodsCode',
  commodityName: 'goodsName',
  commodityPrice: 'commodityPrice',
  a: 'a'
}
```
</el-card>

多选校验，成功后关闭选中框
---
<el-card style="margin-top: 20px;">
<commodityChoiceDemo-demo5></commodityChoiceDemo-demo5>
``` html
<commodity-choice
  :choice-type="2"
  :visible.sync="visible"
  :commodity-list="result"
  :confirm="confirm"
  :check-commodity="checkCommodity"
></commodity-choice>
```
``` html
checkCommodity(list) {
  if (list.length % 2 == 1) {
    this.result = list;
    return Promise.resolve();
  } else {
    return Promise.reject()
  }
}
```
</el-card>

单选校验，成功后关闭选中框
---
<el-card style="margin-top: 20px;">
<commodityChoiceDemo-demo6></commodityChoiceDemo-demo6>
``` html
  <commodity-choice
    :visible.sync="visible"
    :commodity-list="[result]"
    :check-commodity-single="checkCommodity"
  ></commodity-choice>
```
``` html
checkCommodity(commodityInfo) {
  // 校验成功
  // return Promise.resolve();
  // 校验失败
  // return Promise.reject()
}
```
</el-card>

自定义选中列表操作栏，保留默认删除按钮
---
<el-card style="margin-top: 20px;">
<commodityChoiceDemo-demo7></commodityChoiceDemo-demo7>
``` html
  <commodity-choice
    :choice-type="2"
    :visible.sync="visible"
    :commodity-list="result"
  >
    <template slot="opt" slot-scope="scope">
      <span>这是我自定义的操作，当前商品信息：{{scope.commodity.commodityCode}}，下标：{{scope.index}}</span>
    </template>
  </commodity-choice>
```
</el-card>

自定义选中列表操作栏，去除默认删除按钮
---
<el-card style="margin-top: 20px;">
<commodityChoiceDemo-demo8></commodityChoiceDemo-demo8>
``` html
  <commodity-choice
    :choice-type="2"
    :visible.sync="visible"
    :commodity-list="result"
  >
    <template slot="opt-remove" slot-scope="scope">
      <span>这是我自定义的操作，当前商品信息：{{scope.commodity.commodityCode}}，下标：{{scope.index}}</span>
    </template>
  </commodity-choice>
```
</el-card>

Attributes 
---
| 参数           | 说明                                                                                    | 类型       |  可选值  | 默认 |
| :----          | --------------------------------------------------------------------------------------  |  ------- | -------- | -----  |
| visible | 显示商品选择弹出框，支持`.sync` | Boolean | - | false | 
| show-category  | 是否显示分类 | Boolean | - | true |
| choice-type    | 选择类型：1单个商品选择；2多个商品选择 | Number | 1:单选<br/>2:多选 | 1    |
| confirm        | 当choice-type为2此属性生效<br/>true：会显示确认与取消按钮<br/>false：不会显示确认与取消按钮  | Boolean | - | true |
| commodity-list | 默认选中的商品信息，Commodity请参考下面，非必须参数<br/>[查看Commodity](#commodity) | Array   | - | [] |
| max-choice     | 最大选择的商品个数，choice-type=2并且大于0生效 | Number | >=0 | 0 |
| prop           | 更改商品属性名称，如你需要将commodityCode改为goodsCode<br/>详情见下方Prop，也能增加自己的属性[查看Props](#props)  | Object  | - | {} |
| choice-table-header | 选中的显示的table信息<br/>0-1-2分别对应：分类名称、商品名称、商品编码 | Array | [0,1,2] | [0,1,2] |
| check-commodity | 点击确认按钮做商品校验操作<br/>可以不再处理choice-list事件 | Function | - | ([list]) => {<br/> return Promise.resolve(); } |
| check-commodity-single | 点击商品列表页的选择按钮做校验操作<br/>可以不再处理choice-single事件 | Function | - | (info) => {<br/> return Promise.resolve(); } |

Events 
---
| 方法名             | 说明                                                                                   | 参数   |
| :----             | -------------------------------------------------------------------------------------- |  -------  |
| choice-single   | 单个选择后的响应事件，choice-type为1响应此事件                                        | Function(Commodity) |
| choice-list     | 多个选择后的响应事件，choice-type为2响应此事件<br>confirm：true，那么会显示确认与取消按钮，点击确定按钮才会响应此事件<br/>false，不会显示确认与取消按钮，点击商品列表的选择按钮会响应此事件| Function([Commodity]) |
| choice-cancel   | choice-type为2，并且confirm为true，才会显示此按钮，做取消选择事件处理<br/>如关闭选择商品页面 | Function() |

Commodity 
---
| 参数             | 说明                         | 类型     |
| :----            | --------------------------- |  ------- |
| commodityCode  | 商品编码                     | String |
| commodityName  | 商品名称                     | String |
| categoryName   | 分类名称                     | String |
| categoryCode   | 分类编码                     | String |


Props 
---
| 参数             | 说明                         | 默认     |
| :----            | --------------------------- |  ------- |
| commodityCode  | 商品编码                     | commodityCode |
| commodityName | 商品名称                     | commodityName |
| categoryName   | 分类名称                     | categoryName |
| categoryCode   | 分类编码                     | categoryCode |

如果需要增加其他参数返回，请配置在prop里面即可

Slots 
---
| 名称             | 说明                                                               | 属性 |
| :----            | ---------------------------                                       | ---- |
| opt           | 已选列表操作插槽，重写此插槽不会影响原有的删除按钮  | commodity: Commodity，index: Number |
| opt-remove    | 已选列表操作插槽，重写此插槽会去掉默认的删除按钮    | commodity: Commodity，index: Number |