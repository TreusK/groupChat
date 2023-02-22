import { useState, useEffect } from 'react';
import axios from 'axios';

import { isMessageValid, getRandomArbitrary } from './assets/helpers';
import chatIcon from './assets/chatIcon.png';
import Input from './comps/Input';
import { MdDeleteForever } from 'react-icons/md';
import AlwaysScrollToBottom from './comps/AlwaysScrollToBottom';
import SimpleCard from './comps/SimpleCard';

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

    if (!jumpToBottom) {
      setJumpToBottom(true);
    }

    let messageObj = {
      content: message,
      userId: +userId
    }
    axios
      .post(baseUrl, messageObj)
      .then(res => {
        //notes limited to 100, both here and in the backend
        if(notes.length > 100) {
          setNotes(notes.slice(1).concat(res.data))
        } else {
          setNotes(notes.concat(res.data))
        }
      })
      .catch(err => {
        alert('Posting failed with error: ' + err)
      })
  }

  function handleDeleteMessage(note) {
    let noteId = note.id;
    let changeNoteUrl = baseUrl + `/${noteId}`;
    let modifiedNote = {...note, content: '-Message Deleted-'};

    axios
      .put(changeNoteUrl, modifiedNote)
      .then(res => {
        setNotes(notes.map(n => n.id !== noteId ? n : res.data))
      })
  }

  return (
    <div className='contentContainer bg-[#F7F7F7] text-[#202020] min-h-screen min-w-[250px]'>

      <div className='flex flex-col items-center py-24'>
        <img className='-mb-12 -ml-8' src={chatIcon} alt="chatIcon" />
        <h1 className='text-4xl h-fit'>Group Chat</h1>
      </div>

      <div className='bg-[#8D8E8F] text-[#F7F7F7] rounded mx-auto my-6 text-center p-12'>
        <div className='bg-white mx-auto w-4/5 flex justify-around'>
          <SimpleCard icon='flag'/>
          <SimpleCard icon='star'/>
          <SimpleCard icon='desktop'/>
        </div>
      </div>

      <main className='bg-[#F3F4F5] py-4'>
        <div className='text-gray-300 h-[calc(100vh-64px)] flex flex-col justify-between max-w-[800px] mx-auto'>
          <div className='messagesContainer flex flex-col justify-end overflow-auto grow'>
            {notes &&
              <ul className='overflow-auto break-words pt-4'>
                {notes.map(note =>
                  note.userId == userId
                    ? <li className={`border-gray-500 rounded border border-solid group p-2 pt-0 mb-2 mx-2 w-fit max-w-[80%] ml-auto bg-green-900`}
                      key={note.id}>
                      <div className='flex'>
                        <p className='text-[10px] select-none'>user {note.userId}</p>
                        {note.content !== '-Message Deleted-' && <MdDeleteForever className='-z-10 group-hover:z-10 cursor-pointer text-red-700 ml-auto' onClick={() => handleDeleteMessage(note)}/>}
                      </div>
                      {note.content}
                    </li>

                    : <li className={`border-gray-500 rounded border border-solid p-2 pt-0 mb-2 mx-2 w-fit max-w-[80%] mr-auto bg-gray-700`}
                      key={note.id + '' + note.userId}>
                      <div className='flex'>
                        <p className='text-[10px] select-none'>user {note.userId}</p>
                      </div>
                      {note.content}
                    </li>
                )}
                {jumpToBottom && <AlwaysScrollToBottom />}
              </ul>}
          </div>
          <Input onSendMessage={handleSendMessage} />
        </div>
      </main>

      <footer className='bg-[#202020] text-[#F7F7F7] text-xs p-2 px-6 flex flex-col items-end'>
        <p>Copyright FL&Co Incorporated</p>
        <p>Donut steel</p>
      </footer>

    </div>
  )
}



export default App