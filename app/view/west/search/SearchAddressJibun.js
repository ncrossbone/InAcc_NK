Ext.define("InAcc.view.west.search.SearchAddressJibun", {
	
	extend: "Ext.panel.Panel",
	
	xtype: "inacc-west-search-SearchAddressJibun",

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
    	fieldLabel: '지번',
    	width: 200,
    	disabled:true
    }]
});