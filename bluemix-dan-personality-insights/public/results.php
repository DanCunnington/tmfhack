<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>WhatsHappening</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="jquery-ui.css">
    <script src="jquery-1.10.2.js"></script>
    <script src="jquery-ui.js"></script>
    <script src="timepicker.js"></script>
    <link rel="stylesheet" href="jquery_timepicker.css">
    <script>
        $(function() {
            $( ".datepicker" ).datepicker();
            $('.timepicker').timepicker();
        });

        // $(document).ready(function() {
        //     function findUsers(twitterHandle) {

        //         $.getJSON('http://tmfhack.eu-gb.mybluemix.net/addUser/ibmwatson', function(res) {
        //             $.getJSON('http://tmfhack.eu-gb.mybluemix.net/matchUser/ibmwatson', function(users) {
        //                 console.log(users);
        //             });
        //         });
        //     }
        //     findUsers("dancunnington");
        // });
    </script>
    <link rel="stylesheet" href="jquery-ui.css">
</head>
<body>
<div id="container">
    <img src="img/logo.png" alt="WhatsHappening: A search engine for all good in life" />
    <div id="results">
        <?php
            print_r($_POST);
        ?>
        <div class="result" onmouseover="this.style.background='#ffffff';" onmouseout="this.style.background='transparent';">
            <div class="spacing"></div>
            <img src="img/event1.jpg" align="left" alt="" class="eventImg">
            <span class="title">Crossover festival</span> <span class="info">4 - 8 may, Nice</span><br>
            <span class="about">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla posuere tristique odio, varius gravida massa dignissim at.

            </span>
            <a href="http://www.festival-crossover.com/" target="_blank"><img src="img/more-info.png" alt="More info"></a>
       </div>
        <div class="result" onmouseover="this.style.background='#ffffff';" onmouseout="this.style.background='transparent';">
            <div class="spacing"></div>
            <img src="img/event1.jpg" align="left" alt="" class="eventImg">
            <span class="title">Crossover festival</span> <span class="info">4 - 8 may, Nice</span><br>
            <span class="about">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla posuere tristique odio, varius gravida massa dignissim at.

            </span>
            <img src="img/more-info.png" alt="More info">
        </div>
        <div class="result" onmouseover="this.style.background='#ffffff';" onmouseout="this.style.background='transparent';">
            <div class="spacing"></div>
            <img src="img/event1.jpg" align="left" alt="" class="eventImg">
            <span class="title">Crossover festival</span> <span class="info">4 - 8 may, Nice</span><br>
            <span class="about">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla posuere tristique odio, varius gravida massa dignissim at.

            </span>
            <a href="http://www.festival-crossover.com/" target="_blank"><img src="img/more-info.png" alt="More info"></a>
        </div>
        <div class="result" onmouseover="this.style.background='#ffffff';" onmouseout="this.style.background='transparent';">
            <div class="spacing"></div>
            <img src="img/event1.jpg" align="left" alt="" class="eventImg">
            <span class="title">Crossover festival</span> <span class="info">4 - 8 may, Nice</span><br>
            <span class="about">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla posuere tristique odio, varius gravida massa dignissim at.

            </span>
            <a href="http://www.festival-crossover.com/" target="_blank"><img src="img/more-info.png" alt="More info"></a>
        </div>
        <div class="result" onmouseover="this.style.background='#ffffff';" onmouseout="this.style.background='transparent';">
            <div class="spacing"></div>
            <img src="img/event1.jpg" align="left" alt="" class="eventImg">
            <span class="title">Crossover festival</span> <span class="info">4 - 8 may, Nice</span><br>
            <span class="about">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla posuere tristique odio, varius gravida massa dignissim at.

            </span>
            <a href="http://www.festival-crossover.com/" target="_blank"><img src="img/more-info.png" alt="More info"></a>
        </div>
        <div class="result" onmouseover="this.style.background='#ffffff';" onmouseout="this.style.background='transparent';">
            <div class="spacing"></div>
            <img src="img/event1.jpg" align="left" alt="" class="eventImg">
            <span class="title">Crossover festival</span> <span class="info">4 - 8 may, Nice</span><br>
            <span class="about">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla posuere tristique odio, varius gravida massa dignissim at.

            </span>
            <a href="http://www.festival-crossover.com/" target="_blank"><img src="img/more-info.png" alt="More info"></a>
        </div>
        <div class="result" onmouseover="this.style.background='#ffffff';" onmouseout="this.style.background='transparent';">
            <div class="spacing"></div>
            <img src="img/event1.jpg" align="left" alt="" class="eventImg">
            <span class="title">Crossover festival</span> <span class="info">4 - 8 may, Nice</span><br>
            <span class="about">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla posuere tristique odio, varius gravida massa dignissim at.

            </span>
            <a href="http://www.festival-crossover.com/" target="_blank"><img src="img/more-info.png" alt="More info"></a>
        </div>
        <div class="result last" onmouseover="this.style.background='#ffffff';" onmouseout="this.style.background='transparent';">
            <div class="spacing"></div>
            <img src="img/event1.jpg" align="left" alt="" class="eventImg">
            <span class="title">Crossover festival</span> <span class="info">4 - 8 may, Nice</span><br>
            <span class="about">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla posuere tristique odio, varius gravida massa dignissim at.

            </span>
            <a href="http://www.festival-crossover.com/" target="_blank"><img src="img/more-info.png" alt="More info"></a>
        </div>
    </div>
</div>

</body>
</html>