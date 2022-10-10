import Home from "./pages/Home.js";
import Dashboard from './pages/Dashboard.js';
import OnBoarding from "./pages/Onboarding.js";
import { BrowserRouter, Switch, Routes, Route } from 'react-router-dom'


const App = () => {
  return (
    <BrowserRouter>
      <Switch>

        <Route exact path={"/"} >
          <Home />
        </Route>
        <Route exact path={"/dashboard"} >
          <Dashboard />
        </Route>
        <Route exact path={"/onboarding"}>
          <OnBoarding />
        </Route>

      </Switch>
    </BrowserRouter >
  );
}

export default App;
