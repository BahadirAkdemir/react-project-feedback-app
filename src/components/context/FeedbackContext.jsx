import {useState, createContext, useEffect} from "react";
import {v4 as uuidv4} from 'uuid'
import {createSearchParams} from "react-router-dom";

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchFeedback()
        console.log(feedback)
    }, [])
    const fetchFeedback = async() => {
        const response = await fetch('/feedback?_sort=id&_order=desc')
        const data = await response.json()
        setFeedback(data)
        setIsLoading(false)
    }
    const [feedback, setFeedback] = useState([])
    const addFeedback = async (tempFeedback) => {
        const response = await fetch('/feedback', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            }
            ,
            body: JSON.stringify(tempFeedback)
        })
        const data = await response.json()
        setFeedback([...feedback, data])
        }



    const deleteFeedback = (idx) => {
        if (window.confirm("Are you sure?")) {
            fetch(`/feedback/${idx}`, {
                method: 'DELETE'
            })
            setFeedback(feedback.filter((item) => item.id !== idx))
        }
    }

    const [feedbackEdit, setFeedbackEdit] = useState(
        {
            item: {},
            edit: false
        }
    )

    const editFeedback = (item) =>
    {
        setFeedbackEdit(
            {
                item,
                edit: true
            }
        )
    }

    const updateFeedback = async (id, updItem) => {
        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updItem)
        })
        const data = await response.json()
        const updatedData = feedback.map(item => item.id === id ? data : item)


        setFeedback(updatedData);
        setFeedbackEdit({
            item: {},
            edit: false,
        })
    };

     return <FeedbackContext.Provider value={{feedback,isLoading, addFeedback, deleteFeedback, editFeedback, feedbackEdit, updateFeedback}}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext