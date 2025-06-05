const express = require("express")
const dotenv = require("dotenv")
const connectDB  = require("./config/db")
const productsRouter = require("./routes/produtos.routes.js")

dotenv.config()

const app = express() 

app.use(express.json()) 
app.use("/api/products", productsRouter)

console.log(process.env.MONGO_URI)


const startServer = async () => {
    await connectDB(); // espera conectar ao banco
    app.listen(process.env.PORT, () => {
        console.log("Servidor rodando na porta 5000");
    });
};

startServer();
