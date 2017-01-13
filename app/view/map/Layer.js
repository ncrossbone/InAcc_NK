Ext.define('InAcc.view.map.Layer', {
	extend: 'Ext.Component',
	
	layers: [],
	demLyrIdArr : [],
	aspLyrIdArr : [],
	id: "Layer_",
	opacity: 1.0,
	initComponent: function(){
		this.callParent();    
	},
	layerOn: function(id,con){
		var me = this;
		var coreMap = Ext.getCmp("_mapDiv_");

			var layerIdx = this.layers.map(function(layer){
				return layer.id;
			}).indexOf(id);

			if(layerIdx==-1){
				console.info(InAcc.global.Variable.getMapServiceUrl());
				var layer = new ol.layer.Tile({
					source: new ol.source.TileWMS({
						url: InAcc.global.Variable.getMapServiceWmsUrl() + "NK_Test.xml",
						params : {
							LAYERS : id,
							CRS : "EPSG:5179",
							format : 'image/png',
							bgcolor : '0xffffff', 
							exceptions : 'BLANK',
							label : 'HIDE_OVERLAP',
							graphic_buffer : '64',
							ANTI : 'true',
							TEXT_ANTI : 'true'
						}
					//serverType: 'geoserver'
					}),
					opacity: me.opacity
				});

				coreMap.map.addLayer(layer);
				layer.setVisible(true);

				var layerObj = {id: id, layer: layer};
				me.layers.push(layerObj);

			}else{

				me.layers[layerIdx].layer.setVisible(true);

			}
			
			
			/*}else{
			if(me.demLyrIdArr!=""){
				for(var i = 0; i < me.demLyrIdArr.length; i++){
					var layerIdx = this.layers.map(function(layer){
						return layer.id;
					}).indexOf(me.demLyrIdArr[i]);

					var	proxyUrl = InAcc.global.Variable.getProxyUrl();

					var params = "http://202.68.238.120:8880/geonuris/wms?GDX=" + id + "&REQUEST=GetCapabilities&SERVICE=WMS";


					var url = proxyUrl + params;
					var strArr = [];

					$.ajax({
						url: url,
						type : 'GET',
						async : false,
						contentType : 'text/xml',
						success : function(response_) {

							$(response_).find("Layer").each(function(idx,obj){
								if(idx!=0){
									strArr.push($(this).find("title"));
								}
							});
							for(var i=0; i < strArr.length; i++){
								me.demLyrIdArr.push(strArr[i].prevObject[0].childNodes[1].innerHTML);
							}

						}
					});

					for(var i = 0; i < me.demLyrIdArr.length; i++){ 
						if(layerIdx==-1){
							var layer = new ol.layer.Tile({
								source: new ol.source.TileWMS({
									url: 'http://202.68.238.120:8880/geonuris/wms?GDX=' + id,
									params : {
										LAYERS : me.demLyrIdArr[i],
										CRS : "EPSG:5179",
										format : 'image/png',
										bgcolor : '0xffffff', 
										exceptions : 'BLANK',
										label : 'HIDE_OVERLAP',
										graphic_buffer : '64',
										ANTI : 'true',
										TEXT_ANTI : 'true'
									}
								})
							});

							coreMap.map.addLayer(layer);
							layer.setVisible(true);

							var layerObj = {id: me.demLyrIdArr[i], layer: layer};
							me.layers.push(layerObj);



						}else{

							me.layers[layerIdx].layer.setVisible(true);	

						}
					}
				}

		}else{

			var layerIdx = this.layers.map(function(layer){
				return layer.id;
			}).indexOf(id);
			var	proxyUrl = InAcc.global.Variable.getProxyUrl();

			var params = "http://202.68.238.120:8880/geonuris/wms?GDX=" + id + "&REQUEST=GetCapabilities&SERVICE=WMS";


			var url = proxyUrl + params;
			var strArr = [];

			$.ajax({
				url: url,
				type : 'GET',
				async : false,
				contentType : 'text/xml',
				success : function(response_) {

					$(response_).find("Layer").each(function(idx,obj){
						if(idx!=0){
							strArr.push($(this).find("title"));
						}
					});
					for(var i=0; i < strArr.length; i++){
						me.demLyrIdArr.push(strArr[i].prevObject[0].childNodes[1].innerHTML);
					}

				}
			});

			for(var i = 0; i < me.demLyrIdArr.length; i++){ 
				if(layerIdx==-1){
					var layer = new ol.layer.Tile({
						source: new ol.source.TileWMS({
							url: 'http://202.68.238.120:8880/geonuris/wms?GDX=' + id,
							params : {
								LAYERS : me.demLyrIdArr[i],
								CRS : "EPSG:5179",
								format : 'image/png',
								bgcolor : '0xffffff', 
								exceptions : 'BLANK',
								label : 'HIDE_OVERLAP',
								graphic_buffer : '64',
								ANTI : 'true',
								TEXT_ANTI : 'true'
							}
						})
					});

					coreMap.map.addLayer(layer);
					layer.setVisible(true);

					var layerObj = {id: me.demLyrIdArr[i], layer: layer};
					me.layers.push(layerObj);



				}else{

					me.layers[layerIdx].layer.setVisible(true);	

				}
			}
		}

		}*/


	},
	layerOff: function(id,con){
		var me = this;
		if(con!="image"){


			var layerIdx = this.layers.map(function(layer){
				return layer.id;
			}).indexOf(id);

			this.layers[layerIdx].layer.setVisible(false);
		}/*else{

			for(var i = 0; i < me.demLyrIdArr.length; i++){
				
				var layerIdx = me.layers.map(function(layer){
					return layer.id;
				}).indexOf(me.demLyrIdArr[i]);

				this.layers[layerIdx].layer.setVisible(false);
			}
		}*/
	}
});