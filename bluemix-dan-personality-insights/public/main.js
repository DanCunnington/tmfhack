$(document).ready(function() {


    //When form is clicked - call api
    $("#submit").click(function(e) {
        $("#submit").val("Loading...");

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
            var newEntry;
            var locations = [];
            for(var i = 0; i < events.length; i++){
                if(i == events.length - 1){
                    newEntry = '<div class="result last" onmouseover="this.style.background=\'#ffffff\';" onmouseout="this.style.background=\'transparent\';">';
                }else{
                    newEntry = '<div class="result" onmouseover="this.style.background=\'#ffffff\';" onmouseout="this.style.background=\'transparent\';">';
                }
                newEntry = newEntry  + '<p class="title">' + events[i].name + '</p>';
                newEntry = newEntry  + '</div>';
                $("#results").append(newEntry);
                //locations.push(L.marker(events[i].))
                console.log(events[i]);
            }
            stepForward(3);

            $("#container").hide();
            $(".final-results").show();

            var map = L.map('map').setView([43.710100, 7.261997], 13);

            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            
        });

        //get personality insights also
        if (twitterhandle != "") {
          $.get('/addUser/'+twitterhandle, function(res) {
            $.get('/matchUser/'+twitterhandle, function(users) {
                users = users.matches;
                for (var i=0; i<users.length; i++) {
                    var html = "<div class='user'><p>@<a target='_blank' href='http://twitter.com/"+users[i].twitterhandle+"'>"+users[i].twitterhandle+"</a></p></div>";
                    $(".users").append(html);
                }
            });
          }); 
        }
       

    });

});