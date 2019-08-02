module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true
  })
  
  // 创建新增
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 编辑后更新
  router.put('/:id', async (req, res) => {
    const updata = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(updata)
  })
  // 删除
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })
  // 查询
  router.get('/', async (req, res) => {
    let qureyOptions = {}
    if (req.Model.modelName === 'Category') {
      qureyOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(qureyOptions).limit(10)
    res.send(items)
  })
  // 编辑
  router.get('/:id', async (req, res) => {
    const item = await req.Model.findById(req.params.id)
    res.send(item)
  })
  app.use('/admin/api/rest/:resource', async(req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)
}