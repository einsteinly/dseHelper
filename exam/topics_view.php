<?php
include('/home/u185339700/public_html/exam/api/public.php');
$topic_id = $_GET['id'];
$sql = "SELECT id,question_year,question,speaker,speaker_profile,youtube_link,youtube_width,youtube_height,answer_date,comment,rating FROM topic_database WHERE id='$topic_id' ";
$result=mysqli_query($conn,$sql);
if(mysqli_num_rows($result)>0)
{
    while($row = mysqli_fetch_assoc($result))
    {
        $topic_row = $row;
    }
}

$comment_array = json_decode($topic_row['comment'],true);
$rating_array = json_decode($topic_row['rating'],true);
$speaker_array = json_decode($topic_row['speaker'],true);
$speaker_profile_array = json_decode($topic_row['speaker_profile'],true);

//Calculating average ratings for each speaker and storing it into speaker_array[n]['average_rating']
if($rating_array != [])
{
    foreach($rating_array as $index => $value)
    {
        $speaker0_rating_total += $value['rating'][0];
        $speaker1_rating_total += $value['rating'][1];
        $speaker2_rating_total += $value['rating'][2];
        $speaker3_rating_total += $value['rating'][3];
        $count++;
    }
    $average_rating[0] = $speaker0_rating_total/$count;
    $average_rating[1] = $speaker1_rating_total/$count;
    $average_rating[2] = $speaker2_rating_total/$count;
    $average_rating[3] = $speaker3_rating_total/$count;
}
else
{
    $average_rating=[0,0,0,0];
}



if($_POST['debug']==1) var_dump($topic_row,$comment_array,$rating_array,$speaker_array,$speaker_profile_array);


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
<script src="/js/jRate.js"></script>
<title>dseHelper</title>
<style>
    p{
        text-align: left ;
        word-wrap: break-word;
    }
</style>
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



<div class='container-fluid' style='margin-top:100px'>
    <div class='row'>
        <center>
        <?php
            //$height_percent = (string)($topic_row['youtube_height']/$topic_row['youtube_width']*100).'%';
            echo '<iframe width="70%" height="'.$topic_row['youtube_height'].'" src="'.$topic_row['youtube_link'].'" allowfullscreen></iframe>';
            echo "<script>
                    $(document).ready(function(){
                    document.getElementsByTagName('iframe')[0].height=".(string)($topic_row['youtube_height']/$topic_row['youtube_width'])."* window.innerWidth*0.7;});
                </script>";
            //echo '<iframe src="'.$topic_row['youtube_link'].'" style=\' width:100%; height:'.$height_percent.'  \'></iframe>';
        ?>
        </center>
    </div>
    <div class='row'>
        <div class='col-xs-12'>
            <table class='table table-hover table-bordered' style='text-align:center'>
            <?php
                echo '<tr>'.'<td>Question'.'</td>'
                    .'<td>'.$topic_row['question'] .'</td>'.'</tr>'
                    .'<tr>'.'<td>Year of examination'.'</td>'
                    .'<td>'.$topic_row['question_year'] .'</td>'.'</tr>'
                    ;
            ?>
            </table>
        </div>
    </div>

    <div class='row'>

        <?php
            echo "<div class='row'>";
            echo "<div class='col-sm-6'><div class='panel panel-info'>"
                ."<div class='panel-heading' onClick='$(\"#speaker1_profile\").slideToggle()'><h3 class='panel-title'>Speaker 1: <b>".$speaker_array[0]." </b><br><span id='speaker1_average_rating'></span><h3></div><script>
                    $(document).ready(function(){
                                    $(\"#speaker1_average_rating\").jRate({
                                        rating:".(string) $average_rating[0].",
                                        count:8,
                                        max:8,
                                        readOnly:true
                                        });
                                });
                    </script>"
                ."<div class='panel-body' id='speaker1_profile'><p> ".nl2br($speaker_profile_array[0])
                ."</p></div>"
                ."</div></div>";

            echo "<div class='col-sm-6'><div class='panel panel-info'>"
                ."<div class='panel-heading' onClick='$(\"#speaker2_profile\").slideToggle()'><h3 class='panel-title'>Speaker 2: <b>".$speaker_array[1]." </b><br><span id='speaker2_average_rating'></span><h3></div><script>
                    $(document).ready(function(){
                                    $(\"#speaker2_average_rating\").jRate({
                                        rating:".(string) $average_rating[1].",
                                        count:8,
                                        max:8,
                                        readOnly:true
                                        });
                                });
                    </script>"
                ."<div class='panel-body' id='speaker2_profile'><p> ".nl2br($speaker_profile_array[1])
                ."</p></div>"
                ."</div></div>";

            echo "</div>";
            echo "<div class='row'>";
            echo "<div class='col-sm-6'><div class='panel panel-info'>"
                ."<div class='panel-heading' onClick='$(\"#speaker3_profile\").slideToggle()'><h3 class='panel-title'>Speaker 3: <b>".$speaker_array[2]." </b><br><span id='speaker3_average_rating'></span><h3></div><script>
                    $(document).ready(function(){
                                    $(\"#speaker3_average_rating\").jRate({
                                        rating:".(string) $average_rating[2].",
                                        count:8,
                                        max:8,
                                        readOnly:true
                                        });
                                });
                    </script>"
                ."<div class='panel-body' id='speaker3_profile'><p> ".nl2br($speaker_profile_array[2])
                ."</p></div>"
                ."</div></div>";

            echo "<div class='col-sm-6'><div class='panel panel-info'>"
                ."<div class='panel-heading' onClick='$(\"#speaker4_profile\").slideToggle()'><h3 class='panel-title'>Speaker 4: <b>".$speaker_array[3]." </b><br><span id='speaker4_average_rating'></span><h3></div><script>
                    $(document).ready(function(){
                                    $(\"#speaker4_average_rating\").jRate({
                                        rating:".(string) $average_rating[3].",
                                        count:8,
                                        max:8,
                                        readOnly:true
                                        });
                                });
                    </script>"
                ."<div class='panel-body' id='speaker4_profile'><p> ".nl2br($speaker_profile_array[3])
                ."</p></div>"
                ."</div></div>";
            echo "</div>";
        ?>
    </div>

    <hr>
    <div class='row'>
        <div class='col-xs-12'>
            <h2>Comments and Rating</h2>
            <table class='table table-hover table-bordered'>
                <?php

                if( $comment_array != null)
                    foreach( $comment_array as $key => $value )
                    {
                        echo '<tr><td><h4 style="text-align:left">'.$value['user'].'</h4>'
                            .'<p style="text-align:left">For speaker 1: '." <span id='comment_rating1".$key."'></span>".'</p>'
                            .'<p>'.str_replace('\n',"<br>", $value['comment'][0]).'</p>'

                            .'<p style="text-align:left">For speaker 2: '." <span id='comment_rating2".$key."'></span>".'</p>'
                            .'<p>'.str_replace('\n',"<br>", $value['comment'][1]).'</p>'

                            .'<p style="text-align:left">For speaker 3: '." <span id='comment_rating3".$key."'></span>".'</p>'
                            .'<p>'.str_replace('\n',"<br>", $value['comment'][2]).'</p>'

                            .'<p style="text-align:left">For speaker 4: '." <span id='comment_rating4".$key."'></span>".'</p>'
                            .'<p>'.str_replace('\n',"<br>", $value['comment'][3]).'</p>'.'</td></tr>'

                            ."<script>
                            $(document).ready(function(){
                                $(\"#comment_rating1".$key."\").jRate({
                                    rating:".(string)$rating_array[$key]['rating'][0].",
                                    count:8,
                                    max:8,
                                    readOnly:true
                                    });
                                $(\"#comment_rating2".$key."\").jRate({
                                    rating:".(string)$rating_array[$key]['rating'][1].",
                                    count:8,
                                    max:8,
                                    readOnly:true
                                    });
                                $(\"#comment_rating3".$key."\").jRate({
                                    rating:".(string)$rating_array[$key]['rating'][2].",
                                    count:8,
                                    max:8,
                                    readOnly:true
                                    });
                                $(\"#comment_rating4".$key."\").jRate({
                                    rating:".(string)$rating_array[$key]['rating'][3].",
                                    count:8,
                                    max:8,
                                    readOnly:true
                                    });
                            });
                                </script>"
                                ;
                    }
                ?>
            </table>
            <hr>
            <div class='row'>
                <h3>Add a comment</h3>
                <div class='col-sm-6'>
                    <h4>Rating for Speaker 1: <span><div id="jRate1"></div></span></h4>
                    <textarea class='form-control' rows='5' id='comment-input1'></textarea>
                </div>
                <div class='col-sm-6'>
                    <h4>Rating for Speaker 2: <span><div id="jRate2"></div></span></h4>
                    <textarea class='form-control' rows='5' id='comment-input2'></textarea>
                </div>
                <div class='col-sm-6'>
                    <h4>Rating for Speaker 3: <span><div id="jRate3"></div></span></h4>
                    <textarea class='form-control' rows='5' id='comment-input3'></textarea>
                </div>
                <div class='col-sm-6'>
                    <h4>Rating for Speaker 4: <span><div id="jRate4"></div></span></h4>
                    <textarea class='form-control' rows='5' id='comment-input4'></textarea>
                </div>
            </div>

            <div class='row'>
                <center>
                    <br><br>
                    <?php
                        if($login_status) echo "<a class='btn btn-info btn-lg' onClick='comment_submit()' id='comment-btn'>Submit comment</a>";
                        else echo "<a class='btn btn-info btn-lg' disabled>Please log in first</a>"
                    ?>

                </center>
            </div>
        </div>
    </div>
</div>

<div class='modal-footer' style='text-align:center;margin-top:5%'>
    <p style='text-align:center;'>  ©2015 Li Xi and Peter Yuen</p>
</div>

</body>
</html>


<script>
var rating_arr=[1,1,1,1,1];
$(document).ready(function(){
    $("#jRate1").jRate({
        startColor: 'cyan',
        endColor: 'blue',
        precision:1,
        count:8,
        max:8,
        rating:1,
        onSet: function(rating){
            rating_arr[1]=rating;
        }
    });

    $("#jRate2").jRate({
        startColor: 'cyan',
        endColor: 'blue',
        precision:1,
        count:8,
        max:8,
        rating:1,
        onSet: function(rating){
            rating_arr[2]=rating;
        }
    });

    $("#jRate3").jRate({
        startColor: 'cyan',
        endColor: 'blue',
        precision:1,
        count:8,
        max:8,
        rating:1,
        onSet: function(rating){
            rating_arr[3]=rating;
        }
    });

    $("#jRate4").jRate({
        startColor: 'cyan',
        endColor: 'blue',
        precision:1,
        count:8,
        max:8,
        rating:1,
        onSet: function(rating){
            rating_arr[4]=rating;
        }
    });

    //Align the profile heights:
    if(document.getElementById('speaker1_profile').offsetHeight > document.getElementById('speaker2_profile').offsetHeight) document.getElementById('speaker2_profile').setAttribute('style', 'height:'+ String(document.getElementById('speaker1_profile').offsetHeight)+'px');
    else document.getElementById('speaker1_profile').setAttribute('style', 'height:'+ String(document.getElementById('speaker2_profile').offsetHeight)+'px');
    if(document.getElementById('speaker3_profile').offsetHeight > document.getElementById('speaker4_profile').offsetHeight) document.getElementById('speaker4_profile').setAttribute('style', 'height:'+ String(document.getElementById('speaker3_profile').offsetHeight)+'px');
    else document.getElementById('speaker3_profile').setAttribute('style', 'height:'+ String(document.getElementById('speaker4_profile').offsetHeight)+'px');
});

function comment_submit()
{
    if(window.confirm('Are you sure you want to submit?')===true)
    {
        transformID('comment-btn','fa fa-spinner fa-pulse','Submitting comment');
        var comment1 = document.getElementById('comment-input1').value;
        var comment2 = document.getElementById('comment-input2').value;
        var comment3 = document.getElementById('comment-input3').value;
        var comment4 = document.getElementById('comment-input4').value;
        var id = QueryString.id;
        var rating1 = rating_arr[1];
        var rating2 = rating_arr[2];
        var rating3 = rating_arr[3];
        var rating4 = rating_arr[4];
        $.post('/api/api',{JSON:1,action:'insert_comment',comment1:comment1,comment2:comment2,comment3:comment3,comment4:comment4,rating1:rating1,rating2:rating2,rating3:rating3,rating4:rating4,id:id},function(data){
            if(data) {transformID('comment-btn','','Submit comment');location.reload();}
            else alert('Operation failed.');
        });
    }
}



</script>