var graph = function(){
  var AAD_LOGIN_HOSTNAME = 'login.windows.net';
  var GRAPH_API_HOSTNAME = 'graph.windows.net';
  var DEFAULT_API_VERSION = '1.6';

  var http = require('http');
  var https = require('https');
  var querystring = require('querystring');
  var strformat = require('strformat');
  var slice = Array.prototype.slice;

  var requestWithRetry = function(method, ref, data, contentType, secondAttempt, tenant, accessToken, clientId, clientSecret, callback) {
      var path = ['/'];
      path.push(tenant);
      path.push('/');
      path.push(ref);
      if (ref.indexOf('?') < 0) {
          path.push('?');
      } else {
          path.push('&');
      }
      path.push('api-version=');
      path.push(DEFAULT_API_VERSION);
      var options = {
          hostname: GRAPH_API_HOSTNAME,
          path: path.join(''),
          method: method,
          headers: {
              'Authorization': 'Bearer ' + accessToken
          }
      };

      if (data) {
          if (Buffer.isBuffer(data)) {
              options.headers['Content-Type'] = contentType;
          } else if (!contentType) {
              if (typeof content === 'string') {
                  options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                  options.headers['Content-Length'] = content.length;
              } else if (content !== null && typeof content === 'object') {
                  content = JSON.stringify(content);
                  options.headers['Content-Type'] = 'application/json';
                  options.headers['Content-Length'] = content.length;
              }
          }
      }

      httpsRequest(options, data, function(err, response) {
          if (err) {
              if (err.statusCode === 401 && !secondAttempt) {
                  requestAccessToken(clientId, clientSecret, tenant, function(err, token) {
                      if (err) {
                          callback(err);
                      } else {
                          requestWithRetry(method, ref, data, contentType, true, tenant, token, clientId, clientSecret, callback);
                      }
                  });
              } else {
                  callback(err);
              }
          } else {
              callback(null, response);
          }
      });
  };

  var requestAccessToken = function(clientId, clientSecret, tenant, callback) {
      var query = {
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'client_credentials',
          resource: 'https://' + GRAPH_API_HOSTNAME
      };
      var content = querystring.stringify(query);
      var options = {
          hostname: AAD_LOGIN_HOSTNAME,
          path: '/' + tenant + '/oauth2/token?p=b2c_1_signin_default',
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Content-Length': content.length
          }
      };
      httpsRequest(options, content, function(err, response) {
          if (err) {
              callback(err);
          } else {
              callback(null, response.access_token);
          }
      });
  };

  var httpsRequest = function(options, content, callback) {
      options.headers = options.headers || {};
      options.headers['Accept'] = 'application/json';
      if (!callback) {
          callback = content;
          content = null;
      }
      var req = https.request(options, function(res) {
          res.setEncoding('utf8');
          var buf = [];
          res.on('data', function(data) {
              buf.push(data);
          });
          res.on('end', function() {
              var data = buf.join('');
              if (data.length > 0) {
                  data = JSON.parse(data);
              } else {
                  data = null;
              }
              if (res.statusCode === 204) {
                  callback(null); // no data
              } else if (res.statusCode >= 200 && res.statusCode <= 299) {
                  callback(null, data); // success
              } else {
                  if (data && data.error_description) {
                      data = data.error_description.split(/[\r\n]/)[0];
                  } else if (data && data['odata.error']) {
                      data = data['odata.error'].message.value;
                  } else {
                      data = null;
                  }
                  var err = new Error(errmsg(res.statusCode, data));
                  err.statusCode = res.statusCode;
                  callback(err);
              }
          });
      });
      req.on('error', function(err) {
          callback(err);
      })
      if (content) {
          req.write(content);
      }
      req.end();
  };

  var errmsg = function(status, message) {
      message = message || '[no additional details]';
      return strformat('Graph API Error: {0} ({1}) {2}',
          status, http.STATUS_CODES[status], message);
  };

  this.getGraph = function(path, data, contentType, tenant, accessToken, clientId, clientSecret, callback){
    requestWithRetry("GET", path, data, contentType, false, tenant, accessToken, clientId, clientSecret, callback);
  };

  this.postGraph = function(path, data, contentType, tenant, accessToken, clientId, clientSecret, callback){
    requestWithRetry("POST", path, data, contentType, false, tenant, accessToken, clientId, clientSecret, callback);
  };

  this.setAadLoginHostname = function(newAADLogin){
    AAD_LOGIN_HOSTNAME = newAADLogin;
  };

  this.setGraphApiHostname = function(newGraphHost){
    GRAPH_API_HOSTNAME = newGraphHost;
  };

  return{
    getGraph: this.getGraph,
    postGraph: this.postGraph,
    setAadLoginHostname: this.setAadLoginHostname,
    setGraphApiHostname: this.setGraphApiHostname
  }

};

module.exports = graph;
