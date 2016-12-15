Ext.define('InAcc.view.map.CoreMap', {
	extend: 'Ext.Component',
	
	xtype: 'inacc-coremap',
	
	id: '_mapDiv_',
	
	map:null,
	baseMapLayers: [],

	history :[],
	history_now :-1,
	click : false,
	delay :350,
	
	
	width: "100%",
	height: "100%",
	
	initComponent: function() {
		this.on('render', this.mapRendered, this);
		this.callParent();
	},
	
	mapExtentChange: function(){
		if (this.click) return;
	    this.history.push({
	        center: this.map.getView().getCenter(), 
	        resolution: this.map.getView().getResolution()
	    });
	    this.history_now++;
	    
	    
	},
	
	mapRendered: function(p){
		//console.info(ol.control);
		//return;
       var me = this;   
        
        var timerId = window.setInterval(function(){
        	
        	me.initBaseMap();
        	me.baseMapLayers[1].setVisible(true);
        	//me.baseMapLayers[2].setVisible(false);
        	
            window.clearInterval(timerId);
            
		}, 1);
      
    },
    /*
    prevExtentMove:function(){
		var me = this;
		console.info(me);
		me.extentRegAble = false;
		me.extentUnReIdx--;
		if(me.extentUnReIdx > -1){
			me.map.setExtent(me.extentReg[me.extentUnReIdx], true);
		}else{
			me.extentUnReIdx == 0;
		}
	},*/
    
    initBaseMap: function(val){
    	var me = this; 
    	
    	//Aerial Array[0]
    	me.baseMapLayers.push(new ol.layer.Tile({
    		visible: false,
            source: new ol.source.BingMaps({
              key: 'AscVUiK4gjpSojOJsgC6Mk2iS8IaluAtuP8l8Mm2jal5V2ARdiDU7g-4q1t5klkP', //api key localhost:8070/INACC
              imagerySet: 'Aerial'
            })
    	}));
    	
    	//Road Array[1]
    	me.baseMapLayers.push(new ol.layer.Tile({
    		visible: false,
    		source: new ol.source.OSM()
    	}));
    	
    	proj4.defs("EPSG:5179", "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs");
    	
    	
    	Ext.create("InAcc.view.map.Layer");
    	 
		
    	me.map = new ol.Map({
    		target: '_mapDiv_',
    		layers: me.baseMapLayers,
    		//extent : [118.81636217878827,34.18199192485683,136.35748315880258,46.992671531968845],
    		//extent : ol.proj.get( "EPSG:4326" ).getExtent(),
    		view: new ol.View({
    			projection : "EPSG:5179",
    	        center: ol.proj.transform([127, 40], 'EPSG:4326', 'EPSG:5179'),
    	        zoom: 7
    		})
    	});
    	
    	//var mapHistory = new ol.navigationHistory( this.map );
    	this.map.on('moveend', this.mapExtentChange, this);
    }
});