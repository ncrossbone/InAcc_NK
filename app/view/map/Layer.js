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
	
	},
	layerOff: function(id,con){
		var me = this;
		if(con!="image"){


			var layerIdx = this.layers.map(function(layer){
				return layer.id;
			}).indexOf(id);

			this.layers[layerIdx].layer.setVisible(false);
		}
	}
});