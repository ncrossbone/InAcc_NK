Ext.define('InAcc.view.map.Layer', {
	extend: 'Ext.Component',
	
	layers: [],
	
	id: "Layer",
	
	initComponent: function(){
		this.callParent();    
	},
	layerOn: function(record){
		
		var coreMap = Ext.getCmp("_mapDiv_");

		// setup single tiled layer
		var lTest = new OpenLayers.Layer.WMS("tmdl:10km - Untiled", "http://112.217.167.123:38080/geoserver/tmdl/wms",
				{
			"LAYERS": record,
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

		coreMap.map.addLayers([lTest]);
        lTest.setVisibility(true);
        
        /*var layerObj = {id: "tmdl:10km", layer: lTest};
        this.layers.push(layerObj);
		
		var layerIdx = this.layers.map(function(layer){
			return layer.id;
		}).indexOf(record.id);
		
		this.layers[layerIdx].layer.setVisibility(false);*/
	}
});