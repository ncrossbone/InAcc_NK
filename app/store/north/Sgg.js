Ext.define('InAcc.store.north.Sgg', {
	
	extend: 'Ext.data.Store',
	
	fields: ['id', 'name'],

	remoteSort: true,
	autoload: true,
	
	listeners: {
		load: function(store) {
			
			var coreMap = Ext.getCmp("_mapDiv_");
			coreMap.sgg2Geometry = [];
			
			var	proxy = "./resources/Proxy.jsp?url="
			
				var featureRequest = new ol.format.WFS().writeGetFeature({
	                srsName : "EPSG:5179",
	                featureTypes : ['NK_SGG'],
	                outputFormat : 'application/json',
	                geometryName : 'SHAPE',
	                maxFeatures : 300,
	                filter: ol.format.filter.like('ADMCD',store.sidoCd+'*')
	            });
	            
	            $.ajax({
	                url : proxy+'http://202.68.238.120:8880/geonuris/wfs?GDX=NK_Test.xml',
	                type : 'POST',
	                data : new XMLSerializer().serializeToString( featureRequest ),
	                async : true,
	                contentType : 'text/xml',
	                success : function(response_) {
	            var features = new ol.format.GeoJSON().readFeatures( response_ );
	            var receiveData = [];
				Ext.each(features, function(media, index) {
		            
		            coreMap.sgg2Geometry.push(media.values_);
		            
					var nameVal = media.values_.SGG_NM;
					var idVal= media.values_.ADMCD;
					
					receiveData.push({id: idVal, name: nameVal});
					
				});
				store.setData(receiveData);
	           }
           });
        }
    }
});
