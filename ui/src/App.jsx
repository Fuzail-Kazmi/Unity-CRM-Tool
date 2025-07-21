import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/index';

import LeadPage from './features/pages/layout/lead/lead'
import LeadForm from './features/pages/layout/lead/lead_form'
import CustomerPage from './features/pages/layout/customer/customer'
import CustomerForm from './features/pages/layout/customer/customer_form'
import DashboardPage from './features/pages/layout/dashboard/dashboard';


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/lead' element={<LeadPage />} />
            <Route path='/customer' element={<CustomerPage />} />
            <Route path='/leadform' element={<LeadForm />} />
            <Route path='/customerform' element={<CustomerForm />} />
            <Route path='/dashboard' element={<DashboardPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
