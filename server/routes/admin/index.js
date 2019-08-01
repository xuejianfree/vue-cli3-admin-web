module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const Category = require('../../models/Category')
  // 创建分类接口
  router.post('/categories', async (req, res) => {
    const model = await Category.create(req.body)
    res.send(model)
  })
  // 编辑后更新
  router.put('/categories/:id', async (req, res) => {
    const updata = await Category.findByIdAndUpdate(req.params.id, req.body)
    res.send(updata)
  })
  // 删除分类
  router.delete('/categories/:id', async (req, res) => {
    await Category.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })
  // 查询分类
  router.get('/categories', async (req, res) => {
    const items = await Category.find().limit(10)
    res.send(items)
  })
  // 编辑分类
  router.get('/categories/:id', async (req, res) => {
    const item = await Category.findById(req.params.id)
    res.send(item)
  })
  app.use('/admin/api', router)
}