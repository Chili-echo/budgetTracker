// const { default: mongoose } = require("mongoose");
// const TransactionMongo = require("../models/Transaction");
// require("dotenv").config();

// const mongoUri = process.env.MONGO_URI;

// mongoose.connect(mongoUri)
//     .then(() => {
//         console.log("MongoDB connected <3")
//     })
//     .catch(err => {
//         console.log("Oh no Mongo connection error!")
//         console.log(err)
//     })


//     TransactionMongo.deleteMany({})

//     const transactionTypes = [
//         "income", "utilities", "groceries", "entertainment",
//         "rent", "transportation", "health", "shopping", "subscriptions", "gift"
//     ];
    
//     const comments = {
//         income: ["Salary", "Freelance payment", "Bonus", "Investment return", "Gift money"],
//         utilities: ["Electricity bill", "Water bill", "Internet bill", "Gas bill"],
//         groceries: ["Supermarket", "Farmer's market", "Bakery", "Butcher shop"],
//         entertainment: ["Movie night", "Concert ticket", "Streaming service", "Game purchase"],
//         rent: ["Apartment rent", "House mortgage", "Office rent"],
//         transportation: ["Gas refill", "Bus ticket", "Uber ride", "Train pass"],
//         health: ["Doctor visit", "Pharmacy", "Gym membership", "Health insurance"],
//         shopping: ["Clothes", "Shoes", "Electronics", "Furniture"],
//         subscriptions: ["Netflix", "Spotify", "Amazon Prime", "Gym subscription"],
//         gift: ["Birthday gift", "Wedding present", "Holiday gift", "Charity donation"]
//     };
    
//     const generateRandomTransaction = () => {
//         const type = transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
//         return {
//             amount: parseFloat((Math.random() * (5000 - 5) + 5).toFixed(2)),
//             comment: comments[type][Math.floor(Math.random() * comments[type].length)],
//             date: new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 90))),
//             type: type
//         };
//     };

//     const transactions = Array.from({ length: 100 }, generateRandomTransaction);

//     TransactionMongo.insertMany(transactions)
//     .then(() => {
//         console.log("Database seeded successfully! 🚀");
//         mongoose.connection.close();
//     })
//     .catch((err) => console.error("Seeding failed ❌", err));

const mongoose = require("mongoose");
const TransactionMongo = require("../models/Transaction");
require("dotenv").config();

const mongoUri = process.env.MONGO_URI;

const seedDatabase = async () => {
    try {
        await mongoose.connect(mongoUri);
        console.log("MongoDB connected <3");

        // Delete old transactions first
        await TransactionMongo.deleteMany({});
        console.log("Old transactions deleted ✅");

        const transactionTypes = [
            "income", "utilities", "groceries", "entertainment",
            "rent", "transportation", "health", "shopping", "subscriptions", "gift"
        ];

        const comments = {
            income: ["Salary", "Freelance payment", "Bonus", "Investment return", "Gift money"],
            utilities: ["Electricity bill", "Water bill", "Internet bill", "Gas bill"],
            groceries: ["Supermarket", "Farmer's market", "Bakery", "Butcher shop"],
            entertainment: ["Movie night", "Concert ticket", "Streaming service", "Game purchase"],
            rent: ["Apartment rent", "House mortgage", "Office rent"],
            transportation: ["Gas refill", "Bus ticket", "Uber ride", "Train pass"],
            health: ["Doctor visit", "Pharmacy", "Gym membership", "Health insurance"],
            shopping: ["Clothes", "Shoes", "Electronics", "Furniture"],
            subscriptions: ["Netflix", "Spotify", "Amazon Prime", "Gym subscription"],
            gift: ["Birthday gift", "Wedding present", "Holiday gift", "Charity donation"]
        };

        const generateRandomTransaction = () => {
            const type = transactionTypes[Math.floor(Math.random() * transactionTypes.length)];

            let amount;

            if (type === "income") {
                // Income should be between 500 and 1500 (always positive)
                amount = parseFloat((Math.random() * (1500 - 500) + 500).toFixed(2));
            } else {
                // Expenses should be between 5 and 99 (always negative)
                amount = -parseFloat((Math.random() * (99 - 5) + 5).toFixed(2));
            }        

            return {
                amount,
                comment: comments[type][Math.floor(Math.random() * comments[type].length)],
                date: new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 90))),
                type: type
            };
        };

        const transactions = Array.from({ length: 100 }, generateRandomTransaction);

        await TransactionMongo.insertMany(transactions);
        console.log("Database seeded successfully! 🚀");

    } catch (err) {
        console.error("Seeding failed ❌", err);
    } finally {
        mongoose.connection.close();
        console.log("MongoDB connection closed 🔌");
    }
};

// Run the function
seedDatabase();    