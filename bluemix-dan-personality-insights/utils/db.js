var exports = module.exports = {};
var mongoose = require('mongoose');

var options = { server: { socketOptions: { connectTimeoutMS: 30000 } },
replset: { socketOptions: { connectTimeoutMS : 30000 } } };

var mongodbUri = 'mongodb://dan:tmfhack123@ds015892.mlab.com:15892/tmfhack';
var db;
var User;
var connected = false;

var connect = function(callbackFunc) {

    mongoose.connect(mongodbUri, options);

    db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open',function callback() {

        // Create user schema
        var userSchema = mongoose.Schema({
            twitterhandle: String,
            openness: Number,
            conscientiousness: Number,
            extraversion: Number,
            aggreableness: Number,
            emotionalrange: Number
        });

        // Store result documents in a collection called "users"
        User = mongoose.model('users', userSchema);

        connected = true;
        callbackFunc();
    });
}

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    if (connected) {
        mongoose.connection.db.close(function () {
            console.log('Mongoose disconnected on app termination');
            process.exit(0);
        });
    } else {
        process.exit(0);
    }
});


exports.addUser = function(user, callback) {

    if (!connected) {
        connect(function() {
            addUserToDb(user,callback);
        });
    } else {
        addUserToDb(user,callback);
    }
}

var addUserToDb = function(user,callback) {
  //  Create seed data
    var newUser = new User({
        twitterhandle: user.twitterhandle,
        openness: user.Openness,
        conscientiousness: user.Conscientiousness,
        extraversion: user.Extraversion,
        aggreableness: user.Agreeableness,
        emotionalrange: user.Emotionalrange
    });


    newUser.save(function(err) {
        if (err) {
            console.log(err);
        }

        callback();
    });
}

exports.viewUsers = function(callback) {
    if (!connected) {
        connect(function() {
            viewUsersFromDb(callback);
        });
    } else {
        viewUsersFromDb(callback);
    }
}

var viewUsersFromDb = function(callback) {
    User.find({}).exec(function (err, docs){

        if (err) {
            console.log(err);
        }
        callback(docs);
    });
}

exports.deleteUsers = function(callback) {
    if (!connected) {
        connect(function() {
            deleteUsersFromDb(callback);
        });
    } else {
        deleteUsersFromDb(callback);
    }
}

var deleteUsersFromDb = function(callback) {
    mongoose.connection.db.collection('users').drop(function (err) {
        if (err) {
            console.log(err);
        }
        callback();
    });
}

exports.deleteUser = function(id,callback) {
    if (!connected) {
        connect(function() {
            deleteUserFromDb(id,callback);
        });
    } else {
        deleteUserFromDb(id,callback);
    }
}

var deleteUserFromDb = function(id,callback) {
    User.findByIdAndRemove(id, function() {
        callback();
    });
}

exports.addBulk = function(docs,callback) {
    console.log(docs);
    if (!connected) {
        console.log("connecting");
        connect(function() {
            console.log("inserting");
            User.insertMany(docs, callback);  
        })
    } else {

        User.insertMany(docs, callback);
    }
    
}

exports.viewUser = function(name,callback) {
    if (!connected) {
        connect(function() {
            viewUserFromDb(name,callback);
        });
    } else {
        viewUserFromDb(name,callback);
    }
}

var viewUserFromDb = function(name,callback) {
    User.find({twitterhandle: name}, function(err,docs) {
        callback(err,docs);
    });
}

exports.findUsersOtherThan = function(name,callback) {
     if (!connected) {
        connect(function() {
            findUsersOtherThanFromDb(name,callback);
        });
    } else {
        findUsersOtherThanFromDb(name,callback);
    }
}

var findUsersOtherThanFromDb = function(name,callback) {
    User.where('twitterhandle').ne(name).exec(callback);
}

exports.connect = connect;