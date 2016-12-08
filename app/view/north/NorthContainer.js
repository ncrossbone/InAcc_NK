Ext.define("InAcc.view.north.NorthContainer", {
	
	extend: "Ext.Panel",
	
	xtype: "inacc-northcontainer",
	
	layout:{
		type:"hbox"
	},
	bodyStyle:{"background-color": "#ececec"},
	border:false,
	height:70,
	items:[{
		xtype:"container",
		width:330
	},{
		xtype: 'combobox',
		labelStyle:"font-weight: bold;",
		style:" margin-top:18px;",
		fieldLabel: "시범지역위치이동",
		labelWidth: 120,
		width:280,
		editable: false
	},{
		xtype:"container",
		width:350
	},{
		xtype:'form',
		reference : 'form',
		layout:{
			type:"hbox"
		},
		bodyStyle:{"background-color": "#ececec"},
		style:"margin-top:10px;",
		items:[{
			xtype:"container",
			width:10,
			height:48
		},{
			xtype:"combobox",
			labelStyle:"font-weight: bold;",
			style:" margin-top:8px;",
			fieldLabel: "시도",
			width:220,
			editable: false
		},{
			xtype:"container",
			width:30
		},{
			xtype:"combobox",
			labelStyle:"font-weight: bold;",
			style:" margin-top:8px;",
			fieldLabel: "시군구",
			width:220,
			editable: false
		},{
			xtype:"container",
			width:50
		},{
			xtype:"button",
			text:"검색",
			style:" margin-top:8px;",
			width:80,
			handler: function() {
				var searchResultWindow = Ext.create("InAcc.view.south.SouthContainer");
				
				searchResultWindow.show();
				
			}
		},{
			xtype:"container",
			width:10
		}]
	},{
		xtype:"container",
		width:220
	},{
		xtype:"buttongroup",
		
		width:"auto",
		bodyStyle:{"background-color": "#ececec"},
		style:" margin-top:9px;",
		items:[{
			xtype:'splitbutton',
			text:'View',
			menuAlign: 'tr-br',
			menu: {
				items: [{
					text: 'Base Map',
					iconCls: 'nav',
					menu:[{
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
				},{
					xtype: 'menucheckitem',
					text: 'Map Controller',
					checked:true,
					handler:function(con){
					
					}
				},{
					xtype: 'menucheckitem',
					text: 'Zoom Bar',
					checked:true,
					handler:function(con){
					
					}
				}]
			}

		}]
	}]
});