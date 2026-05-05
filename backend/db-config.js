const knex = require("knex")
const config = require("../knexfile")

let db = null
if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "test-backend") {
  console.log("TEST DB")
  db = knex(config.test)
} else {
  console.log("DEV DB")
  db = knex(config.development)
}

module.exports = db