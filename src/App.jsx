
import './App.css'
import Footer from './Components/Footer'
import Manager from './Components/Manager'
import Navbar from './Components/navbar'

function App() {

  return (
    <>
      <Navbar/>
      <div className='min-h-[calc(100vh-3.5rem)]'>

      <Manager/>     
      </div>
      <Footer/>
    </>
  )
}

export default App
