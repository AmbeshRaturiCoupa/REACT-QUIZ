function StartScreen({numQuestions,dispatch}) {
    return (
        <div className="start">
            <h2>Welcome to the Quiz App</h2>
            <h3>{numQuestions} Questions to start your React knowledge</h3>
            <button className="btn" onClick={()=>{dispatch({type: 'start'})}}>Start Quiz</button>
        </div>
    )
}

export default StartScreen  
