import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import BudgetForm from "./BudgetForm";

// const dropIn = {
//     hidden: {
//         y: "-100vh",
//         opacity: 0,
//     },
//     visible: {
//         y: "0",
//         opacity: 1,
//         transition: {
//             duration: 0.1,
//             type: "spring",
//             damping: 25,
//             stiffness: 500,
//         }
//     },
//     exit: {
//         y: "100vh",
//         opacity: 0,
//     },
// }

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