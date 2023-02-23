import { useState, useEffect } from 'react';
import axios from 'axios';

import { isMessageValid, getRandomArbitrary } from './assets/helpers';
import chatIcon from './assets/chatIcon.png';
import Input from './comps/Input';
import { RiCloseCircleFill } from 'react-icons/ri';
import AlwaysScrollToBottom from './comps/AlwaysScrollToBottom';
import SimpleCard from './comps/SimpleCard';

const baseUrl = '/api/notes';

function App() {
  const [notes, setNotes] = useState([]);
  const [userId, setUserId] = useState(null);
  const [jumpToBottom, setJumpToBottom] = useState(false);

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

      <div className='flex flex-col items-center py-24 h-[50vh]'>
        <img className='-mb-12 -ml-8' src={chatIcon} alt="chatIcon" />
        <h1 className='text-4xl h-fit'>Group Chat</h1>
      </div>

      <div className='text-[#202020] flex justify-center text-center p-12'>
        <div className='flex flex-col justify-around items-center gap-6 md:gap-0 w-full max-w-5xl md:flex-row'>
          <SimpleCard icon='flag'/>
          <SimpleCard icon='star'/>
          <SimpleCard icon='desktop'/>
        </div>
      </div>

      <main className='bg-[#d4d4d4] pt-16 pb-6'>
        <div className='text-gray-300 h-[calc(100vh-64px)] flex flex-col justify-between max-w-[800px] mx-auto'>
          <div className='messagesContainer flex flex-col justify-end overflow-auto grow rounded-t-md'>
            {notes &&
              <ul className='overflow-auto break-words pt-4'>
                {notes.map(note =>
                  note.userId == userId
                    ? <li className={`border-gray-500 rounded border border-solid group p-2 pt-0 mb-2 mx-2 w-fit max-w-[80%] ml-auto bg-green-900`}
                      key={note.id}>
                      <div className='flex'>
                        <p className='text-[10px] select-none'>user {note.userId}</p>
                        {note.content !== '-Message Deleted-' && <RiCloseCircleFill className='-z-10 group-hover:z-10 cursor-pointer text-red-700 ml-auto -mr-3 -mt-1' onClick={() => handleDeleteMessage(note)}/>}
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
        <p>2023</p>
      </footer>

    </div>
  )
}



export default App