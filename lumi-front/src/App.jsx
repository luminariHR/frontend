import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
      <>
        <div className="text-3xl font-bold underline">
          Hello, Tailwind CSS!
        </div>
      </>
  )
}

export default App
