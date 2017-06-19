function save_now_function(){
	var wb_url = "https://web.archive.org/save/";
	chrome.runtime.sendMessage({message: "openurl", wayback_url: wb_url, method:'save' }, function(response) {
	});
}

function recent_capture_function(){
	var wb_url = "https://web.archive.org/web/2/";
	chrome.runtime.sendMessage({message: "openurl", wayback_url: wb_url, method:'recent' }, function(response) {
	});
}

function first_capture_function(){
	var wb_url = "https://web.archive.org/web/0/";
	chrome.runtime.sendMessage({message: "openurl", wayback_url: wb_url, method:'first' }, function(response) {
	});
}

function view_all_function(){
	var pattern = /https:\/\/web\.archive\.org\/web\/(.+?)\//g;
	url = document.location.href.replace(pattern, "");
	open_url = "https://web.archive.org/web/*/"+encodeURI(url);
	document.location.href = open_url;
}

function makeModal(){
    chrome.runtime.sendMessage({message: "makemodal"}, function(response) {
	});
    
}

function showSettings(eventObj){
    var target=eventObj.target;
    if(target.getAttribute('toggle')=='off'){
        document.getElementById('settings_btn').setAttribute('toggle','on');
    document.getElementById('settings_div').style.display="block";
    }else{
        document.getElementById('settings_btn').setAttribute('toggle','off');
        document.getElementById('settings_div').style.display="none";
    }
    
}

function restoreSettings() {
  
  chrome.storage.sync.get({
    
    ts: true,
    rt:true
  }, function(items) {
    
    document.getElementById('ts').checked = items.ts;
    document.getElementById('rt').checked = items.rt;
      if(items.rt){
          document.getElementById('make_modal').style.display="block";
      }else{
          document.getElementById('make_modal').style.display="none";
      }
      if(items.ts){
          chrome.runtime.sendMessage({message: "start_ts"}, function(response) {});
      }
  });
}

function saveSettings(){
    var ts = document.getElementById('ts').checked;
    var rt = document.getElementById('rt').checked;
    if(ts){
        chrome.runtime.sendMessage({message: "start_ts"}, function(response) {});
    }
    chrome.storage.sync.set({
    
    ts: ts,
    rt:rt
  });
}




document.getElementById('settings_div').style.display="none";

document.addEventListener('DOMContentLoaded', restoreSettings);
document.getElementById('save_now').onclick = save_now_function;
document.getElementById('recent_capture').onclick = recent_capture_function;
document.getElementById('first_capture').onclick = first_capture_function;
document.getElementById('make_modal').onclick=makeModal;
document.getElementById('settings_btn').onclick=showSettings;
document.getElementById('settings_save_btn').onclick=saveSettings;



