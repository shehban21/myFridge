var request = require('request');
var apiOptions = {
  server : "http://localhost:3000"
};


var renderHomepage = function(req, res, responseBody){
    var message;
    if (!(responseBody instanceof Array)) {
      message = "API lookup error";
      responseBody = [];
    } else {
      if (!responseBody.length) {
        message = "No Food Items found";
      }
    }
    res.render('food-list', {
      title: 'List Of Food',
      foods: responseBody,
      message: message
    });
  };
  

module.exports.homelist = function(req, res){
    var requestOptions, path;
    path = '/api/food';
    requestOptions = {
      url : apiOptions.server + path,
      method : "GET",
      json : {},
      qs : {}
    };
    request(
      requestOptions,
      function(err, response, body) {
        var i, data;
        data = body;
        if (response.statusCode === 200 && data.length) {
          console.log(data);
        }
        renderHomepage(req, res, data);
      }
    );
  };

  module.exports.deleteFood = function(req, res){
    var requestOptions, path;
    path = '/api/food/' + req.params.id;
    requestOptions = {
      url : apiOptions.server + path,
      method : "DELETE",
      json : {},
      qs : {},
      params : {id: req.params.id}
    };
    request(
      requestOptions,
      function(err, response, body) {
        var data;
        data = body;
        if (response.statusCode === 200 && data) {
          console.log(data);
        }
        res.redirect('/');
      }
    );

  }

  module.exports.create = function(req, res){
    res.render('food-create-edit', {
      title: 'Create Food',
      create: true
    });
  }
  

  module.exports.loadEditData = function(req, res){
    console.log("GET CALLED");
    var requestOptions, path;
    path = '/api/food/' + req.params.id;
    requestOptions = {
      url : apiOptions.server + path,
      method : "GET",
      json : {},
      qs : {},
      params : {id: req.params.id}
    };
    request(
      requestOptions,
      function(err, response, body) {
        var data;
        data = body;
        if (response.statusCode === 200 && data) {
          data[0].date = formatDate(data[0].date);
          if (data[0].expiry){
            data[0].expiry = formatDate(data[0].expiry);
          }
          res.render('food-create-edit', {
            title: 'Edit Food',
            create: false,
            food: data[0]
          });
        }
      }
    );
  }
  
  module.exports.create_item = function(req, res){
    var requestOptions, path;
    path = '/api/food';
    if (req.body.left_overs == 'on')
      req.body.left_overs = true;
    requestOptions = {
      url : apiOptions.server + path,
      method : "POST",
      json : req.body,
    };
    request(
      requestOptions,
      function(err, response, body) {
        var data;
        data = body;
        console.log(response);
        if (response.statusCode === 200 && data) {
          console.log(data);
        }
        res.redirect('/');
      }
    );
  }

  module.exports.putItem = function(req, res){
    console.log("PUT CALLED");
    var requestOptions, path;
    path = '/api/food/' + req.params.id;
    if (req.body.left_overs == 'on')
      req.body.left_overs = true;
    requestOptions = {
      url : apiOptions.server + path,
      method : "PUT",
      json : req.body
    };
    request(
      requestOptions,
      function(err, response, body) {
        var data;
        data = body;
        if (response.statusCode === 200 && data) {
          console.log(data);
        }
        res.redirect('/');
      }
    );
  }

  function formatDate(date){
    var d = new Date(date);
    var day =  d.getDate();
    var month =  parseInt(d.getMonth()+ 1);
    if (day < 10)
      day = '0' + day;
    if (month < 10)
      month = '0' + month;
    return d.getFullYear() + '-'+ month + '-' + day;
  }