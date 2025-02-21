import { useState } from "react";
import BudgetForm from "./BudgetForm";
import BudgetItem from "./BudgetItem";
import { useEffect } from "react";
import './App.css'
import BudgetList from "./BudgetList";
import SortByMonth from "./SortByMonth";
import SortByCategory from "./SortByCategory";



const getInitialData = () => {                                          //load initial data from localStorage
    const data = JSON.parse(localStorage.getItem("transactions"));
    if (!data) return [];
    return data;
}

const d = new Date();
let initMonth = d.getMonth();


export default function BudgetTracker() {
    const [transactions, setTransaction] = useState(getInitialData);
    const [listLength, setListLength] = useState(false);                //re-render because list length changes, true = long list, false = only 5 items
    const [month, setMonth] = useState(initMonth);
    const [category, setCategory] = useState('all');

    useEffect(() => {                                                        //save to localStorage when "transactions" is updated
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions])

    const removeTransaction = (id) => {                                 //delete button on transactions
        setTransaction(prevTransactions => {
            return prevTransactions.filter((t) => t.id != id);
        });
    };

    const addTransaction = (value, text, startDate, type) => {
        setTransaction(prevTransactions => {
            return [...prevTransactions, { id: crypto.randomUUID(), ammount: value, comment: text, date: new Date(startDate), type: type }];
        });
    }

    const filteredTransactions = transactions.filter((transac) => {
        if (parseInt(month) != 99) {
            return parseInt(new Date(transac.date).getMonth()) === parseInt(month)
        } else return transactions;
    }
    );

    const doubleFilterred = filteredTransactions.filter((transac) => {
        if (category != 'all') {
            return transac.type === category
        } else return filteredTransactions;
    })


    const fullTransactions = doubleFilterred.slice(0).sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()); // this makes a new copy of Transactions array and sorts the list by transactions.date (it was fucked up to debug this, since appearantly you need to add new Date here. It feels like react or JS forgets often that it is type date and you need to often write new Date to make sure he knows it is a date. FFS. :D)


    //BALANCE, INCOME AND EXPENSE SUMS LOGIC//
    //////////////////////

    let balance = transactions.reduce((accumulator, transac) => {
        return parseInt(accumulator) + parseInt(transac.ammount);
    }, 0);

    const negAmmount = doubleFilterred.filter((transac) => parseInt(transac.ammount) < 0)
    const posAmmount = doubleFilterred.filter((transac) => parseInt(transac.ammount) > 0)

    let expense = negAmmount.reduce((accumulator, transac) => {
        return parseInt(accumulator) + parseInt(transac.ammount);
    }, 0);

    let income = posAmmount.reduce((accumulator, transac) => {
        return parseInt(accumulator) + parseInt(transac.ammount);
    }, 0);

    //////////////////////

    const fewTransactions = fullTransactions.slice(0, 5); // copy and create a new array list with only 5 items, for short list before pressing See More

    const repopulate = () => {                             // change status of listLength and therefore re-render list and either shorten or lengthen (afer pressing SeeMore/SeeLess)
        setListLength(!listLength);
    }

    const handleChangeMonth = (evt) => {

        if (!evt.target.value) {
            return
        } else {
            setMonth(evt.target.value);
        }
    }

    const handleChangeCategory = (evt) => {
        setCategory(evt.target.value)
    }

    return (
        <div className="mainSection">

            <div className="topSection">
                <div className="balanceModule">
                    <p className="innerModule">Current Balance:  </p>
                    <h2 className="innerModule">{balance}</h2>
                    <p className="innerModule">+2% from last month</p>
                </div>
                <div className="balanceModule">
                    <p className="innerModule">Income:  </p>
                    <h2 className="innerModule">{income}</h2>
                    <p className="innerModule">+4% from last month</p>
                </div>
                <div className="balanceModule">
                    <div className="innerModule">Expense:  </div>
                    <h2 className="innerModule">{Math.abs(expense)}</h2>
                    <div className="innerModule">+5% from last month</div>
                </div>
            </div>
            <div className="listSection">
                <div className="topPartOfList">
                    <div className="recentTransactions">Recent Transactions</div>
                    <div className="sortBy">
                        <SortByMonth
                            handleChangeMonth={handleChangeMonth}
                            month={month}
                        />
                        <SortByCategory
                            handleChangeCategory={handleChangeCategory}
                            category={category}
                        />
                    </div>
                </div>
                <div className="budgetList">
                    <BudgetList
                        listLength={listLength}
                        fullTransactions={fullTransactions}
                        fewTransactions={fewTransactions}
                        doubleFilterred={doubleFilterred}
                        repopulate={repopulate}
                        removeTransaction={removeTransaction}
                    />
                </div>

            </div>
            <BudgetForm
                addTransaction={addTransaction}
                className="formBackground"
            />

        </div>

    )

}
