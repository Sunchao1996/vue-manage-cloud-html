<template>
  <div class="app-container">
    <el-row>
      <el-col :offset="6" :span="18">
        <el-form ref="groupRoleUpdateForm" :label-position="labelPosition" label-width="100px" :model="formData">
          <el-form-item label="角色组名称" prop="roleName" :rules="formRules.roleName">
            <el-input v-model="formData.roleName" :style="{width:240+'px'}"></el-input>
          </el-form-item>
          <el-form-item label="角色组代码" prop="roleCode" :rules="formRules.roleCode">
            <el-input v-model="formData.roleCode" :style="{width:240+'px'}"></el-input>
          </el-form-item>
          <el-form-item label="是否启用">
            <el-radio v-model="formData.roleStatus" :label="0">启用</el-radio>
            <el-radio v-model="formData.roleStatus" :label="1">禁用</el-radio>
          </el-form-item>
          <el-form-item label="拥有角色">
            <el-transfer
              style="text-align: left; display: inline-block"
              filterable
              v-model="checkRole"
              :titles="['未选角色', '已选角色']"
              :button-texts="['-', '+']"
              :format="{
                  noChecked: '${total}',
                  hasChecked: '${checked}/${total}'
                }"
              :data="roleList">
              <span slot-scope="{ option }">{{ option.label }}</span>
            </el-transfer>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">立即更新</el-button>
            <el-button @click="goBack">返回</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {addRole, checkRoleCode, rolesList, getRole,updateRole} from '@/api/roles';
  import {Message} from 'element-ui';

  export default {
    name: "GroupRolesAdd",
    data() {
      const validRoleCode = (rule, value, callback) => {
        if (value === this.oldGroupRoleNameCode) {
          callback();
        }
        checkRoleCode(value).then(res => {
          if (res.data === false) {
            callback(new Error('代码已经存在'));
          } else {
            callback();
          }
        }).catch(e => {
          callback(new Error('校验失败~'))
        });
      };
      return {
        formSubmitFlag: false,
        formItemSize: 'medium',
        labelPosition: 'right',
        roleList: [],
        checkRole: [],
        oldGroupRoleNameCode: "",
        formData: {
          roleName: '',
          roleCode: '',
          roleStatus: 0,
          roleType: 2,
          roleIds: ""
        },
        formRules: {
          roleName: [
            {required: true, message: '角色组名称不能为空!'}
          ],
          roleCode: [
            {required: true, message: '角色组代码不能为空!'},
            {validator: validRoleCode, trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      const _this = this;
      const route = this.$route;
      rolesList().then(res => {

        if (res.data.length != 0) {
          for (let i of res.data) {
            _this.roleList.push({
              key: i.id + '',
              label: i.roleName
            })
          }
        }
        console.log('roleList', _this.roleList);
        getRole(route.params.id).then(res => {
          _this.formSubmitFlag = true;
          _this.formData = Object.assign({}, _this.formData, res.data);
          _this.oldGroupRoleNameCode = _this.formData.roleCode;
          if (res.data.roleIds.length > 0) {
            _this.formData.roleIds = res.data.roleIds.substr(0, res.data.roleIds.length - 1);
          }
          console.log('getRole', _this.formData.roleIds.split('@'));
          _this.checkRole.push(..._this.formData.roleIds.split('@'));
        }).catch(err => {
          _this.formSubmitFlag = false
        });
      });
    },
    watch: {
      checkRole: function (newValue, oldValue) {
        console.log("watchRole", newValue, oldValue);
        this.formData.roleIds = newValue.join("@");
      }
    },
    methods: {
      goBack: function () {
        this.$router.go(-1);
      },
      submitForm() {
        this.$refs['groupRoleUpdateForm'].validate((valid) => {
          if (valid) {
            updateRole(this.formData).then(() => {
              this.$router.replace({name: 'GroupRole'});
            }).catch(error => {
              console.log('更新角色失败');
            });
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
