Ext.define('InAcc.view.map.Layer', {
	extend: 'Ext.Component',
	
	layers: [],
	
	id: "Layer_",
	
	initComponent: function(){
		this.callParent();    
	},
	layerOn: function(id){
		var me = this;
		var coreMap = Ext.getCmp("_mapDiv_");


		var layerIdx = this.layers.map(function(layer){
			return layer.id;
		}).indexOf(id);
		
		if(layerIdx==-1){

			var layer = new ol.layer.Tile({
				source: new ol.source.TileWMS({
					url: 'http://202.68.238.120:8880/geonuris/wms?GDX=NK_Test.xml',
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
				})
			});

			coreMap.map.addLayer(layer);
			layer.setVisible(true);

			var layerObj = {id: id, layer: layer};
			me.layers.push(layerObj);

		}else{

			me.layers[layerIdx].layer.setVisible(true);

		}
		
	},
	layerOff: function(id){

		var layerIdx = this.layers.map(function(layer){
			return layer.id;
		}).indexOf(id);

		this.layers[layerIdx].layer.setVisible(false);
	}
});