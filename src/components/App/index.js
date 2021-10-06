import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import logo from '../../assets/logo.svg';
import Chat from '../Chat';

import '../../styles/App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo web agenda" />
          <h4>Agendamentos online</h4>
        </header>

        <Switch>
          <Route path={['/:username', '/']} component={Chat} />
        </Switch>

        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
