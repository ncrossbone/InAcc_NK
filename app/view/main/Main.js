Ext.define("InAcc.view.main.Main", {
	
	extend: "Ext.panel.Panel",
	
	/*requires: ["InAcc.view.west.WestContainer",
	           "InAcc.view.map.CoreMap",
	           "InAcc.view.north.NorthContainer"],*/
	           
	requires: ["InAcc.view.west.WestContainer",
	           "InAcc.view.map.CoreMap",
	           "InAcc.view.north.NorthContainer",
	           "InAcc.view.north.NorthLogo",
	           "InAcc.view.center.CenterContainer"],
	
	xtype: "inacc-main",
	
	title: "",
	
	layout: {
		type: "absolute"
	},
	items: [/*{
		xtype: "inacc-coremap"
	},{
		xtype:"inacc-northcontainer"
	},{
		xtype: "inacc-westcontainer"
	},*/{
		xtype: "inacc-coremap"
	},{
		xtype: "inacc-westcontainer"
	},{
		xtype: "inacc-northcontainer"
	},{
		xtype: "inacc-northlogo"
	},{
		xtype:"inacc-centercontainer"
	}],
	
	initComponent: function(){
		
		this.callParent();
		this.setWidth(Ext.getBody().getWidth());
		this.setHeight(Ext.getBody().getHeight());
		Ext.EventManager.onWindowResize( this.onBrowserResize, this );
	},
	
	
	onBrowserResize: function( width, height ) {
		
		var WestContainer = Ext.getCmp("westcontainer");
		
		var coreMap = Ext.getCmp("_mapDiv_");
		
		this.setWidth(width);
		this.setHeight(height);
		
		WestContainer.setHeight(height - 65);
		coreMap.map.updateSize();
		
		
		var sanjiWindow = Ext.ComponentQuery.query("#sanjiWindow")[0];
		var saneobWindow = Ext.ComponentQuery.query("#saneobWindow")[0];
		var hwanWindow = Ext.ComponentQuery.query("#hwanWindow")[0];
		var bldgityhWindow = Ext.ComponentQuery.query("#bldgityhWindow")[0];
		var nongjiWindow = Ext.ComponentQuery.query("#nongjiWindow")[0];
		var southContainer = Ext.ComponentQuery.query("#southContainer")[0];
		
		if(sanjiWindow != undefined){
			sanjiWindow.setX(width - sanjiWindow.width);
		}

		if(saneobWindow != undefined){
			saneobWindow.setX(width - saneobWindow.width);
		}

		if(hwanWindow !=undefined){
			hwanWindow.setX(width - hwanWindow.width);
		}

		if(bldgityhWindow !=undefined){
			bldgityhWindow.setX(width - bldgityhWindow.width);
		}

		if(nongjiWindow !=undefined){
			nongjiWindow.setX(width - nongjiWindow.width);
		}
		
		if(southContainer !=undefined){
			southContainer.setWidth(width - 350);
			southContainer.setX(width - southContainer.width);
			southContainer.setY(height - southContainer.height);
		}
		
	}
});