const fs = require('fs');
const cheerio = require('cheerio');
const temp = require('./lib/templates.js');

module.exports = {
  markup: '',
  $: null,

  init: function(template) {
    if (!template) {
      this.markup = temp.blank;
    }
    else {
      this.markup = temp[template];
    }
    this.$ = cheerio.load(this.markup);
    return this;
  },

  minify: function(markup) {
    let mutate = markup ? false : true;
    if (!markup) markup = this.markup;
    markup = markup.replace(/(\n+|\t+)/g,'');
    if (mutate) this.markup = markup;
    return markup;
  },

  format: function(markup) {
    let mutate = markup ? false : true;
    if (!markup) markup = this.markup;
    markup = markup.replace(/></g,'>\n<').replace(/\n+/g,'\n');
    let lines = markup.split('\n');
    let formatted = [];
    for (let i = 0; i < lines.length; i++) {
      if (markup.match(/^<!DOCTYPE html>/) && !lines[i].match(/(<\!DOCTYPE|<html|<\/html|<head|<\/head|<body|<\/body)/)) {
        formatted.push('\t' + lines[i]);
      }
      else {
        formatted.push(lines[i]);
      }
    }
    if (markup.match(/^<!DOCTYPE html>/)) {
      markup = formatted.join('\n')
      .replace(/(<li>)\n\t|(<td>)\n\t|(<tr>)\n\t/g,'$1')
      .replace(/\n\t(<\/li>)|\n\t(<\/td>)|\n\t(<\/tr>)/g,'$1');
    }
    else {
      markup = formatted.join('\n')
      .replace(/(<li>)\n|(<td>)\n|(<tr>)\n/g,'$1')
      .replace(/\n(<\/li>)|\n(<\/td>)|\n(<\/tr>)/g,'$1');
    }
    if (mutate) this.markup = markup;
    return markup;
  },

  isSelfClosing: function(tag) {
    if (typeof tag !== 'string') return;
    switch (tag.toUpperCase()) {
      case 'AREA':
      case 'BASE':
      case 'BR':
      case 'COL':
      case 'COMMAND':
      case 'EMBED':
      case 'HR':
      case 'META':
      case 'IMG':
      case 'INPUT':
      case 'KEYGEN':
      case 'LINK':
      case 'MENUITEM':
      case 'META':
      case 'PARAM':
      case 'META':
      case 'SOURCE':
      case 'TRACK':
      case 'WBR':
      return true;
      default: return false;
    }
  },

  el: function(tag,selector,classname,file) {
    if (this.markup && this.$) {
      if (!tag || typeof tag !== 'string') tag = 'div';
      if (!selector || typeof selector !== 'string') selector = 'body';
      if (!classname || typeof classname !== 'string') {
        classname = 'class=""';
      }
      else if (classname[0] === '#' && classname.length > 1) {
        classname = `id="${classname.slice(1)}"`;
      }
      else {
        classname = `class="${classname}"`;
      }
      if (file && file.match(/\.html$/) && !this.isSelfClosing(tag)) {
        try {
          let content = fs.readFileSync(file);
          let html = `<${tag} ${classname}>${content}</${tag}>`;
          this.$(selector).first().append(html);
          return this.$(selector).first().children().last();
        }
        catch (err) {
          throw err;
        }
      }
      else if (file && !this.isSelfClosing(tag)) {
        let content = temp[file];
        let html = `<${tag} ${classname}>${content}</${tag}>`;
        this.$(selector).first().append(html);
        return this.$(selector).first().children().last();
      }
      else {
        let html = this.isSelfClosing(tag) ? `<${tag} ${classname}>` : `<${tag} ${classname}></${tag}>`;
        this.$(selector).first().append(html);
        return this.$(selector).first().children().last();
      }
    }
  },

  add: function(selector,file) {
    if (this.markup && this.$ && selector && file) {
      if (file.match(/\.html$/)) {
        try {
          let content = fs.readFileSync(file);
          this.$(selector).first().append(content);
          return this.$(selector).first().children().last();
        }
        catch (err) {
          throw err;
        }
      }
      else {
        let content = temp[file];
        this.$(selector).first().append(content);
        return this.$(selector).first().children().last();
      }
    }
  },

  refresh: function() {
    if (this.markup && this.$) {
      this.markup = this.$.html();
    }
    return this;
  },

  write: function(dir,filename,minify) {
    if (this.markup && this.$) {
      if (!dir || typeof dir !== 'string') dir = 'dist';
      if (!filename || typeof filename !== 'string') filename = 'index.html';
      let path = dir + '/' + filename;
      this.refresh();
      this.format();
      if (minify) this.minify();
      if (!fs.existsSync(dir)) {
        fs.mkdir(dir,err => {
          if (err) throw err;
          fs.writeFile(path,this.markup,err => {
            if (err) throw err;
            console.log('Finished saving HTML to: ' + path);
          });
        });
      }
      else {
        fs.writeFile(path,this.markup,err => {
          if (err) throw err;
          console.log('Finished saving HTML to: ' + path);
        });
      }
    }
  },

  raw: function(dir,filename,minify) {
    if (this.markup && this.$) {
      if (!dir || typeof dir !== 'string') dir = 'dist';
      if (!filename || typeof filename !== 'string') filename = 'index.html';
      let path = dir + '/' + filename;
      this.refresh();
      let content = this.$('body').html();
      content = this.format(content);
      if (minify) content = this.minify(content);
      if (!fs.existsSync(dir)) {
        fs.mkdir(dir,err => {
          if (err) throw err;
          fs.writeFile(path,content,err => {
            if (err) throw err;
            console.log('Finished saving HTML to: ' + path);
          });
        });
      }
      else {
        fs.writeFile(path,content,err => {
          if (err) throw err;
          console.log('Finished saving HTML to: ' + path);
        });
      }
    }
  },

  title: function(content) {
    if (this.markup && this.$) {
      this.$('title').text(content);
      this.$('meta[name="og:title"]').attr('content',content);
    }
    return this;
  },

  description: function(content) {
    if (this.markup && this.$) {
      this.$('meta[name="description"]').attr('content',content);
      this.$('meta[name="og:description"]').attr('content',content);
    }
    return this;
  },

  url: function(content) {
    if (this.markup && this.$) {
      this.$('meta[name="url"]').attr('content',content);
      this.$('meta[name="og:url"]').attr('content',content);
    }
    return this;
  },

  keywords: function(content) {
    if (this.markup && this.$) {
      this.$('meta[name="keywords"]').attr('content',content);
    }
    return this;
  },

  css: function(stylesheets) {
    if (this.markup && this.$) {
      if (typeof stylesheets === 'string') stylesheets = [stylesheets];
      for (let i = 0; i < stylesheets.length; i++) {
        let html = `<link rel="stylesheet" type="text/css" href="${stylesheets[i]}">`;
        this.$('head').append(html);
      }
    }
    return this;
  }

};
