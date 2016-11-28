Ext.define("InAcc.view.west.search.SearchAddressNum", {
	
	extend: "Ext.panel.Panel",
	
	xtype: "inacc-west-search-SearchAddressNum",

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
    	fieldLabel: '건물번호',
    	width: 200,
    	disabled:true
    }]
});