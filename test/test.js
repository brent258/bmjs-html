const expect = require('chai').expect;
const html = require('../index');
const fs = require('fs');

describe('HTML', () => {

  it('should return an object', () => {
    expect(html).to.be.an('object');
    expect(html).to.not.be.undefined;
  });

  it('init should create blank template HTML file from library and use for markup', () => {
    html.init();
    expect(html.markup.length > 0).to.equal(true);
    expect(html.markup).to.be.a('string');
    expect(html.$).to.be.a('function');
  });

  it('minify should remove all new line characters', () => {
    html.init();
    html.minify();
    expect(html.markup.match(/\n/)).to.equal(null);
  });

  it('format should correct formatting of html tags', () => {
    html.init();
    html.format();
    expect(html.markup.match(/></)).to.equal(null);
  });

  it('is self closing should recognize self closing tags', () => {
    expect(html.isSelfClosing('div')).to.equal(false);
    expect(html.isSelfClosing('img')).to.equal(true);
    expect(html.isSelfClosing('meta')).to.equal(true);
  });

  it('el should return a new dom selection object', () => {
    html.init();
    expect(html.el()).to.be.an('object');
  });

  it('refresh should update html', () => {
    html.init();
    let html1 = html.markup;
    html.el();
    html.el('h1').text('title').addClass('text-primary p-0');
    html.refresh();
    let html2 = html.markup;
    expect(html1).to.not.equal(html2);
  });

  it('write should save html file to path', () => {
    html.init('col_1');
    html.title('Cool title').description('A cool description.').url('mywebsite.com').keywords('html,css,javascript').css(['normalize.css','styles.css']);
    html.add('#center','div_2');
    html.write();
  });

  it('raw should save html file to path without meta tags', () => {
    html.init('col_1');
    html.add('#main','li_a');
    html.raw('','raw.html');
  });

  it('init should create custom templates', () => {
    html.init('li');
    expect(html.markup.length > 0).to.equal(true);
    expect(html.markup).to.be.a('string');
    expect(html.$).to.be.a('function');
  });


});
