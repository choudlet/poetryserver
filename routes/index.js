var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var parseString = require('xml2js').parseString;
/* GET home page. */
router.get('/', function(req, res, next) {
    let word = req.query.word;
    fetch(`http://www.stands4.com/services/v2/poetry.php?uid=5425&tokenid=yz0jaxfwyLNjBzos&term=${word}`)
        .then(function(result) {
            return result.text();
        })
        .then(function(body) {
            parseString(body, (err,info) => {
              console.log(info);
              let newpoems = info.results.result.filter(element=> {
                return element.poem[0].length!=100;
              });
              let selectedPoem = newpoems[Math.floor(Math.random() * newpoems.length)];
              res.json(selectedPoem);
            });
        });
});
module.exports = router;
