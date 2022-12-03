import React from 'react'
import './FloatingInput.scss'


const FloatingInput = ({type, name, title, value, setValue, ...rest}) => {
  return (
    <div className="floatingInput">
      <input
        // onChange={e => setValue(e.target.value)}
        value={value}
        type={type}
        className="floatingInput__input"
        name={name}
        id={name}
        placeholder=" "
        {...rest}
      />
      <label htmlFor={name} className="floatingInput__label">
        {title}
      </label>
    </div>
  )
}

export default FloatingInput
