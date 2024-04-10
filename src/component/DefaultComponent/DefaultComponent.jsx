import React, { createContext, Fragment, useState } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import ThemeContext from '../../hook/CountProvider'

const DefaultComponent = ({children}) => {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);
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
        <ThemeContext.Provider value={[increase,decline,count]}>
            <Header/>
            {children}
            <Footer/>
        </ThemeContext.Provider>

  )
}

export default DefaultComponent
