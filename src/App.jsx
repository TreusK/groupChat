
let notes = [
  {
    id: 22,
    content: "test message",
  },
  {
    id: 2,
    content: "cyndaquill is a cute pokemon",
  },
  {
    id: 4,
    content: "today i read chapter 44something of kkkb",
  },
  {
    id: 5,
    content: "poop",
  },
  {
    id: 66,
    content: "romeo romeo donde estas que no te veo!",
  }
];

function App() {
  return (
    <div>
      <div className='Header h-24 bg-red-300'>
        <p>hi im header</p>
      </div>

      <main className='w-4/5 mx-auto bg-green-300'>
        <ul>
          {notes.map(note => <li>{note.content}</li>)}
        </ul>
      </main>
    </div>
  )
}

export default App