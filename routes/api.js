var express = require('express')
var router = express.Router()
const Sequelize = require('sequelize')
const moment = require('moment')
const Op = Sequelize.Op
const sequelize = new Sequelize('coalibot', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: process.env.DB_IP,
  dialect: 'postgres',
  operatorsAliases: false,
  logging: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const Command = sequelize.define('command', {
  command_name: Sequelize.STRING,
  user: Sequelize.STRING,
  option: Sequelize.STRING,
  date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
})

/* GET users listing. */
router.get('/users', function(req, res) {
  Command.findAll({
    attributes: ['user', sequelize.fn('COUNT', sequelize.col('*'))],
    group: ['user'],
    order: [['count', 'DESC']],
    limit: 5,
    raw: true
  })
    .then(function(result) {
      res.send(result)
    })
    .catch(function(error) {
      console.log(error)
    })
})

router.get('/commands', function(req, res) {
  Command.findAll({
    attributes: ['command_name', sequelize.fn('COUNT', sequelize.col('*'))],
    group: ['command_name'],
    order: [['count', 'DESC']],
    raw: true
  })
    .then(function(result) {
      res.send(result)
    })
    .catch(function(error) {
      console.log(error)
    })
})

router.get('/lastest', function(req, res) {
  Command.findAll({
    group: ['command_name', 'id'],
    order: [['date', 'DESC']],
    limit: 1,
    raw: true
  })
    .then(function(result) {
      res.send(result)
    })
    .catch(function(error) {
      console.log(error)
    })
})

router.get('/days', function(req, res) {
  Command.findAll({
    attributes: ['date'],
    where: {
      date: {
        [Op.gte]: moment()
          .subtract(30, 'days')
          .toDate()
      }
    },
    group: ['date', 'id'],
    order: [['date', 'ASC']],
    raw: true
  })
    .then(res => {
      let day = []
      let result = {}
      let i = 0
      for (let x of res) {
        day[i] = moment(x.date).format('dddd')
        i++
      }
      day.forEach(function(x) {
        result[x] = (result[x] || 0) + 1
      })

      let ret = []
      for (let x in result) {
        ret.push({ day: x, count: result[x] })
      }
      return ret
    })
    .then(function(result) {
      res.send(result)
    })
    .catch(function(error) {
      console.log(error)
    })
})
module.exports = router
