import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import { LoginPage, PageWrapper, MainPage, RegisterPage } from "./pages"


function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<PageWrapper/>}/>
        <Route index element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage/>}/>
        <Route path="/user" element={<MainPage /> }/>

    </Routes>
  )
}

export default App
