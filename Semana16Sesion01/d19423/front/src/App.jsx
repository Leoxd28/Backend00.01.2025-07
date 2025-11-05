import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Success from './components/Success'
import Cancel from './components/Cancel'
import StripePayment from './components/StripePayment'

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/success' element={<Success/>} />
            <Route path='/cancel' element={<Cancel/>} />
            <Route path='/' element={<StripePayment/>} />
        </Routes>

    </BrowserRouter>
  )}