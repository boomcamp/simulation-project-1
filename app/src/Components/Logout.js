import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom'




export default function SimpleTable() {

  const [redirect, setredirect] = useState(false)

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to={{
        pathname: '/',
        state: { status: false }
      }} />
    }
  }

  const logoutFn=()=>{
    localStorage.removeItem("accessToken")
    setredirect(true)
  }

  useEffect(() => {
    logoutFn();
  }, []);

  return(
    <div>
      {renderRedirect()}
      
    </div>
  )

}