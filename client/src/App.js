import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { AuthContext } from './helpers/AuthContext';

function App() {
  return (
    <div className='App'>
      <Router>
        <div className='navbar'>
          <Link to='/'>Home Page</Link>
          <Link to='/createpost'>Create a Post</Link>
          {!localStorage.getItem('accessToken') && (
            <>
              <Link to='/login'>Login</Link>
              <Link to='/registration'>Registration</Link>
            </>
          )}
        </div>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/createpost' exact component={CreatePost} />
          <Route path='/post/:id' exact component={Post} />
          <Route path='/login' exact component={Login} />
          <Route path='/registration' exact component={Registration} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
