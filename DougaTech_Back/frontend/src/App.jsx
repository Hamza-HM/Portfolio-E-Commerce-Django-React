import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Layout from './hocs/Layout';

import Home from './pages/mainPages/Home';


const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route exact path='/' element={<Home />}/>
          </Routes>
        </Layout>
      </Router>
    </Provider>
  )
}

export default App
