import Card from "./shared/Card";
import {useState, useContext, useEffect} from "react";
import Button from "./Button";
import RatingSelect from "./RatingSelect";
import FeedbackContext from "./context/FeedbackContext";
function FeedbackForm() {
    const [text, setText] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [message, setMessage] = useState('')
    const [rating, setRating] = useState(10)
    const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext)

    useEffect(() => {
        if (feedbackEdit.edit === true)
        {
            setBtnDisabled(false)
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }
    }, [feedbackEdit])

    const handleTextChange = (e) => {
        if (e.target.value.length <=10)
        {
            setBtnDisabled(true)
            setMessage('review cannot be more than 10 chars')
        }
        else
        {
            setBtnDisabled(false)
            setMessage('')
        }
        setText(e.target.value)
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        if (text.length > 10) {
            const tempFeedback = {
                text,
                rating
            }
            if (feedbackEdit.edit === true)
            {
                tempFeedback.id = feedbackEdit.item.id
                updateFeedback(feedbackEdit.item.id, tempFeedback)
            }
            else{
                addFeedback(tempFeedback)
            }
            setText('')
        }
    }
    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <h2>How would you rate your service with us?</h2>
                <RatingSelect select={(rating) => setRating(rating)} />
                <div className={'input-group'}>
                    <input value={text} onChange={handleTextChange} type={'text'} placeholder={'Write a review'} />
                    <Button type={'submit'} isDisabled={btnDisabled} version={'secondary'}>Send</Button>
                </div>
                {message && <div className={'message'}>{message}</div>}
            </form>
        </Card>
    )
}

export default FeedbackForm