# resx-translations-editor

Resx files editor made in Angular

This is a small app I made for fun. Feel free to use it or improve it.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.5.

[Demo here](https://catherinearnould.com/autres/resx/)

Warning:
* Requires typescript 2.5.2 due to [ngx-modialog issue](https://github.com/shlomiassaf/ngx-modialog/issues/400)
* Small console error with `ng serve` on file upload due to the [primeng fileUploadModule](https://www.primefaces.org/primeng/#/fileupload), but doesn't impact anything (doesn't find a file in /assets, can't figure out why)


## Development server

Run `ng serve` or `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
