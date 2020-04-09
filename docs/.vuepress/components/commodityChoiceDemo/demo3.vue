<template>
  <div>
    <!-- demo 1 单选商品 -->
    <el-form :inline="true" size="mini">
      <el-form-item label="最大可选">
        <el-input v-model="maxChoice"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="visible = true">测试多选</el-button>
      </el-form-item>
    </el-form>
    
    <commodity-choice
      :choice-type="2"
      :visible.sync="visible"
      :commodity-list="result"
      :max-choice="maxChoice"
      :choice-table-header="[1,2]"
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
      result: [],
      maxChoice: 2
    }
  },
  methods: {
    choiceActoin(result) {
      this.result = result
    }
  }
}
</script>

