Ext.define("InAcc.view.west.SearchTab", {
	
	extend: "Ext.panel.Panel",
	
	xtype: "inacc-searchtab",
	
	requires: ["InAcc.view.west.search.SearchCondition",
			   "InAcc.view.west.search.SearchAddressSido",
		       "InAcc.view.west.search.SearchAddressSigungu",
		       "InAcc.view.west.search.SearchAddressDong",
		       "InAcc.view.west.search.SearchAddressDoro",
		       "InAcc.view.west.search.SearchAddressRi",
		       "InAcc.view.west.search.SearchAddressNum",
		       "InAcc.view.west.search.SearchAddressJibun"],
        
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
	},{
		xtype: 'container',
		height: 10,
		border:false
	},{
		xtype: "inacc-west-search-SearchAddressDong",
		id:"SearchAddressDong",
		border:false
	},{
		xtype: "inacc-west-search-SearchAddressDoro",
		id:"SearchAddressDoro",
		border:false,
		hidden:true
	},{
		xtype: 'container',
		height: 10,
		border:false
	},{
		xtype: "inacc-west-search-SearchAddressRi",
		id:"SearchAddressRi",
		border:false
	},{
		xtype: "inacc-west-search-SearchAddressNum",
		id:"SearchAddressNum",
		border:false,
		hidden:true
	},{
		xtype: 'container',
		height: 10,
		border:false
	},{
		xtype: "inacc-west-search-SearchAddressJibun",
		id:"SearchAddressJibun",
		border:false
	},{
		xtype: 'container',
		height: 10,
		border:false
	},{
		xtype:'button',
		style:'margin-left:120px;',
		width:60,
		text:'검색',
		handler: function() {
			var searchAddressResult = Ext.getCmp("SearchAddressResult");
			searchAddressResult.setVisible(true);
		}
	},{
		xtype: 'container',
		height: 10,
		border:false
	}]
});