import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from './Component/Home';
import QuizInstructions from './Component/QuizInstructions';
import Play from './Component/Play';
import Result from './Component/Result';
import Login from './Component/Login';
import SignUp from './Component/SignIn';
import { createContext, useState } from "react";
import AdminPanel from "./Component/AdminPanel";

// Exporting MyContext
export const MyContext = createContext();

function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = localStorage.getItem("token"); 
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

function App() {
  const [isHeaderFooter, setIsHeaderFooter] = useState(true);

  return (
    <MyContext.Provider value={{ isHeaderFooter, setIsHeaderFooter }}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/play/instructions" component={QuizInstructions} />
          <PrivateRoute exact path="/play/play" component={Play} />
          <Route exact path='/admin' component={AdminPanel} />
          <Route exact path="/result" component={Result} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </Router>
    </MyContext.Provider>
  );
}

export default App;


