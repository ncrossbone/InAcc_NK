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
					url: 'http://202.68.238.117:8080/geoserver/wms',
					params : {
						LAYERS : id
					},
					serverType: 'geoserver'
				})
			})

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