ZoomToExtent = function(){
	var coreMap = Ext.getCmp("_mapDiv_");
	console.info(coreMap.sidoGeometry);
	
	var cmd_sido = Ext.getCmp("cmd_sido");
	console.info(cmd_sido.value);
	
	var coordinates = "";
	for(var i = 0 ; i < coreMap.sidoGeometry.length;i++){
		if(coreMap.sidoGeometry[i].SD_CD == cmd_sido.value){
			extent = coreMap.sidoGeometry[i].geometry.getExtent();
			coordinates = coreMap.sidoGeometry[i].geometry.getCoordinates();
			//Coordinates
			console.info(extent);
			console.info(coordinates);
		}
	}
	
	
    
    var extent = ol.proj.transformExtent(
    	    extent,
    	    "EPSG:5179", "EPSG:4326"
    	);

    	coreMap.map.getView().fit( extent, coreMap.map.getSize() );
	
	
}