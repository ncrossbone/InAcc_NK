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
		//console.info(ol.control);
		//return;
       var me = this;   
        
        var timerId = window.setInterval(function(){
        
        	var map = new ol.Map({
        		target: '_mapDiv_',
        		layers: [new ol.layer.Tile({
        			source: new ol.source.OSM()
        		})],
        		view: new ol.View({
        			center: ol.proj.fromLonLat([37.41, 8.82]),
        			zoom: 4
        		})
        	});
        	
            window.clearInterval(timerId);
		}, 1);
    }
});