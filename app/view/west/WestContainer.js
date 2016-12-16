Ext.define("InAcc.view.west.WestContainer", {
	
	extend: "Ext.TabPanel",
	xtype: "inacc-westcontainer",
    collapsible: true,
    collapseDirection: 'left',
    headerPosition: 'right',
    
	style:"margin-top:65px;",
    header:{
    	width:8,
    	style:"background-color : #ede5dc; border-color: #ede5dc;",
    	titlePosition:1
    },
    id: "westcontainer",
    width: 350,
    border:false,
    //header: false,
    //style:"border-right:solid 8px #ede5dc;",
    
   
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
    	this.setHeight(Ext.getBody().getHeight()-65);
    },
    
    listeners:{
    	collapse:{
    		fn: function(el){
    			Ext.get("westcontainer_header-innerCt").setStyle("background","url('./resources/images/button/btn_arrow_open.png') no-repeat");
    			
    		}
    	},
    	expand:{
    		fn: function(el){

    			Ext.get("westcontainer_header-innerCt").setStyle("background","url('./resources/images/button/btn_arrow_close.png') no-repeat");
    		}
    	}
    }
});