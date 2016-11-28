Ext.define("InAcc.view.west.search.SearchAddressDoro", {
	
	extend: "Ext.panel.Panel",
	
	xtype: "inacc-west-search-SearchAddressDoro",

    layout :{
    	type:"hbox"
    },
    width: "100%",
    height: "100%",
    items:[{
    	xtype:"container",
    	width:50
    },{
    	xtype:"textfield",
    	fieldLabel: '도로명',
    	width: 200,
    	disabled:true
    }]
});