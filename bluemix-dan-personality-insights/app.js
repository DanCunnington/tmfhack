/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var http = require('http');
var https = require('https');
var bodyParser = require('body-parser');
var request = require('request');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});


var db = require('./utils/db.js');
var twit = require('twit');

var Twit = require('twit')
 
var T = new Twit({
  consumer_key:         'vXCmJGFoA6FrNmj1dAJ2skWaq',
  consumer_secret:      'ag3N20zlUIzohO3IGnl3K9IygdKUetMS4lMTuNVXN59FwcaCl4',
  access_token:         '26059862-9A8iYJ68EXvxgr02sa6AkSJUvIb80eGGOM3krurVs',
  access_token_secret:  'MsrAHb6bMVUfOfzSA3b4rxjDFlhNZ20WnAd9RpCLBhx9K'
})
 
var watson = require('watson-developer-cloud');

var personality_insights = watson.personality_insights({
username: '397446ac-5b6e-4343-89d6-b366ed7ceb2e',
password: 'sS6GAnNpLDNZ',
version: 'v2'
});



//For the twitter user - use judges
//Search database for people with similar personalities
app.get('/matchUser/:twitterhandle', function(req,res,next) {

    var twitterhandle = req.params.twitterhandle;

    //Extract user from database with this twitter handle
    db.viewUser(twitterhandle, function(err,docs) {

        if (err) {
            console.log(err);
        }
        var user = docs[0];
        var openness = user.openness;
        var conscientiousness = user.conscientiousness;
        var extraversion = user.extraversion;
        var aggreableness = user.aggreableness;
        var emotionalrange = user.emotionalrange;

        //Compare values against all other users
        db.findUsersOtherThan(twitterhandle, function(err,users) {
            if (err) {
                console.log(err);
            }

            var matches = [];

            //For each user, compare similarity scores
            for (var i=0; i<users.length; i++) {
                var useropenness = users[i].openness;
                var userconscientiousness = users[i].conscientiousness;
                var userextraversion = users[i].extraversion;
                var useraggreableness = users[i].aggreableness;
                var useremotionalrange = users[i].emotionalrange;


                //Similar if within .1
                var opennessSimilar = checkSimilar(openness,useropenness);
                var conscientiousnessSimilar = checkSimilar(conscientiousness,userconscientiousness);
                var extraversionSimilar = checkSimilar(extraversion,userextraversion);
                var aggreablenessSimilar = checkSimilar(aggreableness,useraggreableness);
                var emotionalrangeSimilar = checkSimilar(emotionalrange,useremotionalrange);
                if (opennessSimilar && conscientiousnessSimilar && extraversionSimilar && aggreablenessSimilar && emotionalrangeSimilar) {
                    matches.push(users[i]);
                }
                console.log("---------");
            }
            res.json({user: user, matches: matches});
        });
    });
});

function checkSimilar(newVal,userVal) {
    var diff = newVal - userVal;
    console.log(diff);
    if (diff < 0 && diff >= -0.25) {
        return true;
    } else if (diff >= 0 && diff <= 0.25) {
        return true;
    } else {
        return false;
    }
}

//save user to database
app.get('/addUser/:twitterhandle', function(req,res,next) {

    var twitterhandle = req.params.twitterhandle;

    //Add if not exists
    var exists = false;
    db.viewUsers(function(users) {
        for (var i=0; i<users.length; i++) {
            if (users[i].twitterhandle == twitterhandle) {
                exists = true;
                break;
            }
        }
        //Get tweets
        if (!exists) {
            T.get('statuses/user_timeline', { screen_name: twitterhandle, count: 200 }, function(err, data, response) {
                var queryString = "";
                //Extract tweets
                for (var i=0; i<data.length; i++) {
                    queryString += data[i].text;
                }
         
                //Get personality
                personality_insights.profile({ text: queryString }, function (err, profile) {
                    if (err) {
                        return res.json({"err": err.error});
                    } else {

                        //Extract personality and store 5 highest scores
                        var categories = profile.tree.children;
                        var personalities;
                        for (var i=0; i<categories.length; i++) {
                            if (categories[i].id == "personality") {
                                personalities = categories[i].children;
                            }
                        }
                        var big5 = personalities[0].children;
                        var user = {
                            twitterhandle: twitterhandle
                        }
                        for (var i=0; i<big5.length; i++) {
                            //Get name
                            var name = big5[i].name;
                            user[name.replace(/\s+/g, '')] = big5[i].percentage;
                        }

                        db.addUser(user, function() {
                             res.json({user: user});
                        });
                    }
                });
            });
        } else {
            res.json({"status": "exists"});
        }
    });
});

app.post('/findEvents', function(req,res,next) {
    var what = req.body.what;
    var where = req.body.where;
    var date_from = req.body.date_from;
    var time_from = req.body.time_from;
    var date_till = req.body.date_till;
    var time_till = req.body.time_till;

    console.log(what);
    console.log(where);
    console.log(date_from);
    console.log(time_from);
    console.log(date_till);
    console.log(time_till);


    //Get list of events from TMForum API
    var options = {
      url: 'http://192.176.47.48:27030/rest/CatalogManagement/v2/productSpecification/?project=happening',
      headers: {
        'Authorization': 'Basic OTMwMDY2MWRmMDBmZTlmZmVkMzM0ZjBkYTQyMDIwMWE5NmRhMzgyZjE5ZDYyM2EzODE6M2ZPRHI4UkRXOWsxZDAxRTlhaUYwWldnNXh4dDlsVXVvR243NE1FbHgwUTZjMkpzTjA='
      }
    };

    request(options, function(error,response,body) {
        if (!error && response.statusCode == 200) {
            var products = JSON.parse(body);

            //For each product, pull out version and add to versions array
            var events = [];

            for (var i=0; i<products.length; i++) {

                //filter out those within start and end date, location, times
                var eventDetails = products[i].versions[0];
                var startDateMatch = false;
                var startTimeMatch = false;
                var endDateMatch = false;
                var endTimeMatch = false;
               
                //Check location
                var locationMatch = true;
                var index = findIndex(eventDetails.characteristics,"city");
                if (index != -1) {
                   var eventCity = eventDetails.characteristics[index].versions[0].value;
                    locationMatch = (eventCity.toLowerCase() == where.toLowerCase()); 
                }                
                
                //time and date
                // var datematchOne = false;
                // var datematchTwo = false;
                // index = findIndex(eventDetails.characteristics,"starttime");
                // if (index != -1) {
                //    var eventStart = eventDetails.characteristics[index].versions[0].value;
                //    datematchOne = true; 
                // }
                
                // index = findIndex(eventDetails.characteristics, "endtime");
                // if (index != -1) {
                //    var eventEnd = eventDetails.characteristics[index].versions[0].value; 
                //    datematchTwo = true;
                // }
                
                // var startTimeMatch = true;
                // var endTimeMatch = true;
                // if (datematchOne && datematchTwo) {
                //     var startSplit = date_from.split('/');
                //     var queryStart = startSplit[2]+"-"+startSplit[0]+"-"+startSplit[1]+"T00:00:00.000Z";

                //     startTimeMatch = (Date(eventStart) >= Date(queryStart));

                //     var endSplit = date_till.split('/');
                //     var queryEnd = endSplit[2]+"-"+endSplit[0]+"-"+endSplit[1]+"T23:59:59.000Z";

                //     endTimeMatch = (Date(eventEnd) <= Date(queryEnd));

                //     console.log("query location");
                //     console.log(where);
                //     console.log("Start time of query");
                //     console.log(queryStart);
                //     console.log("Start time of event");
                //     console.log(eventStart);
                //     console.log("end time of query");
                //     console.log(queryEnd);
                //     console.log("end time of event");
                //     console.log(eventEnd);
                //     console.log("matches, location, start, end");
                //     console.log(locationMatch);
                //     console.log(startTimeMatch);
                //     console.log(endTimeMatch);

                // }
                

                if (locationMatch /*&& startTimeMatch && endTimeMatch*/) {
                    events.push(eventDetails);
                }
            }

            res.json(events);
        } else {
            console.log(response.statusCode);
        }
    });
});

function findIndex(characteristics,name) {
    for (var i=0; i<characteristics.length; i++) {
        if (characteristics[i].id == name) {
            return i;
        }
    }
    return -1;
}
