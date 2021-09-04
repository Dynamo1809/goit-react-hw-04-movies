import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
// Components //
import Navigation from 'components/Navigation';
const MoviesPage = lazy(() => import('./components/MoviesPage/' /* webpackChunkName: "movies-page" */ ));
const HomePage = lazy(() => import('./components/HomePage' /* webpackChunkName: "home-page" */ ));
const MovieDetailsPage = lazy(() => import('./components/MovieDetailsPage' /* webpackChunkName: "movie-details-page" */));

export function App() { 
    return (      
      <div className="App">
        <Navigation />
        <Suspense fallback={<h1>Loading...</h1>}>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/movies" exact component={MoviesPage} />
            <Route path="/movies/:moviesID" component={MovieDetailsPage}/>   
            <Route path="/" component={HomePage} />
          </Switch>
        </Suspense>
      </div>
    )
};