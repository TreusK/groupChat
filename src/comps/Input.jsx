import { useState } from 'react';

function Input({onSendMessage}) {
  const [input, setInput] = useState('');

  //event function
  function handleInputChange(e) {
    setInput(e.target.value);
  }

  function handleSendClick() {
    onSendMessage(input);
    setInput('');
  }

  function handleEnter(e) {
    if(e.key == 'Enter') {
      handleSendClick();
    }
  }

  return (
    <div className='bg-gray-800 p-2 flex justify-between h-16'>
      <input className='text-black p-2 mr-2 flex-1' type="text" value={input} onChange={handleInputChange} onKeyDown={handleEnter}/>
      <button className='border border-solid bg-cyan-700 rounded text-white p-2' onClick={handleSendClick}>Send</button>
    </div>
  )
}

export default Input