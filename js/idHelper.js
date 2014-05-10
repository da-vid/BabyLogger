
function makeID()
{   //http://stackoverflow.com/questions/1349404/generate-a-string-of-5-random-characters-in-javascript
    var text = "";
    var possible = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";

    for( var i=0; i < 6; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function getID()
{   
    //strip the leading slash first
    var id = window.location.pathname.substr(1);
    //strip a trailing slash, if it exists
    if (id.charAt(id.length - 1) === "/") {
        window.location.href = "../" + id.substr(0, id.length - 1);
    }
    return id;
}

function getListID() {    
    var id = getID();
    if (id === "new") {
        window.location.href = makeID();  
    }
    else if(id) {        
        setCookie("lastList", id, 60);
        return id;
    }
    else {
        var lastList = getCookie("lastList");
        if (lastList === "") {            
            window.location.href = makeID();            
        }
        else {
            window.location.href = lastList; 
        }
    }
}

function setCookie(cname,cvalue,exdays)
{
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname)
{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name)===0) return c.substring(name.length,c.length);
    }
    return "";
}