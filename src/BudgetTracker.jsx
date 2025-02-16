import { useState } from "react";
import BudgetForm from "./BudgetForm";
import BudgetItem from "./BudgetItem";
import { useEffect } from "react";
import './App.css'



const getInitialData = () => {                                          //load initial data from localStorage
    const data = JSON.parse(localStorage.getItem("transactions"));
    if (!data) return [];
    return data;
}

// const initialBalance = () => {
//     const data = JSON.parse(localStorage.getItem("transactions"));
//     return data;
// }

const initData = getInitialData();

const sum = initData.reduce((accumulator, transac) => {                 //sum up initial balance after loading for first time, for useState starting value
    return parseInt(accumulator) + parseInt(transac.ammount);
}, 0);

const d = new Date();
let initMonth = d.getMonth();


export default function BudgetTracker() {
    const [balance, setBalance] = useState(sum);
    const [transactions, setTransaction] = useState(getInitialData);
    const [listLength, setListLength] = useState(false);                //re-render because list length changes, true = long list, false = only 5 items
    const [month, setMonth] = useState(initMonth);

    useEffect(() => {                                                        //save to localStorage when "transactions" is updated
        localStorage.setItem("transactions", JSON.stringify(transactions));
        const sumUp = transactions.reduce((accumulator, transac) => {
            return parseInt(accumulator) + parseInt(transac.ammount);
        }, 0);
        setBalance(sumUp);
    }, [transactions])

    const removeTransaction = (id) => {                                 //
        setTransaction(prevTransactions => {
            return prevTransactions.filter((t) => t.id != id);
        });
    };

    const addTransaction = (value, text, startDate, type) => {
        setTransaction(prevTransactions => {
            return [...prevTransactions, { id: crypto.randomUUID(), ammount: value, comment: text, date: new Date(startDate), type: type }];
        });
    }

    const filteredTransactions = transactions.filter((transac) => 
        parseInt(new Date(transac.date).getMonth()) === parseInt(month) );

    const fullTransactions = filteredTransactions.slice(0).sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()); // this makes a new copy of Transactions array and sorts the list by transactions.date (it was fucked up to debug this, since appearantly you need to add new Date here. It feels like react or JS forgets often that it is type date and you need to often write new Date to make sure he knows it is a date. FFS. :D)

    // function sortByMonth(arr) {
    //     return (month)
    // }
    

    const fewTransactions = fullTransactions.slice(0, 5); // copy and create a new array list with only 5 items, for short list

    const repopulate = () => {                             // change status of listLength and therefore re-render list and either shorten or lengthen
        setListLength(!listLength);
    }

    const handleChangeMonth = (evt) => {

        if (!evt.target.value) {
            return
        } else {
            setMonth(evt.target.value);
        }
    }

    return (
        <div className="mainDisplay">
            <div className="leftPanel">
                <p>Sort by Month:</p>
                <select name="months" id="months" onChange={handleChangeMonth} value={month}>
                    <option value=""></option>
                    <option value="99">All transactions</option>
                    <option value="0">January</option>
                    <option value="1">February</option>
                    <option value="2">March</option>
                    <option value="3">April</option>
                    <option value="4">May</option>
                    <option value="5">June</option>
                    <option value="6">July</option>
                    <option value="7">August</option>
                    <option value="8">September</option>
                    <option value="9">October</option>
                    <option value="10">November</option>
                    <option value="11">December</option>
                </select>

            </div>
            <div className="trackerApp">
                <p className="currBalance">Current Balance: {balance} </p>
                <BudgetForm
                    addTransaction={addTransaction}
                    className="formBackground"
                />
                <ul className="listStyle">
                    
                    {((listLength) ? fullTransactions : fewTransactions).map(transaction => {
                        return <BudgetItem
                            transaction={transaction}
                            key={transaction.id}
                            remove={() => removeTransaction(transaction.id)}
                        />
                    })}
                </ul>
                {(filteredTransactions.length > 5) ? <p style={{ userSelect: "none" }} onClick={repopulate}>{!listLength ? "See More" : "See Less"}</p> : ""} {/* if transaction length is more than 5, then show a string - if listLength true - "See less", else "See more"*/}
            </div>
            <div></div>
        </div>

    )

}
