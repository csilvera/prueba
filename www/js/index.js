var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        iniciando();
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

function iniciando(){
    //notifica();
    var plataforma = device.platform;
    console.log('plataforma actual:'+ plataforma);
    if(plataforma == 'android'){
        //notifica();
        
          if ("Notification" in window) {
  Notification.requestPermission(function (permission) {
    // If the user accepts, let’s create a notification
    if (permission === 'granted') {
      var notification = new Notification("My title", {
           tag: 'message1', 
           body: 'My body' 
      }); 
      notification.onshow  = function() { console.log('show'); };
      notification.onclose = function() { console.log('close'); };
      notification.onclick = function() { console.log('click'); };
        setInterval(iniciando(), 40000);
    }
  });
}
        
    }
    else{
        console.log('notificacion no soportada');
    }
}
var nn = setInterval(iniciando(), 40000);
function setnoti(){
    cordova.plugins.notification.local.schedule({
        title: 'My first notification',
        text: 'Thats pretty easy...',
        foreground: true
    });
}
function notifica(){
    //console.log('estoy aqui');
    //permiso del usuario
    cordova.plugins.notification.local.hasPermission(function (granted) {
        if(granted == true){
           setnoti();
        }
        else{
        cordova.plugins.notification.local.registerPermission(function(granted){ 
            if(granted == true){
                setnoti();
            }
            else{
                console.log('imposible notificar');
            }
        });
        }
    });
    //En casi de no tener permiso
    /*cordova.plugins.notification.local.registerPermission(function(granted){ });
    */
    //hacer clic para activar notificacion
    /*cordova.plugins.notification.local.on('click', function(notificaction){
        alert(notificaction.text);
    },scope);*/
    //cancelar
    /*cordova.plugins.notification.local.cancel(1, function(){
        //notificacion cancelada
    },scope);*/
    
}
