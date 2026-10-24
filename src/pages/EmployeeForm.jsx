import { useState } from 'react'

const EMPTY = { name: '', designation: '', location: '', salary: '' }

export default function EmployeeForm() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [saved, setSaved] = useState(null)

  function validate(v) {
    const e = {}
    if (!v.name.trim()) e.name = 'Name is required'
    if (!v.designation.trim()) e.designation = 'Designation is required'
    if (!v.location.trim()) e.location = 'Location is required'
    if (v.salary === '') e.salary = 'Salary is required'
    else if (Number(v.salary) <= 0) e.salary = 'Salary must be more than 0'
    return e
  }

  function onChange(e) {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  function onSubmit(e) {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    // No POST needed for this assignment. Just show the data on screen.
    setSaved(values)
    setValues(EMPTY)
  }

  const fields = [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'e.g. Aleetta Joy' },
    { name: 'designation', label: 'Designation', type: 'text', placeholder: 'e.g. Software Engineer' },
    { name: 'location', label: 'Location', type: 'text', placeholder: 'e.g. Kochi' },
    { name: 'salary', label: 'Salary', type: 'number', placeholder: 'e.g. 45000' },
  ]

  return (
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <h1 className="h3 mb-4">Employee Form</h1>

        {saved && (
          <div className="alert alert-success" role="alert">
            <strong>Employee added!</strong>
            <ul className="mb-0 mt-2">
              <li>Name: {saved.name}</li>
              <li>Designation: {saved.designation}</li>
              <li>Location: {saved.location}</li>
              <li>Salary: ₹{Number(saved.salary).toLocaleString('en-IN')}</li>
            </ul>
          </div>
        )}

        <form onSubmit={onSubmit} noValidate className="card card-body shadow-sm">
          {fields.map((f) => (
            <div className="mb-3" key={f.name}>
              <label htmlFor={f.name} className="form-label">
                {f.label}
              </label>
              <input
                id={f.name}
                name={f.name}
                type={f.type}
                min={f.type === 'number' ? 1 : undefined}
                placeholder={f.placeholder}
                className={`form-control ${errors[f.name] ? 'is-invalid' : ''}`}
                value={values[f.name]}
                onChange={onChange}
              />
              <div className="invalid-feedback">{errors[f.name]}</div>
            </div>
          ))}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
