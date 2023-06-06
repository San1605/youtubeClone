import React from 'react'
import Button from './Button'
const ButtonList = () => {
  const btnList = ["All", "Gaming", "Songs", "Soccer", "Live", "Cricket", "Cooking", "Valentines"]
  return (
    <div className='flex'>

      {
        btnList.map((btn) => (
          <Button name={btn} key={btn.name} />
        ))
      }

    </div>
  )
}

export default ButtonList
