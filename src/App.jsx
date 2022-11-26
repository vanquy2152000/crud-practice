import Header from './components/Header'
import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import './App.scss'
import { UserContext } from './context/UserContext'
import { useContext, useEffect } from 'react'
import AppRoutes from './routes/AppRoutes'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch();
  const dataUserRedux = useSelector(state => state.user.account);
  console.log("check redux :", dataUserRedux)

  const { user, loginContext } = useContext(UserContext)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      loginContext(localStorage.getItem("email"), localStorage.getItem("token"))
    }
  }, [])

  return (
    <>
      <div className="App-container">
        <Header />
        <Container>
          <AppRoutes />
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
