import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import UserDetail from './UserDetail';

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo web agenda" />
        </header>
        <Switch>
          <Route path={'/:group'} component={UserDetail}></Route>
          <Route path={'/'} component={UserDetail}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
