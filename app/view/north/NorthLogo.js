Ext.define("InAcc.view.north.NorthLogo", {
	
	extend: "Ext.Panel",
	
	xtype: "inacc-northlogo",
	
	bodyStyle: "background:url('./resources/images/design/top_left_bg.gif') !important",
	border:false,
	height:65,
	width:350,
	items:[{
		xtype:"container",
		width:20
	},{
		xtype:"image",
		src:"./resources/images/design/logo_new.png",
		style:"margin-top:13px; margin-left:20px;",
		width:300
	}]
});