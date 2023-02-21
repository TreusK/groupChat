import { useState, useEffect } from 'react';
import axios from 'axios';
import { isMessageValid, getRandomArbitrary } from './assets/helpers';
import Input from './comps/Input';
import AlwaysScrollToBottom from './comps/AlwaysScrollToBottom';

const baseUrl = 'http://localhost:3002/api/notes';

function App() {
  const [notes, setNotes] = useState([]);
  const [userId, setUserId] = useState(null);
  const [jumpToBottom, setJumpToBottom] = useState(false);

  let userMessageStyle = ' ml-auto bg-green-900 ';
  let otherMessageStyle = ' mr-auto bg-gray-700 ';

  //get notes from server and userId if it exists
  useEffect(() => {
    axios
      .get(baseUrl)
      .then(res => {
        setNotes(res.data);
      })
      .catch(err => {
        alert('Getting messages from the server failed with error: ' + err)
      })
    let localUserId = localStorage.getItem('userId');
    if (!localUserId) {
      let newUserId = getRandomArbitrary(1, 10000);
      localStorage.setItem('userId', newUserId);
      setUserId(newUserId)
    } else {
      setUserId(localUserId);
    }
  }, [])


  //event functions
  function handleSendMessage(message) {
    if (!isMessageValid(message)) {
      console.log('not valid!')
      return;
    }

    if(!jumpToBottom) {
      setJumpToBottom(true);
    }

    let messageObj = {
      content: message,
      userId: userId
    }
    axios
      .post(baseUrl, messageObj)
      .then(res => {
        setNotes(notes.concat(res.data))
      })
      .catch(err => {
        alert('Posting failed with error: ' + err)
      })
  }

  return (
    <div className='contentContainer bg-zinc-100 min-h-screen min-w-[250px]'>

      <h1 className='text-4xl pt-16 mb-4 mx-auto w-fit text-center'>Group Chat with strangers!</h1>
      <div className='bg-black w-[300px] h-1 mx-auto mb-12'></div>

      <div className='bg-gray-100/80 w-1/2 mx-auto my-6 text-center p-12'>
        <p className='mb-4'>Like WhatsApp, but better!</p>
        <p className='text-left'>Featuring:</p>
        <ul className='text-left pl-4'>
          <li>Unique Ids!</li>
          <li>Img uploading</li>
          <li>Emoticons!</li>
        </ul>
      </div>

      <main className='text-gray-300 h-[calc(100vh-64px)] flex flex-col justify-between max-w-[800px] mx-auto'>
        <div className='messagesContainer flex flex-col justify-end overflow-auto grow'>
          {notes &&
            <ul className='overflow-auto break-words pt-4'>
              {notes.map(note =>
                <li className={`border-gray-500 rounded border border-solid p-2 pt-0 mb-2 mx-2 w-fit max-w-[80%] ${note.userId == userId ? userMessageStyle : otherMessageStyle}`}
                  key={note.id}>
                  <p className='text-[10px]'>user {note.userId}</p>
                  {note.content}
                </li>
              )}
              {jumpToBottom && <AlwaysScrollToBottom />}
            </ul>}
        </div>
        <Input onSendMessage={handleSendMessage} />
      </main>
      
      <footer className='bg-sky-800 text-gray-200 text-xs p-2 px-6 mt-2 flex flex-col items-end'>
        <p>Copyright FL&Co Incorporated</p>
        <p>Donut steel</p>
      </footer>

    </div>
  )
}



export default App