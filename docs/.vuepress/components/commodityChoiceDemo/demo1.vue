<template>
  <div>
    <!-- demo 1 单选商品 -->
    <el-button size="mini" @click="visible = true">测试单选</el-button>
    <commodity-choice
      :visible.sync="visible"
      :commodity-list="[result]"
      :choice-table-header="[1,2]"
      @choice-single="choiceActoin"
    ></commodity-choice>
    <span>{{ JSON.stringify(result) }}</span>
  </div>
</template>

<script>
export default {
  name: 'commodityChoiceDemo1',
  data() {
    return {
      visible: false,
      result: {}
    }
  },
  methods: {
    choiceActoin(info) {
      this.result = info
    }
  }
}
</script>

