require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const joi = require("joi");
const methodOverride = require("method-override");
const TransactionMongo = require("./models/Transaction");
const Transaction = require("./models/Transaction");

const mongoUri = process.env.MONGO_URI;

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("MongoDB connected <3");
  })
  .catch((err) => {
    console.log("Oh no Mongo connection error!");
    console.log(err);
  });

// const initialTransac = async () => {
//     const sampleTransac = {
//         id: crypto.randomUUID(),
//         ammount: 25,
//         comment: "Kebabai",
//         date: new Date(),
//         type: "entertainment"
//     }
//     const iniTrans = new TransactionMongo(sampleTransac);
//     await iniTrans.save();
// }

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(cors());
app.use(express.json());

let transactions = [];

app.get("/transactions", async (req, res) => {
  const transactions = await TransactionMongo.find({});
  res.json(transactions);
});

// app.post("/transactions", (req, res) => {
//     const newTransaction = req.body;
//     transactions.push(newTransaction);
//     res.status(201).json({ message: "Transaction added!", transaction: newTransaction })
//     console.log(transactions);
// })

app.post("/transactions", async (req, res) => {
  const newTransaction = new TransactionMongo(req.body);
  await newTransaction.save();
  res.json(newTransaction);
});

// app.delete('/transactions/:id', async (req, res) => {
//     // const { id } = req.params;

//     await TransactionMongo.findByIdAndDelete(req.body.id);
//     // res.redirect('/campgrounds');
// })

app.delete("/transactions/:id", async (req, res) => {
  try {
    const deletedItem = await Transaction.findOneAndDelete({
      id: req.params.id,
    });
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item deleted", item: deletedItem });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
