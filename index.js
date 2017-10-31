const fs = require('fs');

module.exports = {
  markup: '',
  init: function() {
    this.markup = '';
    this.head.empty();
    this.body.empty();
    this.head.set();
    this.body.set();
    this.set();
    return this;
  },
  minify: function() {
    this.markup = this.markup.replace(/(\n\s\s\s\s|\n|\n\s\s\s\s\s\s\s\s|\s\s\s\s)/g,'');
    return this;
  },
  set: function() {
    this.markup = this.head.markup + this.body.markup;
  },
  head: {
    tags: [],
    markup: '',
    set: function() {
      this.markup =
      `<!DOCTYPE html>${'\n'}<html lang="eng">${'\n'}<head>${'\n    '}<meta charset="utf-8" />${'\n    '}<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />${'\n    '}${this.tags.join('\n    ')}${'\n'}</head>${'\n'}`;
    },
    empty: function() {
      this.markup = '';
      this.tags = [];
    }
  },
  title: function(content) {
    let element = `<title>${content||''}</title>`;
    this.head.tags.push(element);
    this.head.set();
    this.set();
    return this;
  },
  description: function(content) {
    let element = `<meta name="description" content="${content||''}" />`;
    this.head.tags.push(element);
    this.head.set();
    this.set();
    return this;
  },
  keywords: function(content) {
    let element = `<meta name="keywords" content="${content||''}" />`;
    this.head.tags.push(element);
    this.head.set();
    this.set();
    return this;
  },
  stylesheet: function(content) {
    let element = `<link rel="stylesheet" type="text/css" href="${content||''}" />`;
    this.head.tags.push(element);
    this.head.set();
    this.set();
    return this;
  },
  body: {
    tags: [],
    markup: '',
    set: function() {
      this.markup =
      `<body>${'\n    '}${this.tags.join('\n    ')}${'\n'}</body>${'\n'}</html>`;
    },
    empty: function() {
      this.markup = '';
      this.tags = [];
    }
  },
  add: function(tag) {
    if (tag && typeof tag === 'string') {
      this.body.tags.push(tag);
      this.body.set();
      this.set();
    }
    return this;
  },
  raw: function(tag) {
    if (tag && typeof tag === 'string') {
      this.body.tags.push(tag);
      this.markup = this.body.tags.join('\n');
    }
    return this;
  },
  tag: function(tagName) {
    if (!tagName || typeof tagName !== 'string') {
      tagName = 'div';
    }
    tagName = tagName.replace(/(<|>)/g,'');
    if (tagName[0] === '/') {
      return `<${tagName}>`;
    }
    return {
      typographyTags: ['h1','h2','h3','h4','h5','h6','p','span','td','tr','th','a','li','i','blockquote'],
      selfClosingTags: ['meta','img','hr','br','input','embed'],
      tag: tagName,
      attributes: [],
      properties: [],
      content: [],
      attr: function(attribute,value) {
        if (attribute && value) {
          this.attributes.push(`${attribute}="${value}"`);
        }
        return this;
      },
      prop: function(property) {
        if (property) {
          this.properties.push(property);
        }
        return this;
      },
      text: function(content) {
        if (content) {
          if (this.typographyTags.includes(this.tag)) {
            this.content.push(content);
          }
          else {
            this.content.push(`${'\n        '}${content}`);
          }
        }
        return this;
      },
      close: function() {
        let startTag = '';
        if (this.attributes.length > 0 && this.properties.length > 0) {
          startTag = `<${this.tag} ${this.attributes.join(' ')} ${this.properties.join(' ')}`;
        }
        else if (this.attributes.length > 0 && !this.properties.length) {
          startTag = `<${this.tag} ${this.attributes.join(' ')}`;
        }
        else if (!this.attributes.length && this.properties.length > 0) {
          startTag = `<${this.tag} ${this.properties.join(' ')}`;
        }
        else {
          startTag =`<${this.tag}`;
        }
        if (!this.selfClosingTags.includes(this.tag)) {
          startTag += '>';
        }
        let endTag = '';
        if (this.selfClosingTags.includes(this.tag)) {
          endTag = ' />';
        }
        else {
          endTag = `</${this.tag}>`;
        }
        if (!this.typographyTags.includes(this.tag) && !this.selfClosingTags.includes(this.tag)) {
          return `${startTag}${(this.content.join('')||'')}${'\n    '}${endTag}`;
        }
        else if (this.typographyTags.includes(this.tag)) {
          return `${startTag}${(this.content.join('')||'')}${endTag}`;
        }
        else if (this.selfClosingTags.includes(this.tag)) {
          return `${startTag}${endTag}`;
        }
      },
      open: function() {
        let startTag = '';
        if (this.attributes.length > 0 && this.properties.length > 0) {
          startTag = `<${this.tag} ${this.attributes.join(' ')} ${this.properties.join(' ')}`;
        }
        else if (this.attributes.length > 0 && !this.properties.length) {
          startTag = `<${this.tag} ${this.attributes.join(' ')}`;
        }
        else if (!this.attributes.length && this.properties.length > 0) {
          startTag = `<${this.tag} ${this.properties.join(' ')}`;
        }
        else {
          startTag =`<${this.tag}`;
        }
        if (!this.selfClosingTags.includes(this.tag)) {
          startTag += '>';
        }
        return startTag;
      }
    }
  },
  file: function(path) {
    if (path && this.markup) {
      try {
        fs.writeFile(path,this.markup);
      }
      catch (error) {
        console.log(error);
      }
      return true;
    }
  }
};
