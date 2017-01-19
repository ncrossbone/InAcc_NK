Ext.define("InAcc.view.main.Main_Splitter_Right", {
	
	extend: "Ext.panel.Panel",
	
	/*requires: ["InAcc.view.west.WestContainer",
	           "InAcc.view.map.CoreMap",
	           "InAcc.view.north.NorthLogo",
	           "InAcc.view.north.NorthContainer",
	           "InAcc.view.center.CenterContainer"],*/
	
	xtype: "inacc-main-splitter-right",
	
	title: "",
	
	layout: {
		type: "absolute"
	},
	
	/*items: [{
		xtype: "inacc-coremap",
		id: "_mapDiv_right"
	}]*/
	
	items: [{
		xtype: "panel",
		title: "right panel"
	}]
});