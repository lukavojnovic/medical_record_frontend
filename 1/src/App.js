import React from "react";
import Navigation from "./components/Navigation";
import {QueryClient, QueryClientProvider} from "react-query";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Doctor from "./components/Doctor";
import Personal from "./components/Personal";
import { ReactQueryDevtools } from 'react-query/devtools'
import NewPatientForm from "./components/NewPatientForm";
import Login from "./components/Login";
import EditPatientForm from "./components/EditPatientForm";
import AllDoctors from "./components/AllDoctors";
import NewDoctorForm from "./components/NewDoctorForm";
import EditDoctorForm from "./components/EditDoctorForm";

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
                        <Route path='/doctor/patient/:id' exact={true}>
                            <Navigation />
                            <Personal/>
                        </Route>
                        <Route path='/doctor/:id/newpat' exact={true}>
                            <Navigation />
                            <NewPatientForm/>
                        </Route>
                        <Route path='/doctor/:id/editpat'>
                            <Navigation />
                            <EditPatientForm/>
                        </Route>
                        <Route path='/doctor/:id' exact={true}>
                            <Navigation />
                            <Doctor />
                        </Route>
                        <Route path='/doctors' exact={true}>
                            <Navigation />
                            <AllDoctors />
                        </Route>
                        <Route path='/doctors/newdoc' exact={true}>
                            <Navigation />
                            <NewDoctorForm/>
                        </Route>
                        <Route path='/doctors/editdoc/:id' exact={true}>
                            <Navigation />
                            <EditDoctorForm/>
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
