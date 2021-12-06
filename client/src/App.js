import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [authState, setAuthState] = useState({
    username: '',
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get('http://localhost:3001/auth/auth', {
        headers: { accessToken: localStorage.getItem('accessToken') },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem('accessToken');
    setAuthState({ username: '', id: 0, status: false });
  };

  return (
    <div className='App'>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className='navbar'>
            <Link to='/'>Home Page</Link>
            <Link to='/createpost'>Create a Post</Link>
            {!authState.status ? (
              <>
                <Link to='/login'>Login</Link>
                <Link to='/registration'>Registration</Link>
              </>
            ) : (
              <button onClick={logout}>Logout</button>
            )}
            <h3>{authState.username}</h3>
          </div>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/createpost' exact component={CreatePost} />
            <Route path='/post/:id' exact component={Post} />
            <Route path='/login' exact component={Login} />
            <Route path='/registration' exact component={Registration} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
