import Header from './components/Header'
import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import './App.scss'
import { useEffect } from 'react'
import AppRoutes from './routes/AppRoutes'
import { useDispatch, useSelector } from 'react-redux'
import { handleReFresh } from './redux/actions/userAction'

const App = () => {
  const dispatch = useDispatch();
  const dataUserRedux = useSelector(state => state.user.account);
  console.log("check redux :", dataUserRedux)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(handleReFresh());
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
