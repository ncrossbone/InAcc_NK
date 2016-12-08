Ext.define('InAcc.view.map.CoreMap', {
	extend: 'Ext.Component',
	
	xtype: 'inacc-coremap',
	
	id: '_mapDiv_',
	
	map:null,
	baseMapLayers: [],
	
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
        	
        	me.initBaseMap();
        	me.baseMapLayers[1].setVisible(true);
        	me.baseMapLayers[2].setVisible(true);
        	console.info(me.map.layer);
        	console.info(me.map.layers);
        	
            window.clearInterval(timerId);
		}, 1);
    },
    
    
    
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
    	
    	var tmp = ol.proj.fromLonLat([123.81636217878827,38.18199192485683])[0] + "," + ol.proj.fromLonLat([123.81636217878827,38.18199192485683])[1] + "," +  ol.proj.fromLonLat([131.35748315880258,42.992671531968845])[0] + "," + ol.proj.fromLonLat([131.35748315880258,42.992671531968845])[1];
    	
    	///http://202.68.238.117:8880/geonuris/wms?GDX=NK_Service.xml&VERSION=1.3.0&REQUEST=GetMap&Layer=%EC%8B%9C%EA%B5%B0%EA%B2%BD%EA%B3%84&FORMAT=image/png&width=300&height=300&CRS=EPSG:4326&BBOX=123.81636217878827%2038.18199192485683%20131.35748315880258%2042.992671531968845
    	me.baseMapLayers.push(new ol.layer.Tile({
            //extent: [-13884991, 2870341, -7455066, 6338219],
            source: new ol.source.TileWMS({
              url: 'http://202.68.238.117:8880/geonuris/wms?GDX=NK_Service.xml&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image/png&width=300&height=300&CRS=EPSG:3857&bbox=' + tmp + '&layers=시군경계&styles=default',
             //params: {'Layer': '시도경계',
            	 	  //'BBOX': [123.81636217878827,2038.18199192485683,20131.35748315880258,2042.992671531968845]}
             // serverType: 'geoserver'
            })
          }));
		
    	console.info(tmp);
    	console.info(ol.proj.fromLonLat([123.81636217878827,38.18199192485683]));
    	console.info(ol.proj.fromLonLat([131.35748315880258,42.992671531968845]));
    	
    	//console.info(me.baseMapLayers[2]);
    	me.map = new ol.Map({
    		target: '_mapDiv_',
    		layers: me.baseMapLayers,
    		view: new ol.View({
    			center: ol.proj.fromLonLat([127, 37]),
    			//center: [127, 37],
    			zoom: 8
    		})
    	});
    	
    }
});