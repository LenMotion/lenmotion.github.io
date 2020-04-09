<template>
  <div>
    <!-- demo 1 单选商品 -->
    <el-button size="mini" @click="visible = true">测试多选</el-button>
    <commodity-choice
      :choice-type="2"
      :visible.sync="visible"
      :commodity-list="result"
      @choice-list="choiceActoin"
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
      result: []
    }
  },
  methods: {
    choiceActoin(result) {
      this.result = result
    }
  }
}
</script>

