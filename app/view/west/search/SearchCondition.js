Ext.define("InAcc.view.west.search.SearchCondition", {
	
	extend: "Ext.panel.Panel",
	
	xtype: "inacc-west-search-SearchCondition",

    layout :{
    	type:"vbox"
    },
    width: "100%",
    height: "100%",
	items:[{
		xtype:"radiogroup",
		vertical:true,
		style:"align: center;",
		style: "margin-top: 4px; margin-left: 50px; font-weight: bold;",
		items:[{
			boxLabel: '지번', 
			name: 'rb', 
			inputValue: '1', 
			checked: true,
			width:80,
			
		},{
			xtype: "container",
			width: 30
		},{
			boxLabel: '도로명', 
			name: 'rb', 
			inputValue: '2',
			width:80
		}]
	}]
});