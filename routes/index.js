var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var parseString = require('xml2js').parseString;
/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('YES');
    let word = req.params.word;
    fetch(`http://www.stands4.com/services/v2/poetry.php?uid=5425&tokenid=yz0jaxfwyLNjBzos&term=clowns`)
        .then(function(result) {
            return result.text();
        })
        .then(function(body) {
            parseString(body, (err,info) => {
              console.log(info);
              newpoems = info.results.result.filter(element=> {
              return element.poem[0].length!=100;
              });
              selectedPoem = newpoems[Math.floor(Math.random() * newpoems.length)];
              res.json(selectedPoem);
            });
        });
});
module.exports = router;
