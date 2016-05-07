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
            for(var i = 0; i < events.length; i++){
                if(i == events.length - 1){
                    newEntry = '<div class="result last" onmouseover="this.style.background=\'#ffffff\';" onmouseout="this.style.background=\'transparent\';">';
                }else{
                    newEntry = '<div class="result" onmouseover="this.style.background=\'#ffffff\';" onmouseout="this.style.background=\'transparent\';">';
                }
                newEntry = newEntry  + '<span class="title">' + events[i].name + '</span>';
                newEntry = newEntry  + '</div>';
                $("#results").append(newEntry);
                console.log(events[i]);
            }
            stepForward(3);
        });

        //get personality insights also

    });

});