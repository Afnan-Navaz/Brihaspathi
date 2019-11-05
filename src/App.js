import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/common/TopNav/TopNav.component';
import Login from './pages/Login/Login.component';
import Logout from './pages/Logout/Logout.component';
import Error from './pages/Error/Error.component';
import './App.scss';
const Home = lazy(() => import('./pages/Home/Home.component'));
const PrilimsIntermediate = lazy(() => import('./pages/Prilims/PrilimsIntermediate.component'));
const Prilims = lazy(() => import('./pages/Prilims/Prilims.component'));

const App = () => (
  <Suspense fallback={<h1>Loading</h1>}>
    <Router>
      <div>
        <Navbar/>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/logout" component={Logout}/>
          <Route exact path="/" component={Home}/>
          <Route exact path="/prelims/:event" component={PrilimsIntermediate} />
          <Route path="/prelims/:event/:question" component={Prilims}/>
          <Route component={Error} />
        </Switch>
      </div>
    </Router>
  </Suspense>
);

export default App;
