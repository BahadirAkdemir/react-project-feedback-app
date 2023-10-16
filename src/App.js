import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import React, {useState} from "react";
import Header from "./components/Header";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackData from "./data/FeedbackData";
import FeedbackList from "./components/FeedbackList";
import FeedbackForm from "./components/FeedbackForm";
import {v4 as uuidv4} from 'uuid'
import AboutPage from "./pages/AboutPage";
import AboutIconLink from "./pages/AboutIconLink";
import {FeedbackProvider} from  './components/context/FeedbackContext'
function App() {

    const loading = false
    const showComments = true
    const [feedback, setFeedback] = useState(FeedbackData)
    if (loading) return <h1>Loading...</h1>

    return (
        <FeedbackProvider>
        <Router>
            <Header text='Hello World' bgColor={'red'}/>
            <div className={'container'}>
                <Routes>
                    <Route exact path='/' element={
                        <>
                            <FeedbackForm />
                            <FeedbackStats />
                            <FeedbackList />
                            <AboutIconLink />
                        </>
                    }>

                    </Route>

                    <Route path='/about' element={<AboutPage/>}/>


                </Routes>
            </div>



        </Router>
        </FeedbackProvider>
    )
}

export default App