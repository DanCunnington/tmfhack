$(document).ready(function() {

    var group;
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

        $.get('/eventbrite/'+where, function(events) {

            if (events.length == 0) {
                $("#results").append("No results found.");
            } else {

                 $("#container").hide();
                $(".final-results").show();

                var map = L.map('map').setView([43.710100, 7.261997], 13);
                group = new L.featureGroup();
                map.addLayer(group);

                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                var newEntry;
                group.clearLayers();
                for(var i = 0; i < events.length; i++){
                    /*if(i == events.length - 1){
                        newEntry = '<div class="result last" onmouseover="this.style.background=\'#ffffff\';" onmouseout="this.style.background=\'transparent\';">';
                    }else{*/
                        newEntry = '<div class="result" onmouseover="this.style.background=\'#ffffff\';" onmouseout="this.style.background=\'transparent\';">';
                    //
                    newEntry = newEntry  + '<span class="title">' + events[i].name + '</span>';
                    var info;
                    if(events[i].eventDetails.start.local){
                        info = events[i].eventDetails.start.local.replace("T", " at ").replace(":0.000Z","").replace(":00.000Z","");
                    }
                    if(events[i].venue.address){
                        if(info.length > 0){
                            info = info + "<br>";
                        }
                        info = info + events[i].venue.address.address_1+", "+events[i].venue.address.city;
                    }
                    newEntry = newEntry + "<div class='info'>" + info + '</div>';
                    /*
                     var dateTime = events[i].characteristics[0].versions[0].value;
                     dateTime = dateTime.replace("T"," at ");
                     newEntry = newEntry + dateTime + '<br>';
                     */
                    newEntry = newEntry  + '</div>';
                    $("#results").append(newEntry);

                    //Plot lat lng of venue on map
                    if (events[i].name != "3D Hubs Rhino Work") {
                        L.marker([events[i].venue.latitude,events[i].venue.longitude]).bindPopup(events[i].name).addTo(group);
                        map.fitBounds(group.getBounds());
                    }
                    
                    console.log(events[i]);

                    if (i == events.length -1) {
                        var RestaurantIcon = L.Icon.Default.extend({
                            options: {
                                iconUrl: 'marker-icon-restaurant.png' 
                            }
                        });
                        //Ads for nearby restaurants
                        //Pass in lat lng of first venue
                        $.get('/restaurants/'+events[i].venue.latitude+'/'+events[i].venue.longitude, function(restaurants) {
                           
                            for (var i=0; i<restaurants.length; i++) {
                                var restaurantIcon = new RestaurantIcon();
                                var text = "2 for 1 on all evening meals - "+restaurants[i].name;
                                L.marker([restaurants[i].lat,restaurants[i].lng],{icon: restaurantIcon}).bindPopup(text).addTo(map);
                            }
                            
                        });
                    }
                }


                stepForward(3);

               




                

            }            
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