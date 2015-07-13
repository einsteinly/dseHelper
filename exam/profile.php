<?php
include('/home/u185339700/public_html/exam/api/api.php');
?>

<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
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

<link rel="stylesheet" href='/css/b.css'>
<link rel="stylesheet" href='/css/gry2.css'>
<link rel="stylesheet" href='/css/gryphon.css'>
<script src="/js/jquery-1.11.0.min.js"></script>
<script src="/js/b.js"></script>
<script src="/js/gryphon.js"></script>
<script src="/js/classie.js"></script>

<title>dseHelper</title>

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
            <li class='active'> <a href='/exam/profile' id='nav-user'></a></li>
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
    <h1 id='head2' style="display:none"> <i class='fa fa-cogs'></i> Account Settings</h1>
    <p id='status'><br></p>
    </div>
</div>

<div class='container'>
    <div class='row'>
        <div class='panel panel-default'>
            <div class='panel-heading'>
                <div class='row'>
                  <div class='col-sm-6'>
                    <label><i class='fa fa-user'></i> User Name</label>
                    <p class='form-control-static form-control' id='name'></p>
                  </div>
                  <div class='col-sm-6'>
                    <label><i class='fa fa-barcode'></i> Unique user ID (Useful for technical support)</label>
                    <p class='form-control-static form-control' id='id'></p>
                  </div>
                </div><br><br>
            </div>

            <div class='panel-body'>
            <form action='../api/api' enctype="multipart/form-data" method='POST' onSubmit="return validateForm()">
            <input type='hidden' name='action' value='profile_update'>
            <label> If you need to update any field, edit the corresponding field and click submit. Other fields will not be affected. </label><br><br>
            <div class='row'>

              <div class='col-sm-4' id='password1-div'>
              <label><i class='fa fa-key'></i> New password</label>
              <input type='password' class='form-control' id='password1' name='password'>
              </div>
              <div class='col-sm-4' id='password2-div'>
              <label><i class='fa fa-key'></i> Confirm password</label>
              <input type='password' class='form-control' id='password2'>
              </div>

              <div class='col-sm-4'>
                <label><i class='fa fa-envelope-o'></i> Email</label>
                <input class='form-control' type='text' id='email' name='email'>
              </div>

            </div><br>

            <center><br>

            </center><br><br>
            <center>
                <div class='btn-group'>
                    <div class='btn-group'>
                    <button type='submit' class='btn btn-default btn-lg'>Confirm</button>
                    </div>

                    <div class='btn-group'>
                    <a class='btn btn-danger btn-lg' onClick='log_out()'><i class='fa fa-lock'></i> Log OUT</a>
                    </div>
                </div>
            </center>
            </form>

            </div>
        </div>
    </div>
</div>


<div class='modal-footer'>
    <p>©2015 Li Xi</p>
</div>

</body>
</html>


<script src='/js/j2.js'></script>
<script>
APILocation = '/api/api';

$(document).ready(function(e) {
    var JArray;
    document.getElementById('name').innerHTML = getCookie('auth');
    $.post(APILocation,{JSON:1,action:'user_profile'},function(data) {
    JArray=$.parseJSON(data);
    document.getElementById('id').innerHTML = JArray["id"];
    document.getElementById('email').value = JArray["email"];
    window.setInterval(function() {validateFormRealTime()},100);
    });
});

function validateFormRealTime()
{
    if(document.getElementById('password1') != null)
    {
    if($('#password1').val() != $('#password2').val() ) {$('#password1-div').addClass('has-error');$('#password2-div').addClass('has-error');}
    else {$('#password1-div').removeClass('has-error');$('#password2-div').removeClass('has-error');}
    }
}

function validateForm()
{
    error=0;
    if(document.getElementById('password1') != null)
    {
        if($('#password1').val()=='') {$('#password1-div').addClass('has-error');error=1;}
        else {$('#password1-div').removeClass('has-error');error=0;}
        if($('#password2').val()=='') {$('#password2-div').addClass('has-error');error=1;}
        else {$('#password2-div').removeClass('has-error');error=0;}
        if($('#password1').val() != $('#password2').val() ) {$('#password1-div').addClass('has-error');$('#password2-div').addClass('has-error');error=1;}
    else {$('#password1-div').removeClass('has-error');$('#password2-div').removeClass('has-error');error=0;}
    }
    if(error) {alert('Passwords entered are not matched. Please try again.');return false;}
    else return true;
}

</script>