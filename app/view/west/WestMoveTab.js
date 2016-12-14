Ext.define("InAcc.view.west.WestMoveTab", {
	
	extend: "Ext.Panel",
	
	xtype: "inacc-westmovetab",
	title:"이동",
	layout:{
		type:"vbox"
	},
	//bodyStyle:{"background-color": "#ececec"},
	border:false,
	height:70,
	items:[{
		xtype:"panel",
		title:"시범지역위치이동",
		width:330,
		style:" margin-top:50px;",
		items:[{
			xtype: 'combobox',
			labelStyle:"font-weight: bold;",
			style:" margin-top:20px; margin-left:25px;",
			fieldLabel: "시범지역위치이동",
			labelWidth: 120,
			width:280,
			editable: false
		}]
	},{
		xtype:'form',
		reference : 'form',
		style:" margin-top:100px;",
		title:"행정구역이동",
		width:330,
		layout:{
			type:"vbox"
		},
		//bodyStyle:{"background-color": "#ececec"},
		//style:"margin-top:10px;",
		items:[{
			xtype:"combobox",
			labelStyle:"font-weight: bold;",
			style:" margin-top:20px; margin-left:50px;",
			fieldLabel: "시도",
			width:220,
			editable: false
		},{
			xtype:"combobox",
			labelStyle:"font-weight: bold;",
			style:" margin-top:10px; margin-left:50px;",
			fieldLabel: "시군구",
			width:220,
			editable: false
		},{
			xtype:"button",
			text:"이동",
			style:" margin-top:20px; margin-left:120px; margin-bottom:10px;",
			width:80,
			handler: function() {
				var searchResultWindow = Ext.create("InAcc.view.south.SouthContainer");
				
				searchResultWindow.show();
				
			}
		}]
	}/*{
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
	}*/]
});