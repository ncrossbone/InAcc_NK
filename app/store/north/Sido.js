Ext.define('InAcc.store.north.Sido', {
	
	extend: 'Ext.data.Store',
	
	fields: ['id', 'name'],

	remoteSort: true,
	autoload: true,
	
	listeners: {
		load: function(store) {

/*			var featureRequest = new ol.format.WFS().writeGetFeature({
                srsName : "EPSG:4326",
                featureTypes : ['시도경계'],
                outputFormat : 'application/json',
                geometryName : 'SHAPE',
                maxFeatures : 300
            });
            
            $.ajax({
                url : proxy+'http://202.68.238.117:8880/geonuris/wfs?GDX=NK_Service.xml',
                type : 'POST',
                data : new XMLSerializer().serializeToString( featureRequest ),
                async : false,
                contentType : 'text/xml',
                success : function(response_) {
            var features = new ol.format.GeoJSON().readFeatures( response_ );   
            console.log( features );
                }
            });*/
			
			var coreMap = Ext.getCmp("_mapDiv_");
			coreMap.sidoGeometry = [];
			
			var	proxy = "./resources/Proxy.jsp?url="
			
			var featureRequest = new ol.format.WFS().writeGetFeature({
                srsName : "EPSG:5179",
                featureTypes : ['NK_SIDO'],
                outputFormat : 'application/json',
                geometryName : 'SHAPE',
                maxFeatures : 300
            });
            
            $.ajax({
                url : proxy+'http://202.68.238.120:8880/geonuris/wfs?GDX=NK_Test.xml',
                type : 'POST',
                data : new XMLSerializer().serializeToString( featureRequest ),
                async : false,
                contentType : 'text/xml',
                success : function(response_) {
            var features = new ol.format.GeoJSON().readFeatures( response_ );

            var receiveData = [];

            //containsXY
			Ext.each(features, function(media, index) {
	            
	            coreMap.sidoGeometry.push(media.values_);
	            
	            
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
