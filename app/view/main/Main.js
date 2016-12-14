Ext.define("InAcc.view.main.Main", {
	
	extend: "Ext.panel.Panel",
	
	/*requires: ["InAcc.view.west.WestContainer",
	           "InAcc.view.map.CoreMap",
	           "InAcc.view.north.NorthContainer"],*/
	           
	requires: ["InAcc.view.west.WestContainer",
	           "InAcc.view.map.CoreMap"],
	
	xtype: "inacc-main",
	
	title: "",
	
	layout: {
		type: "absolute"
	},
	
	items: [/*{
		xtype: "inacc-coremap"
	},{
		xtype:"inacc-northcontainer"
	},{
		xtype: "inacc-westcontainer"
	},*/{
		xtype: "inacc-coremap"
	},{
		xtype: "inacc-westcontainer"
	},{
		xtype:"buttongroup",
		title:"Map Controller",
		closable:true,
		//draggable:true,
		x:1710,
		y:70,
		width:210,
		height:70,
		bodyStyle:{"background-color": "#ececec"},
		items:[{
			xtype:"image",
			src:"resources/images/icons/util_01.png",
			style:"border:solid 1px; border-color: gray;"
		},{
			xtype:"image",
			src:"resources/images/icons/util_02.png",
			style:"border:solid 1px; border-color: gray;"
		},{
			xtype:"image",
			src:"resources/images/icons/util_03.png",
			style:"border:solid 1px; border-color: gray;"
		},{
			xtype:"image",
			src:"resources/images/icons/util_04.png",
			style:"border:solid 1px; border-color: gray;"
		},{
			xtype:"image",
			src:"resources/images/icons/util_05.png",
			style:"border:solid 1px; border-color: gray;"
		},{
			xtype:"image",
			src:"resources/images/icons/util_06.png",
			style:"border:solid 1px; border-color: gray;"
		}]
	}],
	
	initComponent: function(){
		
		this.callParent();
		this.setWidth(Ext.getBody().getWidth());
		this.setHeight(Ext.getBody().getHeight());
	}
});