import DateCounter from './DateCounter';
import Header from './Header'
import Main from './Main'
import Loader from './Loader';
import Error from './Error';
import { useEffect, useReducer } from 'react';
import StartScreen from './StartScreen';
import Questions from './Questions'; 
import NextButton from './NextButton'; 
import Progress from './Progress';
import FinishScreen from './FinishScreen';


const initialState={
  questions:[],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0
}
function reducer(state,action){
  switch(action.type){
    case 'dataReceived':
      return{
        ...state,
        questions: action.payload,
        status: 'ready'
      }
    case 'start':
      return {
        ...state,
        status: 'active'
      }
    case "dataFailed":
      return {
        ...state,
        status: 'error'
      }
    case "newAnswer":
      const question =state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points: state.points + (action.payload === question.correctOption ?  question.points: 0)
      }
    case "nextQuestion":
      return{
        ...state,
        index: state.index +1,
        answer: null
      }
      case "finish":
      return{
        ...state,
        status: 'finished'
      }
      case "restart":
      return{
        ...initialState,
        questions: state.questions,
        status: 'ready'
      }
      default:
      throw new Error(`Unknown action type: ${action.type}`);
  }

}

  
export default function App(){
  const[{questions, status, index, answer, points},dispatch]=useReducer(reducer,initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints=questions.reduce((prev,cur)=>prev + cur.points, 0)

  useEffect(()=>{

    async function getData(){
    const response = await fetch("http://localhost:8000/questions");
    const data=await response.json()
    dispatch({type: 'dataReceived', payload: data})
    }
    getData();

  },[])
  return (
    <div className='app'>
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch}/>}
        {status ==='active' && (
          <>
            <Progress index={index} numQuestions={numQuestions} points={points} maxPossiblePoints={maxPossiblePoints} answer={answer}/>
            <Questions dispatch={dispatch} answer={answer} question={questions[index]}/>
            <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions} />

          </>
        )}
        {status === 'finished' && <FinishScreen points={points} maxPossiblePoints={maxPossiblePoints} dispatch={dispatch} />}
      </Main>
    </div>
  )
}