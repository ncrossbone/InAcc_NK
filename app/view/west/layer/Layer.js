Ext.define("InAcc.view.west.layer.Layer", {
	
	extend: "Ext.panel.Panel",
	
	xtype: "inacc-west-layer-Layer",

    layout :{
    	type:"hbox"
    },
    width: "100%",
    height: 400,
    items:[{
    	
    	title:"주제도 선택",
    	xtype: 'treepanel',
		store: Ext.create('InAcc.store.west.Layer')
    }]
});