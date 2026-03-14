import { useEffect, useState } from 'react'
import { Button } from '@repo/ui'
import './App.css'

function App() {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((json) => setData(json))
  }, [])

  return (
    <section className="m-4">
      <div className="p-5 bg-red-100">Shell App</div>
      <hr className="my-3" />
      <h3>Loaded from UI package</h3>
      <Button className="inline-flex rounded-sm bg-blue-700 px-2 py-1 text-xs font-small text-white">
        Hi da
      </Button>
      <hr className="my-3" />
      <h3>API call</h3>
      <ul>
        {data &&
          data.map((item: any, i: number) => (
            <li
              className={`flex ${i % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
              key={item.id}
            >
              <div className="w-16">{item.id}</div>
              <div className="flex-1">{item.title}</div>
              <div className="w-8">{item.completed ? '✓' : '✗'}</div>
            </li>
          ))}
      </ul>
    </section>
  )
}

export default App
