# Angular.js 1.x: ng-dynamic-title

**ng-dynamic-title** is an angular1.x library to update the `<head>`'s `<title>` tag text on `angular-ui-router` state change event: `$stateChangeSuccess`.

[View Demo & Docs](http://clamstew.github.io/ng-dynamic-title)

---

## Install

Bower Install:

`bower install ng-dynamic-title --save`

NPM Install:

`npm i ng-dynamic-title --save`

Add dependencies to your DOM:

```html
<script src="./node_modules/angular/angular.min.js"></script>
<script src="./node_modules/angular-ui-router/release/angular-ui-router.min.js"></script>
<script src="./node_modules/ng-dynamic-title/dist/ng-dynamic-title.min.js"></script>
```

---

## Usage

**example html:**

```html
<html ng-app="myAwesomeApp">
  <head>
    <title ng-dynamic-title
           root-title="ngDynamicTitle Demo"
           sub-title="Subtitle goes here"
           separator="-" <!-- optional and default is '-' -->
           separator-tagline="-" <!-- optional and default is '-' -->
           >fallback title (tip: recommend it be same as root-title)</title>
  </head>
</html>
```

**example javascript:**

```javascript
angular.module('myAwesomeApp',[
  'ui.router',
  'ng.dynamic-title' // <-- Register ngDynamicTitle in main app module
]);

angular.module('myAwesomeApp').config([
  '$stateProvider',
  '$urlRouterProvider',
  function(
    $stateProvider,
    $urlRouterProvider
  ) {

  $urlRouterProvider.otherwise('home');

  $stateProvider
    .state('home', {
      url: '/home',
      template: 'home.html',
      data: {
        ngDynamicTitle: 'Homepage' // <-- Add data property here
      }
    });

  }
]);
```

---

Directive Options:

* `$state.current.data.ngDynamicTitle` - The page name, such as "Home", "Blog", "Contact Us", etc.  Can be used in controller/directives to change the page title on the fly.
* `root-title` - Usually the main name of the site or organization.
* `sub-title` - This is typically some sort of tagline or description
* `separator` - A separator between the page title and the site branding, typically ' - ' or ' | '
* `separator-tagline` - A separator between the site branding and the tag line, typically ' - ' or ' | '

---

# Development

Clone and run `npm install`.

Run `grunt watch` to get the build going.

To use the demo to develop with run `http-server`.

# Release

---

# Future Ideas for this lib

* could add blink
* could add a counter
* toggle between 2 strings

---

# Similar Libs / Ideas

* [ngPageTitle - only works with built in router but allows setting in controllers as well as on route setup](https://gist.github.com/hilios/34e0b9f968a4c688fc3d)
* [Set to rootscope var and bind to template](http://conceptf1.blogspot.com/2014/11/angularjs-dynamic-page-title.html)
* [npm ng-page-title on github - supports both built in router and ui-router - supports defaults only through interpolation](https://github.com/riggerthegeek/ng-page-title) & [ng-page-title on npm](https://www.npmjs.com/package/ng-page-title)
* [bowers angular-ui-router-title - recommends hooking up with state resolves - supports ui-router](https://github.com/nonplus/angular-ui-router-title)
* [ngMeta takes the approach of taking over all head tags and doing an init in the apps run block - only for built in router - neat holistic approach](http://vinaygopinath.github.io/ngMeta/#/)