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
            <li className='listLine' key={transaction.id}>
                <div className="leftListItem">
                    <span>{transaction.type}</span> <span>{transaction.comment}</span>
                    <span onClick={remove}> <button>X</button></span>
                    <br />
                    <span>{formatedDate}</span>
                </div>
                <div className='rightListItem'>{transaction.ammount} €</div>
            </li>

        </>
    )
}