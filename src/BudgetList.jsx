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
            {(doubleFilterred.length > 5) ? <p style={{ userSelect: "none" }} onClick={repopulate}>{!listLength ? "See More" : "See Less"}</p> : ""} {/* if transaction length is more than 5, then show a string - if listLength true - "See less", else "See more" */}
        </div>
    )
}