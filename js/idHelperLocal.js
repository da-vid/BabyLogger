
function makeID()
{   //http://stackoverflow.com/questions/1349404/generate-a-string-of-5-random-characters-in-javascript
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 6; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function getQS()
{   //http://stackoverflow.com/a/3855394
    var qs = (function(a) {
        if (a === "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i)
        {
            var p=a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'));
    return qs;
}

function getListID() {    
    var qs = getQS();
    if (qs.i === "new") {
        window.location.href = "indexLocal.html?i="+makeID();  
    }
    else if(qs.i) {
        setCookie("lastList", qs.i, 60);
        return qs.i;
    }    
    else {
        var lastList = getCookie("lastList");
        if (lastList === "") {            
            window.location.href = "indexLocal.html?i="+makeID();          
        }
        else {
            window.location.href = "indexLocal.html?i="+lastList; 
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