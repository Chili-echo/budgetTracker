import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import BudgetForm from "./BudgetForm";


export default function Modal({ handleClose, addTransaction }) {
    return (
        <Backdrop onClick={handleClose}>
            <motion.div 
            className="modal"
            onClick={(e) => e.stopPropagation()}
            // variants={dropIn}
            initial={{ opacity: 0, scale: 0}}
            animate={{ opacity: 1, scale: 1}}
            transition={{
                duration: 0.3,
                scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
            exit={{ opacity: 0, scale: 0}}
            >   
                <BudgetForm 
                handleClose={handleClose}
                addTransaction={addTransaction}
                />
            </motion.div>
        </Backdrop>
    )
}