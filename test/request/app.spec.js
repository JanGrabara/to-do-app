const request = require('supertest')
const { expect } = require('chai')
const auth = 'XYZ'

describe('loading express', () => {
  beforeEach(() => server = require('../../app'))
  afterEach(() => server.close())

  it('secures to api', (done) => {
    request(server)
      .get('/')
      .expect(403, done)
  })

  it('secures to api', (done) => {
    request(server)
      .get('/')
      .set('Authorization', auth)
      .expect(200, done)
  })

  it('404 everything else', (done) => {
    request(server)
      .get('/foo/bar/path')
      .set('Authorization', auth)
      .expect(404, done)
  })
})

describe('tasks', () => {
  beforeEach(() => server = require('../../app'))
  afterEach(() => server.close())

  // nie miałem czasu by zrobic porzadni, by testy szły na innej bazie niz developerskiej wiec robie jeden test by nie zalezal od stanu bazy i tego co ktos w aplikacji wyklikal
  it('full tasks flow', async () => {
    let taskId = null
    await request(server)
      .post('/tasks')
      .set('Authorization', auth)
      .send({
        "name": "Zapłać gaz"
      })
      .expect(200)
      .then(res => {
        const body = res.body
        expect(body.name).to.equal("Zapłać gaz")
        expect(body.id).to.be.a('number')
        taskId = body.id
      }).catch(console.log)

    await request(server)
      .get('/tasks/' + taskId)
      .set('Authorization', auth)
      .expect(200)
      .then(res => {
        const body = res.body
        expect(body.name).to.equal("Zapłać gaz")
        expect(body.id).to.equal(taskId)
      })

    await request(server)
      .get('/tasks')
      .set('Authorization', auth)
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an.instanceof(Array)
        expect(res.body).to.have.length.above(0)
      })

    await request(server)
      .put('/tasks/' + taskId)
      .set('Authorization', auth)
      .send({
        "name": "Zaplac za prad"
      })
      .expect(200)
      .then(res => {
        const body = res.body
        expect(body.name).to.equal("Zaplac za prad")
        expect(body.id).to.eq(taskId)
      }).catch(console.log)

    await request(server)
      .delete('/tasks/' + taskId)
      .set('Authorization', auth)
      .expect(200)

    await request(server)
      .get('/tasks/' + taskId)
      .set('Authorization', auth)
      .expect(400)
  })
})


describe('categories', () => {
  beforeEach(() => server = require('../../app'))
  afterEach(() => server.close())

  // nie miałem czasu by zrobic porzadni, by testy szły na innej bazie niz developerskiej wiec robie jeden test by nie zalezal od stanu bazy i tego co ktos w aplikacji wyklikal
  it('full categories flow', async () => {
    let categoryId = null
    await request(server)
      .post('/categories')
      .set('Authorization', auth)
      .send({
        "name": "Wazne"
      })
      .expect(200)
      .then(res => {
        const body = res.body
        expect(body.name).to.equal("Wazne")
        expect(body.id).to.be.a('number')
        categoryId = body.id
      }).catch(console.log)

    await request(server)
      .get('/categories/' + categoryId)
      .set('Authorization', auth)
      .expect(200)
      .then(res => {
        const body = res.body
        expect(body.name).to.equal("Wazne")
        expect(body.id).to.equal(categoryId)
      })

    await request(server)
      .get('/categories')
      .set('Authorization', auth)
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an.instanceof(Array)
        expect(res.body).to.have.length.above(0)
      })

    await request(server)
      .put('/categories/' + categoryId)
      .set('Authorization', auth)
      .send({
        "name": "Bardzo wazne"
      })
      .expect(200)
      .then(res => {
        const body = res.body
        expect(body.name).to.equal("Bardzo wazne")
        expect(body.id).to.eq(categoryId)
      }).catch(console.log)

    await request(server)
      .delete('/categories/' + categoryId)
      .set('Authorization', auth)
      .expect(200)

    await request(server)
      .get('/categories/' + categoryId)
      .set('Authorization', auth)
      .expect(400)
  })
})