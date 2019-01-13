<template>
  <div class="app-container">
    <el-row>
      <el-col :offset="6" :span="12">
        <el-form ref="foodTabAddForm" :label-position="labelPosition" label-width="100px" :model="formData">
          <el-form-item label="标签名称" prop="tabName" :rules="formRules.tabName">
            <el-input v-model="formData.tabName"></el-input>
          </el-form-item>

          <el-form-item label="是否启用">
            <el-col :span="20">
              <el-radio v-model="formData.tabStatus" :label="0">启用</el-radio>
              <el-radio v-model="formData.tabStatus" :label="1">禁用</el-radio>
            </el-col>
          </el-form-item>
          <el-form-item label="标签顺序" prop="tabOrder" :rules="formRules.tabOrder">
            <el-input type="number" v-model="formData.tabOrder"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">立即创建</el-button>
            <el-button @click="goBack">返回</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {addFoodTab} from '@/api/wx/foodtab';
  import {Message} from 'element-ui';

  export default {
    name: "RolesAdd",
    data() {
      return {
        labelPosition: 'right',
        formData: {
          tabName: '',
          tabStatus: 0,
          tabOrder:1
        },
        formRules: {
          tabName: [
            {required: true, message: '标签名不能为空!'}
          ],
          tabOrder: [
            {required: true, message: '标签顺序不能为空!'},
          ]
        }
      }
    },
    watch: {},
    methods: {
      goBack: function () {
        this.$router.go(-1);
      },
      submitForm() {
        this.$refs['foodTabAddForm'].validate((valid) => {
          if (valid) {
            addFoodTab(this.formData).then(() => {
              this.$router.replace({name: 'FoodTab'});
            }).catch(error => {
              console.log('添加标签失败');
            });
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
