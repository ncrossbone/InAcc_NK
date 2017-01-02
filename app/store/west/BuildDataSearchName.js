Ext.define('InAcc.store.west.BuildDataSearchName', {
	
	extend: 'Ext.data.Store',
	
	fields: ['id', 'name'],

	remoteSort: true,
	autoload: true,
	
	listeners: {
		load: function(store) {
			
			var coreMap = Ext.getCmp("_mapDiv_");
			
			var	proxy = "./resources/Proxy.jsp?url="
			
			var featureRequest = new ol.format.WFS().writeGetFeature({
                srsName : "EPSG:5179",
                featureTypes : ['NKGIS_POI'],
                outputFormat : 'application/json',
                geometryName : 'SHAPE',
                maxFeatures : 300,
                filter: ol.format.filter.like('Name','*'+store.buildData+'*')
            });
            
            $.ajax({
                url : proxy+'http://202.68.238.120:8880/geonuris/wfs?GDX=NK_Test.xml',
                type : 'GET',
                data : new XMLSerializer().serializeToString( featureRequest ),
                async : true,
                contentType : 'text/xml',
                success : function(response_) {
		            var features = new ol.format.GeoJSON().readFeatures( response_ );
		
		            var receiveData = [];
		
		            //containsXY
					Ext.each(features, function(media, index) {
			            
			            
						var nameVal = media.values_.SD_NM;
						var idVal= media.values_.SD_CD;
						
						receiveData.push({id: idVal, name: nameVal});
						
					});
					store.setData(receiveData);
			
                }
            
            });
        }
    }
});
