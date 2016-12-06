Ext.define('InAcc.view.map.CoreMap', {
	extend: 'Ext.Component',
	
	xtype: 'inacc-coremap',
	
	id: '_mapDiv_',
	
	map:null,
	
	width: "100%",
	height: "100%",
	
	initComponent: function() {
		this.on('render', this.mapRendered, this);
		this.callParent();
	},
	
	mapRendered: function(p){
       var me = this;   
        
        var timerId = window.setInterval(function(){
        	
        	var options = {
                    projection: new OpenLayers.Projection("EPSG:900913"),
                    displayProjection: new OpenLayers.Projection("EPSG:4326"),
                    units: "m",
                    //numZoomLevels:21,
                    //maxResolution: 156543.0339,
                    //restrictedExtent : new OpenLayers.Bounds(126, 20, 129, 40)
                    //maxExtent: new OpenLayers.Bounds(4534744.2855537, 14682443.621914, 13509593.86007, 5129118.6174165),
                    controls : [
                        new OpenLayers.Control.Navigation()
                     ],
                    };
        	
        	me.map = new OpenLayers.Map('_mapDiv_', options);
        	
        	window.clearInterval(timerId);
            
        	me.baseMapInit();
        	
        	//Ext.create("InAcc.view.map.Layer");
		}, 1);
    },
    
    baseMapInit: function(){
    	var me = this;
    	var vBase = new vworld.Layers.Base('VBASE');
    	if (vBase != null){me.map.addLayer(vBase);}

    	me.map.setCenter(new OpenLayers.LonLat(14085011.808921, 4849053.3458186), 8);
    	me.map.events.register("moveend", me.map, function(evt){

    	});
	}
});