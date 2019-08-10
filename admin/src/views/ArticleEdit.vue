<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-row>
          <el-col :span="8">
            <el-select v-model="model.categories" multiple>
              <el-option v-for="item in categories" :key="item._id"
              :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="标题">
        <el-row>
          <el-col :span="8">
            <el-input v-model="model.title" placeholder="请输入文章标题"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor v-model="model.body"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  props: {
    // 接收url里的id参数
    id: {}
  },
  components: {
    VueEditor
  },
  data() {
    return {
      model: {},
      categories: []
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        // 新增和编辑共用Edit组件
        // 有id
        res = await this.$http.put(`rest/articles/${this.id}`, this.model);
      } else {
        // 没有id就是新增
        res = await this.$http.post("rest/articles", this.model);
      }
      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    }
  },
  created() {
    this.fetchCategories();
    // 有id说明是点击编辑，才执行
    // 要是编辑分类，就把数据显示在输入框里
    this.id && this.fetch();
  }
};
</script>
