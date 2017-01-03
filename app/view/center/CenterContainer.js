Ext.define("InAcc.view.center.CenterContainer", {

	extend: "Ext.ButtonGroup",

	xtype: "inacc-centercontainer",
	//closable:true,
	//draggable:true,
	closable:false,
	x:350,
	y:34,
	width:245,
	height:40,
	bodyStyle:{"background-color": "#ececec"},

	items:[{
		xtype:"image",
		src:"resources/images/icons/util_01.png",
		style:"border:solid 1px; border-color: #dbdbdb; cursor:pointer;",
		listeners:{
			el:{
				click:function(){
					var dragPan = new ol.interaction.DragPan();
					var coreMap = Ext.getCmp("_mapDiv_");
					coreMap.map.getInteractions().forEach(function(interaction) {
						if (interaction instanceof ol.interaction.DragPan) {
						    interaction.setActive(true);
						}
					}, this);
				}
			}
		}
	},{
		xtype:"image",
		src:"resources/images/icons/util_02.png",
		style:"border:solid 1px; border-color: #dbdbdb; cursor:pointer;",
		listeners:{
			el:{
				click:function(){
					var coreMap = Ext.getCmp("_mapDiv_");
					if (coreMap.history_now > 0) {
						coreMap.click = true;
						coreMap.history_now--;
						coreMap.map.getView().setCenter(coreMap.history[coreMap.history_now].center);
						coreMap.map.getView().setResolution(coreMap.history[coreMap.history_now].resolution);
						setTimeout(function () {
							coreMap.click = false;
				        }, coreMap.delay);
				    }
					//map.prevExtentMove();
				}
			}
		}
	},{
		xtype:"image",
		src:"resources/images/icons/util_03.png",
		style:"border:solid 1px; border-color: #dbdbdb; cursor:pointer;",
		listeners:{
			el:{
				click:function(){
					var coreMap = Ext.getCmp("_mapDiv_");
					
					coreMap.click = true;
					if(coreMap.history_now < coreMap.history.length-1){
						coreMap.history_now++;
						coreMap.map.getView().setCenter(coreMap.history[coreMap.history_now].center);
						coreMap.map.getView().setResolution(coreMap.history[coreMap.history_now].resolution);
						setTimeout(function () {
							coreMap.click = false;
				        }, coreMap.delay);
					}
					
					//map.prevExtentMove();
				}
			}
		}
	},{
		xtype:"image",
		src:"resources/images/icons/util_04.png",
		style:"border:solid 1px; border-color: #dbdbdb; cursor:pointer;",
		listeners:{
			el:{
				click: function(){
					
					var coreMap = Ext.getCmp("_mapDiv_");
					coreMap.map.getView().setCenter(coreMap.history[0].center);
					coreMap.map.getView().setResolution(coreMap.history[0].resolution);
					
				}
			}
		}
	},{
		xtype:"image",
		src:"resources/images/icons/util_05.png",
		style:"border:solid 1px; border-color: #dbdbdb; cursor:pointer;",
		listeners:{
			el:{
				click:function(){
					var coreMap = Ext.getCmp("_mapDiv_");
					
					var baseZoom = coreMap.map.getView().getZoom();
					baseZoom = baseZoom+1;
					
					coreMap.map.getView().setZoom(baseZoom);
					
				}
			}
		}
	},{
		xtype:"image",
		src:"resources/images/icons/util_06.png",
		style:"border:solid 1px; border-color: #dbdbdb; cursor:pointer;",
		listeners:{
			el:{
				click:function(){
					var coreMap = Ext.getCmp("_mapDiv_");
					
					var baseZoom = coreMap.map.getView().getZoom();
					baseZoom = baseZoom-1;
					coreMap.map.getView().setZoom(baseZoom)
				}
			}
		}
	},{
		xtype:"image",
		src:"resources/images/icons/util_07.png",
		style:"border:solid 1px; border-color: #dbdbdb; cursor:pointer;",
		width:27,
		height:27,
		listeners:{
			el:{
				click:function(){
					
					var dragPan = new ol.interaction.DragPan();
					var coreMap = Ext.getCmp("_mapDiv_");
					
					coreMap.map.getInteractions().forEach(function(interaction) {
						if (interaction instanceof ol.interaction.DragPan) {
						    interaction.setActive(false);
						}
					}, this);
				}
			}
		}
	}/*,{
		xtype:'splitbutton',
		text:'배경지도',
		height:28,
		menu: [{
			xtype: 'menucheckitem',
			text: 'Road Map',
			id:"baseMap",
			checked:true,
			handler:function(con){
				var map = Ext.getCmp("_mapDiv_");
				map.baseMapLayers[0].setVisible(false);
				map.baseMapLayers[1].setVisible(true);

				var checkMap = Ext.getCmp("aerialMap");
				if(checkMap.checked==true){
					checkMap.setChecked(false);
				}

				if(con.checked==false){
					con.setChecked(true);
				}
			}
		},{
			xtype: 'menucheckitem',
			text: 'Aerial Map',
			id:"aerialMap",
			handler:function(con){
				var map = Ext.getCmp("_mapDiv_");
				map.baseMapLayers[0].setVisible(true);
				map.baseMapLayers[1].setVisible(false);

				var checkMap = Ext.getCmp("baseMap");
				if(checkMap.checked==true){
					checkMap.setChecked(false);
				}

				if(con.checked==false){
					con.setChecked(true);
				}
			}
		}]
	}*/]
});