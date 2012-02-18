// JavaScript Document
//http://www.elated.com/articles/javascript-and-cookies/

//only name and value are required
function set_cookie ( name, value, expires, path, domain, secure )
{
	var cookie_string = name + "=" + escape ( value );
	var today = new Date();
	today.setTime( today.getTime() );
	if ( expires ){
		expires = expires * 1000 * 60 * 60 * 24; //days
		var expires_date = new Date( today.getTime() + (expires) );
		cookie_string += "; expires=" + expires_date.toUTCString();
	}
	if ( path )
		cookie_string += "; path=" + escape ( path );
	if ( domain )
		cookie_string += "; domain=" + escape ( domain );
	if ( secure )
		cookie_string += "; secure";
	document.cookie = cookie_string;
	//alert(cookie_string);
}

function xxxxxxxxxCookie( name, value, expires )
{
	// set current time -returns milliseconds
	( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" );
}
//del_cookie ( "username" );
function del_cookie ( cookie_name )
{
  var cookie_date = new Date ( );  // current date & time
  cookie_date.setTime ( cookie_date.getTime() - 1 );
  document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
}

//var x = get_cookie ( "username" );
function get_cookie ( cookie_name )
{
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

  if ( results )
    return ( unescape ( results[2] ) );
  else
    return null;
}
