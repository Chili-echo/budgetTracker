import './App.css'
import House03Icon from '../public/house-03-stroke-rounded';
import BankIcon from '../public/bank-stroke-rounded';
import BowlingPinsIcon from '../public/bowling-pins-stroke-rounded';
import Bread04Icon from '../public/bread-04-stroke-rounded';
import CancelCircleIcon from '../public/cancel-circle-stroke-rounded';


export default function BudgetItem({ transaction, remove }) {
    // const labelId = `checkbox-list-label-${transaction.id}`;


    const transacIcon = (transactionType) => {
        if (transactionType === 'income') {
            return <BankIcon />
        } else if (transactionType === 'groceries') {
            return <Bread04Icon />;
        } else if (transactionType === 'utilities') {
            return <House03Icon />;
        } else if (transactionType === 'entertainment') {
            return <BowlingPinsIcon />;
        }
    }


    const date = transaction.date;
    const formatedDate = new Date(date).toLocaleDateString('lt-LT');
    return (
        <>
            <li className='listLine' key={transaction.id}>
                <div className="leftListItem">
                    <div>
                        <div className="icon">{transacIcon(transaction.type)}</div>
                        <span>{transaction.comment}</span>
                        <span onClick={remove}> <CancelCircleIcon className="cancelIcon" style={{color: "#FF6B6B"}}/></span>
                    </div>
                    <span className='listDate'>{formatedDate}</span>
                </div>
                <div className='rightListItem' style={(transaction.ammount > 0) ? {color: '#4CAF93'} : {color: '#FF6B6B'}}>{transaction.ammount} €</div>
            </li>

        </>
    )
}