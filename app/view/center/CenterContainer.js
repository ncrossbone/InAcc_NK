Ext.define("InAcc.view.center.CenterContainer", {

	extend: "Ext.ButtonGroup",

	xtype: "inacc-centercontainer",
	title:"Map Controller",
	closable:true,
	draggable:true,
	closable:false,
	x:1000,
	y:70,
	width:250,
	height:72,
	bodyStyle:{"background-color": "#ececec"},

	items:[{
		xtype:"image",
		src:"resources/images/icons/util_01.png",
		style:"border:solid 1px; border-color: #dbdbdb; argin-top:1px;"
	},{
		xtype:"image",
		src:"resources/images/icons/util_02.png",
		style:"border:solid 1px; border-color: #dbdbdb; argin-top:1px;"
	},{
		xtype:"image",
		src:"resources/images/icons/util_03.png",
		style:"border:solid 1px; border-color: #dbdbdb; argin-top:1px;"
	},{
		xtype:"image",
		src:"resources/images/icons/util_04.png",
		style:"border:solid 1px; border-color: #dbdbdb; argin-top:1px;"
	},{
		xtype:"image",
		src:"resources/images/icons/util_05.png",
		style:"border:solid 1px; border-color: #dbdbdb; argin-top:1px;"
	},{
		xtype:"image",
		src:"resources/images/icons/util_06.png",
		style:"border:solid 1px; border-color: #dbdbdb; argin-top:1px;"
	},{
		xtype:"image",
		src:"resources/images/icons/util_07.png",
		style:"border:solid 1px; border-color: #dbdbdb; margin-top:1px;",
		width:27,
		height:27
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