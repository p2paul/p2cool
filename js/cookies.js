// JavaScript Document
// http://psoug.org/snippet/Javascript_Cookie_functions_123.htm
/*
setCookie(NAME, value) 
getCookie(NAME) 
clearCookie(NAME) 
clearCookies() 
*/

function setCookie(NAME, value)
         {
         //If name is the empty string, it places a ; at the beginning
         //of document.cookie, causing clearCookies() to malfunction.
         if(NAME != '')
            document.cookie = NAME + '=' + value;
         }
 
function getCookie(NAME)
         {
         //Without this, it will return the first value 
         //in document.cookie when name is the empty string.
         if(NAME == '')
            return('');
 
         name_index = document.cookie.indexOf(NAME + '=');
 
         if(name_index == -1)
            return('');
 
         cookie_value =  document.cookie.substr(name_index + NAME.length + 1, 
                                                document.cookie.length);
 
         //All cookie name-value pairs end with a semi-colon, except the last one.
         end_of_cookie = cookie_value.indexOf(';');
         if(end_of_cookie != -1)
            cookie_value = cookie_value.substr(0, end_of_cookie);
 
         //Restores all the blank spaces.
         space = cookie_value.indexOf('+');
         while(space != -1)
              { 
              cookie_value = cookie_value.substr(0, space) + ' ' + 
              cookie_value.substr(space + 1, cookie_value.length);
 
              space = cookie_value.indexOf('+');
              }
 
         return(cookie_value);
         }
 
function clearCookie(NAME)
         {                  
         expires = new Date();
         expires.setYear(expires.getYear() - 1);
 
         document.cookie = NAME + '=null' + '; expires=' + expires;            
         }
 
function clearCookies()
         {
         Cookies = document.cookie;
         Cookie = Cookies;
         expires = new Date();
         expires.setYear(expires.getYear() - 1);
 
         while(Cookie.length > 0)
              {
              //All cookie name-value pairs end with a semi-colon, except the last one.
              Cookie = Cookies.substr(0, Cookies.indexOf(';'));
              Cookies = Cookies.substr(Cookies.indexOf(';') + 1, Cookies.length);
 
              if(Cookie != '')
                 document.cookie = Cookie + '; expires=' + expires;
              else
                 document.cookie = Cookies + '; expires=' + expires;                                         
              }                      
         }