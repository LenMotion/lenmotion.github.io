<template>
  <div>
    <!-- demo 1 单选商品 -->
    <el-form :inline="true" size="mini">
      <el-form-item>
        <el-button type="primary" @click="visible = true">测试多选</el-button>
      </el-form-item>
    </el-form>
    
    <commodity-choice
      :choice-type="2"
      :visible.sync="visible"
      :commodity-list="result"
    >
      <template slot="opt" slot-scope="scope">
        <span>这是我自定义的操作，当前商品信息：{{scope.commodity.commodityCode}}，下标：{{scope.index}}</span>
      </template>
    </commodity-choice>
    <span>{{ JSON.stringify(result) }}</span>
  </div>
</template>

<script>
export default {
  name: 'commodityChoiceDemo1',
  data() {
    return {
      visible: false,
      result: [],
    }
  },
  methods: {
    choiceAction(list) {
      this.result = list
    }
  }
}
</script>

