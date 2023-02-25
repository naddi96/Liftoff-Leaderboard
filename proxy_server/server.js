// Listen'https://github.com' on a specific host via the HOST environment variable
var host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 8080;

var cors_proxy = require('./lib/cors-anywhere');
cors_proxy.createServer({

    originWhitelist: [], // Allow all origins
    requestUrlWhitelist:["https://liftoff-service.azurewebsites.net/unity/v0.5/GetCommunityLeaderboard.php"],
    // requireHeader: ['origin', 'x-requested-with'],
    // removeHeaders: ['cookie', 'cookie2']
    removeHeaders: ['origin', 'referer']
}).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
}); 