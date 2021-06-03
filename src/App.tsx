import React, { lazy, Suspense } from 'react';
import './scss/home-page.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './Components/Pages/HomePage';

const SooreList = React.lazy(() => import(/* webpackPrefetch: true */'./Components/Pages/SooreList'));
const Search = lazy(() => import(/* webpackPrefetch: true */'./Components/Pages/SearchPage'));
const AyatPage = lazy(() => import(/* webpackPrefetch: true */ './Components/Pages/AyatPage'));

function App(): JSX.Element {
    return (
        <Router>
            <Switch>
                <Route
                    path="/"
                    exact
                    component={() => (
                        <>
                            <Homepage />
                            <Suspense fallback={<div />}><SooreList /></Suspense>
                        </>
                    )}
                />
                <Suspense fallback={<div className="home-page-spinner">
                    <div></div>
                    <div></div>
                </div>}>
                    <Route path="/Aye/:sooreNumber" exact={false} component={AyatPage} />
                    <Route path="/Search" component={Search} />
                </Suspense>
            </Switch>
        </Router>
    );
}




export default App;
