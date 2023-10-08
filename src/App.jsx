import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null);

  const passswordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789"
    if(characterAllowed) str += "!@#$%^&*()<>/{}[]"

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass = pass + str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, characterAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0,3)
    window.navigator.clipboard.writeText(password)
 }, [password])

  useEffect(() => {{
    passswordGenerator()
  }
  },[length, numberAllowed, characterAllowed, passswordGenerator])

  return (
    <div className='max-w-md w-full mx-auto rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className='text-center text-white my-3'>Password Generator</h1>
      <div className='flex rounded-lg overflow-hidden mb-4'>
        <input 
          type='text'
          placeholder='password'
          value={password}
          className='outline-none w-full px-3 py-1'
          readOnly
          ref = {passwordRef}
        />
        <button 
          onClick = {copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
      </div>

      <div className='flex text-sm gap-2'>
        <div className='flex items-center gap-1'>
          <input 
            type="range" 
            min={6} 
            max={100}
            value={length} 
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-1'>
          <input 
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
            />
          <label> Numbers</label>
        </div>
        <div className='flex items-center gap-1'>
          <input 
            type="checkbox"
            defaultChecked={characterAllowed}
            onChange={() => setCharacterAllowed((prev) => !prev)}
            />
          <label>Characters</label>
        </div>
      </div>
    </div>
      
  )
}

export default App
