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
                    //maxExtent: new OpenLayers.Bounds(4038820.8461085, 3309091.461517964, 15889117.943692, 5341704.9176768325)
                    controls : [
                        new OpenLayers.Control.PanZoomBar(),
                        new OpenLayers.Control.Navigation()
                     ],
                    };
        	
        	me.map = new OpenLayers.Map('_mapDiv_', options);
        	
        	
        	window.clearInterval(timerId);
            
        	me.baseMapInit();
        	
        	Ext.create("InAcc.view.map.Layer");
		}, 1);
    },
    
    baseMapInit: function(){
		var me = this;
		var vBase = new vworld.Layers.Base('VBASE');
		//console.info(vBase);
        if (vBase != null){me.map.addLayer(vBase);}
        me.map.setCenter(new OpenLayers.LonLat(128.7086, 35.7769).transform(me.map.displayProjection, me.map.projection), 8);
        
        me.map.events.register("moveend", me.map, function(evt){
            //console.info(me.map.getExtent());
       });
	}
});