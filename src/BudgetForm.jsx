import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from "@mui/material";





export default function BudgetForm({ addTransaction }) {

    const [value, setValue] = useState("");
    const [text, setText] = useState("");
    const handleChangeVal = (evt) => {
        setValue(evt.target.value)
    }
    const handleChangeTxt = (evt) => {
        setText(evt.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addTransaction(value, text);
    }

    const plusBalance = (e) => {
        e.preventDefault();
        
    }
 

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 1
        }}>
                <TextField
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
                <TextField 
                id="outlined-basic" 
                label="Outlined" 
                variant="outlined" 
                onChange={handleChangeTxt}
                value={text}
                />
                <Button sx={{ml:2}} variant="contained" color="success" type="submit">Income</Button>
                <Button sx={{ml:2}} variant="contained">Expense</Button>
            </Box>
        </form>
    )
}