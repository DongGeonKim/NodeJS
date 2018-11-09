var express = require('express');
var { User, Comment } = require('../models');

var router = express.Router();

router.get('/:id', function(req, res, next) {
  Comment.findAll({
    include: {
      model: User,
      where: { id: req.params.id },
    },
  })
    .then((comments) => {
      console.log(comments);
      res.json(comments);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

router.post('/', function(req, res, next) {
	var sql = require("mssql");

    // config for your database
    var config = {
        user: 'test',
        password: 'test',
        server: 'localhost', 
        database: 'test' 
    };

    // connect to your database
    sql.connect(config, function (err) {
 
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
    	const queryst = `insert into comments(commenter, comment) values(${req.body.id}, ${req.body.comment})`;
		console.log(queryst);
        // query to the database and get the records
        request.query(queryst, function (err, recordset) {
            
            if (err) {
				console.error(err);
				sql.close();
				next(err);
			}
			console.log("recordset : " + recordset);
            // send records as a response
            res.status(201).json(recordset);
            sql.close();
        });
    });
	
  /*Comment.create({
    commenter: req.body.id,
    comment: req.body.comment,
  })
    .then((result) => {
      console.log("1111111111111 : " + result.toString());
      res.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });*/
});

router.patch('/:id', function(req, res, next) {
  Comment.update({ comment: req.body.comment }, { where: { id: req.params.id } })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

router.delete('/:id', function(req, res, next) {
  Comment.destroy({ where: { id: req.params.id } })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

module.exports = router;
