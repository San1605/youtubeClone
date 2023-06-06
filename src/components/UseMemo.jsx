import React, { useMemo, useState } from 'react'
import { findPrime } from "../utils/FindPrime"
const UseMemo = () => {
  const [num, setNum] = useState(0)
  const prime = useMemo(() => findPrime(num), [num])
  // const prime = findPrime(num);
  const [isDark, setDark] = useState(false);
  return (
    <div
      className={
        "m-4 p-2 w-96 h-96 border border-black " +
        (isDark && "bg-gray-900 text-white")
      }
    >
      <div>
        <button
          className="m-10 p-2 bg-black-200"
          onClick={() => setDark(!isDark)}
        >toggle</button>
      </div>
      <div>
        <input
          className="border border-black w-72 px-2"
          type="nummber"
          value={num}
          onChange={(e) => { setNum(e.target.value) }}
        />
      </div>
      <div>
        <h1 className="mt-4 font-bold text-xl">nth Prime : {prime}</h1>
      </div>
    </div>
  )
}
export default UseMemo