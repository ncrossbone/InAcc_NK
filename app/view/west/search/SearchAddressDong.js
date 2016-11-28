Ext.define("InAcc.view.west.search.SearchAddressDong", {
	
	extend: "Ext.panel.Panel",
	
	xtype: "inacc-west-search-SearchAddressDong",

    layout :{
    	type:"hbox"
    },
    width: "100%",
    height: "100%",
    items:[{
    	xtype:"container",
    	width:50
    },{
    	xtype:"combo",
    	fieldLabel:'읍면동',
    	width: 200,
    	editable: false,
    	disabled:true
    }]
});