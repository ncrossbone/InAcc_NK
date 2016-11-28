Ext.define("InAcc.view.west.search.SearchAddressSigungu", {
	
	extend: "Ext.panel.Panel",
	
	xtype: "inacc-west-search-SearchAddressSigungu",

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
    	text:"시군구"
    },{
    	xtype:"container",
    	width:37
    },{
    	xtype:"combo",
    	width: 100,
    	editable: false
    }]
});