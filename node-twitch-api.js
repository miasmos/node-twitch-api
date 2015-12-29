"use strict"
var request = require("request"),
     config = require('./config.json')

class TwitchClient {
  constructor(config) {
    if (!config) config = {}
    if ("access_token" in config) this.access_token = config.access_token
    if ("scope" in config) this.scope = config.scope
    if ("client_id" in config) this.client_id = config.client_id
  }

  get(endpoint, params, callback) {
    this.request('get', endpoint, params, callback)
  }

  put(endpoint, params, callback) {
    this.request('put', endpoint, params, callback)
  }

  delete(endpoint, params, callback) {
    this.request('delete', endpoint, params, callback)
  }

  del(endpoint, params, callback) {
    this.request('delete', endpoint, params, callback)
  }

  post(endpoint, params, callback) {
    this.request('post', endpoint, params, callback)
  }

  request(type, endpoint, params, callback) {
    if (!(type in config.endpoints)) throw new Error(`Invalid request type ${type} specified, expecting get, put, delete, or post.`)
    if (config.endpoints[type].indexOf(endpoint) == -1) throw new Error(`Invalid endpoint ${endpoint} specified`)
    
    var url;
    if (typeof params == 'function') {
      callback = params
      url = endpoint
    }
    else {
      url = this._fillParams(endpoint,params)
    }

    url += '?'
    for (var i in params) {
      url += i + '=' + params[i] + '&'
    }

    if (!("access_token" in params) && this.access_token) url += 'access_token='+this.access_token+'&'

    if ((type == 'delete' || type == 'put' || type == 'post') && !('access_token' in params) && !this.access_token) {
      throw new Error('Delete, post and put requests require a valid access token')
    }
    this._request(type, url, callback)
  }

  _fillParams(endpoints,params) {
    var endpoints = endpoints.split("/")
    for (var i in endpoints) {
      var endpoint = endpoints[i]
      if (endpoint.length) {
        if (endpoint.indexOf(':') > -1) {
          //param found
          var param = endpoint.substr(1)
          if (!(param in params)) {
            var str = endpoints.join('/')
            throw new Error(`Param ${param} not passed when calling endpoint ${str}`)
          }

          endpoints[i] = params[param]
          delete params[param]
        }
      }
    }
    return endpoints.join('/')
  }

  _request(type, urlSuffix, callback) {
    if (!callback || typeof callback != 'function') return false;
    console.log(`calling ${config.config.url}${urlSuffix}`)
    if (this.client_id) urlSuffix += 'client_id='+this.client_id+'&'
    if (this.scope) urlSuffix += 'scope='+this.scope+'&'
    var opts = {
      url: config.config.url + urlSuffix
    } 
    var self = this;

    switch(type) {
      case "get":
        request.get(opts, result)
        break;
      case "put":
        request.put(opts, result)
        break;
      case "delete":
        request.delete(opts, result)
        break;
      case "post":
        request.post(opts, result)
    }

    function result(err, res, body) {
      body = JSON.parse(body);
      if (callback) callback.call(self, err, body);
    }
  }
}
module.exports = TwitchClient;
