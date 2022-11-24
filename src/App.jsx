import Header from './components/Header'
import TableUser from './components/TableUser'
import { Container } from 'react-bootstrap'
import './App.scss'
import { ToastContainer } from 'react-toastify'

const App = () => {

  return (
    <>
      <div className="App-container">
        <Header />
        <Container>
          <TableUser />
        </Container >
      </div >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App
