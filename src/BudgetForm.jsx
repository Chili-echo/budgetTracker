import { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import './App.css';
import axios from "axios";

export default function BudgetForm({ addTransaction, handleClose, postTransaction}) {

    const [value, setValue] = useState("");
    const [text, setText] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [type, setType] = useState("income");
    const makeNegative = () => {
        const negativeValue = -Math.abs(value);
        setValue(negativeValue);
    }

    const handleChangeVal = (evt) => {
        setValue(evt.target.value)
    }

    const handleChangeTxt = (evt) => {
        setText(evt.target.value)
    }

    const handleChangeType = (evt) => {
        setType(evt.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!value || !text) return;
        addTransaction(value, text, startDate, type);
        // postTransaction(value, text, startDate, type);
        setText("");
        setValue("");
        handleClose();
    }
    const transactionTypes = [
        "income", "utilities", "groceries", "entertainment",
        "rent", "transportation", "health", "shopping", "subscriptions", "gift"
    ];

    return (

        <form onSubmit={handleSubmit} style={{/*  position: "sticky", top: "0"  */}} className="budgetForm" >

            <div>
                <input
                    type="text"
                    placeholder="Description"
                    id="description"
                    label="Description"
                    onChange={handleChangeTxt}
                    value={text}
                    className="formItem"
                />
                <input
                    type="number"
                    placeholder="Enter Amount"
                    id="number"
                    onChange={handleChangeVal}
                    value={value}
                    className="formItem"
                />
                <select name="transacs" id="transacs" onChange={handleChangeType} value={type} className="formItem">
                    <option value="income">income</option>
                    <option value="utilities">utilities</option>
                    <option value="groceries">groceries</option>
                    <option value="entertainment">entertainment</option>
                </select>
                {/* <div className="formItem formItemDate"> */}
                <DatePicker
                    className="formItem formItemDate"
                    stlye={{}}
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                />
                {/* </div> */}
            </div>

            <div>
                <button type="submit" className="formItemButton">Income</button>
                <button onClick={makeNegative} type="submit" className="formItemButton formItemButtonExpense">Expense</button>
                <button onClick={handleClose} className="formItemButton">CLOSE</button>
            </div>
        </form>

    )
}