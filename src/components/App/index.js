import './App.css';
import LandingPage from '../LandingPage';
import HomePage from '../HomePage';
import AddEntryPage from '../AddEntryPage';
import ViewEntryPage from '../ViewEntryPage';
import EditEntryPage from '../EditEntryPage';
import AuthNav from '../AuthNav';
import ProtectedRoute from '../../auth/ProtectedRoute';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink} from "@chakra-ui/react";
import { ChevronRightIcon } from '@chakra-ui/icons';
import css from './app.module.css';


function App() {
  return (
      <Router>
        <div className={css.app}>
          <div className={css.header}>
            <div className={css.authNav}>
              <AuthNav/>
            </div>

            <div className={css.navBar}>
              <Breadcrumb separator={<ChevronRightIcon color="gray.500" />}>
                  <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to="/home">
                      Home
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
            </div>
          </div>
          <Switch>
            <ProtectedRoute path="/home" component={HomePage}/>
            <ProtectedRoute path="/add-entry" component={AddEntryPage}/>
            <ProtectedRoute path="/view-entry" component={ViewEntryPage}/>
            <ProtectedRoute path="/edit-entry" component={EditEntryPage}/>
            <Route path="/" exact component={LandingPage}/>
          </Switch>
        </div>
      </Router>

  );
}

export default App;
