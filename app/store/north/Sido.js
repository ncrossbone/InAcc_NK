Ext.define('InAcc.store.north.Sido', {
	
	extend: 'Ext.data.Store',
	
	fields: ['id', 'name'],

	remoteSort: true,
	autoload: true,
	
	listeners: {
		load: function(store) {
			var timerCnt = 0;
			
			var timer = setInterval(function(){
				
				timerCnt++;
				
				var	proxyUrl = InAcc.global.Variable.getProxyUrl();
				var serviceUrl = InAcc.global.Variable.getMapServiceUrl();
				
				if(proxyUrl != undefined && proxyUrl != null && serviceUrl != undefined && serviceUrl != null){
					
					clearInterval(timer);
					
					//console.info(serviceUrl);
					var params = "&SERVICE=WFS&VERSION=1.1.0";
					params += "&REQUEST=GetFeature";
					params += "&MAXFEATURES=300";
					params += "&TYPENAME=NK_SIDO";
					params += "&PROPERTYNAME=SD_NM,SD_CD";
					params += "&outputFormat=gml"; // IE 보안 문제로 gml 사용
					//params += "&outputFormat=text/xml";
					//params += "&outputFormat=application/json";
					
					/*var featureRequest = new ol.format.WFS().writeGetFeature({
		                srsName : "EPSG:5179",
		                featureTypes : ['NK_SIDO'],
		                outputFormat : 'application/json',
		                //geometryName : 'SHAPE',
		                //PropertyName: ["SD_NM","SD_CD"],
		                maxFeatures : 300
		                //filter: ol.format.filter.like('ADMCD',sidoCd+'*')
		            });*/
					
					//var url = proxyUrl + serviceUrl + params;
					var url = proxyUrl + serviceUrl + params;
					//var url = proxyUrl + serviceUrl + "&PROPERTYNAME=SD_NM,SD_CD";
					
			        $.ajax({
			        	url: url,
			            type : 'GET',
			        	//type : 'POST',
			        	//data : new XMLSerializer().serializeToString( featureRequest ),
			            async : false,
			            contentType : 'text/xml',
			            success : function(response_) {
			            
			            	//console.info(response_);
			            	//console.info($($(response_)[2]).find("NK_SIDO"));
			            	var resObj = $(response_)[2];
			            	var receiveData = [];
			            	
			            	$(resObj).find("NK_SIDO").each(function(){
			            		
			            		var nameVal = "";
			            		var idVal = "";
			            		
			            		var tags = $($(this)[0].innerHTML);
			            		
			            		for(var i = 0; i < tags.length; i++){
			            			
			            			//console.info(tags[i].tagName);
			            			var tagName = tags[i].tagName;
			            			var text = tags[i].innerHTML;
			            			
			            			if(tagName == "SF:SD_NM"){
			            				nameVal = text;
			            			}
			            			
			            			if(tagName == "SF:SD_CD"){
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
				
				if(timerCnt > 2000){
					
					clearInterval(timer);
					alert("시/도 조회 시간초과!!");
				}
			}, 1);	
		
		}
    }
});
