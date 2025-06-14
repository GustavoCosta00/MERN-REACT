import { Box } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import Navbar from "./components/Navbar"
import Edit from "./pages/Edit"


function App() {

  return (
    <Box minH={"100vh"}>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />}/>
       
        <Route path="/create" element={<CreatePage />}/>

        <Route path="/edit/:id" element={<Edit />}/>

      </Routes>
    </Box>
  )
}

export default App
