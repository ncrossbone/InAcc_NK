Ext.define('InAcc.store.north.Sido', {
	
	extend: 'Ext.data.Store',
	
	fields: ['id', 'name'],

	remoteSort: true,
	autoload: true,
	
	listeners: {
		load: function(store) {
			
			var	proxyUrl = InAcc.global.Variable.getProxyUrl();
			var serviceUrl = InAcc.global.Variable.getMapServiceUrl();
			
			var params = "&SERVICE=WFS&VERSION=1.1.0";
			params += "&REQUEST=GetFeature";
			params += "&MAXFEATURES=300";
			params += "&TYPENAME=NK_SIDO";
			params += "&PROPERTYNAME=SD_NM,SD_CD";
			
			var url = proxyUrl + serviceUrl + params;
			
	        $.ajax({
	        	url: url,
	            type : 'GET',
	            async : false,
	            contentType : 'text/xml',
	            success : function(response_) {
	            	
	            	var receiveData = [];
	            	
	            	$(response_).find("NK_SIDO").each(function(){
	            		
	            		var nameVal = $(this).find("SD_NM").text();
						var idVal= $(this).find("SD_CD").text();
						
						receiveData.push({id: idVal, name: nameVal});
	            	});
					
	            	store.setData(receiveData);
	            }
	        });
			
        }
    }
});
