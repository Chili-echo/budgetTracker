import BudgetItem from "./BudgetItem";

export default function BudgetList({ listLength, fullTransactions, fewTransactions, doubleFilterred, repopulate, removeTransaction }) {
    return (
        <div>
            <ul className="listStyle">

                {((listLength) ? fullTransactions : fewTransactions).map(transaction => {
                    return <BudgetItem
                        transaction={transaction}
                        key={transaction.id}
                        remove={() => removeTransaction(transaction.id)}
                    />
                })}
            </ul>
            {(doubleFilterred.length > 5) ? <div className="seeMore" onClick={repopulate}><p style={{ userSelect: "none" }}>{!listLength ? "See More" : "See Less"}</p></div> : ""} {/* if transaction length is more than 5, then show a string - if listLength true - "See less", else "See more" */}
        </div>
    )
}