var SimpleMichael = SimpleMichael || {};
SimpleMichael.Utils = SimpleMichael.Utils || {};


SimpleMichael.Utils.getAjaxData = function(webAddress, callbackFxn){

    var axRequest = new XMLHttpRequest();//Need polyfill for ie ajax
    axRequest.open('GET', webAddress, true);
    axRequest.setRequestHeader('Content-type','application/json',true);
    axRequest.onreadystatechange = function(){
        if(axRequest.status==200 && axRequest.readyState==4){
                var data = JSON.parse(axRequest.responseText);
                callbackFxn(data);
        }
    }
    axRequest.send(null);
}
