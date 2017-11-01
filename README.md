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
<html lang="eng">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

</head>
<body>

</body>
</html>
```
Add basic meta information with **html.title()**, **html.description()** and **html.keywords()** plus external CSS with **html.stylesheet()**:

```javascript
html.init();
html.title('My web page');
html.description('This is a description of my web page...');
html.keywords('HTML,CSS,JavaScript');
html.stylesheet('styles.css');
```
Most methods return the HTML object itself and are designed to be chained together:

```javascript
html.init().title('My web page').description('This is a description of my web page...').keywords('HTML,CSS,JavaScript').stylesheet('styles.css');
```
Add HTML elements to the body using **html.add()**:

```javascript
html.add('<h1>Hello world</h1>').add('<p>Welcome to my web page...</p>');
```
The library also has a **html.tag()** method that returns an object for dynamically creating HTML elements:

```javascript
let h1 = html.tag('h1') // Initializes the tag object
.attr('id','title').attr('class','text-primary') // Add attributes with the attr() method
.prop('active') // Or boolean properties with the prop() method
.text('Hello world!').text('<span>This is an element inside an element</span>') // Add inner text or other HTML elements with the text() method
.close(); // Finalize the element and convert the result to a string
html.add(h1); // Add to the web page body
```
Output:

```html
<h1 id="title" class="text-primary" active>Hello world!<span>This is an element inside an element</span></h1>
```
The **html.tag.read()** method allows you to retrieve HTML templates or plain text from an external file, in place of the **html.tag.text()** method:

```javascript
let h1 = html.tag('h1').read('title.txt').close();
```
The **html.minify()** method allows you to compress the file by removing white space:

```javascript
html.minify();
```
Output:

```html
<!DOCTYPE html><html lang="eng"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" /><title>My webpage</title><link rel="stylesheet" type="text/css" href="styles.css" /></head><body><h1 id="title" class="text-primary" active>Hello world!<span>This is an element inside an element</span></h1></body></html>
```
When you're done save the result to a file with **html.file()** (make sure if saving into a folder that the folder exists first):

```javascript
html.file('index.html');
```
If you don't need the boilerplate head and body tags (like when creating Angular templates) use **html.raw()** for creating a document with just the dynamic HTML tags:

```javascript
html.init();
let h1 = html.tag('h1').attr('class','heading').text('{{title}}').close();
let h2 = html.tag('h2').attr('class','subheading').text('{{subtitle}}').close();
html.raw(h1).raw(h2).minify();
html.file('template.html');
```
Always remember the **html.tag.close()** method, or things won't work. Output:

```html
<h1 class="heading">{{title}}</h1><h2 class="subheading">{{subtitle}}</h2>
```
