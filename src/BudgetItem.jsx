import { ListItem } from "@mui/material";
import { ListItemText } from "@mui/material";
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function BudgetItem({ transaction, remove }) {
    const labelId = `checkbox-list-label-${transaction.id}`;
    return (
        <>
            <ListItem
                key={transaction.id}
                secondaryAction={
                    <IconButton edge="end" aria-label="comments" onClick={remove}>
                        <HighlightOffIcon />
                    </IconButton>
                }
            >
                <ListItemText
                    id={labelId} primary={transaction.comment} secondary={transaction.ammount} />
            </ListItem>
        </>
    )
}