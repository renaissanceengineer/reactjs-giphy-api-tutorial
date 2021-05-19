import TextList from './components/TextList'
import Error from './components/Error'
import { GiphyFetch } from '@giphy/js-fetch-api'
import {useState} from 'react'
import './App.css';

const giphy = new GiphyFetch(process.env.REACT_APP_GIPHY_KEY)

function App() {
  const [text, setText] = useState('')
  const [results, setResults] = useState([])
  const [err, setErr] = useState(false)

  const handleInput = (e) => {
    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    if(text.length === 0) {
      
      //set error state to true
      setErr(true)
      return
    }

    console.log(text)

    const apiCall = async () => {
      const res = await giphy.animate(text, {limit: 20})
      
      setResults(res.data)
    }
    
    apiCall()
    //change error state back to false
    setText('')
    setErr(false)

  }
  
  return (
    <div className="App">
      <h1>Animated Text Generator</h1>
      <h3>Type text into the form and hit submit</h3>
      <input className='input-field' value={text} onChange={handleInput} />
      <button className='submit-btn' onClick={handleSubmit}>Submit</button>
      <Error isError={err} text='need length longer than 0 for input'/>
      {results && <TextList gifs={results}  />}
    </div>
  );
}
export default App;
