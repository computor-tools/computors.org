import { join, parse } from 'path';
import fs from 'fs';
import https from 'https';
import replaceStream from 'replacestream';

const { readdir } = fs.promises;

const getFiles = async function* (dir, current) {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = join('./', dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res, current);
    } else {
      if (
        current
          .map(function (file) {
            return file.file;
          })
          .indexOf(res.split('docs/')[1]) === -1
      ) {
        const { name, ext } = parse(res.split('docs/')[1]);
        if (ext === '.md' || ext === '.mdx') {
          yield { file: res.split('docs/')[1], title: name.replaceAll(/-/g, ' ') };
        }
      }
    }
  }
};

(async () => {
  let current = [];
  try {
    current = JSON.parse(fs.readFileSync('./routes.json', 'utf8'));
  } catch (error) {
    return console.log(error);
  }

  const toFetch = current.filter(function (file) {
    return file.url !== undefined;
  });

  toFetch.forEach(function ({ url, file }) {
    const dest = fs.createWriteStream(join('./docs', file));
    https.get(url, function (response) {
      response
        .pipe(replaceStream('<br>', '<br />'))
        .pipe(replaceStream('```JS', '```js'))
        .pipe(dest);
    });
  });

  const files = [].concat(
    current.filter(function (file) {
      return file.url === undefined;
    })
  );

  for await (const f of getFiles('./docs', current)) {
    files.push(f);
  }

  files.forEach(function (file) {
    if (!fs.existsSync(join('./docs', file.file))) {
      files.splice(
        files.findIndex(function (file2) {
          return file2.file === file.file;
        }),
        1
      );
    }
  });

  fs.writeFile('./routes.json', JSON.stringify(files.concat(toFetch), null, 2), function (err) {
    if (err) {
      return console.log(err);
    }
  });
})();
