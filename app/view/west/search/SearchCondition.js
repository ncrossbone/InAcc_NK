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
		style: "margin-top: 4px; margin-left: 70px;",
		listeners:{
			change:{
				fn:function(field,newValue,oldValue,options){
					//var rb = newValue.rb;
					
					var searchAddress = [];
					searchAddress[0] = Ext.getCmp("SearchAddressDong");
					searchAddress[1] = Ext.getCmp("SearchAddressDoro");
					searchAddress[2] = Ext.getCmp("SearchAddressRi");
					searchAddress[3] = Ext.getCmp("SearchAddressNum");
					searchAddress[4] = Ext.getCmp("SearchAddressJibun");
					
					for(var i = 0; i < searchAddress.length; i++){
						if(searchAddress[i].isVisible()==true){
							searchAddress[i].setVisible(false);
						}else{
							searchAddress[i].setVisible(true);
						}
					}
				}
			}
		},
		items:[{
			boxLabel: '지번', 
			name: 'rb', 
			inputValue: '1', 
			checked: true,
			width:80,
			
		},{
			xtype: "container",
			width: 10
		},{
			boxLabel: '도로명', 
			name: 'rb', 
			inputValue: '2',
			width:80
		}]
	}]
});