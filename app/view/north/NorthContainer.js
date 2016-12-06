Ext.define("InAcc.view.north.NorthContainer", {
	
	extend: "Ext.Panel",
	
	xtype: "inacc-northcontainer",
	
	layout:{
		type:"hbox"
	},
	bodyStyle:{"background-color": "#ececec"},
	border:false,
	height:35,
	items:[{
		xtype:"container",
		width:500
	},{
		xtype: 'combobox',
		editable: false
	},{
		xtype:"container",
		width:200
	},{
		xtype:'form',
		reference : 'form',
		layout:{
			type:"hbox"
		},
		bodyStyle:{"background-color": "#ececec"},
		//style:"margin-top:6px;",
		items:[{
			xtype:"container",
			width:10
			//height:37
		},{
			xtype:"combobox",
			labelStyle:"font-weight: bold;",
			//style:" margin-top:7px;",
			fieldLabel: "시도",
			width:250,
			editable: false
		},{
			xtype:"container",
			width:30
		},{
			xtype:"combobox",
			labelStyle:"font-weight: bold;",
			//style:" margin-top:7px;",
			fieldLabel: "시군구",
			width:250,
			editable: false
		},{
			xtype:"container",
			width:50
		},{
			xtype:"button",
			text:"검색",
			//style:" margin-top:7px;",
			width:60,
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
		width:100
	}/*,{
		xtype:"button",
		text:"일반지도",
		style:" margin-top:13px;",
		width:100
	},{
		xtype:"button",
		text:"위성지도",
		style:" margin-top:13px;",
		width:100
	}*/]
});