import { useEffect, useState } from 'react'
import Note from './Components/Note'
import { v4 as uuidv4 } from 'uuid';
import './App.css'

function App() {
  const [input, setinput] = useState('')
  const [Notes, setNotes] = useState([])

  useEffect(() => {
    let notesString = localStorage.getItem('Notes')
    if (notesString) {
      try {
        let Notes = JSON.parse(notesString)
        if (Array.isArray(Notes)) {
          setNotes(Notes)
        } else {
          setNotes([])
        }
      } catch (err) {
        console.error("Parsing error on todos from localStorage:", err)
        settodos([])
      }
    }
  }, [])


  const SaveToLS = (Notes) => {
    localStorage.setItem('Notes', JSON.stringify(Notes))
  }

  const handleDelete = (id) => {
    let newNotes = Notes.filter(item => {
      return item.id !== id
    })
    setNotes(newNotes)
    SaveToLS(newNotes)
  }

  const handleEdit = (id) => {
    let n = Notes.filter(item => item.id === id)
    setinput(n[0].input)
    let newNotes = Notes.filter(item => {
      return item.id !== id
    })
    setNotes(newNotes)
    SaveToLS(newNotes)
  }

  const handleInput = (e) => {
    const newInput = e.target.value
    setinput(newInput)
  }

  const ShowError = () => {
    alert("Sorry We are Unable to Write this!!")
    setinput('')
  }
  const handleNotes = () => {
    if (!input.trim()) return ShowError();
    if (input.length > 2000)
      return ShowError();
    // alert("Hello")
    const newNote = [...Notes, { id: uuidv4(), input }]
    setNotes(newNote)
    setinput('')
    SaveToLS(newNote)
  }

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleNotes()
    }
  }
  return (
    <>
      <div className='h-[100vh] flex justify-center items-center'>
        <div className='h-[90vh] w-[70vw] bg-[rgb(22,21,21)] rounded-2xl'>
          <div className=''>
            <div className='mainBg rounded-t-2xl pb-3'>
              <div className='flex items-center'>
                <img className='ml-4 h-15' src="./assets/Logo.png" alt="logo" />
                <h1 className='text-3xl my-3 font-bold mx-2'>Tasko</h1>
              </div>
              <h3 className='mx-8 my-3 font-semibold'>Your personal space for notes, reminders, and everything in between</h3>
            </div>
            <div className='flex flex-col sm:flex-row sm:justify-between items-center'>
              <input onKeyDown={handleEnter} onChange={handleInput} className='custom-input' value={input} placeholder='Type Here' type="text" />
              <button onClick={handleNotes} className='h-[50px] sm:mr-8 py-2 px-4 rounded-2xl w-20 cursor-pointer font-bold grad'>Save</button>
            </div>
          </div>
          <div className='max-h-[65vh] overflow-y-auto overflow-x-hidden'>
            {Notes.map(item => {
              return <Note key={item.id} data={item} handleDelete={handleDelete} handleEdit={handleEdit} />
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
