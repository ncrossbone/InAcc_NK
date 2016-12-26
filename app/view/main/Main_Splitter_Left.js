Ext.define("InAcc.view.main.Main_Splitter_Left", {
	
	extend: "Ext.panel.Panel",
	           
	/*requires: ["InAcc.view.west.WestContainer",
	           "InAcc.view.map.CoreMap",
	           "InAcc.view.north.NorthLogo",
	           "InAcc.view.north.NorthContainer",
	           "InAcc.view.center.CenterContainer"],*/
	
	xtype: "inacc-main-splitter-left",
	
	title: "",
	
	/*items: [{
		xtype: "inacc-coremap",
		id: "_mapDiv_left"
	}]*/
	
	items: [{
		xtype: "panel",
		title: "left panel"
	}]
});