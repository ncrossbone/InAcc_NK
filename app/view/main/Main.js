Ext.define("InAcc.view.main.Main", {
	
	extend: "Ext.panel.Panel",
	
	requires: ["InAcc.view.west.WestContainer",
	           "InAcc.view.map.CoreMap"],
	
	xtype: "inacc-main",
	
	title: "panel test",
	
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
		
		console.info(Ext.getBody().getWidth());
		console.info(Ext.getBody().getHeight());
		this.setWidth(Ext.getBody().getWidth());
		this.setHeight(Ext.getBody().getHeight());
	}
});