import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/index';

// import LeadPage from './features/pages/layout/lead/lead'
// import CustomerPage from './features/pages/layout/customer/customer'
// import DashboardPage from './features/pages/layout/dashboard/dashboard';

const LeadPage = React.lazy(() => import('@/features/pages/layout/lead/lead'))
const LeadDetail = React.lazy(()=> import('@/features/pages/layout/lead/detail'))
const CustomerPage = React.lazy(() => import('@/features/pages/layout/customer/customer'))
const DashboardPage = React.lazy(() => import('@/features/pages/layout/dashboard/dashboard'))


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/lead' element={<LeadPage />} />
            <Route path='/customer' element={<CustomerPage />} />
            <Route path='/dashboard' element={<DashboardPage />} />
            <Route path='/lead/:id' element={<LeadDetail />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
