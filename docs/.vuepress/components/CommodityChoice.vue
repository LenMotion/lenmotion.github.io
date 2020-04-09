<template>
  <div class="commodity-choice">
    <el-dialog
      title="选择商品"
      :visible.sync="visible"
      :close-on-click-modal="false"
      top="30px"
      @close="closeChoice()"
      width="1200px"
    >
      <el-row :gutter="20">
        <el-col :span="6" v-if="showCategory" class="commodity-list">
          <el-form :inline="true" size="mini">
            <el-form-item label="">
              <el-input
                v-model="categoryFilterText"
                placeholder="请输入类别"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchCategory">搜索</el-button>
            </el-form-item>
          </el-form>
          <el-tree
            :data="viewData.categoryTree"
            :props="defaultProps"
            ref="categoryTree"
            highlight-current
            @node-click="handleNodeClick"
            :filter-node-method="filterNode"
          ></el-tree>
        </el-col>
        <el-col :span="showCategory ? 18 : 24" class="commodity-list">
          <el-form :inline="true" :model="queryData" size="mini">
            <el-form-item label="商品名称:">
              <el-input
                v-model="queryData.commodityName"
                placeholder="请输入商品名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品编码:">
              <el-input
                v-model="queryData.commodityCode"
                placeholder="请输入商品编码"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="queryGoods(1, 10)"
                >查询</el-button
              >
            </el-form-item>
          </el-form>
          <el-table :data="viewData.goodsList" border>
            <el-table-column type="index" width="40"></el-table-column>
            <el-table-column
              prop="categoryName"
              label="所属分类"
              width="145"
            ></el-table-column>
            <el-table-column
              prop="commodityCode"
              label="商品编码"
              width="135"
            ></el-table-column>
            <el-table-column
              prop="commodityName"
              label="商品名称"
            ></el-table-column>
            <el-table-column label="操作" width="70">
              <template slot-scope="prop">
                <el-link
                  type="info"
                  disabled=""
                  v-if="choiceCodeList.indexOf(prop.row.commodityCode) > -1"
                  >已选择
                </el-link>
                <el-link
                  type="primary"
                  @click="choiceCommodity(prop.row)"
                  v-else
                  >选择
                </el-link>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            style="margin-top: 10px; float: right;"
            background
            small
            layout="total, prev, pager, next, jumper"
            :current-page.sync="queryData.pageNum"
            @current-change="queryGoods"
            :total="viewData.goodsTotal"
          >
          </el-pagination>
          <div style="clear: both;"></div>
        </el-col>
      </el-row>

      <div v-if="choiceType == 2" class="choice-div">
        <el-card class="box-card">
          <div slot="header">
            <span>选中的商品</span>
          </div>
          <el-table :data="viewData.choiceList" border>
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column
              v-for="item in choiceTableRow"
              :key="item.prop"
              :prop="item.prop"
              :label="item.label"
            >
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="prop">
                <slot
                  name="opt-remove"
                  :commodity="prop.row"
                  :index="prop.$index"
                  :choiceList="viewData.choiceList"
                >
                  <el-link
                    type="danger"
                    size="mini"
                    @click="removeCommodity(prop.$index)"
                    >删除</el-link
                  >
                </slot>
                <slot
                  name="opt"
                  :commodity="prop.row"
                  :index="prop.$index"
                  :choiceList="viewData.choiceList"
                >
                </slot>
              </template>
            </el-table-column>
          </el-table>
          <div class="confirm-div" v-if="confirm">
            <el-button size="small" @click="cencelChoice">取消</el-button>
            <el-button size="small" type="primary" @click="confirmChoice"
              >确定</el-button
            >
          </div>
        </el-card>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "commodityChose",
  data() {
    return {
      queryData: {
        pageNum: 1,
        pageSize: 10,
        commodityCode: "",
        commodityName: "",
        categoryCode: "",
      },
      defaultProps: {
        children: "productCategorys",
        label: "categoryName",
      },
      viewData: {
        categoryTree: [],
        goodsList: [],
        goodsTotal: 0,
        choiceList: [],
      },
      choiceCodeList: [],
      categoryFilterText: "",
      defaultProp: {
        commodityCode: "commodityCode",
        commodityName: "commodityName",
        categoryCode: "categoryCode",
        categoryName: "categoryName",
      },
      defaultTableRow: [
        { prop: "categoryName", label: "分类名称" },
        { prop: "commodityCode", label: "商品编码" },
        { prop: "commodityName", label: "商品名称" },
      ],
      choiceTableRow: [],
    };
  },
  props: {
    // 是否显示分类
    showCategory: {
      type: Boolean,
      default: true,
    },
    // 选择方式 1单选 2多选
    choiceType: {
      type: Number,
      default: 1,
    },
    // 是否显示确认按钮组
    confirm: {
      type: Boolean,
      default: true,
    },
    // 默认选中的商品列表
    commodityList: {
      type: Array,
      default: [],
    },
    // 返回的内容做处理
    prop: {
      type: Object,
      default: () => {
        return {}
      },
    },
    // 最大选择数量
    maxChoice: {
      type: Number,
      default: 0,
    },
    choiceTableHeader: {
      type: Array,
      default: () => {
        return [0, 1, 2]
      },
    },
    // 显示弹框
    visible: {
      type: Boolean,
      default: false,
    },
    // 校验商品，有确认按钮时做处理
    checkCommodity: {
      type: Function,
      default: (commodityList) => {
        return Promise.resolve();
      },
    },
    checkCommoditySingle: {
      type: Function,
      default: (commodityInfo) => {
        return Promise.resolve();
      },
    },
  },
  methods: {
    // 查询分类
    queryCategory() {
      var load = this.getLoading(".commodity-choice");
      this.axios.get(this.api.commodity.category).then((res) => {
        load.close();
        // res = this.initCategory(res);
        // console.log(res);
        this.viewData.categoryTree = res;
      });
    },
    initCategory(list) {
      if (list) {
        for (let i in list) {
          list[i] = this.paramsClear(list[i]);
          if (list[i].productCategorys) {
            list[i].productCategorys = this.initCategory(
              list[i].productCategorys
            );
          }
        }
      }
      return list;
    },
    // 分类节点点击后的操作
    handleNodeClick(data) {
      this.queryData.categoryCode = data.categoryCode;
      this.queryGoods();
    },
    // 查询商品
    queryGoods(pageNum, pageSize) {
      let qData = this.queryData;
      // 分页信息
      const pageIfon = {
        pageNum: pageNum ? pageNum : qData.pageNum,
        pageSize: pageSize ? pageSize : qData.pageSize,
      };
      // 生成url
      let url = this.api.commodity.list + "?" + this.jsonToParams(pageIfon);
      // 查询
      var load = this.getLoading(".commodity-choice");
      this.axios.post(url, qData).then((res) => {
        load.close();
        this.viewData.goodsTotal = res ? res.total : 0;
        this.viewData.goodsList = res ? res.result : [];
      });
    },
    // 处理商品数据，按照prop设置后的效果返回
    handleCommodityInfo(commodity) {
      let commodityInfo = {};
      for (let key in this.defaultProp) {
        commodityInfo[this.defaultProp[key]] = commodity[key];
      }
      return commodityInfo;
    },
    // 处理商品列表
    handleCommodityList(commodityList) {
      let commodityListInfo = [];
      for (let i in commodityList) {
        commodityListInfo.push(this.handleCommodityInfo(commodityList[i]));
      }
      return commodityListInfo;
    },
    // 将用户给的商品数据按照prop转换为commodity数据
    transitionCommodityList(commodityList) {
      let list = [];
      for (let i in commodityList) {
        let item = commodityList[i];
        let commodityInfo = {};
        for (let key in this.defaultProp) {
          commodityInfo[key] = item[this.defaultProp[key]];
        }
        list.push(commodityInfo);
      }
      return list;
    },
    // 选中商品的时间
    choiceCommodity(commodity) {
      // 单选
      if (this.choiceType == 1) {
        const result = this.handleCommodityInfo(commodity);
        this.checkCommoditySingle(result)
          .then((_) => {
            this.clearChoice();
            this.$emit("choice-single", result);
          })
          .catch((error) => {
            console.log("校验失败！");
          });
      }
      // 多选
      else if (this.choiceType == 2) {
        // 如果设置了最多允许多选的选择数量
        if (
          this.maxChoice > 0 &&
          this.choiceCodeList.length >= this.maxChoice
        ) {
          return this.$message.error(`最多只能选择${this.maxChoice}个商品!`);
        }
        const result = this.handleCommodityInfo(commodity);
        this.checkCommoditySingle(result)
          .then((_) => {
            this.choiceCodeList.push(commodity.commodityCode);
            this.viewData.choiceList.push(Object.assign({}, commodity));
          })
          .catch((error) => {
            console.log("校验失败！");
          });
        // 如果不是确认模式，那么就需要点击选择后响应数据给父组件
        if (!this.confirm) {
          this.confirmChoice();
        }
      }
    },
    // 确认按钮
    confirmChoice() {
      const commodityList = this.handleCommodityList(this.viewData.choiceList);
      this.checkCommodity(commodityList)
        .then((res) => {
          this.$emit("choice-list", commodityList);
          this.clearChoice();
        })
        .catch((error) => {
          console.log("校验失败！");
        });
    },
    // 默认的移除商品处理时间
    removeCommodity(index) {
      this.choiceCodeList.splice(index, 1);
      this.viewData.choiceList.splice(index, 1);
    },
    // 搜索分类
    searchCategory() {
      this.$refs.categoryTree.filter(this.categoryFilterText);
    },
    // 过滤分类的方式
    filterNode(value, data) {
      return data.categoryName.indexOf(value) !== -1;
    },
    // 取消选择
    cencelChoice() {
      this.clearChoice();
      this.$emit("choice-cancel");
    },
    closeChoice() {
      this.$emit("update:visible", false);
    },
    // 清除已选择的商品
    clearChoice() {
      this.closeChoice()
      this.viewData.choiceList = [];
      this.choiceCodeList = [];
    },
  },
  mounted() {
    this.queryCategory();
  },
  watch: {
    visible(val, oldVal) {
      // this.$emit("update:visible", val);
      // 显示选择商品组件
      if (val) {
        // 设置默认的prop
        this.defaultProp = Object.assign(this.defaultProp, this.prop);
        // 查询商品，默认设置到第一页
        this.queryData.pageNum = 1;
        this.queryGoods();
        // 转换用户传过来的商品信息
        this.viewData.choiceList = this.transitionCommodityList(
          this.commodityList
        );
        // 选中的商品code
        this.choiceCodeList = [];
        for (let i in this.viewData.choiceList) {
          this.choiceCodeList.push(this.viewData.choiceList[i].commodityCode);
        }
        // 设置需要显示的选中table列
        this.choiceTableRow = [];
        for (let i in this.choiceTableHeader) {
          this.choiceTableRow.push(
            this.defaultTableRow[this.choiceTableHeader[i]]
          );
        }
      }
    },
  },
};
</script>

<style>
.commodity-choice .confirm-div {
  width: 100%;
  text-align: right;
  margin-top: 15px;
}
.commodity-choice .choice-div {
  margin-top: 20px;
}
.commodity-choice .commodity-list {
  max-height: 680px;
  overflow: auto;
}
.commodity-choice .el-table td,
.commodity-choice .el-table th {
  padding: 8px 0;
}
.commodity-choice .el-dialog__body {
  padding: 0px 20px 20px;
}
.commodity-choice .el-card__header {
  padding: 10px 20px;
}
</style>
