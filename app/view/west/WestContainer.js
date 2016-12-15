Ext.define("InAcc.view.west.WestContainer", {
	
	extend: "Ext.TabPanel",
	xtype: "inacc-westcontainer",
    collapsible: true,
    collapseDirection: 'left',
    width: 330,
    style:"border-right:solid 8px #ede5dc;",
    
   
    requires: ["InAcc.view.west.WestLayerTab",
               "InAcc.view.west.WestMoveTab"],
    tabBarPosition: 'top',
	
    defaults: {
        styleHtmlContent: true
    },
    
    items:[{
    	xtype:"inacc-westlayertab"
    },{
    	xtype:"inacc-westmovetab"
    }],
    
    initComponent: function(){
    	
    	this.callParent();
    	this.setHeight(Ext.getBody().getHeight());
    }
});