import React from 'react'
import Header from '../Header/Header'
import Footers from '../Footer/Footers'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout({children}) {
  return (
    <div>
     <ToastContainer/>
     <Header/>
     <main>
        {children}
     </main>
     <Footers/>

    </div>
  )
}

export default Layout