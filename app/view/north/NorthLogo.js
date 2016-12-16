Ext.define("InAcc.view.north.NorthLogo", {
	
	extend: "Ext.Panel",
	
	xtype: "inacc-northlogo",
	
	layout:{
		type:"hbox"
	},
	bodyStyle:{"background-color": "#ececec"},
	border:false,
	height:65,
	width:350,
	items:[{
		xtype:"label",
		text:"로고"
	}]
});