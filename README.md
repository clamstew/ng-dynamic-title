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

---

# Development

Clone and run `npm install`.

Run `grunt watch` to get the build going.

To use the demo to develop with run `http-server`.

# Release

---

# Ideas:

* could add blink
* could add a counter
* toggle between 2 strings