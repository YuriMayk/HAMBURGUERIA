const express = require("express")
const uuid = require("uuid")

const port = 3000


const app = express()
app.use(express.json())

//Below is the array where the orders will be located
const orders = []

// Here start the routes.

app.post("/order", (require, response) => {
    const { order, clientName, price } = require.body
    const id = (uuid.v4())

    const newOrder = { id, order, clientName, price, status: "Em preparação" }
    orders.push(newOrder)

    response.status(201).json(newOrder)

})

app.get("/order", (require, response) => {
    response.json({ orders })
})

app.put("/order/:id", (require, response) => {
    const { order, clientName, price } = require.body
    const { id } = require.params
    const index = orders.findIndex(user => user.id === id)
    const status = orders[index].status

    const orderUpdated = { id, order, clientName, price, status }

    orders[index] = orderUpdated

    response.json(orderUpdated)

})

app.delete("/order/:id", (require, response) => {
    const { id } = require.params
    const index = orders.findIndex(order => order.id === id)
    orders.splice(index, 1)

    response.status(204).json()
})

app.get("/order/:id", (require, response) => {
    const { id } = require.params
    const index = orders.findIndex(order => order.id === id)
    response.json(orders[index])
})

app.patch("/order/:id", (require, response) => {
    const { id } = require.params
    const index = orders.findIndex(order => order.id === id)

    orders[index].status = "pronto"

    response.json()

})

// Here ends the routes.






app.listen(port, () => {
    console.log(`🚀 The server is on, at ${port} port🚪.`)
})


