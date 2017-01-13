/**
 * 전역 변수 클래스 config 속성의 변수를 get, set 메서드로 접근 가능함. (get변수명, set변수명) get, set 뒤 첫
 * 알파벳은 대문자로 할 것 ex) setGlobalTest(1234), getGlobalTest() requires:
 * ["KRF.global.Var"], : Ext.application에 한번만 선언하면 됨 참고 -
 * http://jsfiddle.net/prajavk/YhuWT/ - https://wikidocs.net/3384 5.글로벌 변수 사용
 */
Ext.define("InAcc.global.Function", {
	singleton : true, // 요게 있어야 set, get 메서드 사용가능..
	queryLayerName : "",
	colMapArray : [],
	comboArray : [],

	tableInfo : Ext.create('Ext.data.Store', {
		autoLoad: true,
		proxy : {
			type : 'ajax',
			url : './resources/data/tableInfo.json',
			reader : {
				type : 'json'
			}
		}
	}),
	/**
	 * GIS 데이터 가져오기 pContainer :
	 */
	getGeoNurisStore : function(pContainer) {

		// console.info(Ext.isString(param));
		// console.info(Ext.isObject({}));
		// console.info(Ext.isArray([]));
		// console.info(Ext.isNumeric(0.3232));

		var container = this.chkContainer(pContainer);
		if (container) {
			// console.info(container.queryLayerName);
			if (container.queryLayerName == "") {

				alert("레이어(구분)을 선택하세요.");
				return false;
			}

			this.queryLayerName = container.queryLayerName;

			this.getColArray(container);
			// console.info(this.colMapArray);
			var queryFilter = this.getQueryFilter();
			
			var dataStore = this.getMapStore(queryFilter);

			this.colMapArray = [];

			
			
			return dataStore;
		}

		return false;
	},

	
	createGrid : function(data, confUrl) {
		
		var me = this;
		
		var recordData = null;
		var gridStore = null;
		var confStore = Ext.create('Ext.data.Store', {

			proxy : {
				type : 'ajax',
				url : confUrl,
				reader : {
					type : 'json'
				}
			}
		});

		
		confStore.load(function(record) {

			gridStore = Ext.create("Ext.data.Store", {
				// autoLoad: true,
				data : data
			});

			recordData = record[0].data;
			//console.info(gridStore.data.items[0]);
			//console.info(recordData);
			//console.info(me.tableInfo.data.items);
			
			for(var i = 0; i < recordData.columns.length; i++){
				
				if(recordData.columns[i].lCode != undefined){
					
					//console.info(recordData.columns[i]);
					
					var tmpIdx = me.tableInfo.data.items.map(function(itemObj){
						
						return itemObj.data.L_CODE;
					}).indexOf(recordData.columns[i].lCode);
					
					var codeTbl = me.tableInfo.data.items[tmpIdx];
					//console.info(me.tableInfo.data.items[tmpIdx]);
					
					var tmpGData = gridStore.data.items.map(function(gDataObj){
						
						var columnName = recordData.columns[i].dataIndex;
						var columnValue = eval("gDataObj.data." + columnName);
						
						var tmpCTblIdx = codeTbl.data.S_ITEM.map(function(sItem){
							
							return sItem.S_CODE;
						}).indexOf(columnValue);
						//console.info(codeTbl.data.S_ITEM[tmpCTblIdx].S_NAME);
						
						console.info(columnName);
						eval("gDataObj.data." + columnName + " = '" + codeTbl.data.S_ITEM[tmpCTblIdx].S_NAME + "'");
						return gDataObj;
					});
					
					//console.info(tmpGData);
				}
			}
		});
		
		
		
		
		
		var interval = 10; // 타이머 interval
		var interCnt = 0; // 타이머 실행 횟수
		var limitSec = 5; // 타이머 실행 제한 (초)
		var limitCnt = limitSec * 1000 / interval; // 타이머 실행 제한
													// 횟수

		var timer = window.setInterval(function() {
			
			
			
			
			if (recordData != null) {

				// 타이머 중지
				window.clearInterval(timer);
				
				
				
				var gridId = Ext.getCmp("gridNongji");
				if(data == undefined || data == false){
					
					if(gridId != undefined){
						gridId.setTitle(recordData.title+"(0)");
						gridId.getStore().removeAll();
					}
				
					if(data == false){
						
						 Ext.example.msg('검색결과', '데이터가 존재하지 않습니다');
						
					}

					return;
				}
				
				
				var bodyWidth = Ext.getBody().getWidth();
				var bodyHeight = Ext.getBody().getHeight();
				var windowWidth = bodyWidth - 350;
				var windowHeight = 300;
		    	
		    	
				var windowContainer = Ext.ComponentQuery.query("#southContainer")[0];

				if (windowContainer == undefined) {

					// windowContainer =
					// Ext.create("InAcc.view.south.SouthContainer");
					windowContainer = Ext.create("Ext.window.Window", {
						itemId : "southContainer",
						title : "검색결과",
						maximizable:true,
					    minimizable:true,
						layout : {
							type : "fit"
						}
					});
				}

				windowContainer.show();

				windowContainer.setWidth(windowWidth);
				windowContainer.setHeight(windowHeight);

				windowContainer.setX(bodyWidth - windowWidth);
				windowContainer.setY(bodyHeight - windowHeight);

				var tabContainer = windowContainer.query("#tabContainer")[0];

				if (tabContainer == undefined) {

					tabContainer = Ext.create("Ext.tab.Panel", {

						itemId : "tabContainer",
						width : "100%",
						height : "100%"
					});

					windowContainer.add(tabContainer);
				}

				// tabContainer.setWidth(windowContainer.body.getWidth());
				// tabContainer.setHeight(windowContainer.body.getHeight());
				
				var grid = tabContainer.query("#" + recordData.itemId)[0];

				if (grid == undefined) {

					var grid = Ext.create("Ext.grid.Panel", {
						closable : true,
						itemId : recordData.itemId,
						id: recordData.itemId,
						title : recordData.title + "("+gridStore.data.length+")",
						width : recordData.width,
						height : recordData.height,
						columns : recordData.columns,
						store : gridStore
					});

					tabContainer.add(grid);
					tabContainer.setActiveTab(grid);
				} else {

					grid.setStore(gridStore);
					grid.setTitle(recordData.title+"("+gridStore.data.length+")");
				}
			} else {

				interCnt++;

				if (interCnt >= limitCnt) {

					// 타이머 중지
					window.clearInterval(timer);
					alert("제한시간 " + limitSec + "초를 초과하였습니다. 프로세스를 종료합니다.");
				}
			}
		}, interval);
	},
	chkContainer : function(pContainer) {

		var container = null;
		if (Ext.isString(pContainer)) {

			container = Ext.ComponentQuery.query("#" + pContainer)[0];
		} else if (Ext.isObject(pContainer)) {

			container = pContainer;
		} else if (pContainer == null) {

			container = pContainer;
		} else {

			alert("파라메터 타입이 명확하지 않습니다.");
			return false;
		}

		return container;
	},
	getColArray : function(container) {

		var tmpItems = container.items;

		if (tmpItems != undefined) {

			if (Ext.isArray(tmpItems)) {

				for (var i = 0; i < tmpItems.length; i++) {

					if (tmpItems[i].colName != undefined) {

						var val = "";
						var colName = tmpItems[i].colName;
						var comparison = tmpItems[i].comparison;

						if (tmpItems[i].xtype == "textfield") {

							// console.info(tmpItems[i].getValue());
							val = tmpItems[i].getValue();
						}
						if (tmpItems[i].xtype == "combobox") {

							// console.info(tmpItems[i].getValue());
							// console.info(tmpItems[i].getDisplayValue());
							val = tmpItems[i].getValue();
						}
						if (tmpItems[i].xtype == "checkboxfield") {

							// console.info(tmpItems[i].getValue());
							// console.info(tmpItems[i].inputValue);
							val = tmpItems[i].inputValue;
						}
						if (tmpItems[i].xtype == "checkboxgroup") {

							// console.info(tmpItems[i].getValue());
							// console.info(tmpItems[i].getChecked());
							// console.info(tmpItems[i].getChecked()[0].inputValue);
							var chkValues = tmpItems[i].getChecked();
							val = [];

							for (var chkCnt = 0; chkCnt < chkValues.length; chkCnt++) {

								val.push(chkValues[chkCnt].inputValue);
							}
						}
						if (tmpItems[i].xtype == "radiogroup") {

							// console.info(tmpItems[i].getValue());
							// console.info(tmpItems[i].getChecked());
							// console.info(tmpItems[i].getChecked()[0].inputValue);
							var chkValues = tmpItems[i].getChecked();
							val = [];

							for (var chkCnt = 0; chkCnt < chkValues.length; chkCnt++) {

								val.push(chkValues[chkCnt].inputValue);
							}
						}

						if (colName != undefined && val != null && val != "") {

							this.colMapArray.push({
								column : colName,
								value : val,
								comparison : comparison
							});
						}
					}

					this.getColArray(tmpItems[i]);
				}
			} else {

				this.getColArray(tmpItems);
			}
		}
	},
	getQueryFilter : function() {

		var andFilter = ol.format.filter.and();

		for (var i = 0; i < this.colMapArray.length; i++) {

			var orFilter = ol.format.filter.or();
			var tmpFilter = null;

			if (this.colMapArray[i].comparison == "LIKE") {

				tmpFilter = ol.format.filter.like(this.colMapArray[i].column, this.colMapArray[i].value);
			} else if (this.colMapArray[i].comparison == "=") {
				
				tmpFilter = ol.format.filter.equalTo(this.colMapArray[i].column, this.colMapArray[i].value);
			} else if (this.colMapArray[i].comparison == ">") {

				tmpFilter = ol.format.filter.greaterThan(this.colMapArray[i].column, this.colMapArray[i].value);
			} else if (this.colMapArray[i].comparison == ">=") {

				tmpFilter = ol.format.filter.greaterThanOrEqualTo(this.colMapArray[i].column, parseFloat(this.colMapArray[i].value));
			} else if (this.colMapArray[i].comparison == "<") {

				tmpFilter = ol.format.filter.lessThan(this.colMapArray[i].column, this.colMapArray[i].value);
			} else if (this.colMapArray[i].comparison == "<=") {

				tmpFilter = ol.format.filter.lessThanOrEqualTo(this.colMapArray[i].column, parseFloat(this.colMapArray[i].value));
			} else if (this.colMapArray[i].comparison == "<>") {

				tmpFilter = ol.format.filter.notEqualTo(this.colMapArray[i].column, this.colMapArray[i].value);
			} else if (this.colMapArray[i].comparison == "IN") {

				for (var j = 0; j < this.colMapArray[i].value.length; j++) {

					tmpFilter = ol.format.filter.equalTo(this.colMapArray[i].column, this.colMapArray[i].value[j]);

					if (orFilter.conditionA == undefined) {

						orFilter.conditionA = tmpFilter;
					} else if (orFilter.conditionB == undefined) {

						orFilter.conditionB = tmpFilter;
					} else {

						var tmpOrFilter = ol.format.filter.or();
						tmpOrFilter.conditionA = orFilter;
						tmpOrFilter.conditionB = tmpFilter;
						orFilter = tmpOrFilter;
					}
				}

				
				tmpFilter = orFilter;
			}

			if (andFilter.conditionA == undefined) {

				andFilter.conditionA = tmpFilter;
			} else if (andFilter.conditionB == undefined) {

				andFilter.conditionB = tmpFilter;
			} else {

				var tmpAndFilter = ol.format.filter.and();
				tmpAndFilter.conditionA = andFilter;
				tmpAndFilter.conditionB = tmpFilter;
				andFilter = tmpAndFilter;
			}
		}

		if(andFilter.conditionB == undefined){
			andFilter = andFilter.conditionA
		}
		
		return andFilter;
	},
	getMapStore : function(queryFilter) {
		
		
		var me = this;
		

		// return;
		/* 조건설정 완료 후 삭제할 것 */
		/*
		 * queryFilter = ol.format.filter.or(
		 * ol.format.filter.like('NGJI_IDN','414*'),
		 * ol.format.filter.like('NGJI_IDN','2637*') );
		 */
		/* 조건설정 완료 후 삭제할 것 끝 */

		var featureRequest = new ol.format.WFS().writeGetFeature({
			srsName : "EPSG:5179",
			featureTypes : [ me.queryLayerName ],
			outputFormat : 'application/json',
			geometryName : 'SHAPE',
			maxFeatures : 1000,
			filter : queryFilter,
		});
		
		var data = [];

		$.ajax({
			url : InAcc.global.Variable.getProxyUrl() + InAcc.global.Variable.getMapServiceUrl(),
			type : 'POST',
			data : new XMLSerializer().serializeToString(featureRequest),
			async : false,
			contentType : 'text/xml',
			success : function(response_) {
				
				var features = new ol.format.GeoJSON().readFeatures(response_);
				 console.log( features );

				for (var i = 0; i < features.length; i++) {

					data.push(features[i].values_);
				}
			}
		});
		
		return data;
	},
	getComboArray : function(container) {

		var tmpItems = container.items;

		if (tmpItems != undefined) {

			if (Ext.isArray(tmpItems)) {

				for (var i = 0; i < tmpItems.length; i++) {

					if (tmpItems[i].lCode != undefined) {

						if (tmpItems[i].xtype == "combobox") {

							// console.info(tmpItems[i].getValue());
							// console.info(tmpItems[i].getDisplayValue());
							this.comboArray.push(tmpItems[i]);
						}
					}

					this.getComboArray(tmpItems[i]);
				}
			} else {

				this.getComboArray(tmpItems);
			}
		}
	},
	setComboStore: function(container){
		this.getComboArray(container);
		var arrCombo = this.comboArray;
		
		//console.info(arrCombo);
		this.tableInfo.load(function(record) {
			
			for(var arrCnt = 0; arrCnt < arrCombo.length; arrCnt++){
				//console.info("1");
				var recIdx = record.map(function(obj){
					return obj.data.L_CODE;
				}).indexOf(arrCombo[arrCnt].lCode);
				
				
				var storeData = [];

				var sItem = record[recIdx].data.S_ITEM;
				
				var storeBind = Ext.create('Ext.data.Store', {
					fields: ['S_CODE', 'S_NAME'],
					data:sItem
				});
				
				arrCombo[arrCnt].bindStore(storeBind);
				
				//console.info(arrCombo);
			}
		});
	},
	
	getSido: function(){

		var timerCnt = 0;
		
		var timer = setInterval(function(){
			
			timerCnt++;
			
			var	proxyUrl = InAcc.global.Variable.getProxyUrl();
			var serviceUrl = InAcc.global.Variable.getMapServiceUrl();
			
			if(proxyUrl != undefined && proxyUrl != null && serviceUrl != undefined && serviceUrl != null){
				
				clearInterval(timer);
				
				console.info(serviceUrl);
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
						
						for(var i = 0 ; i < receiveData.length ; i++){
							$('#sidoSelect').append('<option value='+receiveData[i].id+' >'+receiveData[i].name+'</option>');
						}
		            }
		        });
			}
			
			if(timerCnt > 2000){
				
				clearInterval(timer);
				alert("시/도 조회 시간초과!!");
			}
		}, 1);
	},
	getSgg: function(sidoCd){
		
		var	proxyUrl = InAcc.global.Variable.getProxyUrl();
		var serviceUrl = InAcc.global.Variable.getMapServiceUrl();
		
		//var filter = '<Filter xmlns:gml="http://www.opengis.net/gml"><And><BBOX><PropertyName>way</PropertyName><gml:Box srsName="urn:x-ogc:def:crs:EPSG:3857"><gml:coord><gml:X>' + extent[0] + '</gml:X> <gml:Y>' + extent[1] + '</gml:Y></gml:coord><gml:coord><gml:X>' + extent[2] + '</gml:X><gml:Y>' + extent[3] + '</gml:Y></gml:coord></gml:Box></BBOX><PropertyIsEqualTo><PropertyName>landuse</PropertyName><Literal>basin</Literal></PropertyIsEqualTo></And></Filter>'
		//var filter = "<Filter xmlns:gml='http://www.opengis.net/gml'><And><Like><PropertyName>ADMCD</PropertyName><Literal>" + sidoCd + "*</Literal></Like></And></Filter>"
		//var filter = "<Filter><PropertyIsEqualTo><PropertyName>ADMCD</PropertyName><Literal>3320400000</Literal></PropertyIsEqualTo></Filter>"
		var likeVal = sidoCd + "%";
		likeVal = encodeURIComponent(likeVal);
		var wildCard = " wildCard=\"%\"";
		wildCard = encodeURIComponent(wildCard);
		
		// 필터 포멧 참조 http://www.mangosystem.com:8080/gxt/docs/community/ogc_standards/filter_encoding/index.html
		var filter = "<Filter><PropertyIsLike wildCard=\"%\"><PropertyName>ADMCD</PropertyName><Literal>" + sidoCd + "%" + "</Literal></PropertyIsLike></Filter>";
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
            	
	            var receiveData = [];
	            
	            $(response_).find("NK_SGG").each(function(){
            		
            		var nameVal = $(this).find("SGG_NM").text();
					var idVal= $(this).find("ADMCD").text();
					
					receiveData.push({id: idVal, name: nameVal});
            	});
	            
				$('#sggSelect *').remove();
				$('#sggSelect').append('<option>시군구</option>');
				
				for(var i = 0 ; i < receiveData.length ; i++){
					$('#sggSelect').append('<option value='+receiveData[i].id+' >'+receiveData[i].name+'</option>');
				}
           }
       });
	},
	/*getSgg: function(sidoCd){
		
		var coreMap = Ext.getCmp("_mapDiv_");
		coreMap.sggGeometry = [];
		
		var	proxy = "./resources/Proxy.jsp?url="
		
			var featureRequest = new ol.format.WFS().writeGetFeature({
                srsName : "EPSG:5179",
                featureTypes : ['NK_SGG'],
                outputFormat : 'application/json',
                geometryName : 'SHAPE',
                maxFeatures : 300,
                filter: ol.format.filter.like('ADMCD',sidoCd+'*')
            });
            
            $.ajax({
                url : proxy+'http://202.68.238.120:8880/geonuris/wfs?GDX=NK_Test.xml',
                type : 'POST',
                data : new XMLSerializer().serializeToString( featureRequest ),
                async : true,
                contentType : 'text/xml',
	            success : function(response_) {
	            	console.info(response_);
		            var features = new ol.format.GeoJSON().readFeatures( response_ );
		            
		            var receiveData = [];
					Ext.each(features, function(media, index) {
			            
			            coreMap.sggGeometry.push(media.values_);
			            
						var nameVal = media.values_.SGG_NM;
						var idVal= media.values_.ADMCD;
						
						receiveData.push({id: idVal, name: nameVal});
						
					});
					$('#sggSelect *').remove();
					$('#sggSelect').append('<option>시군구</option>');
					for(var i = 0 ; i < receiveData.length ; i++){
						$('#sggSelect').append('<option value='+receiveData[i].id+' >'+receiveData[i].name+'</option>');
					}
	           }
       });
	},*/
	openSplitMap: function(){
		
		var width = Ext.getBody().getWidth();
		var height = Ext.getBody().getHeight();
		
		var splitWindow = Ext.create("Ext.window.Window", {
			width: width,
			height: height,
			preWidth: null,
			preHeight: null,
			layout: {
				type: "fit"
			},
			items: [{
				xtype: "inacc-main-splitter"
			}],
	        tools: [{
	        	type: "minimize",
	        	handler: function(evt, toolEl, owner, tool){
	        		
	        		var window = owner.up('window');
	        		
	        		preWidth = window.getWidth();
	        		preHeight = window.getHeight();
	        		
	        		window.collapse();
	                window.setWidth(150);
	                window.alignTo(Ext.getBody(), 'bl-bl')
	        	}
	        }, {
	            type: 'restore',
	            handler: function (evt, toolEl, owner, tool) {
	            	
	                var window = owner.up('window');
	                
	                var width = Ext.getBody().getWidth();
	                var height = Ext.getBody().getHeight();
	                
	                if(preWidth != null){
	                	width = preWidth;
	                }
	                
	                if(preHeight != null){
	                	height = preHeight;
	                }
	                
	                window.setWidth(width);
	                window.setHeight(height);
	                
	                window.expand('', false);
	                window.center();
	            }
	        }]
		}).show();
	},
	

	getVworldPoi:function(){
		var poisearchname = Ext.ComponentQuery.query("#poisearchname")[0];
		var searchStr = poisearchname.lastValue;
		if(searchStr!=""){
			var encString = encodeURIComponent(searchStr);
			var responseArr = [];
			//console.info(testString);
			$.ajax({
				url : './resources/Proxy.jsp?url=http://map.vworld.kr/search.do?',
				type : 'GET',
				contentType: "application/x-www-form-urlencoded; charset=EUC-KR",
				data : {
					apiKey:"E1FC5A1A-C63D-3D29-B716-F64596DEF9E8",
					q:encString,
					category:"Poi",
					output:"json",
					pageUnit:100
				},
				contentType : 'text/xml',
				success : function(response_) {
					var parse = JSON.parse(response_);
					var poisearchresult = Ext.ComponentQuery.query("#poisearchresult")[0];
					var poisearchresultgrid = Ext.ComponentQuery.query("#poisearchresultgrid")[0];

					var resultArr =[];
					if(poisearchresult.isVisible()==false){
						poisearchresult.show();	
					}

					Ext.each(parse.LIST, function(media, index) {

						if(media.nameDp=="북한"){
							resultArr.push(media);
						}

					});

					var userStore = Ext.create('Ext.data.Store');
					//console.info(resultArr);
					userStore.setData(resultArr);
					poisearchresultgrid.setStore(userStore);
				}

			});
		}else{
			alert("검색어를 입력하세요");
		}
	
	},
	
	
	
	sidoExtent: function(sidoCd){
		
		var	proxy = "./resources/Proxy.jsp?url=";
		
		var featureRequest = new ol.format.WFS().writeGetFeature({
            srsName : "EPSG:5179",
            featureTypes : ['NK_SIDO'],
            outputFormat : 'application/json',
            geometryName : 'SHAPE',
            maxFeatures : 300,
            filter: ol.format.filter.like('SD_CD',sidoCd+'*')
        });
		
		//console.info(coreMap.map.getExtent());
		var extent = "";
        $.ajax({
            url : proxy + InAcc.global.Variable.getMapServiceUrl(),
            type : 'POST',
            data : new XMLSerializer().serializeToString( featureRequest ),
            async : false,
            contentType : 'text/xml',
            success : function(response_) {
		        var features = new ol.format.GeoJSON().readFeatures( response_ );
		        Ext.each(features, function(media, index) {
		            
		        	//media.values_.geometry.getExtent();
		        	extent = media.values_.geometry.getExtent();
		        	
				});
		        
				
            }
        
        });	
        
        return extent;
	},
	
	sggExtent: function(sggCd){
		
		var	proxy = "./resources/Proxy.jsp?url=";
		
		var featureRequest = new ol.format.WFS().writeGetFeature({
            srsName : "EPSG:5179",
            featureTypes : ['NK_SGG'],
            outputFormat : 'application/json',
            geometryName : 'SHAPE',
            maxFeatures : 300,
            filter: ol.format.filter.like('ADMCD',sggCd+'*')
        });
		
		//console.info(coreMap.map.getExtent());
		var extent = "";
        $.ajax({
            url : proxy + InAcc.global.Variable.getMapServiceUrl(),
            type : 'POST',
            data : new XMLSerializer().serializeToString( featureRequest ),
            async : false,
            contentType : 'text/xml',
            success : function(response_) {
		        var features = new ol.format.GeoJSON().readFeatures( response_ );
		        Ext.each(features, function(media, index) {
		            
		        	extent = media.values_.geometry.getExtent();
		        	
				});
		        
				
            }
        
        });	
        
        return extent;
	}
	
});