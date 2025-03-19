require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let transactions = [];

app.get("/transactions", (req, res) => {
    res.json(transactions);
});

app.post("/transactions", (req, res) => {
    const newTransaction = req.body;
    transactions.push(newTransaction);
    res.status(201).json({ message: "Transaction added!", transaction: newTransaction })
    console.log(transactions);
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));