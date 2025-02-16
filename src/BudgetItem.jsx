import './App.css'

export default function BudgetItem({ transaction, remove }) {
    // const labelId = `checkbox-list-label-${transaction.id}`;

    const date = transaction.date;
    // const formatedDate = date.toLocaleDateString('lt-LT');
    // console.log(typeof date);
    // console.log(new Date(date).getMonth());
    const formatedDate = new Date(date).toLocaleDateString('lt-LT');
    return (
        <>
            <li key={transaction.id}>
                <span>{transaction.ammount} € - {transaction.comment}</span> 
                <span onClick={remove}> Delete</span>
                <br />
                <span>{transaction.type} {formatedDate}</span>
            </li>

        </>
    )
}