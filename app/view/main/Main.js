Ext.define("InAcc.view.main.Main", {
	
	extend: "Ext.panel.Panel",
	
	/*requires: ["InAcc.view.west.WestContainer",
	           "InAcc.view.map.CoreMap",
	           "InAcc.view.north.NorthContainer"],*/
	           
	requires: ["InAcc.view.west.WestContainer",
	           "InAcc.view.map.CoreMap",
	           "InAcc.view.center.CenterContainer"],
	
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
		xtype: "inacc-centercontainer"
	}],
	
	initComponent: function(){
		
		this.callParent();
		this.setWidth(Ext.getBody().getWidth());
		this.setHeight(Ext.getBody().getHeight());
	}
});