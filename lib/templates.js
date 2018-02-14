const fs = require('fs');

module.exports = {
  blank: fs.readFileSync('lib/blank.html','utf8'),
  ul: fs.readFileSync('lib/ul.html','utf8'),
  ol: fs.readFileSync('lib/ol.html','utf8'),
  li: fs.readFileSync('lib/li.html','utf8'),
  li_a: fs.readFileSync('lib/li-a.html','utf8'),
  col_1: fs.readFileSync('lib/col-1.html','utf8'),
  col_2: fs.readFileSync('lib/col-2.html','utf8'),
  col_3: fs.readFileSync('lib/col-3.html','utf8'),
  div_1: fs.readFileSync('lib/div-1.html','utf8'),
  div_2: fs.readFileSync('lib/div-2.html','utf8'),
  div_3: fs.readFileSync('lib/div-3.html','utf8'),
  div_4: fs.readFileSync('lib/div-4.html','utf8'),
  div_5: fs.readFileSync('lib/div-5.html','utf8'),
};
