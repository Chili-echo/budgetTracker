export default function SortByCategory({ handleChangeCategory, category }) {
    return (
        <div className="sortByCategory">
            <select name="category" id="category" onChange={handleChangeCategory} value={category}>
                <option value="all">All categories</option>
                <option value="income">Income</option>
                <option value="utilities">Utilities</option>
                <option value="groceries">Groceries</option>
                <option value="entertainment">Entertainment</option>
            </select>
        </div>
    )
}