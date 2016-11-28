Ext.define("InAcc.view.west.search.SearchAddressRi", {
	
	extend: "Ext.panel.Panel",
	
	xtype: "inacc-west-search-SearchAddressRi",

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
    	fieldLabel:'동리',
    	width: 200,
    	editable: false,
    	disabled:true
    }]
});