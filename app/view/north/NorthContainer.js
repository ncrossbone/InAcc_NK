Ext.define("InAcc.view.north.NorthContainer", {
	
	extend: "Ext.Panel",
	
	xtype: "inacc-northcontainer",
	
	layout:{
		type:"hbox"
	},
	bodyStyle: "background:url('./resources/images/design/top_right_bg.gif') !important",
	border:false,
	height:36,
	html:"<div id='selectArea'>" +
		"<select id='sidoSelect' style='width: 90px; border: transparent; font-family: notokr; color:gray;'>" +
		 "<option selected disabled >시도</option>" +
		 "</select>"+
		 "<select id='sggSelect' style='width: 120px; border: transparent; font-family: notokr; color:gray;'>" +
		 "<option selected disabled >시군구</option>" +
		 "</select>"+
		 "<button id='selectButton' style='width: 60px; border: transparent; font-family: notokr; color:gray;'>" +
		 "이동</button>"+
		 "<select id='demonLocation' style='margin-left:50px; width: 130px; border: transparent; font-family: notokr; color:gray;'>" +
			"<option selected disabled >시범지역위치이동</option>" +
			"<option value='na'>나선</option>" +
			"<option value='nam'>남포</option>" +
			"<option value='moo'>무산</option>" +
			"<option value='sin'>신의주</option>" +
			"<option value='won'>원산</option>" +
			"<option value='chang'>청진</option>" +
		 "</select>" +
		 "</div>" +
		 "<span id='mapSelect'>" +
		 	/*"<a onclick=Ext.getCmp('_mapDiv_').onclickMapSelect(this); id='map0'>&nbsp&nbspMS빙맵(위성)&nbsp&nbsp</a>" +
		 	"<a onclick=Ext.getCmp('_mapDiv_').onclickMapSelect(this); id='map1'>&nbsp&nbspMap Box&nbsp&nbsp</a>" +
		 	"<a onclick=Ext.getCmp('_mapDiv_').onclickMapSelect(this); id='map2'>&nbsp&nbspMap BOx(위성)&nbsp&nbsp</a>" +
		 	*/
		 	"<a class='mapDefault'>&nbsp&nbsp지도분할&nbsp&nbsp</a>" +
		 	/*"<a style='margin-left:50px;' onclick=Ext.getCmp('_mapDiv_').onclickMapSelect(this); id='map3' class='mapDefault'>&nbsp&nbsp오프라인&nbsp&nbsp</a>" +*/
		 	"<a style='margin-left:50px;' onclick=Ext.getCmp('_mapDiv_').onclickMapSelect(this); id='map4' class='mapClick'>&nbsp&nbsp위성사진&nbsp&nbsp</a>" +
		 	"<a onclick=Ext.getCmp('_mapDiv_').onclickMapSelect(this); id='map5' class='mapDefault'>&nbsp&nbsp일반지도&nbsp&nbsp</a>" +
		 	//"<a onclick=Ext.getCmp('_mapDiv_').onclickMapSelect(this); id='map6'>&nbsp&nbspMangoBaseMap&nbsp&nbsp</a>" +
		 "</span>",
		 /*"<span style='width: 60px; height: 20px; border: 1px solid #d0d0d0; color: #333; background: #fff; letter-spacing: -1px; font-size: 12px;'> 맵종류 A </span>" +
		 "<span style='width: 60px; height: 20px; border: 1px solid #d0d0d0; color: #333; background: #fff; letter-spacing: -1px; font-size: 12px;'> 맵종류 B </span>" +
		 "<span style='width: 60px; height: 20px; border: 1px solid #d0d0d0; color: #333; background: #fff; letter-spacing: -1px; font-size: 12px;'> 맵종류 C </span>" +
		 "<span style='width: 60px; height: 20px; border: 1px solid #d0d0d0; color: #333; background: #fff; letter-spacing: -1px; font-size: 12px;'> 맵종류 D </span>" +
		 "<span style='width: 60px; height: 20px; border: 1px solid #d0d0d0; color: #333; background: #fff; letter-spacing: -1px; font-size: 12px;'> 맵종류 E </span>" +
		 "<span style='width: 60px; height: 20px; border: 1px solid #d0d0d0; color: #333; background: #fff; letter-spacing: -1px; font-size: 12px;'> 맵종류 F </span>" +
		 "<span style='width: 60px; height: 20px; border: 1px solid #126dae; color: #fff; background: #126dae; font-weight: bold; letter-spacing: -1px; font-size: 12px;'> 맵종류 G </span>",*/
	items:[{
		xtype:"container",
		width:"65%",
		height:36
	},{
		xtype:"slider",
		width: 200,
        minValue: 0,
        labelWidth: 50,
        value:100,
        itemId:"slider",
        fieldLabel: "투명도",
        labelSeparator : '',
        hideLabel: false,
        useTips: false,
        maxValue: 100,
        listeners: {
    		change: function(slider, thumb, oldValue, newValue) {
    			var layer = Ext.getCmp("Layer_");
    			layer.opacity = thumb/100;
    			if(layer.layers!=""){
    				
    				for(var i = 0; i < layer.layers.length; i++){
    					layer.layers[i].layer.setProperties({opacity: thumb/100});
    				}
    			}
    			
    			if(_offLyr!=""){
    				for(var i=0; i<_offLyr.length; i++){
    					for(var j=0; j<_offLyr[i].layer.length; j++){
    						_offLyr[i].layer[j].setProperties({opacity: thumb/100});
    					}
    				}
    			}
    		}
    	}
	}]
});

Ext.onReady(function(){ 
	
	$('#sidoSelect').change(function() {
	    var val = $("#sidoSelect option:selected");
	    InAcc.global.Function.getSgg(val[0].value);
	});
	
	
	$('#sggSelect').change(function() {
	    var val = $("#sggSelect option:selected");
	    //console.info(val[0].value);
	});
	
	$('#selectButton').click(function() {
		
		var sidoCd = $("#sidoSelect option:selected")[0].value;
		var sggCd = $("#sggSelect option:selected")[0].value;
		   
		   
		ZoomToExtent(sidoCd,sggCd);
	});
	
	//demonLocation
	
	$('#demonLocation').change(function() {
		var val = $("#demonLocation option:selected");
		DemonLocation(val);
	});
});


