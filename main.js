(function(){

    //create map in leaflet and tie it to the div called 'theMap'
    var map = L.map('theMap').setView([44.650627, -63.597140], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

   
    var url ='https://hrmbusapi.herokuapp.com/';

    console.log(url);
   
    var layer;
    
    function routeMap(){
    
        fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            console.log(json);
            if(layer){
                map.removeLayer(layer);
            }
            
            let myArray = json.entity.filter(function(result){ return result.vehicle.trip.routeId < 321 || 
                result.vehicle.trip.routeId === "9A"|| result.vehicle.trip.routeId === "9B"});
            
            myArray = myArray.map(function(result)
            {       
                // return geoJSON feature
                    return{
                    "type": "Feature",
                    "properties": {
                        "RouteID": result.vehicle.trip.routeId,
                        "TripID":result.vehicle.trip.tripId,
                        "BusNo" : result.vehicle.vehicle.id,
                        "BusLevel": result.vehicle.vehicle.label,
                        "longitude":result.vehicle.position.longitude,
                        "latitude":result.vehicle.position.latitude,
                        "bearing":result.vehicle.position.bearing
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            result.vehicle.position.longitude,
                            result.vehicle.position.latitude]
                    }
                }
                
            });
    
            // declare a collection of feature objects, the value of features is a JSON array
            let FeatureCollection= 
            {
                type : "FeatureCollection",
                features : myArray 
            };
            // console.log(FeatureCollection);
    
            var busIcon = L.icon({
                iconUrl:'bus.png',
                iconSize:[32,32],
                iconAnchor:[15,15],
            });
    
            // declares a layer because geoJSON objects are added to the map through geoJSON layer
            layer = L.geoJson(FeatureCollection,{

                // a function defining how GeoJSON points spawn Leaflet layers
                pointToLayer: function(geoJsonPoint, latlng){
                    return L.marker(latlng,{
                        icon: busIcon, 
                        rotationAngle: geoJsonPoint.properties.bearing
                    })
                },
                // a function that gets called on each feature before adding it to a GeoJSON layer
                onEachFeature: function(feature, layer){
                    
                    if(feature.geometry.type === 'Point'){
                        layer.bindPopup("route ID: "+feature.properties.RouteID+"<br>Bus no:"+feature.properties.BusNo+"<br>Trip ID:"+feature.properties.TripID, 
                        {maxHeight: 100, minWidth: 60})
                    }
                }
    
            }).addTo(map);
    
            setTimeout(routeMap,5000);
            
        });
    }    

    routeMap();




})()