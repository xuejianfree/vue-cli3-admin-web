<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-row>
          <el-col :span="8">
            <el-input v-model="model.username"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="密码">
        <el-row>
          <el-col :span="8">
            <el-input type="text" v-model="model.password"></el-input>
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
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        // 新增和编辑共用Edit组件
        // 有id
        res = await this.$http.put(`rest/admin_users/${this.id}`, this.model);
      } else {
        // 没有id就是新增
        res = await this.$http.post("rest/admin_users", this.model);
      }
      this.$router.push("/admin_users/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/admin_users/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    // 有id说明是点击编辑，才执行
    // 要是编辑分类，就把数据显示在输入框里
    this.id && this.fetch();
  }
};
</script>
