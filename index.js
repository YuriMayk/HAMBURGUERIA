const express = require("express")
const uuid = require("uuid")

const port = 3000


const app = express()
app.use(express.json())

//Below is the array where the orders will be located
const orders = []

// Here starts the middlewares.

const checkIdUser = (request, response, next) => {
    const { id } = request.params

    const index = orders.findIndex(order => order.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "Order not found." })
    }

    request.id = id
    request.orderIndex = index

    next()

}


// Here ends the middlewares.

// Here start the routes.

app.post("/order", (request, response) => {
    const { order, clientName, price } = request.body
    
    const newOrder = { id: uuid.v4(), order, clientName, price, status: "Em preparação" }
    orders.push(newOrder)

    return response.status(201).json(newOrder)

})

app.get("/order", (request, response) => {
    return response.json(orders)
})

app.put("/order/:id", checkIdUser, (request, response) => {
    const { order, clientName, price } = request.body
    const id = request.id
    const index = request.orderIndex
    const status = orders[index].status

    const orderUpdated = { id, order, clientName, price, status }

    orders[index] = orderUpdated

    return response.json(orderUpdated)

})

app.delete("/order/:id", checkIdUser, (request, response) => {
    const index = request.orderIndex
    orders.splice(index, 1)

    return response.status(204).json()
})

app.get("/order/:id", checkIdUser, (request, response) => {
    const index = request.orderIndex
    return response.json(orders[index])
})

app.patch("/order/:id", checkIdUser, (request, response) => {
    const index = request.orderIndex

    orders[index].status = "pronto"

    return response.json(orders[index])

})

// Here ends the routes.






app.listen(port, () => {
    console.log(`🚀 The server is on, at ${port} port🚪.`)
})


