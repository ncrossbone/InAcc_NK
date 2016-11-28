Ext.define("InAcc.view.west.LayerTab", {
	
	extend: "Ext.panel.Panel",
	
	xtype: "inacc-layertab",
	requires: ["InAcc.view.west.layer.Layer"],
    width: "100%",
    height: "100%",
    
    title: "주제도",
    items:[{
    	xtype:"inacc-west-layer-Layer"
    }]
});