import { ListItem } from "@mui/material"
import { ListItemText } from "@mui/material"

export default function BudgetItem({ transaction }) {
    const labelId = `checkbox-list-label-${transaction.id}`;
    return (
        <>
            <ListItem>
                <ListItemText
                    id={labelId} primary={transaction.comment} secondary={transaction.ammount}
                    
                />
            </ListItem>
        </>
    )
}