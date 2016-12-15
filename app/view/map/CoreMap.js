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
        	//me.baseMapLayers[2].setVisible(false);
        	
        	console.info(me.baseMapLayers[1]);
        	
            window.clearInterval(timerId);
            
            
            console.info(ol.proj.fromLonLat([127, 40]));
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
    	
    	proj4.defs("EPSG:5179", "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs");
    	/*var projection = ol.proj.get('EPSG:4326');
    	var projectionExtent = projection.getExtent();
    	
    	var tileSize = 512;
    	
    	var maxResolution = ol.extent.getWidth(projectionExtent) / (tileSize * 2);
    	var resolutions = new Array(16);
    	var z;
    	for (z = 0; z < 16; ++z) {
    	  resolutions[z] = maxResolution / Math.pow(2, z);
    	}*/
    	//118.81636217878827,34.18199192485683,136.35748315880258,46.992671531968845
    	///http://202.68.238.117:8880/geonuris/wms?GDX=NK_Service.xml&VERSION=1.3.0&REQUEST=GetMap&Layer=%EC%8B%9C%EA%B5%B0%EA%B2%BD%EA%B3%84&FORMAT=image/png&width=300&height=300&CRS=EPSG:4326&BBOX=123.81636217878827%2038.18199192485683%20131.35748315880258%2042.992671531968845
    	/*me.baseMapLayers.push(new ol.layer.Tile({
            //extent: [118.81636217878827,34.18199192485683,136.35748315880258,46.992671531968845],
            source: new ol.source.TileWMS({
              //url: 'http://202.68.238.117:8880/geonuris/wms?GDX=NK_Service.xml&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image/png&width=512&height=512&CRS=EPSG:4326&bbox=123.81636217878827,38.18199192485683,131.35748315880258,42.992671531968845&layers=시도경계&styles=default'
             url:'http://202.68.238.117:8880/geonuris/wms?GDX=NK_Test.xml',
            	 +'&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&TRANSPARENT=true&LAYERS=%EC%8B%9C%EB%8F%84%EA%B2%BD%EA%B3%84'
            	 +'&SRS=EPSG%3A4326&format=image%2Fpng&bgcolor=0xffffff&exceptions=INIMAGE&label=HIDE_OVERLAP'
            	 + '&graphic_buffer=64&ANTI=true&TEXT_ANTI=true&CRS=EPSG%3A4326&STYLES=default'
            	 + '&bbox=118.81636217878827,34.18199192485683,136.35748315880258,46.992671531968845'
            	 + '&width=512&height=512',
            	//url: 'http://202.68.238.117:8080/geoserver/wms',
             tileUrlFunction: function(tileCoord, pixelRatio, projection) {
            	 var z = tileCoord[0];
                 var x = tileCoord[1];
                 var y = -tileCoord[2] - 1;
                 console.info(tileCoord);
                 console.info(pixelRatio);
                 console.info(projection);
                 // wrap the world on the X axis
                 var n = Math.pow(2, z + 1); // 2 tiles at z=0
                 x = x % n;
                 if (x * n < 0) {
                   // x and n differ in sign so add n to wrap the result
                   // to the correct sign
                   x = x + n;
                 }
                 console.info(x);
                 console.info(y);
                 return urlTemplate.replace('{z}', z.toString())
                     .replace('{y}', y.toString())
                     .replace('{x}', x.toString());
             },
             projection: projection,
             tileGrid: new ol.tilegrid.TileGrid({
                   origin: ol.extent.getTopLeft(projectionExtent),
                   resolutions: resolutions,
                   tileSize: 512
             })
             params : {
                 LAYERS : 'ROOT',
                 CRS : "EPSG:5179",
                 format : 'image/png',
                 bgcolor : '0xffffff', 
                 exceptions : 'INIMAGE',
                 label : 'HIDE_OVERLAP',
                 graphic_buffer : '64',
                 ANTI : 'true',
                 TEXT_ANTI : 'true'
                 //SRS:"EPSG:5179"
             }
             
             params : {
            	 LAYERS : 'lt_c_tnadsido',
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
            	 ,params: {'LAYERS':'시도경계',
            	  		'CRS':'EPSG:4326'}
             // serverType: 'geoserver'
            })
          }));*/
    	
    	Ext.create("InAcc.view.map.Layer");
    	 
		//console.info(ol.proj.get( "EPSG:5179" ).getExtent());
    	//ol.proj.get('EPSG:4326').setExtent( [-180.0000, -90.0000, 180.0000, 90.0000] );
    	//console.info(me.baseMapLayers[2]);
		
		/*me.baseMapLayers.push(new ol.layer.Image({
            //extent: [118.81636217878827,34.18199192485683,136.35748315880258,46.992671531968845],
            source: new ol.source.ImageWMS({
             url:'http://202.68.238.117:8880/geonuris/wms?GDX=NK_Service.xml'
            	 +'&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&TRANSPARENT=true&LAYERS=%EC%8B%9C%EB%8F%84%EA%B2%BD%EA%B3%84'
            	 +'&SRS=EPSG%3A4326&format=image%2Fpng&bgcolor=0xffffff&exceptions=INIMAGE&label=HIDE_OVERLAP'
            	 + '&graphic_buffer=64&ANTI=true&TEXT_ANTI=true&CRS=EPSG%3A4326&STYLES=default'
            	 + '&bbox=118.81636217878827,34.18199192485683,136.35748315880258,46.992671531968845'
            	 + '&width=512&height=512'
            })
          }));*/
		
		
    	/*me.map = new ol.Map({
    		target: '_mapDiv_',
    		layers: me.baseMapLayers,
    		//extent : [118.81636217878827,34.18199192485683,136.35748315880258,46.992671531968845],
    		//extent : ol.proj.get( "EPSG:4326" ).getExtent(),
    		view: new ol.View({
    			//projection: 'EPSG:4326',
    		    //center: [127.58692266879542, 40.387331728412835],
    			center: ol.proj.fromLonLat([127, 40]),
    			//center: [1973973.7833936,901685.98167699,2025860.60526776,952737.74617981,],
    		    zoom: 8,
    		    //extent : [118.81636217878827,34.18199192485683,136.35748315880258,46.992671531968845]
    		})
    	});*/
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
    	
    	//var zoomslider = new ol.control.ZoomSlider();
    	//me.map.addControl(zoomslider);
    }
});