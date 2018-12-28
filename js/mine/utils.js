function convertPaddingToPixel(val)
{
    return $("#absolutepixel").width() * val;
}

function downloadURI(uri, name) 
{
    var link = document.createElement("a");

    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();   
    //after creating link you should delete dynamic link
    clearDynamicLink(link); 
}

function convertWidthToCenti(val)
{
    return val / $("#absolutepixel").width();
}

function clearDynamicLink(link)
{
    link.parentNode.removeChild(link);
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}