import { useState } from "react";
import BudgetForm from "./BudgetForm";
import { Box, List } from "@mui/material";
import BudgetItem from "./BudgetItem";
import { useEffect } from "react";


const startingTransactions = [
    { id: crypto.randomUUID(), ammount: 1350, comment: "Atlyginimas", type: "income" },
    { id: crypto.randomUUID(), ammount: -450, comment: "Kredit", type: "expense" },
    { id: crypto.randomUUID(), ammount: -250, comment: "Maistui", type: "expense" }
]

const sum = startingTransactions.reduce((accumulator, object) => {
    return accumulator + object.ammount;
}, 0);


// const initBalance = () => {
//     const data = JSON.parse(localStorage.getItem("balance"));
//     if (!data) return 0;
//     return data;
// }

const getInitialData = () => {
    const data = JSON.parse(localStorage.getItem("transacions"));
    if (!data) return [];
    return data;
}


export default function BudgetTracker() {
    const [balance, setBalance] = useState(50);
    const [transactions, setTransaction] = useState(startingTransactions);

    useEffect(() => {
        sumUp()
    }, [transactions]);

    const addTransaction = (value, text) => {
        setTransaction(prevTransactions => {
            return [...prevTransactions, { id: crypto.randomUUID(), ammount: value, comment: text }];
        })
    }
    const sumUp = () => {
        // var x = parseInt("1000", 10)
        const newSum = transactions.reduce((accumulator, object) => {
            return accumulator + object.ammount;
        }, 0)
        let parsed = parseInt(balance, 10);
        setBalance(newSum +  parsed)
    }

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            m: 3
        }}>
            <h1>Current Balance: {balance} </h1>
            <BudgetForm addTransaction={addTransaction} />
            <List >
                {transactions.map(transaction => {
                    return <BudgetItem transaction={transaction} key={transaction.id} />
                })}
            </List>
        </Box>
    )
}
