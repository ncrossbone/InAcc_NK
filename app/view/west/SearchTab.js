Ext.define("InAcc.view.west.SearchTab", {
	
	extend: "Ext.panel.Panel",
	
	xtype: "inacc-searchtab",
	
	requires: ["InAcc.view.west.search.SearchCondition",
			   "InAcc.view.west.search.SearchAddressSido",
		       "InAcc.view.west.search.SearchAddressSigungu"],
        
    width: "100%",
    height: "100%",
    title: "",
    
    layout :{
    	type:"vbox"
    },
    
    
	items:[{
		xtype: "inacc-west-search-SearchCondition",
		title:"검색조건",
		border:false
	},{
		xtype: 'container',
		height: 10,
		border:false
	},{
		xtype: "inacc-west-search-SearchAddressSido",
		border:false
	},{
		xtype: 'container',
		height: 10,
		border:false
	},{
		xtype: "inacc-west-search-SearchAddressSigungu",
		border:false
	}]
});