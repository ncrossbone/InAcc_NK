Ext.define('InAcc.view.map.Layer', {
	extend: 'Ext.Component',
	
	layers: [],
	
	id: "Layer",
	
	initComponent: function(){
		this.callParent();    
	},
	layerOn: function(id){
		
		var coreMap = Ext.getCmp("_mapDiv_");

		// setup single tiled layer
		var layer = new OpenLayers.Layer.WMS("tmdl:10km - Untiled", "http://112.217.167.123:38080/geoserver/tmdl/wms",
				{
			"LAYERS": id,
			style : {strokeColor:'#ff0000'},
			transparent: true,
			format: 'image/png'
				},         
				{
					singleTile: false,
					visibility : false,
					legend: true,
					ratio: 1, 
					//isBaseLayer: true,
					yx : {'EPSG:4326' : true}
				} 
		);

		coreMap.map.addLayers([layer]);
		
		layer.setVisibility(true);
        
        var layerObj = {id: id, layer: layer};
        this.layers.push(layerObj);
        
       // console.info(this.layers);
		
		/*var layerIdx = this.layers.map(function(layer){
			return layer.id;
		}).indexOf(record.id);
		
		this.layers[layerIdx].layer.setVisibility(false);*/
	},
	layerOff: function(id){
		
		var layerIdx = this.layers.map(function(layer){
			//console.info(layer.id);
			return layer.id;
		}).indexOf(id);
		
		this.layers[layerIdx].layer.setVisibility(false);
		this.layers[layerIdx] = null;
	}
});