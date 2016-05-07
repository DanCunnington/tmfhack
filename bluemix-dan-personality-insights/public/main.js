$(document).ready(function() {


    //When form is clicked - call api
    $("#submit").click(function(e) {
        e.preventDefault();

        //Extract data
        var what = $("#what").val();
        var where = $("#where").val();
        var date_from = $("#date_from").val();
        var time_from = $("#time_from").val();
        var date_till = $("#date_till").val();
        var time_till = $("#time_till").val();
        var twitterhandle = $("#twitterhandle").val();

        console.log(what);
        console.log(where);
        console.log(date_from);
        console.log(time_from);
        console.log(date_till);
        console.log(time_till);

        var eventQuery = {
            what: what,
            where: where,
            date_from: date_from,
            time_from: time_from,
            date_till: date_till,
            time_till: time_till,
            twitterhandle: twitterhandle
        }

        $.post('/findEvents', eventQuery, function(events) {
            //write stuff here!
            console.log(events);
        });

        //get personality insights also
        if (twitterhandle != "") {
          $.get('/addUser/'+twitterhandle, function(res) {
            $.get('/matchUser/'+twitterhandle, function(users) {
                console.log(users);
            });
          }); 
        }
       

    });

});