<template>
  <div>
    <!-- demo 1 单选商品 -->
    <el-button size="mini" @click="visible = true">测试单选</el-button>
    <commodity-choice
      :visible.sync="visible"
      :commodity-list="[result]"
      @choice-single="choiceActoin"
      :prop="prop"
    ></commodity-choice>
    <span>{{ JSON.stringify(result) }}</span>
  </div>
</template>

<script>
export default {
  name: "commodityChoiceDemo1",
  data() {
    return {
      visible: false,
      result: {},
      prop: {
        commodityCode: "goodsCode",
        commodityName: "goodsName",
        commodityPrice: "commodityPrice",
        a: "a"
      },
    };
  },
  methods: {
    choiceActoin(info) {
      this.result = info;
      console.log(info)
    },
  },
};
</script>
