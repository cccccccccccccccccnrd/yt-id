const fs = require('fs')
const fetch = require('node-fetch')

const state = {
  count: 0
}

function getId () {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'
  return Array.apply(null, { length: 11 }).map(() => chars.charAt(Math.floor(Math.random() * chars.length))).join('')
}

async function status (url) {
  const response = await fetch(url)
  return await response.status
}

async function check (id) {
  const code = await status(`https://img.youtube.com/vi/${id}/0.jpg`)
  return code === 200 ? true : false
}

async function init () {
  setInterval(async () => {
    state.count++

    const id = getId()
    const result = await check(id)

    console.log(state.count, id, result)
    if (result) fs.writeFileSync(`ids/${id}`, String(state.count))
  }, 100)
}

init()