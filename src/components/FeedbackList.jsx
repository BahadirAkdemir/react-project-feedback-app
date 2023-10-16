import React, {useContext} from "react";
import FeedbackItem from "./FeedbackItem";
import {motion, AnimatePresence} from "framer-motion";
import FeedbackContext from "./context/FeedbackContext";
import Spinner from "./shared/Spinner";

function FeedbackList(){

    const {feedback, isLoading} = useContext(FeedbackContext)
    if ((!feedback || feedback.length===0) && !isLoading) // loading gif from assets folder or spinner from react-spinners
    {
        return <div className={'loading'}>
            <img src={'/assets/loading.gif'} alt={'loading'} />
        </div>
    }


    //return <div className={'feedback-list'}>
    //    {feedback.map((item) => (
    //        <div className={'feedback-item'} key={item.id}> {/* Use item.id as the key */}
    //            <FeedbackItem item={item} handleDelete={handledelete} />
    //        </div>
    //    ))}
    //</div>

    return isLoading ? (<Spinner />) : (<div className='feedback-list'>
        <AnimatePresence>
            {feedback.map((item) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    layout
                >
                    <FeedbackItem key={item.id} item={item} />
                </motion.div>
            ))}
        </AnimatePresence>
    </div>)
}

export default FeedbackList