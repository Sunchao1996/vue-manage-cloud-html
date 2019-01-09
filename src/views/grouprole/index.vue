<template>
  <div class="app-container">
    <el-row>
      <el-col :span="5">角色组名称:
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="searchData.roleName"
          name="roleName"
          :style="{width:140+'px'}">
        </el-input>
      </el-col>
      <el-col :span="5">角色组代码:
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="searchData.roleCode"
          name="roleCode"
          :style="{width:140+'px'}">
        </el-input>
      </el-col>
      <el-col :span="5">角色组状态:
        <el-select v-model="searchData.roleStatus" placeholder="请选择" :style="{width:100+'px'}">
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
            label="禁用"
            :value="1">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="9">
        <el-button type="primary" @click.native="searchList">查询</el-button>
        <el-button type="success" @click.native="groupRoleAddHandler">新增</el-button>
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
                             prop="roleName"
                             label="名称"

            >
            </el-table-column>
            <el-table-column align="center"
                             prop="roleCode"
                             label="代码"

            >
            </el-table-column>
            <el-table-column align="center"
                             prop="roleStatus"
                             label="状态"
            >
              <template slot-scope="scope">
                <el-tag v-if="scope.row.roleStatus===0" type="success">正常</el-tag>
                <el-tag v-else type="danger">禁用</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center"
                             label="拥有角色"

            >
              <template slot-scope="scope">
                <el-popover
                  placement="right"
                  width="280"
                  trigger="click">
                  <el-table :data="scope.row.subRoles">
                    <el-table-column width="150" property="roleName" label="角色名"></el-table-column>
                    <el-table-column width="100" property="roleCode" label="角色代码"></el-table-column>
                  </el-table>
                  <el-button slot="reference">查看</el-button>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click.native="groupRoleUpdate(scope.row)"
                >修改
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click.native="delGroupRole(scope.row)"
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
        @size-change="pageSizeChange"
        @current-change="pageIndexChange"
        :current-page="searchData.pageIndex"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="searchData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="searchData.total">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
  import {groupRoleList} from '@/api/grouprole';
  import {delRole} from '@/api/roles'
  import {Message, MessageBox} from 'element-ui';

  export default {
    name: "GroupRole",
    data() {
      return {
        tableData: [],
        searchData: {
          total: 0,
          roleName: "",
          roleStatus: "",
          roleCode: "",
          pageIndex: 1,
          pageSize: 20
        }
      }
    },
    created() {
      const _this = this;
      groupRoleList().then((res) => {
        _this.$store.dispatch('delRegexView', '/sys/grouprole');
        _this.tableData = res.data.data;
        _this.searchData.pageIndex = res.data.pageIndex
        _this.searchData.pageSize = res.data.pageSize;
        _this.searchData.total = res.data.total;
      })
    },
    methods: {
      pageSizeChange(pageSize) {
        this.searchData.pageIndex = 1;
        this.searchData.pageSize = pageSize;
        const _this = this;
        groupRoleList(this.searchData).then((res) => {
          _this.$store.dispatch('delRegexView', '/sys/grouprole');
          _this.tableData = res.data.data;
          _this.searchData.pageIndex = res.data.pageIndex
          _this.searchData.pageSize = res.data.pageSize;
          _this.searchData.total = res.data.total;
        });
      },
      pageIndexChange(curIndex) {
        this.searchData.pageIndex = curIndex;
        const _this = this;
        groupRoleList(this.searchData).then((res) => {
          _this.$store.dispatch('delRegexView', '/sys/grouprole');
          _this.tableData = res.data.data;
          _this.searchData.total = res.data.total;
        });
      },
      searchList() {
        const _this = this;
        groupRoleList(this.searchData).then((res) => {
          _this.$store.dispatch('delRegexView', '/sys/grouprole');
          _this.tableData = res.data.data;
          _this.searchData.total = res.data.total;
        });
      },
      groupRoleAddHandler() {
        const route = this.$route;
        this.$router.push({name: 'GroupRoleAdd'});
        this.$store.dispatch('delView', route);
      },
      groupRoleUpdate: function (record) {
        const route = this.$route;
        this.$router.push({name: 'GroupRoleUpdate', params: {id: record.id}});
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
      delGroupRole(record) {
        MessageBox.confirm('是否删除角色组?', '删除', {
          callback: (action, instance) => {
            if (action === 'confirm') {
              delRole(record.id).then(() => {
                this.$router.replace({path: '/sys/grouprole/index', query: {v: (new Date()).getTime()}});
              }).catch(() => {
                Message({
                  message: '失败',
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
