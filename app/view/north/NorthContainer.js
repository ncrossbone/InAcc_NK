Ext.define("InAcc.view.north.NorthContainer", {
	
	extend: "Ext.Panel",
	
	xtype: "inacc-northcontainer",
	
	layout:{
		type:"hbox"
	},
	bodyStyle:{"background-color": "#ececec"},
	border:false,
	height:50,
	items:[{
		xtype:"container",
		width:330
	},{
		xtype: 'combobox',
		labelStyle:"font-weight: bold;",
		style:" margin-top:8px;",
		fieldLabel: "시범지역위치이동",
		labelWidth: 120,
		width:280,
		editable: false
	},{
		xtype:"container",
		width:400
	},{
		xtype:'form',
		reference : 'form',
		layout:{
			type:"hbox"
		},
		bodyStyle:{"background-color": "#ececec"},
		style:"margin-top:5px;",
		items:[{
			xtype:"container",
			width:10,
			height:38
		},{
			xtype:"combobox",
			labelStyle:"font-weight: bold;",
			style:"margin-top:3px;",
			fieldLabel: "시도",
			width:220,
			store: Ext.create('InAcc.store.north.Sido'),
			editable: false
		},{
			xtype:"container",
			width:30
		},{
			xtype:"combobox",
			labelStyle:"font-weight: bold;",
			style:"margin-top:3px;",
			fieldLabel: "시군구",
			width:220,
			editable: false
		},{
			xtype:"container",
			width:50
		},{
			xtype:"button",
			text:"검색",
			style:" margin-top:3px;",
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
		width:100
	}]
});