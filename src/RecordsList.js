import { useEffect, useState } from 'react'

const RecordsList = () => {
  const [records, setRecords] = useState([])
  useEffect(() => {
    fetch('https://run.mocky.io/v3/a5b3eee6-b559-49f5-8623-94827078fee3')
      .then((resp) => resp.json())
      .then((resp) => setRecords(resp.data))
  }, [])
  return (
    <ul className="records-list">
      {records.map((record) => (
        <li key={record.id}>
          {record.name} {record.date} {record.temperature}
        </li>
      ))}
    </ul>
  )
}

export default RecordsList
