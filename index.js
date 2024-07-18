import express from "express"

import { dbConnection } from "./Database/dbConnection.js"

import userRouter from "./src/modules/user/user.routes.js"
import taskRouter from "./src/modules/tasks/task.routes.js"
import categoryRouter from "./src/modules/categories/category.routes.js"



import { globalResponse } from "./src/middlewares/error-handle.middleware.js"


const app = express()
const port = 5000

app.use(express.json())

app.use("/user",userRouter)
app.use("/task",taskRouter)
app.use("/category",categoryRouter)


app.use(globalResponse)


dbConnection()
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))