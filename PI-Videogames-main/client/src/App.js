import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import FormularioCreate from "./components/FormularioCreate";
import Detail from "./components/Detail";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/CreateVideoGame" component={FormularioCreate} />
          <Route exact path="/detail/:id" component={Detail} />
          <Route exact path="/notfound" component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
