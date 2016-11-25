Ext.define("InAcc.view.west.WestContainer", {
	
	extend: "Ext.TabPanel",
	
	xtype: "inacc-westcontainer",
	
	requires: ["InAcc.view.west.LayerTab",
	           "InAcc.view.west.SearchTab"],
	
	tabBarPosition: 'top',

    defaults: {
        styleHtmlContent: true
    },
    
    collapsible: true,
    
    width: 300,

    items: [
        {
            title: '주제도',
            //iconCls: 'home',
            //html: 'Home Screen'
            items: [{
            	xtype: "inacc-layertab"
            }]
        },
        {
            title: '검색',
            items: [{
            	xtype: "inacc-searchtab"
            }]
        }
    ],
    
    initComponent: function(){
    	
    	this.callParent();
    	
    	this.setHeight(Ext.getBody().getHeight());
    }
});