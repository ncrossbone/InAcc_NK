Ext.define("InAcc.view.center.CenterContainer", {

	extend: "Ext.ButtonGroup",

	xtype: "inacc-centercontainer",
	//closable:true,
	//draggable:true,
	closable:false,
	x:350,
	y:34,
	width:245,
	height:40,
	bodyStyle:{"background-color": "#ececec"},

	items:[{
		xtype:"image",
		src:"resources/images/icons/util_01.png",
		style:"border:solid 1px; border-color: #dbdbdb; cursor:pointer;",
		listeners:{
			el:{
				click:function(){
					var dragPan = new ol.interaction.DragPan();
					var coreMap = Ext.getCmp("_mapDiv_");
					coreMap.map.getInteractions().forEach(function(interaction) {
						if (interaction instanceof ol.interaction.DragPan) {
						    interaction.setActive(true);
						}
					}, this);
				}
			}
		}
	},{
		xtype:"image",
		src:"resources/images/icons/util_02.png",
		style:"border:solid 1px; border-color: #dbdbdb; cursor:pointer;",
		listeners:{
			el:{
				click:function(){
					var coreMap = Ext.getCmp("_mapDiv_");
					if (coreMap.history_now > 0) {
						coreMap.click = true;
						coreMap.history_now--;
						coreMap.map.getView().setCenter(coreMap.history[coreMap.history_now].center);
						coreMap.map.getView().setResolution(coreMap.history[coreMap.history_now].resolution);
						setTimeout(function () {
							coreMap.click = false;
				        }, coreMap.delay);
				    }
					//map.prevExtentMove();
				}
			}
		}
	},{
		xtype:"image",
		src:"resources/images/icons/util_03.png",
		style:"border:solid 1px; border-color: #dbdbdb; cursor:pointer;",
		listeners:{
			el:{
				click:function(){
					var coreMap = Ext.getCmp("_mapDiv_");
					
					coreMap.click = true;
					if(coreMap.history_now < coreMap.history.length-1){
						coreMap.history_now++;
						coreMap.map.getView().setCenter(coreMap.history[coreMap.history_now].center);
						coreMap.map.getView().setResolution(coreMap.history[coreMap.history_now].resolution);
						setTimeout(function () {
							coreMap.click = false;
				        }, coreMap.delay);
					}
					
					//map.prevExtentMove();
				}
			}
		}
	},{
		xtype:"image",
		src:"resources/images/icons/util_04.png",
		style:"border:solid 1px; border-color: #dbdbdb; cursor:pointer;",
		listeners:{
			el:{
				click: function(){
					
					var coreMap = Ext.getCmp("_mapDiv_");
					coreMap.map.getView().setCenter(coreMap.history[0].center);
					coreMap.map.getView().setResolution(coreMap.history[0].resolution);
					
				}
			}
		}
	},{
		xtype:"image",
		src:"resources/images/icons/util_05.png",
		style:"border:solid 1px; border-color: #dbdbdb; cursor:pointer;",
		listeners:{
			el:{
				click:function(){
					var coreMap = Ext.getCmp("_mapDiv_");
					
					var baseZoom = coreMap.map.getView().getZoom();
					baseZoom = baseZoom+1;
					
					coreMap.map.getView().setZoom(baseZoom);
					
				}
			}
		}
	},{
		xtype:"image",
		src:"resources/images/icons/util_06.png",
		style:"border:solid 1px; border-color: #dbdbdb; cursor:pointer;",
		listeners:{
			el:{
				click:function(){
					var coreMap = Ext.getCmp("_mapDiv_");
					
					var baseZoom = coreMap.map.getView().getZoom();
					baseZoom = baseZoom-1;
					coreMap.map.getView().setZoom(baseZoom)
				}
			}
		}
	},{
		xtype:"image",
		src:"resources/images/icons/util_07.png",
		style:"border:solid 1px; border-color: #dbdbdb; cursor:pointer;",
		width:27,
		height:27,
		btnOnOff: "off",
		listeners:{
			el:{
				click:function(){
					$("#popup").show();
					var me = this;
					var coreMap = Ext.getCmp("_mapDiv_");
					var main = Ext.getCmp("main");
					main.setInfoPopup();
					
					
					if(me.btnOnOff == undefined || me.btnOnOff == "off"){
						
						me.btnOnOff = "on";
						
						//coreMap.setStyle('cursor','url(./resources/images/icons/information.png) 8 8,auto');
						
				    	// 이벤트 생성
				    	me.mapClickEvt = coreMap.map.on('click', function(evt){
				    		
				    		var layers = coreMap.map.getLayers().getArray();
				    		var layerNames = "";
				    		var coordinate = evt.coordinate;
				    		var resolution = coreMap.map.getView().getResolution();
				    		
				    		coreMap.popContent.innerHTML = "";
				    		
				    		var layerCnt = 0;
				    		var featureCnt = 0;
				    		
				    		
				    		Ext.each(layers, function(layer){
				    			if(layer.values_.type != "base" && layer.state_.visible == true){
				    				
				    				layerCnt++;
				    				
				    				var layerSource = layer.getSource();
				    				var layerName = layerSource.params_.LAYERS;
				    				
				    				var tmpUrl = layerSource.getGetFeatureInfoUrl(coordinate, resolution, "EPSG:5179", {
				    					'INFO_FORMAT': 'text/xml',
				                        'FEATURE_COUNT': '300'
				    				});
				    				/*$.ajax({
				    		            url : InAcc.global.Variable.getProxyUrl() + tmpUrl,
				    		            type : 'GET',
				    		            async : false,
				    		            contentType : 'text/xml',
				    		            success : function(response_) {
				    		            	
				    		            	var childs = $(response_).find(layerName).children();
				    		            	
				    		            	if(childs.length > 0){
				    		            		coreMap.popContent.innerHTML += "<p>Layer Name : " + layerName + "</p>";
				    		            	}
				    		            	
				    		            	Ext.each($(childs), function(child, cnt){
				    		            		
						            			if($(child)[0].localName != "SHAPE" && $(child)[0].localName != "boundedBy"){
						            				coreMap.popContent.innerHTML += $(child)[0].localName + " : " + $(child).text() + "<br>";
							            		}
						            			
						            			if(cnt == $(child).length - 1){
						            				coreMap.popContent.innerHTML += "<br>";
							            		}
				    		            	});
				    		           }
				    		       });*/
				    				$.ajax({
				    		            url : InAcc.global.Variable.getProxyUrl() + tmpUrl,
				    		            type : 'GET',
				    		            async : false,
				    		            contentType : 'text/xml',
				    		            success : function(response_) {
				    		            	console.info(response_);
				    		            	var childs = $(response_).find(layerName).children();
				    		            	
				    		            	//console.info(childs);
				    		            	if(childs.length > 0){
				    		            		
				    		            		featureCnt++;
				    		            		
				    		            		coreMap.popContent.innerHTML += "<img src='./resources/images/popup/information.png' style='margin-bottom:-3px;' /> <span style='color:black; font-weight: bold; margin-left:3px;'>레이어 객체 정보</span>";
				    		            		coreMap.popContent.innerHTML += "<div style='margin-top:10px; background: #eff8ff; height: 20px; border-top: 2px solid #167dcc; border-bottom: 1px solid #cfcfcf; color: #003471;'>" +
				    		            				"<img src='./resources/images/popup/blit_st_01.png' style='margin-left:5px; margin-bottom: 2px; margin-right:7px;' />Layer Name &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + layerName + "</div>";
				    		     
				    		            		Ext.each($(childs), function(child, cnt){
					    		            		
							            			if($(child)[0].localName != "SHAPE" && $(child)[0].localName != "boundedBy"){
							            				coreMap.popContent.innerHTML += "<div>" +
								            					"<div style='position: absolute; width:100px; background: #f6f6f6; height: 20px; border-top: 1px solid #cfcfcf; border-bottom: 1px solid #cfcfcf; color: #000;'>" +
								            					"<img src='./resources/images/popup/blit_st_01.png' style='margin-left:5px; margin-bottom: 2px; margin-right:7px;' />" + $(child)[0].localName + "</div>" +
								            							"<div style='position:relative; left:100px; color: #545454;'>&nbsp&nbsp&nbsp" + $(child).text() + "</div>" +
								            									"</div>";
								            		}
							            			
							            			/*if(cnt == $(child).length - 1){
								            			popContent.innerHTML += "<br>";
								            		}*/
					    		            	});
					    		            	
					    		            	coreMap.popContent.innerHTML +="<div style='height:10px;'></div>";
				    		            	}
				    		           }
				    		       });
				    				
				    				layerNames += layerSource.params_.LAYERS + ",";
				    			}
				    		});
				    		
				    		me.btnOnOff = "off";
							coreMap.setStyle('cursor','default');
							if(me.mapClickEvt != undefined && me.mapClickEvt != null){
								coreMap.map.unByKey(me.mapClickEvt); // 이벤트 삭제
							}
				    		
				    		if(layerCnt == 0){
				    			coreMap.popup.setPosition(undefined);
				    			alert("활성화된 레이어가 없습니다.");
				    			return false;
				    		}
				    		else if(featureCnt == 0){
				    			coreMap.popup.setPosition(undefined);
				    			alert("해당 위치에 속성 정보가 없습니다.");
				    			return false;
				    		}
				    		else{
				    			var yoffset = resolution * 15;
				    			var beforeCenter = coreMap.map.getView().getCenter();
				    			
				    			coreMap.popup.setPosition(coordinate);
				    			
				    			var afterCenter = coreMap.map.getView().getCenter();
				    			
				    			if(beforeCenter != afterCenter){
				    				afterCenter[1] = afterCenter[1] + yoffset;
					    			//console.info(afterCenter);
					    			coreMap.map.getView().setCenter(afterCenter);
				    			}
				    		}
				    	});
					}
					else{
						
						me.btnOnOff = "off";
						coreMap.setStyle('cursor','default');
						if(me.mapClickEvt != undefined && me.mapClickEvt != null){
							coreMap.map.unByKey(me.mapClickEvt); // 이벤트 삭제
						}
					}
				}
			}
		}
	}/*,{
		xtype:'splitbutton',
		text:'배경지도',
		height:28,
		menu: [{
			xtype: 'menucheckitem',
			text: 'Road Map',
			id:"baseMap",
			checked:true,
			handler:function(con){
				var map = Ext.getCmp("_mapDiv_");
				map.baseMapLayers[0].setVisible(false);
				map.baseMapLayers[1].setVisible(true);

				var checkMap = Ext.getCmp("aerialMap");
				if(checkMap.checked==true){
					checkMap.setChecked(false);
				}

				if(con.checked==false){
					con.setChecked(true);
				}
			}
		},{
			xtype: 'menucheckitem',
			text: 'Aerial Map',
			id:"aerialMap",
			handler:function(con){
				var map = Ext.getCmp("_mapDiv_");
				map.baseMapLayers[0].setVisible(true);
				map.baseMapLayers[1].setVisible(false);

				var checkMap = Ext.getCmp("baseMap");
				if(checkMap.checked==true){
					checkMap.setChecked(false);
				}

				if(con.checked==false){
					con.setChecked(true);
				}
			}
		}]
	}*/]
});