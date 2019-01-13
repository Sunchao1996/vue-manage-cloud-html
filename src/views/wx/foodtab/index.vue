<template>
  <div class="app-container">
    <el-row>
      <el-col :span="5">标签名:
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="searchData.tabName"
          name="userName"
          :style="{width:160+'px'}">
        </el-input>
      </el-col>
      <el-col :span="6">标签状态:
        <el-select v-model="searchData.tabStatus" placeholder="请选择" :style="{width:160+'px'}">
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
      <el-col :span="11">
        <el-button type="primary" @click.native="handleCurrentChange(1)">查询</el-button>
        <el-button type="success" @click.native="addTab">新增</el-button>
      </el-col>
    </el-row>
    <div style="margin: 20px;"></div>
    <el-row>
      <el-col :span="24">
        <template>
          <el-table
            :data="tableData"
            style="width: 100%"
            :row-class-name="tableRowClassName">
            <el-table-column align="center"
                             prop="tabName"
                             label="名称"

            >
            </el-table-column>

            <el-table-column align="center"
                             prop="tabStatus"
                             label="状态"
            >
              <template slot-scope="scope">
                <el-tag v-if="scope.row.tabStatus===0" type="success">正常</el-tag>
                <el-tag v-else type="danger">禁用</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center"
                             prop="tabOrder"
                             label="顺序"

            >
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="updateTab(scope.$index,scope.row)"
                >修改
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="searchData.pageIndex"
        :page-size="searchData.pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total,sizes, prev, pager, next"
        :total="searchData.total">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
  import {foodTabList,delFoodTab} from '@/api/wx/foodtab';
  import {Message, MessageBox} from 'element-ui';

  export default {
    name: "FoodTab",
    data() {
      return {
        searchData:{
          pageIndex:1,
          pageSize:20,
          total:0,
          tabName:'',
          tabStatus:''
        },
        tableData: []
      }
    },
    created() {
      foodTabList(this.searchData).then((res) => {
        this.$store.dispatch('delRegexView', '/wx/foodtab');
        console.log('foodtabdata',res.data);
        this.tableData = res.data.data;
        this.searchData.total = res.data.total;
        this.searchData.pageSize = res.data.pageSize;
        this.searchData.pageIndex=res.data.pageIndex;
      })
    },
    methods: {
      handleCurrentChange(curPageIndex){
        const _this=this;
        if(curPageIndex===1){
          this.searchData.pageIndex= 1;
        }
        foodTabList(_this.searchData).then((res) => {
          _this.$store.dispatch('delRegexView', '/wx/foodtab');
          _this.searchData.total = res.data.total;
          _this.searchData.pageSize = res.data.pageSize;
          _this.searchData.pageIndex=res.data.pageIndex;
          _this.tableData = res.data.data;
        });
      },
      handleSizeChange(pageSize){
        const _this=this;
        _this.searchData.pageIndex=1;
        _this.searchData.pageSize = pageSize;
        foodTabList(_this.searchData).then((res) => {
          _this.$store.dispatch('delRegexView', '/wx/foodtab');
          _this.searchData.total = res.data.total;
          _this.searchData.pageSize = res.data.pageSize;
          _this.searchData.pageIndex=res.data.pageIndex;
          _this.tableData = res.data.data;
        });
      },
      addTab: function () {
        const route = this.$route;
        this.$router.push({name: 'FoodTabAdd'});
        this.$store.dispatch('delView', route);
      },
      updateTab: function (index, record) {
        const route = this.$route;
        this.$router.push({name: 'FoodTabUpdate', params: {id: record.id}});
        this.$store.dispatch('delView', route);
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      handleDelete: function (index, record) {
        MessageBox.confirm('是否删除标签?', '删除', {
          callback: (action, instance) => {
            if (action === 'confirm') {
              delFoodTab(record.id).then(() => {
                this.$router.replace({path: '/wx/foodtab/index', query: {v: (new Date()).getTime()}});
              }).catch(() => {
                Message({
                  message: '操作失败',
                  type: 'error',
                  duration: 5000
                });
              });
            }
          }
        });
      }
    }
  }
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
