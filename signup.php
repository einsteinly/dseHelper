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
<script src="/js/gryphon.js"></script>
<script src="/js/classie.js"></script>
<title>Signup for dseHelper</title>
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

<div class="container">
<div class='jumbotron' style="padding-top:100pt">
    <h1> Sign-up for dseHelper!<br></h1>
    <div class='container'>
      <form role="form" action="/api/api" method="post"  onSubmit="return formValidate();">
        <input type='hidden' name='action' value='signup'>
      <div class='row'>
        <div class="form-group col-lg-4">
          <label>User name:</label>
          <input class="form-control" name="user" placeholder="Enter user name" id='user'>
        </div>

        <div class="form-group col-lg-4">
          <label for="password">Password:</label>
          <input class="form-control" name="password" placeholder="Enter your password" type='password' id='password1'>
          <label class='alert-primary'>Please remember your password. Your password is encrypted using MD5HASH at our server. We will not be able to recover your password in any way.</label>
        </div>

        <div class="form-group col-lg-4" id='div-pw'>
          <label for="password">Confirm your password:</label>
          <input class="form-control" name="password_2" placeholder="Enter your password again" type='password' id='password2'>
          <label id='pw-status' class='has-error'></label>
        </div>

      </div>

      <div class='row'>
        <div class="form-group col-lg-6">
          <label>Email:</label>
          <input class="form-control" name="email" placeholder="Enter email" type="email" id='email1'>
          <label class='alert-info'>Only important notifications and announcements will be sent to your email. We will not spam you, don't worry.</label>
        </div>

        <div class="form-group col-lg-6" id='email-div'>
          <label>Confirm your email:</label>
          <input class="form-control" name="email" placeholder="Enter email" type="email" id='email2'>
          <label id='email-status'></label>
        </div>
      </div>

        <div class="form-group">
          <label>Current country of residence:</label>
          <input class="form-control" name="country" placeholder="Enter country of residence" id='country'>
        </div>

        <center>
        <button type="submit" class="btn btn-default btn-lg" >Submit</button>
        <label> <a href="/login" class='btn'>If you have an account already, log in here</a></label>
        </center>
      </form>
      </div>
</div>


</div>

<div class='modal-footer'>
	<p>  ©2015 Li Xi</p>
</div>

</body>
</html>



<script>
$(document).ready(function(e) {
   window.setInterval( function() { $('#password2').on('blur', checkform());},500);

});


function checkform()
{
	if( document.getElementById('password1').value != document.getElementById('password2').value )
	{
		$('#div-pw').addClass('has-error');
		document.getElementById('pw-status').innerHTML = 'Passwords do not match';
		setCookie('error','1',1);
	}
	else
	{
		$('#div-pw').removeClass('has-error');
		document.getElementById('pw-status').innerHTML = ' ';
		setCookie('error','1',0);
	}

	if( document.getElementById('email1').value != document.getElementById('email2').value )
	{
		$('#email-div').addClass('has-error');
		document.getElementById('email-status').innerHTML = 'Emails do not match';
		setCookie('error','1',1);
	}
	else
	{
		$('#email-div').removeClass('has-error');
		document.getElementById('email-status').innerHTML = ' ';
		setCookie('error','1',0);
	}
}

function formValidate()
{
	if( $('#user').val() == '') setCookie('error','1',1);
	if( $('#password1').val() == '') setCookie('error','1',1);
	if( $('#email1').val() == '') setCookie('error','1',1);
	if( $('#country').val() == '') setCookie('error','1',1);

	if(getCookie('error') ==  '1')
	{
		alert('Please do NOT leave any field empty. Error are highlighted. ');
		return false;
	}
	else return true;
}
</script>
