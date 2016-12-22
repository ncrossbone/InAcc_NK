Ext.define("InAcc.view.north.NorthContainer", {
	
	extend: "Ext.Panel",
	
	xtype: "inacc-northcontainer",
	
	layout:{
		type:"hbox"
	},
	
	bodyStyle: "background:url('./resources/images/design/top_right_bg.gif') !important",
	border:false,
	height:36,
	html:"<select id='sidoSelect' style='margin-left: 360px; margin-top: 6px; width: 50px; border: transparent; font-family: notokr; color:gray;'>" +
		 "<option selected disabled >시도</option>" +
		 "</select>"+
		 "<select id='sggSelect' style='margin-left: 10px; margin-top: 6px; width: 60px; border: transparent; font-family: notokr; color:gray;'>" +
		 "<option selected disabled >시군구</option>" +
		 "</select>"+
		 "<button id='selectButton' style='margin-left: 10px; margin-top: 6px; width: 60px; border: transparent; font-family: notokr; color:gray;'>" +
		 "버튼</button>"+
		 "<select id='demonLocation' style='margin-left: 200px; margin-top: 6px; width: 130px; border: transparent; font-family: notokr; color:gray;'>" +
			"<option selected disabled >시범지역위치이동</option>" +
			"<option value='na'>나선</option>" +
			"<option value='nam'>남포</option>" +
			"<option value='moo'>무산</option>" +
			"<option value='sin'>신의주</option>" +
			"<option value='won'>원산</option>" +
			"<option value='chang'>청진</option>" +
		 "</select>" +
		 "<span id='mapSelect'>" +
		 	"<a onclick=Ext.getCmp('_mapDiv_').onclickMapSelect(this); id='map0'>&nbsp&nbspMS빙맵(위성)&nbsp&nbsp</a>" +
		 	"<a onclick=Ext.getCmp('_mapDiv_').onclickMapSelect(this); id='map1'>&nbsp&nbspMap Box&nbsp&nbsp</a>" +
		 	"<a onclick=Ext.getCmp('_mapDiv_').onclickMapSelect(this); id='map2'>&nbsp&nbspMap BOx(위성)&nbsp&nbsp</a>" +
		 	"<a onclick=Ext.getCmp('_mapDiv_').onclickMapSelect(this); id='map3'>&nbsp&nbspOSM&nbsp&nbsp</a>" +
		 	"<a onclick=Ext.getCmp('_mapDiv_').onclickMapSelect(this); id='map4'>&nbsp&nbsp브이월드(위성)&nbsp&nbsp</a>" +
		 	"<a onclick=Ext.getCmp('_mapDiv_').onclickMapSelect(this); id='map5'>&nbsp&nbsp브이월드&nbsp&nbsp</a>" +
		 	"<a onclick=Ext.getCmp('_mapDiv_').onclickMapSelect(this); id='map6'>&nbsp&nbspMangoBaseMap&nbsp&nbsp</a>" +
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
		width:200,
		height:36
	}]
});

Ext.onReady(function(){ 
	
	$('#sidoSelect').change(function() {
	    var val = $("#sidoSelect option:selected");
	    InAcc.global.Function.getSgg(val[0].value);
	});
	
	
	$('#sggSelect').change(function() {
	    var val = $("#sggSelect option:selected");
	    console.info(val[0].value);
	});
	
	$('#selectButton').click(function() {
		ZoomToExtent();
	});
	
	//demonLocation
	
	$('#demonLocation').change(function() {
		var val = $("#demonLocation option:selected");
		DemonLocation(val);
	});
});


