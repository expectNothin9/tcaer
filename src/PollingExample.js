import { useState, useEffect } from 'react'

const PollingContent = () => {
  useEffect(() => {
    console.log('polling...')
    const timer = setInterval(() => console.log('polling...'), 5000)
    return () => clearInterval(timer)
  }, [])
  return <p>is polling...</p>
}

const PollingExample = () => {
  const [contentToggle, setContentToggle] = useState(false)
  return (
    <section className="polling-example">
      <button className="toggle-button" onClick={() => setContentToggle(!contentToggle)}>
        toggle polling content
      </button>
      {contentToggle && <PollingContent />}
    </section>
  )
}

export default PollingExample
