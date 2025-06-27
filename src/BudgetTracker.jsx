import { useState } from "react";
import { useEffect } from "react";
import './App.css'
import BudgetList from "./BudgetList";
import SortByMonth from "./SortByMonth";
import SortByCategory from "./SortByCategory";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Modal";
import axios from "axios";



// const getInitialData = () => {                                          //load initial data from localStorage
//     const data = JSON.parse(localStorage.getItem("transactions"));
//     if (!data) return [];
//     return data;
// }

const d = new Date();
let initMonth = d.getMonth();


export default function BudgetTracker() {
    const [transactions, setTransaction] = useState([]);
    const [listLength, setListLength] = useState(false);                //re-render because list length changes, true = long list, false = only 5 items
    const [month, setMonth] = useState(initMonth);
    const [category, setCategory] = useState('all');
    const [formVisible, setFormVisible] = useState(false);

    const open = () => setFormVisible(true);
    const close = () => setFormVisible(false);

    // useEffect(() => {                                                        //save to localStorage when "transactions" is updated
    //     localStorage.setItem("transactions", JSON.stringify(transactions));
    // }, [transactions])



    useEffect(() => {
        axios.get("http://localhost:5000/transactions")
            .then((response) => {
                setTransaction(response.data);
            })
            .catch((error) => console.error("Error fetching transactions", error));
    }, []);

    const removeTransaction = async (id) => {                                 //delete button on transactions
        try {
            await axios.delete(`http://localhost:5000/transactions/${id}`)
        } catch (error) {
            console.log("Error:", error);
        }
        axios.get("http://localhost:5000/transactions")
            .then((response) => {
                setTransaction(response.data);
            })
            .catch((error) => console.error("Error fetching transactions", error));
        setTransaction(prevTransactions => {
            return prevTransactions.filter((t) => t.id != id);
        });

    };

    const addTransaction = async (value, text, startDate, type) => {
        const newTrans = {
            id: crypto.randomUUID(),
            amount: value,
            comment: text,
            date: new Date(startDate),
            type: type
        }
        // setTransaction(prevTransactions => {
        //     return [...prevTransactions, newTrans];
        // });
        postTransaction(newTrans);


        // try {
        //     axios.post("http://localhost:5000/transactions", transactions)
        // } catch (error) {
        //     console.log("Error:", error);
        // }
    }
    const postTransaction = async (newTrans) => {
        try {
            await axios.post("http://localhost:5000/transactions", newTrans)      //postina nauja transakcija  newTrans
        } catch (error) {
            console.log("Error:", error);
        }
        axios.get("http://localhost:5000/transactions")                           //is naujo gettina visas transakcijas, kad is naujo budgetTracker moduli parenderintu
            .then((response) => {
                setTransaction(response.data);
            })
            .catch((error) => console.error("Error fetching transactions", error));
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
        return parseInt(accumulator) + parseInt(transac.amount);
    }, 0);

    const negAmount = doubleFilterred.filter((transac) => parseInt(transac.amount) < 0)
    const posAmount = doubleFilterred.filter((transac) => parseInt(transac.amount) > 0)

    let expense = negAmount.reduce((accumulator, transac) => {
        return parseInt(accumulator) + parseInt(transac.amount);
    }, 0);

    let income = posAmount.reduce((accumulator, transac) => {
        return parseInt(accumulator) + parseInt(transac.amount);
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
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mainButtons"
                            onClick={() => (formVisible ? close() : open())}
                        >+ Add New</motion.button>
                    </div>
                </div>
                <div className="budgetList">
                    <BudgetList
                        transactions={transactions}
                        listLength={listLength}
                        fullTransactions={fullTransactions}
                        fewTransactions={fewTransactions}
                        doubleFilterred={doubleFilterred}
                        repopulate={repopulate}
                        removeTransaction={removeTransaction}
                    />
                </div>

            </div>


            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
            >
                {formVisible && <Modal
                    modalOpen={formVisible}
                    handleClose={close}
                    addTransaction={addTransaction}
                />}
            </AnimatePresence>

        </div>
    )

}
