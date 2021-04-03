import './App.css';
import LandingPage from '../LandingPage';
import HomePage from '../HomePage';
import AddEntryPage from '../AddEntryPage';
import ViewEntryPage from '../ViewEntryPage';
import EditEntryPage from '../EditEntryPage';
import AuthButton from '../AuthButton';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AuthProvider } from "../../authContext";

import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator} from "@chakra-ui/react";


function App() {
  return (
    <AuthProvider>
      <Router>
        <AuthButton/>

        <Breadcrumb separator="-">
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/">
              Landing Page
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/home">
              Home0
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/add-entry">
              Add Entry
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/view-entry">
              View Entry
            </BreadcrumbLink>
          </BreadcrumbItem>
          
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/edit-entry">
              Edit Entry
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Switch>
          <Route path="/home">
              <HomePage/>
          </Route>

          <Route path="/add-entry">
              <AddEntryPage/>
          </Route>

          <Route path="/view-entry">
              <ViewEntryPage/>
          </Route>

          <Route path="/edit-entry">
              <EditEntryPage/>
          </Route>

          <Route path="/">
              <LandingPage/>
          </Route>
        </Switch>

      </Router>
    </AuthProvider>
  );
}

export default App;
