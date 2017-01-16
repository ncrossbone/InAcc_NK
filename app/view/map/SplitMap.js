Ext.define("InAcc.view.map.SplitMap", {
	
	extend: "Ext.container.Container",
	
	requires: ["InAcc.view.map.CoreMap"],
	
	xtype: "inacc-splitMap",
	
	//title: "분할 맵",
	//header: false,
	
	layout: {
		type: "border"
	},
	
	defaults: {
		split: true
	},
	
	style: {
		"z-index": -1
	},
	
	width: "100%",
	height: "100%",
	
	items: [{
		xtype: "inacc-coremap",
		id: "_mapDiv_",
		width: "100%",
		height: "100%",
		region: "center"
	},{
		xtype: "inacc-coremap",
		id: "_mapDiv_east",
		width: "50%",
		height: "100%",
		region: "east"
	}]
});