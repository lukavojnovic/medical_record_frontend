import React from "react";
import Navigation from "./components/Navigation";
import {QueryClient, QueryClientProvider} from "react-query";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Doctor from "./components/Doctor";
import Personal from "./components/Personal";
import { ReactQueryDevtools } from 'react-query/devtools'
import NewPatientForm from "./components/NewPatientForm";
import Login from "./components/Login";

export const queryClient = new QueryClient();

const App = () => {
    return (
        <>

            <QueryClientProvider client={queryClient}>
                <Router>
                    <Switch>
                        <Route path='/patient/:id'>
                            <Navigation />
                            <Personal/>
                        </Route>
                        <Route path='/doctors/newpat' exact={true}>
                            <Navigation />
                            <NewPatientForm/>
                        </Route>
                        <Route path='/doctors' exact={true}>
                            <Navigation />
                            <Doctor />
                        </Route>
                        <Route path='/' exact={true}>
                            <Login />
                        </Route>
                    </Switch>
                </Router>
                <ReactQueryDevtools initialIsOpen={false} />

            </QueryClientProvider>

        </>

    );
};

export default App;
