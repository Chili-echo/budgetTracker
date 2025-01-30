import { useState } from "react";
import BudgetForm from "./BudgetForm";
import { Box, List } from "@mui/material";
import BudgetItem from "./BudgetItem";
import { useEffect } from "react";



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
      }, [transactions])

    


    //   const sum = transactions.reduce((accumulator, transac) => {
    //     return accumulator + transac.ammount;
    // }, 0);

    // useEffect(() => {
    //     sumUp()
    // }, [transactions]);

    const addTransaction = (value, text) => {
        setTransaction(prevTransactions => {
            return [...prevTransactions, { id: crypto.randomUUID(), ammount: value, comment: text }];
        })

        console.log(transactions);

        const sumUp = transactions.reduce((accumulator, transac) => {
            return parseInt(accumulator) + parseInt(transac.ammount);
        }, 0);
        setBalance(sumUp);
    }
    const sumUp = () => {


        // var x = parseInt("1000", 10)
        // const newSum = transactions.reduce((accumulator, object) => {
        //     return accumulator + object.ammount;
        // }, 0)
        // let parsed = parseInt(balance, 10);
        // setBalance(newSum +  parsed)
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
