const qs = require('qs')
const Mock = require('mockjs')
const config = require('../utils/config')

const { apiPrefix } = config

let usersListData = Mock.mock({
  'data|80-100': [
    {
      id: '@id',
      areaCode: '@name',
      areaName: '@name',
      areaShortName: '@name',
      areaType: '@name',
      parentCode: '@last',
      pinYin: /^1[34578]\d{9}$/,
      address: '@county(true)',
      isMale: '@boolean',
      email: '@email',
      created: '@datetime',
      updated: '@datetime',
    },
  ],
})


let database = usersListData.data

const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  let data

  for (let item of array) {
    if (item[keyAlias] === key) {
      data = item
      break
    }
  }

  if (data) {
    return data
  }
  return null
}

const NOTFOUND = {
  message: 'Not Found',
  documentation_url: 'http://localhost:8000/request',
}

module.exports = {

  // [`GET ${apiPrefix}/area`] (req, res) {
  //   const cookie = req.headers.cookie || ''
  //   const cookies = qs.parse(cookie.replace(/\s/g, ''), { delimiter: ';' })
  //   const response = {}
  //   const user = {}
  //   if (!cookies.token) {
  //     res.status(200).send({ message: 'Not Login' })
  //     return
  //   }
  //   const token = JSON.parse(cookies.token)
  //   if (token) {
  //     response.success = token.deadline > new Date().getTime()
  //   }
  //   if (response.success) {
  //     const userItem = adminUsers.filter(_ => _.id === token.id)
  //     if (userItem.length > 0) {
  //       user.permissions = userItem[0].permissions
  //       user.username = userItem[0].username
  //       user.id = userItem[0].id
  //     }
  //   }
  //   response.user = user
  //   res.json(response)
  // },

  [`GET ${apiPrefix}/area`] (req, res) {
    const { query } = req
    let { pageSize, page, ...other } = query
    pageSize = pageSize || 10
    page = page || 1

    let newData = database
    for (let key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter((item) => {
          if ({}.hasOwnProperty.call(item, key)) {
            if (key === 'address') {
              return other[key].every(iitem => item[key].indexOf(iitem) > -1)
            } else if (key === 'createTime') {
              const start = new Date(other[key][0]).getTime()
              const end = new Date(other[key][1]).getTime()
              const now = new Date(item[key]).getTime()

              if (start && end) {
                return now >= start && now <= end
              }
              return true
            }
            return String(item[key]).trim().indexOf(decodeURI(other[key]).trim()) > -1
          }
          return true
        })
      }
    }

    res.status(200).json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
    })
  },


  // [`POST ${apiPrefix}/user`] (req, res) {
  //   const newData = req.body
  //   newData.createTime = Mock.mock('@now')
  //   newData.avatar = newData.avatar || Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', newData.nickName.substr(0, 1))
  //   newData.id = Mock.mock('@id')
  //
  //   database.unshift(newData)
  //
  //   res.status(200).end()
  // },
}
