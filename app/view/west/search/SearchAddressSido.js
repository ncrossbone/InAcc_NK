Ext.define("InAcc.view.west.search.SearchAddressSido", {
	
	extend: "Ext.panel.Panel",
	
	xtype: "inacc-west-search-SearchAddressSido",

    layout :{
    	type:"hbox"
    },
    width: "100%",
    height: "100%",
    items:[{
    	xtype:"container",
    	width:30
    },{
    	xtype:"label",
    	text:"시도"
    },{
    	xtype:"container",
    	width:50
    },{
    	xtype:"combo",
    	width: 100,
    	editable: false
    }]
});