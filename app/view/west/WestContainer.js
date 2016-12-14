Ext.define("InAcc.view.west.WestContainer", {
	
	extend: "Ext.TabPanel",
	xtype: "inacc-westcontainer",
    collapsible: true,
    collapseDirection: 'left',
    width: 330,
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
    border:false,
    initComponent: function(){
    	
    	this.callParent();
    	this.setHeight(Ext.getBody().getHeight());
    }
});