import { useState } from "react";
import BudgetForm from "./BudgetForm";
import { Box, List } from "@mui/material";
import BudgetItem from "./BudgetItem";
import { useEffect } from "react";
import { Container } from "@mui/material";
import './bt.css'
import './App.css'



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
    const [listLength, setListLength] = useState(false);

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

    const repopulate = () => {
        setListLength(!listLength);
    }



    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            m: 3,

        }}>
            <Container
                className="formBackground"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}

            >
                <h1 className="fullOpac">Current Balance: {balance} </h1>
                <BudgetForm
                    addTransaction={addTransaction}
                    className="formBackground"
                />

                <List>
                    {((listLength) ? fullTransactions : fewTransactions).map(transaction => {
                        return <BudgetItem
                            transaction={transaction}
                            key={transaction.id}
                            remove={() => removeTransaction(transaction.id)}
                        />
                    })}
                </List>
                {(transactions.length > 5) ? <h4 style={{ userSelect: "none" }} onClick={repopulate}>See More</h4> : ""}
            </Container>
        </Box>
    )
}
