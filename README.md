# bmjs-html
A JavaScript library for generating static HTML.
```javascript
const html = require('bmjs-html');
```
Create an empty document with **html.init()**:
```javascript
html.init();
```
Generates a starter webpage with basic content:
```html
<!DOCTYPE html>
<html lang="en">
<head>
<title>My website</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
<meta name="robots" content="index,follow">
<meta name="description" content="">
<meta name="url" content="">
<meta name="keywords" content="">
<meta property="og:title" content="">
<meta property="og:description" content="">
<meta property="og:url" content="">
</head>
<body>
</body>
</html>
```
Add basic meta information with **html.title(content)**, **html.description(content)** and **html.keywords(content)** plus links to CSS stylesheets as a string or array of multiple values with **html.css(stylesheets)**:
```javascript
html.init();
html.title('My web page');
html.description('This is a description of my web page...');
html.keywords('HTML,CSS,JavaScript');
html.css('styles.css');
```
Most methods return the HTML object itself and are designed to be chained together:
```javascript
html.init().title('My web page').description('This is a description of my web page...').keywords('HTML,CSS,JavaScript').css('styles.css');
```
Add HTML elements to a custom selector using **html.el(tag,selector,[classname,file])**. Returns a jQuery-like selection of the selected DOM element and optional arguments enable convenient setting of the newly created element's classname and text content using an external file:
```javascript
html.el('h1','body').text('Hello world!').addClass('text-primary p-0');
```
Add HTML templates from an external file to a custom selector using **html.add(selector,file)**:
```javascript
html.add('body','src/template.html').addClass('bg-primary p-5');
```
When you're done save the result to a file and optionally remove white space with **html.write(dir,filename,[minify])**:
```javascript
html.write('dist','index.html',true);
```
Use **html.raw(dir,filename,[minify])** for saving the body's inner HTML content without meta information, for uses such as creating template files:
```javascript
html.raw('dist','index.html');
