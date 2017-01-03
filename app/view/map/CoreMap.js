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
	html:"<div style='position:absolute; top:8%; left:96%; width:60px; z-index:20000; height:200px;'>" +
	  "<div class='zoomText'>" +
	  	//"<div style='top:75px; background: url(./resources/images/zoom.png) -216px 0px;'></div>" +
	  	"<div style='top:95px; background: url(./resources/images/zoom.png) -245px 0px;'></div>" +
	  	"<div style='top:115px; background: url(./resources/images/zoom.png) -274px 0px;'></div>" +
	  	"<div style='top:135px; background: url(./resources/images/zoom.png) -303px 0px;'></div>" +
	  "</div>" +
	  "<div class='plus' style='position:absolute; top:0px; left:30px; width: 20px; height: 20px; background: url(./resources/images/zoom.png) -80px 0px no-repeat;'></div>" +
	  "<div class='zoomBar' style='top:20px; left:30px; border: solid 1px; margin-left:1px; padding-top:1px; position: absolute; width: 18px; height: 121px; background: url(./resources/images/zoom.png) -140px 0px repeat-y; transition: height 0.1s;'></div>" +
	  "<div class='zoomBar2' style='top:141px; left:30px; border: solid 1px; margin-left:1px; padding-top:1px; position: absolute; width: 18px; height: 11px; background: url(./resources/images/zoom.png) -122px 0px repeat-y; transition: height 0.1s;'></div>" +
	  "<div class='zoomPart'>" +
	  	"<div style='top: 25px;'></div>" +
	  	"<div style='top: 35px;'></div>" +
	  	"<div style='top: 45px;'></div>" +
	  	"<div style='top: 55px;'></div>" +
	  	"<div style='top: 65px;'></div>" +
	  	"<div style='top: 75px;'></div>" +
	  	"<div style='top: 85px;'></div>" +
	  	"<div style='top: 95px;'></div>" +
	  	"<div style='top: 105px;'></div>" +
	  	"<div style='top: 115px;'></div>" +
	  	"<div style='top: 125px;'></div>" +
	  	"<div style='top: 135px;'></div>" +
	  	"<div style='top: 145px;'></div>" +
	  "</div>" +
	  "<div class='zoomPartClick'>" +
	  	"<div class='zoomPartClick_1' style='top: 21px;'></div>" +
	  	"<div class='zoomPartClick_2' style='top: 31px;'></div>" +
	  	"<div class='zoomPartClick_3' style='top: 41px;'></div>" +
	  	"<div class='zoomPartClick_4' style='top: 51px;'></div>" +
	  	"<div class='zoomPartClick_5' style='top: 61px;'></div>" +
	  	"<div class='zoomPartClick_6'style='top: 71px;'></div>" +
	  	"<div class='zoomPartClick_7' style='top: 81px;'></div>" +
	  	"<div class='zoomPartClick_8' style='top: 91px;'></div>" +
	  	"<div class='zoomPartClick_9' style='top: 101px;'></div>" +
	  	"<div class='zoomPartClick_10' style='top: 111px;'></div>" +
	  	"<div class='zoomPartClick_11' style='top: 121px;'></div>" +
	  	"<div class='zoomPartClick_12' style='top: 131px;'></div>" +
	  	"<div class='zoomPartClick_13' style='top: 141px;'></div>" +
	  "</div>" +
	  "<div class='zoomPointer' style='overflow: hidden; position: absolute; margin: -5px 0px 0px; width: 18px; height: 11px; background: url(./resources/images/zoom.png) -157px 0px; transition: top 0.1s; left: 31px; top: 135px;'></div>" +
	  "<div class='minus' style='top:141px; left:30px; position: absolute; width: 20px; height: 20px; background: url(./resources/images/zoom.png) -100px 0px no-repeat;'></div>" +
	  "</div>",
	  
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
	_zoomPointerTop:0,
    _zoomBar:0,
    _zoomBar2:0,
    _maxTop : 0,
    _minTop : 0,
    _plusValue : 10,
    _minusValue : 0,
    preValue: 0,
    
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
        
        
        me._zoomPointerTop = parseInt($(".zoomPointer").css("top"));
    	me._maxTop = me._zoomPointerTop;
    	me._minTop = me._maxTop - 110;

    	me._zoomBar = parseInt($(".zoomBar").height());
    	me._zoomBar2 = parseInt($(".zoomBar2").height());
    	
        $(".plus").click(function(){

    		var topPx = $(".zoomPointer").css("top");
    		var pxSplit = parseInt(topPx.split('px')[0]);
    		var cnt = 0;
    		var calc = pxSplit - 10;

    		if(pxSplit>me._minTop){
    			$(".zoomPointer").css("top",calc);
    			me.topCalc(cnt);
    			me.zoomEvent(calc);
    		}
    	});
        
        $(".minus").click(function(){
    		var topPx = $(".zoomPointer").css("top");
    		var pxSplit = parseInt(topPx.split('px')[0]);
    		var cnt = 0;
    		var calc = pxSplit + 10;

    		if(pxSplit < me._maxTop){
    			$(".zoomPointer").css("top",calc);
    			cnt++;
    			me.topCalc(cnt);
    			me.zoomEvent(calc);
    		}
    	});
        
        $(".zoomPartClick div").click(function(val){
    		
    		var className = val.target.className;
    		var calc = 0;
    		var val = 0;
    		switch (className) {
    		case "zoomPartClick_1":
    			val = 100;
    			calc = me._minTop;
    			$(".zoomPointer").css("top",calc);
    			break;
    		case "zoomPartClick_2":
    			val = 80;
    			calc = me._minTop + 10;
    			$(".zoomPointer").css("top",calc);
    			break;
    		case "zoomPartClick_3":
    			val = 60;
    			calc = me._minTop + 20;
    			$(".zoomPointer").css("top",calc);
    			break;
    		case "zoomPartClick_4":
    			val = 40;
    			calc = me._minTop + 30;
    			$(".zoomPointer").css("top",calc);
    			break;
    		case "zoomPartClick_5":
    			val = 20;
    			calc = me._minTop + 40;
    			$(".zoomPointer").css("top",calc);
    			break;
    		case "zoomPartClick_6":
    			val = 0;
    			calc = me._minTop + 50;
    			$(".zoomPointer").css("top",calc);
    			break;
    		case "zoomPartClick_7":
    			val = -20;
    			calc = me._minTop + 60;
    			$(".zoomPointer").css("top",calc);
    			break;
    		case "zoomPartClick_8":
    			val = -40;
    			calc = me._minTop + 70;
    			$(".zoomPointer").css("top",calc);
    			break;
    		case "zoomPartClick_9":
    			val = -60;
    			calc = me._minTop + 80;
    			$(".zoomPointer").css("top",calc);
    			break;
    		case "zoomPartClick_10":
    			val = -80;
    			calc = me._minTop + 90;
    			$(".zoomPointer").css("top",calc);
    			break;
    		case "zoomPartClick_11":
    			val = -100;
    			calc = me._minTop + 100;
    			$(".zoomPointer").css("top",calc);
    			break;
    		case "zoomPartClick_12":
    			val = -120;
    			calc = me._minTop + 110;
    			$(".zoomPointer").css("top",calc);
    			break;
    		case "zoomPartClick_13":
    			calc = me._minTop + 120;
    			$(".zoomPointer").css("top",calc);
    			break;
			default:
				break;
			}
    		$(".zoomBar2").height(calc + val);
			$(".zoomBar2").css("top",calc);
    		me.zoomEvent(calc);
    	});

    	$(".minus").mouseover(function(){
    		$('.minus').css( 'cursor', 'pointer' );
    	});

    	$(".plus").mouseover(function(){
    		$('.plus').css( 'cursor', 'pointer' );
    	});
    	
    	$(".zoomPartClick div").mouseover(function(){
    		$(this).css( 'cursor', 'pointer' );
    	});
    	
    	
    },
    
    topCalc: function(cnt){
    	var me = this;
    	var topPx = $(".zoomPointer").css("top");
    	var pxSplit = parseInt(topPx.split('px')[0]);
    	var calc = me._zoomPointerTop - pxSplit;

    		if(cnt!=0){
    			var nowZoombar = $(".zoomBar2").css("top");
    			var splitZoombar = parseInt(nowZoombar.split("px")[0]);
    			me._minusValue = splitZoombar + 10;
    			$(".zoomBar2").height(me._zoomBar2 + calc - 10);
    			$(".zoomBar2").css("top",me._minusValue);
    		}else{
    			var nowZoombar = $(".zoomBar2").css("top");
    			var splitZoombar = parseInt(nowZoombar.split("px")[0]);
    			me._plusValue = splitZoombar - 10;
    			$(".zoomBar2").height(me._zoomBar2 + calc + 10);
    			$(".zoomBar2").css("top",me._plusValue);
    		}

    	
    	
    },
    zoomEvent: function(level){
    	var me = this;
        var zoomLevel = 0;
    	switch (level) {
		case me._maxTop:
			zoomLevel = 7;
			break;
		case me._maxTop - 10:
			zoomLevel = 8;
			break;
		case me._maxTop - 20:
			zoomLevel = 9;
			break;
		case me._maxTop - 30:
			zoomLevel = 10;
			break;
		case me._maxTop - 40:
			zoomLevel = 11;
			break;
		case me._maxTop - 50:
			zoomLevel = 12;
			break;
		case me._maxTop - 60:
			zoomLevel = 13;
			break;
		case me._maxTop - 70:
			zoomLevel = 14;
			break;
		case me._maxTop - 80:
			zoomLevel = 15;
			break;
		case me._maxTop - 90:
			zoomLevel = 16;
			break;
		case me._maxTop - 100:
			zoomLevel = 17;
			break;
		case me._maxTop - 110:
			zoomLevel = 18;
			break;

		default:
			break;
		}
    	
    	me.map.getView().setZoom(zoomLevel);
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
    	
    	var popContainer = document.getElementById('popup');
    	var popContent = document.getElementById('popup-content');
    	var popCloser = document.getElementById('popup-closer');
    	
    	popCloser.onclick = function(){
    		popup.setPosition(undefined);
    		popCloser.blur();
    		return false;
    	}
    	
    	var popup = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
    		element: popContainer,
    		autoPan: true,
    		autoPanAnimation: {
    			duration: 250
    		}
    	}));
    	
    	me.map = new ol.Map({
    		overlays: [popup], // 팝업창 설정
    		target: '_mapDiv_',
    		layers: this.baseMapLayers,
    		controls : [],
    		//interactions:[new ol.interaction.MouseWheelZoom()],
    		//extent : [118.81636217878827,34.18199192485683,136.35748315880258,46.992671531968845],
    		//extent : ol.proj.get( "EPSG:4326" ).getExtent(),
    		view: new ol.View({
    			projection : "EPSG:5179",
    	        center: ol.proj.transform([127, 40], 'EPSG:4326', 'EPSG:5179'),
    	        zoom: 7,
    	        minZoom: 7,
    	        maxZoom: 18
    		})
    	});
    	
    	//var mapHistory = new ol.navigationHistory( this.map );
    	this.map.on('moveend', this.mapExtentChange, this);
    	//console.info(ol.MOUSEWHEELZOOM_TIMEOUT_DURATION);
    	//this.map.on('mouse-wheel', this.test, this);

    	InAcc.global.Function.getSido();

    	//me.map.events.register('click', map, onClick);
    	// 이벤트 생성
    	var mapClickEvt = me.map.on('click', function(evt){
    		
    		var layers = me.map.getLayers().getArray();
    		var layerNames = "";
    		var coordinate = evt.coordinate;
    		var resolution = me.map.getView().getResolution();
    		
    		popup.setPosition(coordinate);
    		
    		popContent.innerHTML = "";
    		
    		Ext.each(layers, function(layer){
    			
    			if(layer.values_.type != "base"){
    				
    				var layerSource = layer.getSource();
    				var layerName = layerSource.params_.LAYERS;
    				
    				/*console.info(layerSource.getGetFeatureInfoUrl(evt.coordinate, me.map.getView().getResolution(), "EPSG:5179", {
    					'INFO_FORMAT': 'text/html',
                        'FEATURE_COUNT': '300'
    				}));*/
    				
    				var tmpUrl = layerSource.getGetFeatureInfoUrl(coordinate, resolution, "EPSG:5179", {
    					'INFO_FORMAT': 'text/xml',
                        'FEATURE_COUNT': '300'
    				});
    				
    				$.ajax({
    		            url : InAcc.global.Variable.getProxyUrl() + tmpUrl,
    		            type : 'GET',
    		            async : false,
    		            contentType : 'text/xml',
    		            success : function(response_) {
    		            	
    		            	var childs = $(response_).find(layerName).children();
    		            	
    		            	if(childs.length > 0){
    		            		popContent.innerHTML += "<img src='./resources/images/popup/information.png' style='margin-bottom:-3px;' /> <span style='color:black; font-weight: bold; margin-left:3px;'>레이어 객체 정보</span>";
    		            		popContent.innerHTML += "<div style='margin-top:10px; background: #eff8ff; height: 20px; border-top: 2px solid #167dcc; border-bottom: 1px solid #cfcfcf; color: #003471;'>" +
    		            				"<img src='./resources/images/popup/blit_st_01.png' style='margin-left:5px; margin-bottom: 2px; margin-right:7px;' />Layer Name &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + layerName + "</div>";
    		            	}
    		            	
    		            	Ext.each($(childs), function(child, cnt){
    		            		
		            			if($(child)[0].localName != "SHAPE" && $(child)[0].localName != "boundedBy"){
			            			popContent.innerHTML += "<div>" +
			            					"<div style='position: absolute; width:100px; background: #f6f6f6; height: 20px; border-top: 1px solid #cfcfcf; border-bottom: 1px solid #cfcfcf; color: #000;'>" +
			            					"<img src='./resources/images/popup/blit_st_01.png' style='margin-left:5px; margin-bottom: 2px; margin-right:7px;' />" + $(child)[0].localName + "</div>" +
			            							"<div style='position:relative; left:100px; color: #545454;'>&nbsp&nbsp&nbsp" + $(child).text() + "</div>" +
			            									"</div>";
			            		}
		            			
		            			/*if(cnt == $(child).length - 1){
			            			popContent.innerHTML += "<br>";
			            		}*/
    		            	});
    		            	
    		            	popContent.innerHTML +="<div style='height:10px;'></div>";
    		           }
    		       });
    				
    				//console.info(layerSource.params_.LAYERS);
    				//console.info(layerSource.urls[0]);
    				layerNames += layerSource.params_.LAYERS + ",";
    			}
    		});
    		
    		/*if(layerNames != ""){
    			layerNames = layerNames.substring(0, layerNames.length - 1);
    		}
    		else{
    			alert("활성화된 레이어가 없습니다.");
    			return false;
    		}*/
    		
    		//me.map.unByKey(mapClickEvt); // 이벤트 삭제
    	});

    	me.map.getView().on('change:resolution', function(evt){
    		
    		var zoomLevel = me.map.getView().getZoom();
    		me.wheelZoom(zoomLevel);
    		
    	});
    	
    },
    
    wheelZoom:function(zoomLevel){
    	var me = this; 
    	//alert("1");
    	var calc = 0;
		var val = 0;
		switch (zoomLevel) {
		case 18:
			val = 100;
			calc = me._minTop;
			$(".zoomPointer").css("top",calc);
			break;
		case 17:
			val = 80;
			calc = me._minTop + 10;
			$(".zoomPointer").css("top",calc);
			break;
		case 16:
			val = 60;
			calc = me._minTop + 20;
			$(".zoomPointer").css("top",calc);
			break;
		case 15:
			val = 40;
			calc = me._minTop + 30;
			$(".zoomPointer").css("top",calc);
			break;
		case 14:
			val = 20;
			calc = me._minTop + 40;
			$(".zoomPointer").css("top",calc);
			break;
		case 13:
			val = 0;
			calc = me._minTop + 50;
			$(".zoomPointer").css("top",calc);
			break;
		case 12:
			val = -20;
			calc = me._minTop + 60;
			$(".zoomPointer").css("top",calc);
			break;
		case 11:
			val = -40;
			calc = me._minTop + 70;
			$(".zoomPointer").css("top",calc);
			break;
		case 10:
			val = -60;
			calc = me._minTop + 80;
			$(".zoomPointer").css("top",calc);
			break;
		case 9:
			val = -80;
			calc = me._minTop + 90;
			$(".zoomPointer").css("top",calc);
			break;
		case 8:
			val = -100;
			calc = me._minTop + 100;
			$(".zoomPointer").css("top",calc);
			break;
		case 7:
			val = -120;
			calc = me._minTop + 110;
			$(".zoomPointer").css("top",calc);
			break;
		default:
			return;
		}
		$(".zoomBar2").height(calc + val);
		$(".zoomBar2").css("top",calc);
		//me.zoomEvent(calc);
    	
    },
    onclickMapSelect: function(val){
    	var me = this;

    	if(val.id=="map4"){
    		$("#map4").removeClass("mapDefault");
    		$("#map5").removeClass("mapClick");
    		$("#map4").addClass("mapClick");
    		$("#map5").addClass("mapDefault");
    	}else{
    		$("#map5").removeClass("mapDefault");
    		$("#map4").removeClass("mapClick");
    		$("#map5").addClass("mapClick");
    		$("#map4").addClass("mapDefault");
    	}
    	
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