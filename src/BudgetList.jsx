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
            <div className="seeMore" onClick={repopulate}>
                {(doubleFilterred.length > 5) ? <p style={{ userSelect: "none" }}>{!listLength ? "See More" : "See Less"}</p> : ""}
            </div> {/* if transaction length is more than 5, then show a string - if listLength true - "See less", else "See more" */}
        </div>
    )
}