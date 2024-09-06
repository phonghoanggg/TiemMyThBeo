import React, { createContext, Fragment, useState } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './index.css'
import ThemeContext from '../../hook/CountProvider'
const DefaultComponent = ({isAdmin,children}) => {
  const [valueSearch, setValueSearch] = useState();
  const [resultSearch, setResultSearch] = useState();
  const [count, setCount] = useState(0);
  const increase = () => {
    setCount(count + 1);
  };
  const decline = () => {
    let newCount = count - 1;
    if (newCount < 0) {
      newCount = 0;
    }
    setCount(newCount);
  };
  return (
        <ThemeContext.Provider value={{valueSearch,setValueSearch,resultSearch, setResultSearch}}>
      <Header isAdminPage={isAdmin} />
      <div
        style={{
          display: !isAdmin ?  'flex' : "unset",
          justifyContent: !isAdmin ? 'center' : "unset",
          marginTop: '106px',
          padding: isAdmin ? '0 2% 70px' : 'unset',
        }}
      >
        {children}
      </div>
      <Footer />
        </ThemeContext.Provider>

  )
}

export default DefaultComponent
