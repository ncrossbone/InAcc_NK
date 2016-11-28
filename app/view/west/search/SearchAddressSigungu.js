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
    	width:50
    },{
    	xtype:"combo",
    	fieldLabel:"시군구",
    	width: 200,
    	editable: false,
    	disabled:true
    }]
});