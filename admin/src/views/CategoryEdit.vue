<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-row>
          <el-col :span="8">
            <el-select v-model="model.parent">
              <el-option v-for="item in parents" :key="item._id"
              :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="名称">
        <el-row>
          <el-col :span="8">
            <el-input v-model="model.name" placeholder="请输入内容"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    // 接收url里的id参数
    id: {}
  },
  data() {
    return {
      model: {},
      parents: []
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        // 新增和编辑共用Edit组件
        // 有id
        res = await this.$http.put(`rest/categories/${this.id}`, this.model);
      } else {
        // 没有id就是新增
        res = await this.$http.post("rest/categories", this.model);
      }
      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/categories/${this.id}`);
      this.model = res.data;
    },
    async fetchParents() {
      const res = await this.$http.get(`rest/categories`);
      this.parents = res.data;
    }
  },
  created() {
    this.fetchParents();
    // 有id说明是点击编辑，才执行
    // 要是编辑分类，就把数据显示在输入框里
    this.id && this.fetch();
  }
};
</script>
