const Queue = require('bull');
const albumsQueue = new Queue('import albums');
const axios = require('axios');

const db = require('./../models')

albumsQueue.process(async function(job, done){

  const response = await axios.get(job.data.url)
  const stringifyData =  JSON.stringify(response.data)
  await db.Import.create({jsonData: stringifyData})
  done()
})

module.exports = albumsQueue;
