import React from 'react'
import Header from '../Header/Header'
import Footers from '../Footer/Footers'

function Layout({children}) {
  return (
    <div>
     
     <Header/>
     <main>
        {children}
     </main>
     <Footers/>

    </div>
  )
}

export default Layout