import { useState, useEffect } from 'react';
import axios from 'axios';
import Input from './comps/Input';
import AlwaysScrollToBottom from './comps/AlwaysScrollToBottom';

const baseUrl = 'http://localhost:3001/notes';

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(res => {
        setNotes(res.data);
      })
  }, [])

  //helper functions
  function isMessageValid(message) {
    if(message.length === 0) {return false}
    return true;
  }

  //event functions
  function handleSendMessage(message) {
    if(!isMessageValid(message)) {
      return;
    }

    let messageObj = {
      id: Math.random(),
      content: message
    }
    axios
      .post(baseUrl, messageObj)
      .then(res => {
        setNotes(notes.concat(res.data))
      })
  }

  return (
    <div className='bg-green-200 h-screen'>
      <div className='Header h-16 bg-red-300'>
        <p>hi im header</p>
      </div>

      <main className='flex flex-col justify-between w-4/5 mx-auto bg-gray-200 h-[calc(100vh-64px)]'>
        <div className='flex flex-col justify-end overflow-auto grow'>
          {notes && 
            <ul className='overflow-auto'>
              {notes.map(note => <li className='rounded border border-solid border-gray-500 p-2 mb-2'>{note.content}</li>)}
              <AlwaysScrollToBottom />
            </ul>}
        </div>
        <Input onSendMessage={handleSendMessage}/>
      </main>
    </div>
  )
}



export default App