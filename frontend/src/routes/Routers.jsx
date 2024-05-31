import React from 'react'
import Service from '../pages/Service'
import Signin from '../pages/Signin'
import Signup from '../pages/Signup'

import Doctors from '../pages/Doctors/Doctors'
import DoctorDetails from '../pages/Doctors/DoctorDetails'
import Index from '../pages/Index'
import MyAccount from '../../dashboard/useraccount/MyAccount'
import DoctorAccount from '../../dashboard/doctoraccount/DoctorAccount'
import {Routes,Route} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute';
import MyBooking from '../../dashboard/useraccount/MyBooking'
import Profile from '../../dashboard/useraccount/Profile'
import CheckoutSuccess from '../pages/Doctors/CheckoutSuccess'
import AdminAccount from '../../dashboard/admin/AdminAccount'
const Routers = () => {
    return<Routes>
        <Route path="/" element={<Index/>}/>
        <Route path="/index" element={<Index/>}/>
        <Route path="/doctors" element={<Doctors/>}/>
        <Route path="/service" element={<Service/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
       
        <Route path="/mybooking" element={<MyBooking/>}/>
        <Route path="/myaccount" element={<MyAccount/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/checkoutsuccess" element={<CheckoutSuccess/>}/>
        <Route path="/doctors/:id" element={<DoctorDetails/>}/>
        <Route path="/users/profile/me" element={<ProtectedRoute allowedRoles={'patient'}><MyAccount/></ProtectedRoute>}/>
        <Route path="/doctors/profile/me" element={<ProtectedRoute allowedRoles={'doctor'}><DoctorAccount/></ProtectedRoute>}/>
        <Route path="/admin/profile/me" element={<ProtectedRoute allowedRoles={'admin'}><AdminAccount/></ProtectedRoute>}/>
        
        
        
    </Routes>
    };
export default Routers;