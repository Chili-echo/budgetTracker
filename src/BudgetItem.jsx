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
    //     <svg xmlns="" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
    //     <path d="M2 10L7 4M7 4L12.4142 9.41421C12.7032 9.70324 12.8478 9.84776 13.0315 9.92388C13.2153 10 13.4197 10 13.8284 10H22L18.1994 5.43926C17.6096 4.73152 17.3147 4.37764 16.9116 4.18882C16.5084 4 16.0478 4 15.1265 4H7Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    //     <path d="M11 8V20H3V8.85714" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    //     <path d="M11 20H21V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    //     <path d="M4 7.5V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    //     <path d="M7.00801 12L6.99902 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    //     <path d="M7 20V16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    //     <path d="M15 14L17 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    // </svg>


    const date = transaction.date;
    // const formatedDate = date.toLocaleDateString('lt-LT');
    // console.log(typeof date);
    // console.log(new Date(date).getMonth());
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