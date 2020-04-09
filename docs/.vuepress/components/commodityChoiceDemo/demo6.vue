<template>
  <div>
    <!-- demo 1 单选商品 -->
    <el-form :inline="true" size="mini">
      <el-form-item>
        <el-button type="primary" @click="visible = true">测试单选</el-button>
      </el-form-item>
    </el-form>
    
    <commodity-choice
      :visible.sync="visible"
      :commodity-list="[result]"
      :check-commodity-single="checkCommodity"
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
      result: {},
    }
  },
  methods: {
    checkCommodity(goods) {
      // 校验成功
      // return Promise.resolve();
      // 校验失败
      // return Promise.reject()
    }
  }
}
</script>

