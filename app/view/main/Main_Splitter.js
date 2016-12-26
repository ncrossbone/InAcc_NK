Ext.define("InAcc.view.main.Main_Splitter", {
	
	extend: "Ext.panel.Panel",
	
	requires: ["InAcc.view.main.Main_Splitter_Left",
	           "InAcc.view.main.Main_Splitter_Right"],
	
	xtype: "inacc-main-splitter",
	
	title: "테스트",
	
	layout: {
		type: "border"
	},
	
	defaults: {
		split: true
	},
	
	//width: 1000,
	//height: 500,
	
	items: [{
		xtype: "inacc-main-splitter-left",
		width: "100%",
		region: "west"
	},{
		xtype: "inacc-main-splitter-right",
		width: "55%",
		region: "east"
	}]
});