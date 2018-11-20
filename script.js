var IntentMedia = IntentMedia || {};

IntentMedia.Airports = (function () {
    var pub = {};

    pub.airport_exists = function (airport_code) {
      return pub.airport_distances().hasOwnProperty(airport_code);
    };

    pub.airport_distances = function () {
      return {
        JFK: {LAX: 2475, LAS: 2248, PDX: 2454},
        LAX: {JFK: 2475, LAS: 236, PDX: 834},
        LAS: {JFK: 2248, LAX: 236, PDX: 763},
        PDX: {JFK: 2454, LAS: 763, LAX: 834}
      }
    };

    return pub;
}(IntentMedia || {}));

IntentMedia.Distances = (function () {
    var pub = {};
    var airport_distances = airport_distances || IntentMedia.Airports.airport_distances();

    pub.distance_between_airports = function (from_airport, to_airport) {
      if (IntentMedia.Airports.airport_exists(from_airport) && IntentMedia.Airports.airport_exists(to_airport)) {
        if (from_airport === to_airport) {
          return 0;
        }

        return airport_distances[from_airport][to_airport];
      }

      return -1;
    };

    return pub;
}(IntentMedia || {}));


$(document).ready(function(){
  $("#form1").submit(function(event){
    event.preventDefault();
    var input1 = $("#input1").val().toUpperCase();
    var input2 = $("#input2").val().toUpperCase();
    var msg = "";
    var response = IntentMedia.Distances.distance_between_airports(input1, input2);
    $("#input1").val("");
    $("#input2").val("");
    if( response === -1) {
      msg = "Please enter correct airport code";
    } else if ( response === 0) {
      msg = "You entered same airport code twice";
    } else {
      msg = "Distance between " + input1 + " and " + input2 + " is " + response + " miles ";
    }
    output1.innerText = msg;
  });
});


