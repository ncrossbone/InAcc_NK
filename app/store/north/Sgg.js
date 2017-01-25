Ext.define('InAcc.store.north.Sgg', {
	
	extend: 'Ext.data.Store',
	
	fields: ['id', 'name'],

	remoteSort: true,
	autoload: true,
	
	listeners: {
		load: function(store) {
			
			
			
			var	proxyUrl = InAcc.global.Variable.getProxyUrl();
			var serviceUrl = InAcc.global.Variable.getMapServiceUrl();
			console.info(store);
			//var filter = '<Filter xmlns:gml="http://www.opengis.net/gml"><And><BBOX><PropertyName>way</PropertyName><gml:Box srsName="urn:x-ogc:def:crs:EPSG:3857"><gml:coord><gml:X>' + extent[0] + '</gml:X> <gml:Y>' + extent[1] + '</gml:Y></gml:coord><gml:coord><gml:X>' + extent[2] + '</gml:X><gml:Y>' + extent[3] + '</gml:Y></gml:coord></gml:Box></BBOX><PropertyIsEqualTo><PropertyName>landuse</PropertyName><Literal>basin</Literal></PropertyIsEqualTo></And></Filter>'
			//var filter = "<Filter xmlns:gml='http://www.opengis.net/gml'><And><Like><PropertyName>ADMCD</PropertyName><Literal>" + sidoCd + "*</Literal></Like></And></Filter>"
			//var filter = "<Filter><PropertyIsEqualTo><PropertyName>ADMCD</PropertyName><Literal>3320400000</Literal></PropertyIsEqualTo></Filter>"
			var likeVal = store.sidoCd + "%";
			likeVal = encodeURIComponent(likeVal);
			var wildCard = " wildCard=\"%\"";
			wildCard = encodeURIComponent(wildCard);
			
			// 필터 포멧 참조 http://www.mangosystem.com:8080/gxt/docs/community/ogc_standards/filter_encoding/index.html
			var filter = "<Filter><PropertyIsLike wildCard=\"%\"><PropertyName>ADMCD</PropertyName><Literal>" + store.sidoCd + "%" + "</Literal></PropertyIsLike></Filter>";
			filter = encodeURIComponent(filter); // 특수문자 Encoding
			//var filter = "<Filter><PropertyIsLike" + wildCard + "><PropertyName>ADMCD</PropertyName><Literal>" + likeVal + "</Literal></PropertyIsLike></Filter>";
			//var filter = "<Filter><PropertyIsLike%20wildCard%3D%22%25%22><PropertyName>ADMCD</PropertyName><Literal>37%25</Literal></PropertyIsLike></Filter>";
			//var filter = ol.format.filter.like('ADMCD',sidoCd+'*');
			//var encFilter = encodeURIComponent(filter);
			//console.info(encFilter);
			
			var params = "&SERVICE=WFS";
			params += "&REQUEST=GetFeature";
			params += "&MAXFEATURES=300";
			params += "&TYPENAME=NK_SGG";
			params += "&PROPERTYNAME=ADMCD,SGG_NM";
			params += "&FILTER=" + filter;
			params += "&outputFormat=gml"; // IE 보안 문제로 gml 사용
			
			//params = encodeURIComponent(params);
			
			/*var cqlFilter = "ADMCD LIKE '33%'";
			var encFilter = encodeURIComponent(cqlFilter);
			console.info(encFilter);*/
			
			var url = proxyUrl + serviceUrl + params;
			
	        $.ajax({
	            url : url,
	            type : 'GET',
	            async : false,
	            contentType : 'text/xml',
	            success : function(response_) {
	            	
	            	var resObj = $(response_)[2];
		            var receiveData = [];
		            
		            $(resObj).find("NK_SGG").each(function(){
	            		
		            	var nameVal = "";
	            		var idVal = "";
	            		
	            		var tags = $($(this)[0].innerHTML);
	            		
	            		for(var i = 0; i < tags.length; i++){
	            			
	            			//console.info(tags[i].tagName);
	            			var tagName = tags[i].tagName;
	            			var text = tags[i].innerHTML;
	            			
	            			if(tagName == "SF:SGG_NM"){
	            				nameVal = text;
	            			}
	            			
	            			if(tagName == "SF:ADMCD"){
	            				idVal = text;
	            			}
	            		}
						
	            		if(idVal != "" && nameVal != ""){
	            			receiveData.push({id: idVal, name: nameVal});
	            		}
	            	});
		            
					store.setData(receiveData);
	           }
	       });
			
			
        }
    }
});
