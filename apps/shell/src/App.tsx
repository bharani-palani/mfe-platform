/* @vite-ignore */
import React, { useEffect, useState, Suspense } from 'react'
import { Button } from '@repo/ui'
import { userStore } from '@repo/store'
const Dashboard = React.lazy(() => import('ledgerelyApp/Dashboard'))
import '@repo/tailwind-config/styles'

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const { user, setUser, logout } = userStore((state: any) => state)

  const Loader = () => <div>Loading...</div>

  useEffect(() => {
    setLoading(true)
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((json) => setData(json))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="m-4">
      <h1 className="p-5 bg-green-300 rounded-lg text-3xl py-3 px-2">
        Vite + federation + tailwind + zustand + Tanstack router + Vitest
      </h1>
      <hr className="my-3" />
      <h3 className="text-2xl">Loaded UI from packages</h3>
      <Button className="inline-flex rounded-sm cursor-pointer bg-blue-700 px-2 py-1 text-xs font-small text-white me-1">
        Click 1
      </Button>
      <Button className="inline-flex rounded-sm cursor-pointer bg-red-700 px-2 py-1 text-xs font-small text-white mx-1">
        Click 2
      </Button>
      <Button
        onClick={() => alert('i am button 3')}
        className="inline-flex rounded-sm cursor-pointer bg-green-900 px-2 py-1 text-xs font-small text-white mx-1"
      >
        Click 3
      </Button>
      <hr className="my-3" />
      <h3 className="text-2xl">Loaded Zustand from packages</h3>
      <p>User: {user}</p>
      <Button
        className="bg-green-900 rounded-sm cursor-pointer text-white px-2 py-1 text-xs font-small me-1"
        onClick={() => setUser('Bharani')}
      >
        Login
      </Button>
      <Button
        className="bg-red-900 rounded-sm cursor-pointer text-white px-2 py-1 text-xs font-small mx-1"
        onClick={() => logout()}
      >
        Logout
      </Button>
      <hr className="my-3" />
      <h3 className="text-2xl">Loaded components from MFE</h3>
      <Suspense fallback={<Loader />}>
        <Dashboard />
      </Suspense>
      <hr className="my-3" />
      <h3 className="text-2xl my-1">API call</h3>
      {loading && <Loader />}
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
