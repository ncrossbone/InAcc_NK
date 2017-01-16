Ext.define('InAcc.view.map.Layer', {
	extend: 'Ext.Component',
	
	layers: [],
	demLyrIdArr : [],
	aspLyrIdArr : [],
	id: "Layer_",
	mapId: "_mapDiv_",
	opacity: 1.0,
	initComponent: function(){
		this.callParent();    
	},
	layerOn: function(id,con){
		var me = this;
		
		var coreMap = Ext.getCmp(me.mapId);
		console.info(coreMap);
		
		var timerCnt = 0;
		
		var timer = setInterval(function(){
			
			timerCnt++;
			
			var mapServiceWmsUrl = InAcc.global.Variable.getMapServiceWmsUrl();
			
			if(mapServiceWmsUrl != undefined && mapServiceWmsUrl != null){
				
				clearInterval(timer);
				
				var layerIdx = me.layers.map(function(layer){
					return layer.id;
				}).indexOf(me.mapId + "_" + id);

					if(layerIdx==-1){
						console.info(mapServiceWmsUrl);
						var layer = new ol.layer.Tile({
							source: new ol.source.TileWMS({
								url: mapServiceWmsUrl + "NK_Test.xml",
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
							}),
							opacity: me.opacity
						});

						coreMap.map.addLayer(layer);
						layer.setVisible(true);

						var layerObj = {id: me.mapId + "_" + id, layer: layer};
						me.layers.push(layerObj);

					}else{

						me.layers[layerIdx].layer.setVisible(true);

					}
			}
			
			if(timerCnt > 2000){
				
				clearInterval(timer);
				alert("레이어를 로드하지 못했습니다.")
			}
		}, 1);
	},
	layerOff: function(id,con){
		
		if(con!="image"){

			var layerIdx = this.layers.map(function(layer){
				return layer.id;
			}).indexOf(this.mapId + "_" + id);

			this.layers[layerIdx].layer.setVisible(false);
		}
	}
});