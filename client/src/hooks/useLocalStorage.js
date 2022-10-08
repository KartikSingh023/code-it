// imports
import { useState, useEffect } from 'react'

// identifying prefix for keys in localStorage
const PREFIX = 'na-rce-'

// custom hook
// stores state variables in localStorage as well when their value is set
const useLocalStorage = (key, initialValue) => {
  const prefixedKey = PREFIX + key
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey)
    // if localStorage has a value at the key, return the parsed value
    if (jsonValue != null) return JSON.parse(jsonValue)
    // if initialValue is a function, return the evaluated value
    if (typeof initialValue === 'function') return initialValue()
    // else return the initialValue itself
    else return initialValue
  })

  // handle changes by storing value in localStorage
  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value))
  }, [prefixedKey, value])

  return [value, setValue]
}

export default useLocalStorage
