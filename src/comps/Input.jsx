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

  return (
    <div className='bg-gray-300 p-2 flex justify-between h-16'>
      <input className='p-2' type="text" value={input} onChange={handleInputChange}/>
      <button className='border border-solid bg-blue-300 text-white p-2' onClick={handleSendClick}>Send</button>
    </div>
  )
}

export default Input