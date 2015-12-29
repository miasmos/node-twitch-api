var twitch = require('./node-twitchtv.js')
var t = new twitch({
	"client_id": "XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
	"scope": "user_read channel_read channel_commercial"
})

t.get('/channels/:channel/videos', {channel: 'nl_kripp'}, function(err, res) {
	console.log(err || res)
})

t.get('/users/:user', {user: 'nl_kripp'}, function(err, res) {
	console.log(err || res)
})

t.post('/channels/:channel/commercial', {channel: 'nl_kripp', access_token: 'ZZZZZZZZZZZZZZZZZZZZZZ'}, function(err, res) {
	console.log(err || res)
})