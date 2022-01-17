import React, { useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import './fonts.css';
import 'highlight.js/styles/github-dark.css';
import routes from './routes.js';
import path from 'path';
import Main from './Components/Main';
import Layout from './Components/Layout';
import Home from './Components/Home';

const App = function () {
  const i = useRef(0);

  let prevRoute;

  const constructRoutes = function (categories, p = '') {
    return Object.values(categories).map(function (category, j) {
      return (
        <Route key={j} path={path.join('/', p, category.name.toLowerCase())}>
          {category.routes.map(function (route, k) {
            let nextRoute =
              category.routes[k + 1] ||
              Object.values(categories)[j + 1]?.routes[0] ||
              (Object.values(categories)[j + 1]?.categories &&
                Object.values(Object.values(categories)[j + 1]?.categories)[0]?.routes[0]);
            if (nextRoute?.file === route.file) {
              nextRoute =
                category.routes[k + 2] ||
                Object.values(categories)[j + 2]?.routes[0] ||
                (Object.values(categories)[j + 2]?.categories &&
                  Object.values(Object.values(categories)[j + 2]?.categories)[0]?.routes[0]);
            }
            const routeElement = (
              <Route
                key={j}
                index={route.index}
                path={route.index === true ? undefined : route.path}
                element={
                  route.element || (
                    <Main
                      prevRoute={prevRoute}
                      nextRoute={nextRoute}
                      category={category.name}
                      path={route.path}
                      file={route.file}
                      url={route.url}
                      ext={route.ext}
                      i={i}
                      nonEditable={route.nonEditable}
                    />
                  )
                }
              />
            );

            if (!route.index) {
              prevRoute = route;
            }

            return routeElement;
          })}
          {Object.keys(category.categories).length > 0 &&
            constructRoutes(category.categories, (p += '/' + category.name.toLowerCase()))}
        </Route>
      );
    });
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {constructRoutes(routes.categories)}
      </Route>
    </Routes>
  );
};

export default App;
