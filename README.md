<p align="center">
  <b style="font-size: 32px;">Kathari</b>
</p>

<p align="center">
  <a href="https://travis-ci.org/kleros/kathari"><img src="https://travis-ci.org/kleros/kathari.svg?branch=master" alt="Build Status"></a>
  <a href="https://david-dm.org/kleros/kathari"><img src="https://david-dm.org/kleros/kathari.svg" alt="Dependencies"></a>
  <a href="https://david-dm.org/kleros/kathari?type=dev"><img src="https://david-dm.org/kleros/kathari/dev-status.svg" alt="Dev Dependencies"></a>
  <a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="JavaScript Style Guide"></a>
  <a href="https://github.com/prettier/prettier"><img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg" alt="Styled with Prettier"></a>
  <a href="https://conventionalcommits.org"><img src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg" alt="Conventional Commits"></a>
  <a href="http://commitizen.github.io/cz-cli/"><img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg" alt="Commitizen Friendly"></a>
</p>

## Scripts

- `kathari prettify` - Apply prettier to the entire project.
- `kathari lint:sol` - Lint the entire project's `.sol` files.
- `kathari lint:scss` - Lint the entire project's `.scss` files.
- `kathari lint:styled` - Lint the entire project's `.js` files with styled components.
- `kathari lint:js [--no-root]` - Lint the entire project's `.js` files. Pass in `--no-root` if there are no `.js` files in the project root.
- `kathari commitmsg` - Lint commit messages on a githook.
- `kathari precommit` - Lint and run tests on a githook.
- `kathari cz` - Run commitizen.
