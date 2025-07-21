import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import LeadPage from './features/pages/layout/lead/lead'
import LeadForm from './features/pages/layout/lead/lead_form'
import CustomerPage from './features/pages/layout/customer/customer'
import CustomerForm from './features/pages/layout/customer/customer_form'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/lead' element={<LeadPage/>}/>
          <Route path='/customer' element={<CustomerPage/>}/>
          <Route path='/leadform' element={<LeadForm/>}/>
          <Route path='/customerform' element={<CustomerForm/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
