import { useState } from "react";
import BudgetForm from "./BudgetForm";
import { Box, List } from "@mui/material";
import BudgetItem from "./BudgetItem";
import { useEffect } from "react";
import { Container } from "@mui/material";
import './bt.css'



const getInitialData = () => {
    const data = JSON.parse(localStorage.getItem("transactions"));
    if (!data) return [];
    return data;
}

const initialBalance = () => {
    const data = JSON.parse(localStorage.getItem("transactions"));
    return data;
}

const initData = initialBalance();

const sum = initData.reduce((accumulator, transac) => {
    return parseInt(accumulator) + parseInt(transac.ammount);
}, 0);


export default function BudgetTracker() {
    const [balance, setBalance] = useState(sum);
    const [transactions, setTransaction] = useState(getInitialData);

    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(transactions));
        const sumUp = transactions.reduce((accumulator, transac) => {
            return parseInt(accumulator) + parseInt(transac.ammount);
        }, 0);
        setBalance(sumUp);
    }, [transactions])

    const removeTransaction = (id) => {
        setTransaction(prevTransactions => {
            return prevTransactions.filter((t) => t.id != id);
        });
    };

    const addTransaction = (value, text) => {
        setTransaction(prevTransactions => {
            return [...prevTransactions, { id: crypto.randomUUID(), ammount: value, comment: text }];
        })
    }
    
   

    const fullTransactions = transactions.slice(0).reverse() // reverse the transaction list, newest at the top

    const fewTransactions = fullTransactions.slice(0, 5);



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
                {fewTransactions.map(transaction => {
                    return <BudgetItem
                        transaction={transaction}
                        key={transaction.id}
                        remove={() => removeTransaction(transaction.id)}
                    />
                })}
            </List>
            <h4 >See More</h4>
        </Box>
    )
}
