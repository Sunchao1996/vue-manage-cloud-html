<template>
  <div class="app-container">
    <el-row>
      <el-col :offset="6" :span="12">
        <el-form ref="roleUpdateForm" :label-position="labelPosition" label-width="100px" :model="formData">
          <el-form-item label="角色名称" prop="roleName" :rules="formRules.roleName" >
            <el-input v-model="formData.roleName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="角色代码" prop="roleCode" :rules="formRules.roleCode">
            <el-input v-model="formData.roleCode"></el-input>
          </el-form-item>
          <el-form-item label="是否启用">
            <el-col :span="20">
              <el-radio v-model="formData.roleStatus" :label="0">启用</el-radio>
              <el-radio v-model="formData.roleStatus" :label="1">禁用</el-radio>
            </el-col>
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
  import {getRole, checkRoleCode, updateRole} from '@/api/roles';
  import {resourcesList} from '@/api/resources';
  import {Message} from 'element-ui';

  export default {
    name: "RolesAdd",
    data() {
      const vm = this;
      const validRoleCode = (rule, value, callback) => {
        if (vm.formData.oldRoleCode !== undefined && value !== vm.formData.oldRoleCode) {
          checkRoleCode(value).then(res => {
            if (res.data === false) {
              callback(new Error('代码已经存在'));
            } else {
              callback();
            }
          }).catch(e => {
            callback(new Error('校验失败~'))
          });
        } else {
          callback();
        }
      };
      return {
        labelPosition: 'right',
        getInfoF: true,
        formData: {
          roleName: '',
          roleCode: '',
          roleStatus: 0,
          resourcesIds: '',
          checkResourcesIds: [],
          oldRoleCode: ''
        },
        formRules: {
          roleName: [
            {required: true, message: '角色名称不能为空!'}
          ],
          roleCode: [
            {required: true, message: '角色代码不能为空!'},
            {validator: validRoleCode, trigger: 'blur'}
          ]
        }
      }
    },
    watch: {},
    created() {
      const id = this.$route.params.id;
      getRole(id).then((res) => {
        this.formData = Object.assign({}, this.formData, res.data);
        this.formData.oldRoleCode = this.formData.roleCode;
      }).catch(error => {
        Message({
          type: 'error',
          message: '获取数据错误~',
          duration: 5000
        });
        this.getInfoF = false;
      });
    },
    methods: {
      goBack: function () {
        this.$router.go(-1);
      },
      submitForm() {
        console.log("submit");
        this.$refs['roleUpdateForm'].validate((valid) => {
          if (valid && this.getInfoF) {
            this.formData.resourcesIds = this.formData.checkResourcesIds.join('@');
            this.formData = Object.assign({},this.formData,{roletType:1})
            updateRole(this.formData).then(() => {
              this.$router.replace({name: 'Roles'});
            }).catch(error => {
              console.log('更新角色失败');
            });
          } else {
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
