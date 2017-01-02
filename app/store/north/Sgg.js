Ext.define('InAcc.store.north.Sgg', {
	
	extend: 'Ext.data.Store',
	
	fields: ['id', 'name'],

	remoteSort: true,
	autoload: true,
	
	listeners: {
		load: function(store) {
			
			
			
			var	proxyUrl = InAcc.global.Variable.getProxyUrl();
			var serviceUrl = InAcc.global.Variable.getMapServiceUrl();
			var sidoCd = store.sidoCd;
			var likeVal = sidoCd + "%";
			likeVal = encodeURIComponent(likeVal);
			var wildCard = " wildCard=\"%\"";
			wildCard = encodeURIComponent(wildCard);
			
			var filter = "<Filter><PropertyIsLike wildCard=\"%\"><PropertyName>ADMCD</PropertyName><Literal>" + sidoCd + "%" + "</Literal></PropertyIsLike></Filter>";
			filter = encodeURIComponent(filter);
			
			var params = "&SERVICE=WFS";
			params += "&REQUEST=GetFeature";
			params += "&MAXFEATURES=300";
			params += "&TYPENAME=NK_SGG";
			params += "&PROPERTYNAME=ADMCD,SGG_NM";
			params += "&FILTER=" + filter;
			
			
			var url = proxyUrl + serviceUrl + params;
			
			console.info(params);
			console.info(url);
	            
	        $.ajax({
	            url : url,
	            type : 'GET',
	            async : false,
	            contentType : 'text/xml',
	            success : function(response_) {
	            	console.info(response_);
		            var receiveData = [];
		            
		            $(response_).find("NK_SGG").each(function(){
	            		
	            		var nameVal = $(this).find("SGG_NM").text();
						var idVal= $(this).find("ADMCD").text();
						
						receiveData.push({id: idVal, name: nameVal});
	            	});
		            
					$('#sggSelect *').remove();
					$('#sggSelect').append('<option>시군구</option>');
					
					store.setData(receiveData);
					
	           }
	       });
			
			
        }
    }
});
