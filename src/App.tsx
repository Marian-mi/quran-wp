import React, { Fragment, lazy, Suspense } from 'react';
import './scss/home-page.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Homepage from './Components/Pages/HomePage';
import SooreList from './Components/Pages/SooreList';

const Search = lazy(() => import('./Components/Pages/SearchPage'));
const AyatPage = lazy(() => import('./Components/Pages/AyatPage'));

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
                            <SooreList />
                        </>
                    )}
                />
                <Suspense fallback={<div className="spinner"><FontAwesomeIcon icon={faSpinner} /></div>}>
                    <Route path="/Aye" exact={false} component={AyatPage} />
                    <Route path="/Search" component={Search} />
                </Suspense>
            </Switch>
        </Router>
    );
}

export default App;
