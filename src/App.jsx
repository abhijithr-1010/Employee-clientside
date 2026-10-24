import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppNavbar from './components/AppNavbar'
import Home from './pages/Home'
import EmployeeForm from './pages/EmployeeForm'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <AppNavbar />
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee-form" element={<EmployeeForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
