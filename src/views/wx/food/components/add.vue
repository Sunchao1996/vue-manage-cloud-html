<template>
  <div class="app-container">
    <el-row>
      <el-col :offset="5" :span="8">
        <el-form ref="foodsAddForm" :label-position="labelPosition" label-width="100px" :model="formData">
          <el-form-item label="名称" prop="foodName" :rules="formRules.foodName">
            <el-input v-model="formData.foodName"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="foodStatus">
            <el-col>
              <el-radio v-model="formData.foodStatus" :label="0">启用</el-radio>
              <el-radio v-model="formData.foodStatus" :label="1">禁用</el-radio>
            </el-col>
          </el-form-item>
          <el-form-item label="顺序" :rules="formRules.foodOrder" prop="foodOrder">
            <el-input v-model="formData.foodOrder" type="number"></el-input>
          </el-form-item>
          <el-form-item label="标签" prop="foodTab" :rules="formRules.foodTab">
            <el-col>
              <el-select :style="{width:100+'%'}" v-model="formData.foodTab" placeholder="请选择">
                <el-option
                  v-for="item in foodTabs"
                  :key="item.id"
                  :label="item.tabName"
                  :value="item.id">
                  <span style="float: left">{{ item.tabName }}</span>
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="价格" :rules="formRules.foodPrice" prop="foodPrice">
            <el-input v-model="formData.foodPrice"></el-input>
          </el-form-item>
          <el-form-item label="数量" :rules="formRules.foodNum" prop="foodNum">
            <el-input v-model="formData.foodNum" type="number"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload ref="imgUpload"
                       class="upload-demo"
                       action="#"
                       :show-file-list="true"
                       :multiple="false"
                       :before-upload="beforeHandler"
                       :on-remove="removeHandler"
                       :limit="1"
                       :on-success="successHandler"
                       :on-error="errorHandler"
                       :http-request="uploadHandler"
                       :on-exceed="exceedHandler"
                       list-type="picture">
              <el-button size="medium" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
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
  import {addFood} from '@/api/wx/food';
  import {foodTabAll} from '@/api/wx/foodtab';
  import {Message} from 'element-ui';

  export default {
    name: "FoodsAdd",
    data() {
      return {
        foodTabs: [],
        formSubmit: true,
        labelPosition: 'right',
        formData: {
          foodName: '',
          foodStatus: 0,
          foodOrder: 1,
          foodTab: null,
          foodImg: '',
          foodPrice: '',
          foodNum: 999999
        },
        formRules: {
          foodName: [
            {required: true, message: '名称不能为空!'},
          ],
          foodOrder: [
            {required: true, message: '顺序不能为空!'},
          ],
          foodTab: [
            {required: true, message: '所属标签不能为空!'},
          ],
          foodPrice: [
            {required: true, message: '价格不能为空!'},
          ],
          foodNum: [
            {required: true, message: '数量不能为空!'},
          ],
        }
      }
    },
    watch: {},
    created() {
      foodTabAll().then(res => {
        this.foodTabs = res.data;
      }).catch(err => {
        this.formSubmit = false;
      })
    },
    methods: {
      exceedHandler(files,fileList){
        Message({
          message: '请先清除原照片后继续上传',
          type: 'error',
          duration: 3000
        });
      },
      uploadHandler(event){
        // console.log( this.$refs.imgUpload);
        this.$refs.imgUpload.handleSuccess(null,event.file);
      },
      successHandler(response, file, fileList){
        console.log(file);
        let reader = new FileReader();
         reader.readAsDataURL(file.raw);;
         reader.onload = e=>{
           this.formData.foodImg = reader.result;
         };
      },
      errorHandler(err, file, fileList){
        console.log("err");
      },
      removeHandler(file, fileList){
        console.log("remove");
      },
      beforeHandler(file) {
        console.log("beforeHandler");
        return true;
      },
      goBack() {
        this.$router.go(-1);
      },
      submitForm() {
        this.$refs['foodsAddForm'].validate((valid) => {
          if (valid && this.formSubmit) {
            addFood(this.formData).then((res) => {
              this.$router.replace({name: 'Foods'});
            })
          }
        });
      },
    }
  }
</script>

<style scoped>

</style>
