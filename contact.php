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
<title>dseHelper</title>
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
            <li> <a href='/index'><i class='fa fa-user fa-fw'></i> Home</a></li>
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



<div class='container-fluid' style="padding-top:100pt">
<div class='row'>
    <div class='col-sm-6'>
        <div class='panel panel-default'>
            <div class='panel-heading'>
                <h2>Li Xi: chief software developer</h2>
            </div>

            <div class='panel-body'>
                <h4>Email: lixi@lalx.org</h4>
            </div>
        </div>
    </div>
    <div class='col-sm-6'>
        <div class='panel panel-default'>
            <div class='panel-heading'>
                <h2>Peter Yuen Ho Hin</h2>
            </div>

            <div class='panel-body'>
                <h4>Email: peter@lixiapps.com</h4>
            </div>
        </div>
    </div>
</div>

<div class='row'>
<div class='col-sm-12'>
    <div class='panel panel-default'>
        <div class='panel-heading'>
            <h2>General enquiries</h2>
        </div>


        <div class='panel-body'>
            <p>Email: info@lixiapps.com</p>
            <form action='/api/api' enctype="multipart/form-data" method='POST'>
            <input type="hidden" name="action" value="contact">
            <div class='row'>
                <div class='col-md-4'>
                <label>Your Name:</label>
                <input type='text' class='form-control' placeholder="Enter your name" name='name' id='name'>
                </div>

                <div class='col-md-4'>
                <label>Your email:</label>
                <input type='email' class='form-control' placeholder="Enter your email" name='email' id='email'>
                </div>

                <div class='col-md-4'>
                <label>Your contact number:</label>
                <input type='number' class='form-control' placeholder="Enter your contact number" name='number' id='number'>
                </div>
            </div>
            <br>
            <div class='row'>
            <div class='col-sm-12'>
                <label>Feedback/Comment/Enquiry</label>
                <textarea class='form-control' rows='6' name='comment'></textarea>
            </div>
            </div>


            <center>
            <br><br>
            <button type='submit' class='btn btn-lg btn-default'>Submit</button>
            </center>
            </form>
        </div>
    </div>
</div>
</div>
</div>

<div class='modal-footer'>
    <p>  ©2015 Li Xi</p>
</div>

</body>
</html>

