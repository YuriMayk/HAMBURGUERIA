const express = require("express")
const uuid = require("uuid")

const port = 3000


const app = express()
app.use(express.json())

// Here start the routes.



// Here ends the routes.






app.listen(port, () => {
    console.log(`🚀 The server is on, at ${port} port🚪.`)
})


