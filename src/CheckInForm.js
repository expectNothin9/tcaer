import { useCallback, useState } from 'react'

const CheckInForm = () => {
  const [checkInName, setCheckInName] = useState('')
  const handleChangeCheckInName = useCallback((event) => {
    setCheckInName(event.target.value)
  }, [])
  return (
    <form className="check-in-form">
      <label htmlFor="check-in-name">
        Name:
        <input
          id="check-in-name"
          type="text"
          name="name"
          value={checkInName}
          onChange={handleChangeCheckInName}
          autoComplete="off"
        />
      </label>
    </form>
  )
}

export default CheckInForm
