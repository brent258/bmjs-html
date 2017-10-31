const expect = require('chai').expect;
const html = require('../index');
const fs = require('fs');

describe('HTML', () => {

  it('should return an object', () => {
    expect(html).to.be.an('object');
    expect(html).to.not.be.undefined;
  });

  it('should generate correct values for HTML tags', () => {
    html.init();
    expect(html.tag()).to.be.an('object');
    expect(html.tag('div').close()).to.equal('<div>\n    </div>');
    expect(html.tag('div').attr('id','section').close()).to.equal('<div id="section">\n    </div>');
    expect(html.tag('div').attr('id','section').prop('active').close()).to.equal('<div id="section" active>\n    </div>');
    expect(html.tag('div').attr('id','section').attr('class','red').close()).to.equal('<div id="section" class="red">\n    </div>');
    expect(html.tag('div').attr('id','section').prop('active').text(html.tag('h1').text('Hello world!').close()).close()).to.equal('<div id="section" active>\n        <h1>Hello world!</h1>\n    </div>');
    expect(html.tag('div').attr('id','section').prop('active').open()).to.equal('<div id="section" active>');
    expect(html.tag('/div')).to.equal('</div>');
    expect(html.tag('</div>')).to.equal('</div>');
    expect(html.tag()).to.not.be.undefined;
  });

  it('add method should correctly add HTML tags to the body', () => {
    html.init().add('<h1>Hello</h1>').add('<h2>Hello</h2>');
    expect(html.body.tags.length).to.equal(2);
    expect(html.body.tags[0]).to.equal('<h1>Hello</h1>');
    expect(html.body.tags[1]).to.equal('<h2>Hello</h2>');
  });

  it('raw method should correctly add raw HTML tags to the markup', () => {
    html.init().raw('<h1>Hello</h1>').raw('<p>Some text...</p>');
    expect(html.body.tags.length).to.equal(2);
    expect(html.markup).to.equal('<h1>Hello</h1>\n<p>Some text...</p>');
  });

  it('head methods should return the correct tags and content', () => {
    html.init().title('Hello');
    expect(html.head.tags.length).to.equal(1);
    expect(html.head.tags[0]).to.equal('<title>Hello</title>');
    html.init().description('Hello');
    expect(html.head.tags.length).to.equal(1);
    expect(html.head.tags[0]).to.equal('<meta name="description" content="Hello" />');
    html.init().keywords('Hello');
    expect(html.head.tags.length).to.equal(1);
    expect(html.head.tags[0]).to.equal('<meta name="keywords" content="Hello" />');
    html.init().stylesheet('style.css');
    expect(html.head.tags.length).to.equal(1);
    expect(html.head.tags[0]).to.equal('<link rel="stylesheet" type="text/css" href="style.css" />');
  });

  it('init method should create a document with empty head and body tags', () => {
    html.init();
    expect(html.markup).to.be.a('string');
    expect(html.head.markup).to.be.a('string');
    expect(html.body.markup).to.be.a('string');
    expect(html.body.tags.length).to.equal(0);
    expect(html.head.tags.length).to.equal(0);
  });

  it('should write the generated HTML to a file', () => {
    html.init();
    let file = html.file('test/test.html');
    expect(file).to.equal(true);
    fs.readFile('test/test.html','utf8', (error,data) => {
      if (error) {
        console.log(error);
      }
      expect(data).to.not.be.undefined;
      expect(data).to.not.equal('undefined');
    });
  });

});
