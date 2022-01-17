import path from 'path';
import Routes from '../routes.json';

export default (function constructRoutes() {
  const routes = { categories: {} };

  Routes.forEach(function (route, i) {
    const { title, file, url } = route;
    const { dir, name, ext } = path.parse(file);
    const categories = dir.split('/');
    const category = categories[categories.length - 1];

    let current = routes;

    categories.forEach(function (category2) {
      if (current.categories[category2] === undefined) {
        current.categories[category2] = { name: category2, categories: {}, routes: [], i };
        if (category !== category2) {
          current = current.categories[category2];
          return;
        }
      }

      const index = current.categories[category2].routes.length === 0;
      const route = {
        category,
        name: title,
        path:
          current.categories[category2].routes.length === 0
            ? undefined
            : path.join('/', dir.toLowerCase(), name.toLowerCase()),
        file: path.join('/', dir, name),
        url: path.join('/', dir, name),
        ext: ext.slice(1),
        nonEditable: url !== undefined,
        index,
      };

      current.categories[category2].routes.push(route);

      if (index) {
        current.categories[category2].routes.push({
          ...route,
          path: path.join('/', dir.toLowerCase(), name.toLowerCase()),
          index: false,
        });
      }

      current = current.categories[category2];
    });
  });

  return routes;
})();
