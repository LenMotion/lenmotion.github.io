<template>
  <div>
    <!-- demo 1 单选商品 -->
    <el-form :inline="true" size="mini">
      <el-form-item label="是否显示确认框">
        <el-button @click="confirm = !confirm">{{confirm == true ? '隐藏' : '显示'}}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="visible = true">测试多选</el-button>
      </el-form-item>
    </el-form>
    
    <commodity-choice
      :choice-type="2"
      :visible.sync="visible"
      :commodity-list="result"
      :confirm="confirm"
      :check-commodity="checkCommodity"
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
      confirm: false
    }
  },
  methods: {
    choiceActoin(result) {
      this.result = result
    },
    checkCommodity(list) {
      if (list.length % 2 == 1) {
        this.result = list;
        return Promise.resolve();
      } else {
        return Promise.reject()
      }
    }
  }
}
</script>

