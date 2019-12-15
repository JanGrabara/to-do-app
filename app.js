require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express()
const db = require('./models')
const { sequelize } = require('./models')
const albumsQueue = require('./queues/albumsQueue')

app.use(bodyParser.json());
app.use(cors())

app.post('/login', (req, res) => {
  if (req.body.password == process.env.ADMIN_PASS && req.body.name == process.env.ADMIN_NAME) {
    res.send({ auth_header: process.env.AUTH_HEADER })
  }
  else {
    res.status(400).send('Invalid credentials')
  }
})

app.use(function (req, res, next) {
  if (req.headers.authorization !== process.env.AUTH_HEADER) {
    return res.status(403).json({ error: 'Invalid or missing credentials!' });
  }
  next();
});

function defaultResponse(fun) {
  return (req, res) => fun(req, res).then(response => res.send(response)).catch(err => {
    if (err instanceof Error) {
      err = err.name || err.message
    }
    return res.status(400).send({ error: err })
  })
}

const taskBody = (body) => ({ name: body.name, done: body.done, endDate: body.endDate, categoryId: body.categoryId })

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/tasks', defaultResponse(() => db.Task.findAll()))

app.get('/tasks/:id', defaultResponse(req =>
  db.Task.findByPk(req.params.id, { rejectOnEmpty: true })
))

app.get('/tasks/:id/categories', defaultResponse(async req => {
  task = await db.Task.findByPk(req.params.id, { rejectOnEmpty: true })
  if (task.categoryId) {
    return db.Category.findByPk(task.categoryId)
  } else {
    return 'No category'
  }
}))

app.post('/tasks', defaultResponse(req => {
  return db.Task.create(
    taskBody(req.body)
  )

}
))

app.put('/tasks/:id', defaultResponse(async req => {

  await db.Task.update(
    taskBody(req.body), {
    where: { id: req.params.id }
  })

  return db.Task.findByPk(req.params.id, { rejectOnEmpty: true })
}))

app.delete('/tasks/:id', defaultResponse(async req => {
  task = await db.Task.findByPk(req.params.id, { rejectOnEmpty: true })
  await task.destroy({ force: true })
  return task
}))


const categoryBody = (body) => ({ name: body.name })
app.get('/reports/categories/tasks', defaultResponse(async req => {
  categories = await db.Category.findAll({}, { plain: true }).map(category => category.dataValues)
  tasks = await db.Task.findAll()

  const groupedTasks = await db.Task.findAll({
    group: ['categoryId'],
    attributes: ['categoryId', [sequelize.fn('COUNT', 'categoryId'), 'categoryCount']],
  }, { plain: true })

  return groupedTasks.map(x => {
    const plain = x.dataValues
    if (plain.categoryId) {
      const currentCategory = categories.find(category => category.id == x.categoryId)
      return {
        categoryId: plain.categoryId,
        "categoryName": currentCategory.name,
        "taskCount": plain.categoryCount
      }
    } else {
      return {
        "categoryId": null,
        "categoryName": 'Brak kategori',
        "taskCount": plain.categoryCount
      }
    }
  })
}))

app.get('/categories', defaultResponse(() => db.Category.findAll()))

app.get('/categories/:id', defaultResponse(req =>
  db.Category.findByPk(req.params.id, { rejectOnEmpty: true })
))

app.get('/categories/:id/tasks', defaultResponse(async req => {
  const category = await db.Category.findByPk(req.params.id, { rejectOnEmpty: true })
  return category.getTasks()
}))

app.post('/categories', defaultResponse(req =>
  db.Category.create(
    categoryBody(req.body)
  )
))

app.put('/categories/:id', defaultResponse(async req => {

  await db.Category.update(
    categoryBody(req.body), {
    where: { id: req.params.id }
  })

  return db.Category.findByPk(req.params.id, { rejectOnEmpty: true })
}))

app.delete('/categories/:id', defaultResponse(async req => {
  category = await db.Category.findByPk(req.params.id, { rejectOnEmpty: true })
  await category.destroy({ force: true })
  return category
}))

app.get('/imports/create', (req, res) => {
  albumsQueue.add({url: 'https://jsonplaceholder.typicode.com/albums'})
  return res.send({status: 'done'})
})

app.get('/imports', defaultResponse(() => db.Import.findAll()))

const port = process.env.PORT || 4000
const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))
module.exports = server;
