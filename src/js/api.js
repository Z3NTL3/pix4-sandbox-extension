
let sandboxlink = document.getElementById('sandboxlink')
let error = document.getElementById('error')

sandboxlink.style.display = "none";
error.style.display = "none";

document.getElementById('titel').innerHTML = chrome.i18n.getMessage("titel")
document.getElementById('create').innerHTML = chrome.i18n.getMessage("create")
document.getElementById('visit').innerHTML = chrome.i18n.getMessage("sandbox")

console.log(chrome.i18n.getMessage("titel"))

let link = document.getElementById('link')

function Post_toEndPoint(url, callback,data)
{
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseURL);
    }
    xmlHttp.open("POST", url, true);
    xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlHttp.send(`code=${data}`);

    xmlHttp.onerror(function(err){
        error.innerHTML = chrome.i18n.getMessage("failed")
        error.style.display = "block"
    })
}

function openTab(){
    chrome.tabs.create({url: link.getAttribute('href'), active: true});
    sandboxlink.style.display = "none"
}

function callback(response){
    if(!String(response).includes('sandbox')){
        error.innerHTML = chrome.i18n.getMessage("minimum")
        error.style.display = "block"
        return -1
    }

    link.setAttribute('href', response)
    let sandboxlink = document.getElementById('sandboxlink')
    sandboxlink.style.display = "block";
}
const form = document.getElementById('myform')
    form.addEventListener('submit', () => {
        error.style.display = "none"
        event.preventDefault()

        let codebox = document.getElementById('codebox')
        let data = encodeURIComponent(codebox.value)

        Post_toEndPoint("https://code.pix4.dev/rest/code", callback,data);
})

link.addEventListener("click", openTab);