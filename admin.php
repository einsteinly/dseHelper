<?php
include('/home/u185339700/public_html/exam/api/api.php');
if($_SESSION['auth']!='admin') die('FATAL ERROR. THIS PAGE IS ONLY FOR ADMINISTRATORS.');
?>


<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href='/css/b.css'>
<link rel="stylesheet" href='/css/gryphon.css'>
<link rel="stylesheet" href='/css/gry2.css'>
<script src="/js/jquery-1.11.0.min.js"></script>
<script src="/js/b.js"></script>
<script src="/js/gryphon.js"></script>
<script src="/js/classie.js"></script>
<title>dseHelper ADMIN PANEL</title>
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

<div class='container-fluid'>
    <div class='row'>
        <div class='panel panel-default'>
            <div class='panel-heading'><h3 class='panel-title'>Add a new video</h3></div>
            <div class='panel-body'>
                <form enctype="multipart/form-data" action='/api/api' method='post'>
                <input type='hidden' name='action' value='insert-entry'>
                    <div class='row'>
                    <div class='col-sm-3'>
                        <label> Question Year </label>
                        <input class='form-control' type='text' name='year'>
                    </div>
                    <div class='col-sm-3'>
                        <label> Question</label>
                        <input class='form-control' type='text' name='question'>
                    </div>
                    <div class='col-sm-3'>
                        <label> Youtube width </label>
                        <input class='form-control' type='number' name='width'>
                    </div>
                    <div class='col-sm-3'>
                        <label> Youtube height </label>
                        <input class='form-control' type='number' name='height'>
                    </div>
                    </div>

                    <div class='row'>
                    <div class='col-sm-12'>
                        <label> Youtube link </label>
                        <input class='form-control' type='text' name='link'>
                    </div>
                    </div>

                    <div class='row'>
                    <div class='col-sm-3'>
                        <label> Speaker 1 </label>
                        <input class='form-control' type='text' name='speaker1'>
                    </div>
                    <div class='col-sm-3'>
                        <label> Speaker 2 </label>
                        <input class='form-control' type='text' name='speaker2'>
                    </div>
                    <div class='col-sm-3'>
                        <label> Speaker 3 </label>
                        <input class='form-control' type='text' name='speaker3'>
                    </div>
                    <div class='col-sm-3'>
                        <label> Speaker 4 </label>
                        <input class='form-control' type='text' name='speaker4'>
                    </div>
                    </div>

                    <div class='row'>
                    <div class='col-sm-3'>
                        <label> Profile 1 </label>
                        <textarea class='form-control' type='text' name='profile1' rows='5'></textarea>
                    </div>
                    <div class='col-sm-3'>
                        <label> Profile 2 </label>
                        <textarea class='form-control' type='text' name='profile2' rows='5'></textarea>
                    </div>
                    <div class='col-sm-3'>
                        <label> Profile 3 </label>
                        <textarea class='form-control' type='text' name='profile3' rows='5'></textarea>
                    </div>
                    <div class='col-sm-3'>
                        <label> Profile 4 </label>
                        <textarea class='form-control' type='text' name='profile4' rows='5'></textarea>
                    </div>
                    </div>

                    <div class='row'>
                    <div class='col-sm-6'>
                        <label> Upload MP3 file (For mobile downloads)</label>
                        <input type='file' accept="audio/mp3" name='mp3'>
                    </div>
                    <div class='col-sm-6'>
                        <label> Upload transcript PDF file (For mobile downloads)</label>
                        <input type='file' accept="application/pdf" name='pdf'>
                    </div>
                    </div>

                    <br><br>
                    <center>
                        <input type='submit' class='btn btn-lg btn-success'>
                    </center>

                </form>
            </div>
        </div>
    </div>
</div>


<div class='modal-footer'style='text-align:center'>
    <p>  ©2015 Li Xi and Peter Yuen</p>
</div>

</body>
</html>


<script type="text/javascript">
function form_submit()
{
    transformID('submit','fa fa-spinner fa-pulse','Submitting...');
    var year = document.getElementById('year').value;
    var question = document.getElementById('question').value;
    var width = document.getElementById('width').value;
    var height = document.getElementById('height').value;
    var link = document.getElementById('link').value;
    var speaker1 = document.getElementById('speaker1').value;
    var speaker2 = document.getElementById('speaker2').value;
    var speaker3 = document.getElementById('speaker3').value;
    var speaker4 = document.getElementById('speaker4').value;
    var profile1 = document.getElementById('profile1').value;
    var profile2 = document.getElementById('profile2').value;
    var profile3 = document.getElementById('profile3').value;
    var profile4 = document.getElementById('profile4').value;

    $.post('/api/api',{JSON:1,action:'insert-entry',year:year,question:question,width:width,height:height,link:link,speaker1:speaker1,speaker2:speaker2,speaker3:speaker3,speaker4:speaker4,profile1:profile1,profile2:profile2,profile3:profile3,profile4:profile4},function(data){
        if(data)
        {
            window.alert('Operation succeeded');
            transformID('submit','','Submit');
        }

    });
}

</script>