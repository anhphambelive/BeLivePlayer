document.domain = 'localhost';
var url = 'https://staging.sunteccity.com.sg/partner/site/login';

let div = document.createElement('div');
div.className = "suntec-modal";
div.innerHTML = '<div id="myModal" class="modal"><div class="modal-content"><span class="close">&times;</span><div id="loadframe"><iframe  width="100%" height="400px" frameborder="0" src="' + url + '" id="suntecpage"></iframe></div></div></div>';
document.getElementsByTagName("body")[0].appendChild(div);

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

window.reloadSuntecAuthELements = function () {
    var elements = document.getElementsByClassName("suntec-auth");
    var myFunction = function () {
        
        var logged_in = getCookie('loggedin');
        if (logged_in == 'yes') {
            return false;
        }
        
        openSignInWindow(url, 'lma-login-redirect');
    };
    
    for (var i = 0; i < elements.length; i++) {
        var logged_in = getCookie('loggedin');
        if (logged_in != 'yes') {
            elements[i].setAttribute('data-href', elements[i].getAttribute('href'));
            elements[i].setAttribute('href', 'javascript:void(0);');
            
            elements[i].addEventListener('click', myFunction, false);
        } else {
            if (elements[i].getAttribute('data-href') != null) {
                elements[i].setAttribute('href', elements[i].getAttribute('data-href'));
            }
        }
        
    }
};

let windowObjectReference = null;
let previousUrl = null;

const openSignInWindow = (url, name) => {
    // remove any existing event listeners
    window.removeEventListener('message', receiveMessage);
    var iframe = document.getElementById('suntecpage');
    modal.style.display = "block";

    if (windowObjectReference === null || windowObjectReference.closed) {
        /* if the pointer to the window object in memory does not exist
         or if such pointer exists but the window was closed */
        windowObjectReference = iframe;
    } else if (previousUrl !== url) {
        /* if the resource to load is different,
         then we load it in the already opened secondary window and then
         we bring such window back on top/in front of its parent window. */
        windowObjectReference = iframe;
        windowObjectReference.focus();
    } else {
        /* else the window reference must exist and the window
         is not closed; therefore, we can bring it back on top of any other
         window with the focus() method. There would be no need to re-create
         the window or to reload the referenced resource. */
        windowObjectReference.focus();
    }

    // add the listener for receiving a message from the popup
    window.addEventListener('message', event => receiveMessage(event), false);
    // assign the previous URL
    previousUrl = url;
};

const receiveMessage = event => {
    // Do we trust the sender of this message? (might be
    // different from what we originally opened, for example).
    //console.log(event.origin);
    //        if (event.origin !== BASE_URL) {
    //            return;
    //        }
    // console.log(event);
    const { data } = event;

    // if we trust the sender and the source is our popup
    //if (data.source === 'lma-login-redirect') {
    // get the URL params and redirect to our server to use Passport to auth/login
    //console.log(data);
    var ssoToken = getParameterByName('ssoToken', data);
    if (!ssoToken) return;
    setCookie('loggedin', 'yes', 30);
    insertParam('ssoToken', ssoToken);
    //}
};

function setCookie(cname, cvalue, exmins) {
    var d = new Date();
    d.setTime(d.getTime() + (exmins * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function getParameterByName(name, url) {
    if (!url)
        url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function insertParam(key, value) {
    key = encodeURIComponent(key);
    value = encodeURIComponent(value);

    var s = document.location.search;
    var kvp = key + "=" + value;

    var r = new RegExp("(&|\\?)" + key + "=[^\&]*");

    s = s.replace(r, "$1" + kvp);

    //if (!RegExp.$1) {
    s += (s.length > 0 ? '&' : '?') + kvp;
    //}
    //again, do what you will here
    document.location.search = s;
}
