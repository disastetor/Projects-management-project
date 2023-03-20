import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

//Pages and components
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Create from "./pages/Create/Create";
import Project from "./pages/Project/Project";
import Signup from "./pages/Signup/Signup";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import OnlineUsers from "./components/OnlineUsers";

function App() {
  const { user, authIsReady } = useAuthContext();
  return (
    <div className="App">
      {/* Render only after it understand if the user is logged in or not */}
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className="container">
            <Navbar />
            <Switch>
              {/* Dashboard */}
              <Route exact path="/">
                {!user && <Redirect to="/login" />}
                {user && <Dashboard />}
              </Route>

              {/* Login */}
              <Route path="/login">
                {user && <Redirect to="/" />}
                {!user && <Login />}
              </Route>

              {/* Signup */}
              <Route path="/signup">
                {user && <Redirect to="/" />}
                {!user && <Signup />}
              </Route>

              {/* Create */}
              <Route path="/create">
                {!user && <Redirect to="/login" />}
                {user && <Create />}
              </Route>

              {/* Project */}
              <Route path="/projects/:id">
                {!user && <Redirect to="/login" />}
                {user && <Project />}
              </Route>
            </Switch>
          </div>
          {user && <OnlineUsers/>}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
