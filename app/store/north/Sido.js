Ext.define('InAcc.store.north.Sido', {
	
	extend: 'Ext.data.Store',
	
	fields: ['id', 'name'],

	remoteSort: true,
	autoload: true,
	
	listeners: {
		load: function(store) {
			//http://202.68.238.117:8080/geoserver/sf/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sf:lt_c_tnadsido&maxFeatures=50&outputFormat=application%2Fjson
			 
			
			var serviceParam = {
		    		service: "WFS",
		    		version: "1.1.0",
		    		request: "GetFeature",
		    		typeName: "sf:lt_c_tnadsido",
		    		maxFeatures: "50",
		    		outputFormat: "JSON",
		    		srs: "EPSG:5179"
		    	};
			
			
			var request = ol.Request.POST({	
				url: "http://202.68.238.117:8080/geoserver/sf/wms",
				params: serviceParam,
				filter: "",
				//layers: 'woo:tmdl_tmdl',
			    async: false
			});
			console.info(request);
 	       /* var url = encodeURIComponent("http://202.68.238.117:8880/geonuris/wfs?GDX=NK_Service.xml");
 	        
			var serviceParam = {
					TYPENAME: "습지",
					SERVICE: "WFS",
					REQUEST: "GetFeature",
					VERSION: "1.1.0",
					MAXFEATURES:"300"
	    	};
		
			//serviceParam.filter = filter;
			
			var request = OpenLayers.Request.GET({
				
				url: url,
				params: serviceParam,
				filter: "",
			    async: false
			});
			console.info(obj)
			var obj = JSON.parse(request.responseText);
			
			if(obj.features.length == 0 ){
				return;
			}
			
			
			var receiveData = [];
			
			Ext.each(obj.features, function(media, index) {
				
				var nameVal = media.properties.DO_NM;
				var idVal= media.properties.ADM_CD;
				
				receiveData.push({id: idVal, name: nameVal});
				
			});*/
			
			//store.setData(receiveData);
        }
    }
});
