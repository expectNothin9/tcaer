import { useRef, useEffect, useState } from 'react'

const Ad = () => {
  const adRef = useRef()
  const [display, setDisplay] = useState(true)
  const handleClickOutsideCheck = (event) => {
    if (!adRef.current.contains(event.target)) {
      setDisplay(false)
    }
  }
  useEffect(() => {
    if (adRef.current) {
      document.addEventListener('mousedown', handleClickOutsideCheck)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideCheck)
    }
  })
  return display ? (
    <div ref={adRef} className="ad">
      Advertisement
    </div>
  ) : null
}

export default Ad
