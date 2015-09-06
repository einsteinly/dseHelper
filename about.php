<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href='/css/b.css'>
<link rel="stylesheet" href='/css/gry2.css'>
<link rel="stylesheet" href='/css/gryphon.css'>
<script src="/js/jquery-1.11.0.min.js"></script>
<script src="/js/b.js"></script>
<script src="/js/jquery.f.min.js"></script>
<script src="/js/gryphon.js"></script>
<script src="/js/classie.js"></script>
<title>About this app</title>
<!-- Piwik -->
<script type="text/javascript">
  var _paq = _paq || [];
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="//lalx.org/stats/";
    _paq.push(['setTrackerUrl', u+'piwik.php']);
    _paq.push(['setSiteId', 5]);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
  })();
</script>
<noscript><p><img src="//lalx.org/stats/piwik.php?idsite=5" style="border:0;" alt="" /></p></noscript>
<!-- End Piwik Code -->

</head>

<nav class='navbar navbar-default navbar-fixed-top' role='navigation'>
    <div class='container-fluid'>
        <div class='navbar-header'>
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#page-navG" >
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            </button>
            <a href="/index" class="navbar-brand"><span><img src="/logo.png" alt="Brand" width="50px" style="margin-top:-7px"></span> </a>
        </div>

        <div id="page-navG" class="collapse navbar-collapse" >
            <ul class='nav navbar-nav'>
            <li> <a href='/index'><i class='fa fa-home fa-fw'></i> Home</a></li>
            <li class='active'> <a href='/about'><i class='fa fa-info-circle fa-fw'></i> About</a></li>

            <li> <a href='/syllabus'><i class='fa fa-book fa-fw'></i> Syllabus</a></li>
            <li class='dropdown'>
                <a href='/sat/sat' class='dropdown-toggle' data-toggle='dropdown' role='button'><i class='fa fa-list fa-fw'></i> Topics<span class='caret'></span></a>
                    <ul class='dropdown-menu' role='menu'>
                        <li> <a href='/exam/topics_by_year?year=2014'>2014</a></li>
                        <li> <a href='/exam/topics_by_year?year=2013'>2013</a></li>
                        <li> <a href='/exam/topics_by_year?year=2012'>2012</a></li>
                        <li> <a href='/exam/topics_by_year?year=2011'>2011</a></li>
                    </ul>
            </li>
            <li> <a href='/contact'><i class='fa fa-phone fa-fw'></i> Contact</a></li>
            <li> <a onClick='log_out()' href='#'><i class='fa fa-lock fa-fw'></i> Log out</a></li>
            </ul>
        </div>
    </div>
</nav>

<div class='container' style='margin-top:100px'>
    <div class='jumbotron'>
        <h1>This page in under construction.</h1>
    </div>
</div>

<!-- 
<body>
<div class='container-fluid'>
    <div class='row'>
    	<div id='adiv1' style="margin-top:101px;padding-top:10%;padding-bottom:10%">
        <h1 id='ani1-1' style='display:none'><span><img src="/favicon.ico" alt="Brand" width="100px" style="margin-bottom:40px"></span><br> dseHelper</h1>
        <h3 id='ani1-2' style='display:none'>An app that helps you effectively memorise bite-sized information.</h3>
        </div>

        <div id='adiv2' class='bg-info' style="padding-top:10%;padding-bottom:10%">
        <h1><i class='fa fa-mobile'></i> Mobile friendly interface</h1>
        <h3> You can study ANYWHERE! </h3>
        <h4> We have designed this app with YOU, the user, in mind. This app is accessible and user-friendly across all devices that you can think of.</h4>
        </div>

        <div id='adiv3' class='bg-success' style="padding-top:10%;padding-bottom:10%">
            <h1 id='ani3-1'> <i class='fa fa-thumbs-o-up'></i> PROVEN method to memorise things</h1>
            <h3 style='line-height:150%'>We proudly present to you:
                <br> <i class='fa fa-check-circle'></i> Easy organization of cards
                <br> <i class='fa fa-check-circle'></i> Short quizes
                <br> <i class='fa fa-check-circle'></i> Effective reinforcement
            </h3>
        </div>

        <div id='adiv4' class='bg-info' style="padding-top:10%;padding-bottom:10%">
        <h2 id='about3'> Get started!</h2>
        <center><a class='btn btn-success btn-lg' href='/signup' style='display:none' id='sign-up'><i class='fa fa-user-plus'></i> Sign up NOW!</a></center>
        </div>
    </div>
</div>

<div class='modal-footer'>
	<p>  ©2015 Li Xi</p>
</div>
<div style='text-align:center'>Icons made by <a href="http://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a>             is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC BY 3.0</a></div>
</body>
</html>


<script>

function isScrolledIntoView(elem)
{
    var $elem = $(elem);
    var $window = $(window);

    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();

    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}


$(document).ready(function() {
    $('#ani1-1').show(2000);
    $('#ani1-2').fadeIn(2000);

    check_handle = window.setInterval(function(){

        if(isScrolledIntoView('#adiv3'))
            {
                $("#ani3-1").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
                window.clearInterval(check_handle);
            }
    }, 100);

    check_handle2 = window.setInterval(function(){

        if(isScrolledIntoView('#adiv4'))
            {
                $('#sign-up').fadeIn(2000);
                window.clearInterval(check_handle2);
            }
    }, 100);

});

</script> -->
