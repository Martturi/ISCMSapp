if (!PhoneGap.hasResource("network")) {
	PhoneGap.addResource("network");

// //////////////////////////////////////////////////////////////////

Connection = function() {
	/*
	 * One of the connection constants below.
	 */
	this.type = Connection.UNKNOWN;

	/* initialize from the extended DeviceInfo properties */
    try {      
		this.type	= DeviceInfo.connection.type;
    } 
	catch(e) {
    }
};

Connection.UNKNOWN = "unknown"; // Unknown connection type
Connection.ETHERNET = "ethernet";
Connection.WIFI = "wifi";
Connection.CELL_2G = "2g"; // the default for iOS, for any cellular connection
Connection.CELL_3G = "3g";
Connection.CELL_4G = "4g";
Connection.NONE = "none"; // NO connectivity


PhoneGap.addConstructor(function() {
    if (typeof navigator.network == "undefined") navigator.network = {};
    if (typeof navigator.network.connection == "undefined") navigator.network.connection = new Connection();
});

};

function onDeviceReady()
{

    //Bind all links and intercept them before they go anywhere //I'm jquery dependant 
    $('a').bind('click', function(event) {
        switch($(this).attr('id'))//using the id value of the link we help us decide what kidn of action we are doing
        {
            case "data-loader-page":
                return event;
            break;

            case "load-version-data": //I'm about to pull JSON data from a server

                if(!checkConnection()){return false}; //check for connection and exit if it fails.

                doJSON(); //at this point we have a connection so go get remote data.
                return false;
            break;

            //for un-handled links we will assume that you just want to hash bang
            default: return event;
        }
    }); 
}

function checkConnection() {
    var networkState = navigator.network.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';

    if(states[networkState]==states[Connection.NONE] || states[networkState]==states[Connection.UNKNOWN]){
        alert('A network connection is required to access this page.');
        return false;
    } else {
        return true;    
    }
}

