import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from "@mui/material";
import './App.css';

export default function BudgetForm({ addTransaction }) {

    const [value, setValue] = useState("");
    const [text, setText] = useState("");
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!value || !text) return;
        addTransaction(value, text);
        setText("");
        setValue("");
    }
    const date = new Date();

    return (
        <form onSubmit={handleSubmit} style={{ position: "sticky", top: "0" }} >
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: 1,
                mr: 1,
            }}>
                <TextField
                    sx={{
                        mr: 2,
                        
                    }}
                    className="textField"
                    style={{ color: 'white' }}
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    onChange={handleChangeTxt}
                    value={text}
                />
                <TextField

                    sx={{
                        maxWidth: '150px'
                    }}
                    className="textField"
                    style={{ color: 'white' }}
                    id="outlined-number"
                    label="Enter ammount"
                    type="number"
                    onChange={handleChangeVal}
                    value={value}
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                />
                <input type="date" value={date} />
                
                <Button sx={{ ml: 2 }} variant="contained" color="success" type="submit" >Income</Button>
                <Button sx={{ ml: 2 }} variant="contained" onClick={makeNegative} type="submit">Expense</Button>
            </Box>
        </form>
    )
}