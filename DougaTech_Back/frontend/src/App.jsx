import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Layout from './hocs/Layout';

import Home from './pages/mainPages/Home';
import SignUp from './pages/authPages/SignUp';
import Login from './pages/authPages/Login';
import AuthForm from './pages/authPages/AuthForm';
import Card from './layouts/Card';
import List from './layouts/List';


const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route exact path='/' element={<Home />}/>
            <Route exact path='/signup' element={<SignUp />}/>
            <Route exact path='/login' element={<Login />}/>
            <Route exact path='/authenticate' element={<AuthForm />}/>
            <Route exact path='/card' element={<Card />}/>
            <Route exact path='/list' element={<List />}/>
          </Routes>
        </Layout>
      </Router>
    </Provider>
  )
}

export default App
