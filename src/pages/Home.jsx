import { useEffect, useState } from 'react'

const API_URL = 'https://jsonplaceholder.typicode.com/users'

export default function Home() {
  const [employees, setEmployees] = useState([])
  const [status, setStatus] = useState('loading') // loading | error | done
  const [query, setQuery] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadEmployees() {
      try {
        const res = await fetch(API_URL, { signal: controller.signal })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        setEmployees(data)
        setStatus('done')
      } catch (err) {
        if (err.name !== 'AbortError') setStatus('error')
      }
    }

    loadEmployees()
    return () => controller.abort()
  }, [])

  const visible = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(query.toLowerCase()) ||
      e.email.toLowerCase().includes(query.toLowerCase()),
  )

  if (status === 'loading') {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3 text-muted">Loading employees...</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="alert alert-danger" role="alert">
        Could not load employees. Check your internet and refresh the page.
      </div>
    )
  }

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h1 className="h3 mb-0">Employee Dashboard</h1>
          <small className="text-muted">{employees.length} employees</small>
        </div>
        <input
          type="search"
          className="form-control search-box"
          placeholder="Search by name or email"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {visible.length === 0 ? (
        <p className="text-muted">No employee matches your search.</p>
      ) : (
        <div className="row g-3">
          {visible.map((emp) => (
            <div className="col-12 col-sm-6 col-lg-4" key={emp.id}>
              <div className="card emp-card h-100 shadow-sm">
                <div className="card-body">
                  <span className="badge bg-primary mb-2">ID: {emp.id}</span>
                  <h2 className="h5 card-title">{emp.name}</h2>
                  <p className="card-text text-muted mb-0 text-break">{emp.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
