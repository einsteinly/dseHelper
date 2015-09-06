<?php
include('/home/u185339700/public_html/exam/api/public.php');
$question_year = $_GET['year'];
$sql = "SELECT id,question,speaker,comment,rating FROM topic_database WHERE question_year='$question_year' ";
$result=mysqli_query($conn,$sql);
if(mysqli_num_rows($result)>0)
{
    while($row = mysqli_fetch_assoc($result))
    {
        $topic_database[] = $row;
    }
}
if($_POST['debug']) var_dump($topic_database);
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
<title>dseHelper</title>
<meta name="keywords" content="vocab, lixi, lixiapps, SAT, vocabtrump, effective, memorise">
<meta name="description" content="An app that helps you effectively memorise bite-sized information.">

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
            <li> <a href='/exam/profile' id='nav-user'></a></li>
            <li> <a href='/about'><i class='fa fa-info-circle fa-fw'></i> About</a></li>

            <li> <a href='/syllabus'><i class='fa fa-book fa-fw'></i> Syllabus</a></li>
            <li class='dropdown active'>
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
    <h1 id='head1' style="display:none">
        <?php
            echo 'Topics in '. $_GET['year'];
        ?>
    </h1>
    </div>
</div>


<div class='container'>
    <div class='table-responsive'>
        <table class='table table-hover table-bordered' id='display_table'>
            <tr>
                <th>S/N</th>
                <th>Question</th>
                <th>Speakers</th>
                <th>Number of teacher comments</th>
            </tr>
            <?php
            if($topic_database != null)
            foreach($topic_database as $key => $_value)
            {
                $speakers_array = json_decode($_value['speaker']);
                echo '<tr>'
                    .'<td>'.(string)($key+1).'</td>'
                    .'<td><a href="/exam/topics_view?id='.$_value['id'].'">'.$_value['question'].'</a></td>'
                    .'<td>'.$speakers_array[0].', '.$speakers_array[1].', '.$speakers_array[2].', '.$speakers_array[3].'</td>'
                    .'<td>'.(string)(count(json_decode($_value['comment'],true))).'</td>'
                    .'</tr>';
            }
            ?>
        </table>
    </div>
</div>

<div class='modal-footer'style='text-align:center'>
    <p>  ©2015 dseHelper</p>
</div>

</body>
</html>
