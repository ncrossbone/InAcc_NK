Ext.define("InAcc.view.main.Main", {
	
	extend: "Ext.panel.Panel",
	
	requires: ["InAcc.view.west.WestContainer",
	           "InAcc.view.map.CoreMap"],
	
	xtype: "inacc-main",
	
	title: "",
	
	layout: {
		type: "absolute"
	},
	
	items: [{
		xtype: "inacc-coremap"
	}, {
		xtype: "inacc-westcontainer"
	}],
	
	initComponent: function(){
		
		this.callParent();
		this.setWidth(Ext.getBody().getWidth());
		this.setHeight(Ext.getBody().getHeight());
	}
});