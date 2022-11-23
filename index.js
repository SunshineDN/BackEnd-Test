const express = require("express");

const app = express();

//PROXY #1
// const HOST = process.env.HOST || "0.0.0.0";

// const PORT = process.env.PORT || 8080;

// const cors = require("cors-anywhere");

// cors
// .createServer({
//     originWhiteList: [],
// })
// .listen(PORT, HOST, () => {
//     console.log("Rodando CORS no host", HOST+":"+PORT)
// })

const port = 3333;

//PROXY #2
// app.use((_req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', '*');

//     next();
// })

app.use(express.json());

app.get("/users", (req,res) => {
    const fs = require("fs");
    const users = JSON.parse(fs.readFileSync("./src/users.json", "utf-8"))
    return res.status(200).send(users)
})

app.post("/createUser", (req,res) => {
    const fs = require("fs");
    const { id, name, age, gender } = req.body;
    const newUser = { id, name, age, gender };
    const data = fs.readFileSync("./src/users.json");
    const object = JSON.parse(data);
    object.push(newUser);
    const newObject = JSON.stringify(object);
    fs.writeFile("./src/users.json", newObject, (err) => {
        if (err) {
            throw err
        }

        console.log("Dados escritos com sucesso!");
    })

    return res.status(201).send(newUser);
})

app.listen(port, () => {
    console.log("Servidor rodando na porta:", port + "...")
})