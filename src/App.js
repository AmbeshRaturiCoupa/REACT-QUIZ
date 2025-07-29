import DateCounter from './DateCounter';
import Header from './Header'
import Main from './Main'
import Loader from './Loader';
import Error from './Error';
import { useEffect, useReducer } from 'react';
import StartScreen from './StartScreen';
import Questions from './Questions';  


const initialState={
  questions:[],
  status: 'loading',
  index: 0
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
      default:
      throw new Error(`Unknown action type: ${action.type}`);
  }

}

  
export default function App(){
  const[{questions, status, index},dispatch]=useReducer(reducer,initialState);
  const numQuestions = questions.length;
  
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
        {status ==='active' && <Questions  question={questions[index]}/>}
      </Main>


    </div>
  )
}