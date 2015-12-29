
# node-twitchtv

  TwitchTV client for NodeJS applications. 100% endpoint coverage.
  
  [![NPM version](https://badge.fury.io/js/node-twitchtv-stephenpoole.png)](http://badge.fury.io/js/node-twitchtv-stephenpoole)
  
## Getting started

Install  

```
npm install node-twitchtv-stephenpoole
```

Then integrate!

```javascript
var TwitchClient = require("node-twitchtv-stephenpoole");
var client = new TwitchClient({
	"scope": "user_read channel_read"
})

client.get('/channels/:channel/videos', {channel: 'nl_kripp'}, function(err, res) {
	console.log(err || res)
});
```  
  
## Authentication  
To use endpoints that require oauth  
  
Sign up for an application at TwitchTV: http://www.twitch.tv/settings?section=applications  
Then include the client id as an option.  
  
Obtain a valid access token for a user, then either include it as an option when instantiating, or include it with the request.

```javascript
var client = new TwitchClient({
	"client_id": "XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
	"access_token": "XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
	"scope": "user_read channel_read channel_commercial"
})

client.put('/channels/:channel/commercial', {channel: 'authenticateduser', access_token: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX'}, function(err, res) {
  console.log(err || res)
});  
```  
  
## API  
### get(endpoint, params, callback)  
	endpoint, required, String  
	params, required, Object  
	callback, optional, Function  
  
### put(endpoint, params, callback)  
	endpoint, required, String  
	params, required, Object  
	callback, optional, Function  

### post(endpoint, params, callback)  
	endpoint, required, String  
	params, required, Object  
	callback, optional, Function

### delete(endpoint, params, callback)  
	endpoint, required, String  
	params, required, Object  
	callback, optional, Function  
  
Endpoints map to those provided in [Twitch's API doc](https://github.com/justintv/Twitch-API). They may also be found in config.json.  
  
## Contributing

100% open -- let's make this better! Accepting pull requests at any time. 

### Contributors

- Stephen Poole ([@poolestephen](http://github.com/stephenpoole))

## License 

(The MIT License)

Copyright (c) 2015 Stephen Poole &lt;stephenwpoole@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
