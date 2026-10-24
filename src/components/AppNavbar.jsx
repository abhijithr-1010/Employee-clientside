import { NavLink } from 'react-router-dom'

export default function AppNavbar() {
  const linkClass = ({ isActive }) => `nav-link px-3 ${isActive ? 'active fw-semibold' : ''}`

  return (
    <nav className="navbar navbar-expand-sm navbar-dark app-navbar">
      <div className="container">
        <NavLink to="/" className="navbar-brand fw-bold">
          EmpHub
        </NavLink>
        <ul className="navbar-nav ms-auto flex-row">
          <li className="nav-item">
            <NavLink to="/" end className={linkClass}>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/employee-form" className={linkClass}>
              Employee Form
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}
