Ext.define('InAcc.view.map.CoreMap', {
	extend: 'Ext.Component',
	
	xtype: 'inacc-coremap',
	
	id: '_mapDiv_',
	
	map:null,
	baseMapLayers: [],
	//baseMapGroup:"",
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
        	//me.baseMapLayers[1].setVisible(true);
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
    
    	me.baseMapLayers.push(new ol.layer.Tile({
    		title : 'MS 빙맵(위성)',
    		type : 'base',
    		visible : false,
    		source : new ol.source.BingMaps(
    				{
    					key: 'AscVUiK4gjpSojOJsgC6Mk2iS8IaluAtuP8l8Mm2jal5V2ARdiDU7g-4q1t5klkP',
    					imagerySet: 'Aerial'
    				})
    	})
    	)
    	me.baseMapLayers.push(new ol.layer.Tile({
    		title : 'Map Box',
    		type : 'base',
    		visible : false,
    		source : new ol.source.XYZ(
    				{
    					attributions : [ new ol.Attribution(
    							{
    								html : 'Tiles &copy;  <a href="https://www.mapbox.com/">Mapbox</a>'
    							}) ],
    							url : 'http://{a-c}.tiles.mapbox.com/v3/tmcw.map-7s15q36b/{z}/{x}/{y}.png'
    				})
    	})
    	)
    	me.baseMapLayers.push(new ol.layer.Tile({
    		title : 'Map Box (위성)',
    		type : 'base',
    		visible : false,
    		source : new ol.source.XYZ(
    				{
    					attributions : [ new ol.Attribution(
    							{
    								html : 'Tiles &copy;  <a href="https://www.mapbox.com/">Mapbox</a>'
    							}) ],
    							url : 'http://{a-c}.tiles.mapbox.com/v3/tmcw.map-j5fsp01s/{z}/{x}/{y}.png'
    				})
    	})
    	)

    	me.baseMapLayers.push(new ol.layer.Tile({
    		title : 'OSM',
    		type : 'base',
    		visible : false,
    		source : new ol.source.OSM(
    				{
    					attributions : [ new ol.Attribution(
    							{
    								html : 'Tiles &copy; <a href="http://www.opencyclemap.org/">OpenCycleMap</a>'
    							}) ]
    				})
    	})
    	)

    	me.baseMapLayers.push(new ol.layer.Tile({
    		title : '브이월드 (위성)',
    		visible : true,
    		type : 'base',
    		source : new ol.source.XYZ(
    				{
    					attributions : [ new ol.Attribution(
    							{
    								html : 'Tiles &copy; <a href="http://www.vworld.kr/"> <img src="./img/vworldlogo.png" /> </a>'
    							}) ],
    							url : 'http://xdworld.vworld.kr:8080/2d/Satellite/201301/{z}/{x}/{y}.jpeg'
    				})
    	})
    	)

    	me.baseMapLayers.push(new ol.layer.Tile({
    		title : '브이월드',
    		type : 'base',
    		visible : false,
    		source : new ol.source.XYZ(
    				{
    					// attribuions : 'Data by <a
    					// href="http://map.vworld.kr/">VWORLD
    					// MAP',
    					attributions : [ new ol.Attribution(
    							{
    								html : 'Tiles &copy; <a href="http://www.vworld.kr/"> <img src="./img/vworldlogo.png" /> </a>'
    							}) ],
    							url : 'http://xdworld.vworld.kr:8080/2d/Base/201411/{z}/{x}/{y}.png'
    				})
    	})
    	)

    	me.baseMapLayers.push(new ol.layer.Tile({
    		title : 'Mango Base Map',
    		type : 'base',
    		visible : false,
    		source : new ol.source.XYZ(
    				{
    					attributions : [ new ol.Attribution(
    							{
    								html : '&copy; <a href="http://mangosystem.com">Mango</a> & <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    							}) ],
    							url : 'http://1.234.82.19:8080/editor/v1/{z}/{x}/{y}.png'
    				})
    	})
    	)
    	
    	//console.info(this.baseMapLayers);
    	proj4.defs("EPSG:5179", "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs");
    	
    	
    	Ext.create("InAcc.view.map.Layer");
    	 
		
    	me.map = new ol.Map({
    		target: '_mapDiv_',
    		layers: this.baseMapLayers,
    		controls : [],
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
    	
    	//InAcc.global.Function.getSido();
    },
    
    onclickMapSelect: function(val){
    	var me = this; 
    	
    	var result = parseInt(val.id.split('map')[1]);
    	me.baseMapLayers[result].setVisible(true);
    	
    	for(var i =0; i<me.baseMapLayers.length; i++){
    		if(result != i){
    			me.baseMapLayers[i].setVisible(false);
    		}
    	}
    	
    	/*me.baseMapLayers[].setVisible(true);*/
    }
});