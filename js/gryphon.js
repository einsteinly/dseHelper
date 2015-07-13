/*
--------Gryphon Corporation----------
--------©2014 gryphon web------------
*/

APILocation = '/api/api';


var QueryString = function () {
  // This function is anonymous, is executed immediately and
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]], pair[1] ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  }
    return query_string;
} ();

$(document).ready(function() {
    $('#head1').fadeIn(2000);
	$('#head2').fadeIn(1000);
	$('#head3').fadeIn(1000);

	$('#about1').fadeIn(1000);

    //display user profile
    $.post(APILocation,{JSON:1,action:'user_name'},function(data){
        if(data!='')
        {
            tag = document.createElement('span');
            tag.className='fa fa-user fa-fw';
            profileElem = document.getElementById('nav-user');
            if(profileElem!= null)
            {
                profileElem.appendChild(tag);
                profileElem.appendChild(document.createTextNode(" "+data));
            }
        }
        else
        {
            profileElem = document.getElementById('nav-user');
            tag = document.createElement('span');
            tag.className='fa fa-user-plus fa-fw';
            if(profileElem!= null)
            {
                profileElem.appendChild(tag);
                profileElem.appendChild(document.createTextNode(" Sign up"));
                profileElem.href = '/signup';
            }
        }
    });


	HAnimate();
});

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function HAnimate() {

	var docElem = document.documentElement,
		header = document.querySelector( '.navbar-fixed-top' ),
		didScroll = false,
		changeHeaderOn = 300;

	function init() {
		window.addEventListener( 'scroll', function( event ) {
			if( !didScroll ) {
				didScroll = true;
				setTimeout( scrollPage, 250 );
			}
		}, false );
	}

	function scrollPage() {
		var sy = scrollY();
		if ( sy >= changeHeaderOn ) {
			classie.add( header, 'navbar-shrink' );
		}
		else {
			classie.remove( header, 'navbar-shrink' );
		}
		didScroll = false;
	}

	function scrollY() {
		return window.pageYOffset || docElem.scrollTop;
	}

	init();

}


function getCookie_raw(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
}

function getCookie(cname) {
    var raw=getCookie_raw(cname);
	return raw;
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; path=/;" + expires;
}

function setSessionCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue  + "; path=/";
}

function deleteCookie(cname)
{
	document.cookie = cname + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
}
function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


function transformID(docID,className,text)
{
    document.getElementById(docID).innerHTML='';
    tag = document.createElement('span');
    tag.className=className;
    document.getElementById(docID).appendChild(tag);
    document.getElementById(docID).appendChild(document.createTextNode(' '+ text));
}

function log_out()
{
    $.post('/api/api',{JSON:1,action:'logout'},function(data){
        FB.logout(function(response){
            if(data) window.location = '/index';
        });
    });
}





//Facebook API is included here



  if(typeof(statusChangeCallback) == 'undefined')
  {
    statusChangeCallback = function() {};
  }

  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }


  window.fbAsyncInit = function() {
  FB.init({
    appId      : '371450146390529',
    cookie     : true,  // enable cookies to allow the server to access
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.2' // use version 2.2
  });

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

