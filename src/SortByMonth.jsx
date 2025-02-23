export default function SortByMonth({ handleChangeMonth, month }) {
    return (
        <div className="selectButtons sortByMonth">
            <select name="months" id="months" onChange={handleChangeMonth} value={month}>
                <option value="99">All transactions</option>
                <option value="0">January 2025</option>
                <option value="1">February 2025</option>
                <option value="2">March 2025</option>
                <option value="3">April 2025</option>
                <option value="4">May 2025</option>
                <option value="5">June 2025</option>
                <option value="6">July 2025</option>
                <option value="7">August 2025</option>
                <option value="8">September 2025</option>
                <option value="9">October 2025</option>
                <option value="10">November 2025</option>
                <option value="11">December 2025</option>
            </select>

        </div>
    )
}