<template>
  <div class="app-container">
    <div style="margin: 20px;"></div>
    <el-row>
      <el-col :span="5">名称:
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="searchData.foodName"
          name="foodName"
          :style="{width:160+'px'}">
        </el-input>
      </el-col>
      <el-col :span="5">所属标签:
        <el-autocomplete
          v-model="searchData.foodTabName"
          :fetch-suggestions="foodTabQuerySearchAsync"
          placeholder="请输入内容"
          @select="foodTabSelect"
          :style="{width:160+'px'}"
        >
          <template slot-scope="{ item }">
            <div class="name">{{ item.tabName }}</div>
          </template>
        </el-autocomplete>
      </el-col>
      <el-col :span="5">状态:
        <el-select v-model="searchData.foodStatus" placeholder="请选择" :style="{width:160+'px'}">
          <el-option
            :key="-1"
            label="全部"
            value="">
          </el-option>
          <el-option
            :key="0"
            label="正常"
            :value="0">
          </el-option>
          <el-option
            :key="1"
            label="锁定"
            :value="1">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="9">
        <el-button type="primary" @click.native="handleCurrentChange(1)">查询</el-button>
        <el-button type="success" @click.native="addFood">新增</el-button>
      </el-col>
    </el-row>
    <div style="margin: 20px;"></div>
    <el-row>
      <el-col :span="24">
        <template>
          <el-table :border="true"
                    :data="tableData"
                    style="width: 100%"
                    :row-class-name="tableRowClassName">
            <el-table-column align="center"
                             prop="foodName"
                             label="名称"
            >
            </el-table-column>
            <el-table-column align="center"
                             prop="foodTabName"
                             label="所属标签"
            >
            </el-table-column>
            <el-table-column align="center"
                             prop="foodImg"
                             label="图片"
            >
              <template slot-scope="scope">
                <div class="avatar-wrapper">
                  <a target="_blank" :href="scope.row.foodImg+'?imageView2/1/w/80/h/80'"><img
                    :src="scope.row.foodImg+'?imageView2/1/w/80/h/80'" class="user-avatar"></a>
                </div>

              </template>
            </el-table-column>
            <el-table-column align="center"
                             prop="foodStatus"
                             label="状态"
            >
              <template slot-scope="scope">
                <el-tag v-if="scope.row.foodStatus===0" type="success">正常</el-tag>
                <el-tag v-else type="danger">禁用</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center"
                             prop="foodOrder"
                             label="顺序"
            >
            </el-table-column>
            <el-table-column align="center"
                             prop="foodPrice"
                             label="价格"
            >
            </el-table-column>
            <el-table-column align="center"
                             prop="foodNum"
                             label="数量"
            >
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <!--<el-button-->
                <!--size="mini"-->
                <!--@click.native="updateUser(scope.row.id)"-->
                <!--&gt;修改-->
                <!--</el-button>-->
                <el-button
                  size="mini"
                  type="danger"
                  @click.native="delFood(scope.row.id)"
                >删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-col>
    </el-row>
    <el-row>
      <el-pagination
        :background="true"
        @size-change="pageSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="searchData.pageIndex"
        :page-size="searchData.pageSize"
        :page-sizes="[10,20,30,40]"
        layout="total,sizes, prev, pager, next"
        :total="searchData.total">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
  import {listFood, delFood} from '@/api/wx/food';
  import {foodTabAll} from '@/api/wx/foodtab';
  import {Message, MessageBox} from 'element-ui';

  export default {
    name: "Food",
    data() {
      return {
        foodTabs: [],
        timeout: null,
        tableData: [],
        searchData: {
          foodName: '',
          foodTab: '',
          foodTabName: '',
          foodStatus: '',
          pageIndex: 1,
          pageSize: 20,
          total: 0
        }
      }
    },
    created() {
      listFood().then((res) => {
        this.$store.dispatch('delRegexView', '/wx/food');
        this.tableData = res.data.data;
        this.searchData.total = res.data.total;
        this.searchData.pageIndex = res.data.pageIndex;
        this.searchData.pageSize = res.data.pageSize;
      });
      foodTabAll().then(res => {
        this.foodTabs = res.data;
      }).catch(err => {
        this.formSubmit = false;
      });
    },
    methods: {
      pageSizeChange(pageSize) {
        this.searchData.pageIndex = 1;
        this.searchData.pageSize = pageSize;
        listFood(this.searchData).then(res => {
          this.tableData = res.data.data;
          this.searchData.total = res.data.total;
          this.searchData.pageIndex = res.data.pageIndex;
          this.searchData.pageSize = res.data.pageSize;
        });
      },
      addFood() {
        const route = this.$route;
        this.$router.push({name: 'FoodsAdd'});
        this.$store.dispatch('delView', route);
      },
      foodTabQuerySearchAsync(query, cb) {
        let foodTabsQuery = this.foodTabs;
        let results = query ? foodTabsQuery.filter(this.createStateFilter(query)) : foodTabsQuery;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 1000 * Math.random());
      },
      foodTabSelect(item) {
        this.searchData.foodTabName = item.tabName;
        this.searchData.foodTab = item.id;
      },
      createStateFilter(query) {
        return (state) => {
          return state.tabName.indexOf(query) > -1;
        }
      },
      handleCurrentChange: function (index) {
        if (index === 1) {
          this.searchData.pageIndex = 1;
        }
        listFood(this.searchData).then(res => {
          this.tableData = res.data.data;
          this.searchData.total = res.data.total;
          this.searchData.pageIndex = res.data.pageIndex;
          this.searchData.pageSize = res.data.pageSize;
        });
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      delFood(id) {
        this.$confirm('此操作将永久删除该记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delFood(id).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.$router.replace({path: '/wx/foods/index', query: {v: (new Date()).getTime()}});
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .avatar-wrapper {
    border-radius: 0px !important;
    height: 26px;
    margin-right: 30px;
    cursor: pointer;
    position: relative;
    .user-avatar {
      width: 25px;
      height: 25px;
      border-radius: 10px;
    }
  }
</style>
