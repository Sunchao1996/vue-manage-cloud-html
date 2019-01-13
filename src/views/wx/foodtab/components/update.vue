<template>
  <div class="app-container">
    <el-row>
      <el-col :offset="6" :span="12">
        <el-form ref="foodTabUpdateForm" :label-position="labelPosition" label-width="100px" :model="formData">
          <el-form-item label="标签名称" prop="tabName" :rules="formRules.tabName" >
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
            <el-button type="primary" @click="submitForm">立即更新</el-button>
            <el-button @click="goBack">返回</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {getFoodTab,updateFoodTab} from '@/api/wx/foodtab';
  import {Message} from 'element-ui';

  export default {
    name: "FoodTabUpdate",
    data() {
      return {
        labelPosition: 'right',
        getInfoF: true,
        formData: {
          id:null,
          tabName: '',
          tabOrder: '',
          tabStatus: 0,
        },
        formRules: {
          tabName: [
            {required: true, message: '标签名称不能为空!'}
          ],
          tabOrder: [
            {required: true, message: '标签顺序不能为空!'},
          ]
        }
      }
    },
    created() {
      const id = this.$route.params.id;
      getFoodTab(id).then((res) => {
        this.formData = Object.assign({}, this.formData, res.data);
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
        this.$refs['foodTabUpdateForm'].validate((valid) => {
          if (valid && this.getInfoF) {
            updateFoodTab(this.formData).then(() => {
              this.$router.replace({name: 'FoodTab'});
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
