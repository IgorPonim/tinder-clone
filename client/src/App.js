import Home from "./pages/Home.js";
import Dashboard from './pages/Dashboard.js';
import OnBoarding from "./pages/Onboarding.js";
import { BrowserRouter, Switch, Routes, Route } from 'react-router-dom'
import { useCookies } from "react-cookie"

const App = () => {

  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const authToken = cookies.AuthToken

  return (
    <BrowserRouter>
      <Switch>

        <Route exact path={"/"} >
          <Home />
        </Route>
        {authToken && <Route exact path={"/dashboard"} >
          <Dashboard />
        </Route>}
        {authToken &&
          <Route exact path={"/onboarding"}>
            <OnBoarding />
          </Route>
        }
      </Switch>
    </BrowserRouter >
  );
}

export default App;
