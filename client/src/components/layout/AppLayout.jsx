import React from 'react'
import Header from './Header'

const AppLayout = () => (Component) => {
     return (props) => {
        return <div>
            <Header/>
            <Component {...props}/>
            <div>footer</div>
        </div>
    }
  }


export default AppLayout
