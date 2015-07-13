<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href='/css/b.css'>
<link rel="stylesheet" href='/css/gry2.css'>
<link rel="stylesheet" href='/css/gryphon.css'>

<title>Login to dseHelper</title>
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
<body>
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
            <li> <a href='/about'><i class='fa fa-info-circle fa-fw'></i> About</a></li>

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






<div>
	<div class='jumbotron' style="padding-top:100pt">
    <h1 id='head2' style="display:none"><i class='fa fa-lock'></i> AUTHENTICATION<br></h1>
    </div>
</div>

<div class="container">
  <h2>Please log in using your user name and password.</h2>
  <form role="form" action="/api/api" method="post" >
  <input type='hidden' name='action' value="login">
  <div class='row'>
    <div class='col-sm-6'>
        <div class="form-group">
          <label>User name:</label>
          <input class="form-control" name="user" placeholder="Enter user name">
        </div>
    </div>

    <div class='col-sm-6'>
        <div class="form-group">
          <label for="password">Password:</label>
          <input class="form-control" name="password" placeholder="Enter the given password" type='password'>
        </div>
    </div>

    <center>
        <div class='btn-group'>
            <div class='btn-group'>
                <a class='btn btn-lg btn-success' href='/signup'> Sign-up</a>
            </div>
            <div class='btn-group'>
                <button type="submit" class="btn btn-default btn-lg">Submit</button>
            </div>
            <div class='btn-group'>
                <a href='#' onClick='FB.login()' class="btn btn-primary btn-lg">Log in with Facebook</a>
            </div>
        </div>
    </center>
  </form>

</div>

<br><br>
<div class='modal-footer'>
	<p>  ©2015 Li Xi</p>
</div>

</body>
</html>

<script type="text/javascript">
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {
      FB_login();
      function FB_login(){
        console.log('Connected to Facebook. Fetching account information. ');
        FB.api('/me', function(fb_data) {
          console.log('Successful login for: ' + fb_data.name);
          //Automatically sign-up for a new account if it does not exist. Otherwise, log in the user.
          $.post('/api/api',{JSON:1,action:'FB_signup_login',fb_data:JSON.stringify(fb_data)},function(data){
            if(data) location='/exam/home';
            else alert('An error has occured. Please try again.');
          });
        });
      }
    }
  }
  //This function must be defined before the facebook API SDK is included. The SDK is included in gryphon.js
</script>

<script src="/js/jquery-1.11.0.min.js"></script>
<script src="/js/b.js"></script>
<script src="/js/gryphon.js"></script>
<script src="/js/classie.js"></script>
