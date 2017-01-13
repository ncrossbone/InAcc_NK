Ext.define("InAcc.view.main.Main", {
	
	extend: "Ext.panel.Panel",
	
	/*requires: ["InAcc.view.west.WestContainer",
	           "InAcc.view.map.CoreMap",
	           "InAcc.view.north.NorthContainer"],*/
	           
	requires: ["InAcc.view.west.WestContainer",
	           "InAcc.view.map.CoreMap",
	           "InAcc.view.north.NorthContainer",
	           "InAcc.view.north.NorthLogo",
	           "InAcc.view.center.CenterContainer",
	           "InAcc.view.west.WestLayerTab"],
	
	xtype: "inacc-main",
	
	id: "main",
	
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
		console.info(width);
		var WestContainer = Ext.getCmp("westcontainer");
		
		var coreMap = Ext.getCmp("_mapDiv_");
		
		this.setWidth(width);
		this.setHeight(height);
		
		WestContainer.setHeight(height - 65);
		coreMap.map.updateSize();
		var slider = Ext.ComponentQuery.query("#slider")[0];
		
		if(width<1280){
			
			slider.hide();
			//console.info(slider.isVisible(false));
		}else{
			slider.show();
			
		}
		
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
		
	},
	onSplitMapClick: function(){
		
		//console.info(this);
		//console.info(this.query("#_mapDiv_")[0]);
		//console.info(this.down("inacc-coremap"));
		
		//var coreMap = this.down("inacc-coremap");
		var coreMap = Ext.getCmp("_mapDiv_");
		
		var preLayers = coreMap.map.getLayers();
		//console.info(preLayers);
		var extent = coreMap.map.getView().calculateExtent(coreMap.map.getSize());
		//console.info(extent);
		var zoom = coreMap.map.getView().getZoom();
		//console.info(zoom);
		var center = coreMap.map.getView().getCenter();
		//console.info(center);
		var resolution = coreMap.map.getView().getResolution();
		console.info(resolution);
		console.info(coreMap.map.getSize());
		
		//this.removeAll();
		this.remove(coreMap);
		
		var contWidth = Ext.getBody().getWidth();
		var contHeight = Ext.getBody().getHeight();
		
		var splitMapMain = Ext.create("Ext.container.Container", {
			
			width: contWidth,
			height: contHeight,
			layout: {
				type: "absolute"
			}
		});
		
		var splitMapContainer = Ext.create("Ext.panel.Panel", {
			
			width: contWidth,
			height: contHeight,
			//title: "split test",
			header: false,
			defaults: {
				split: true
			},
			layout: {
				type: "border"
			},
			style: {
				"z-index": -2
			}
		});
		
		var eastLayerPanel = Ext.create("InAcc.view.west.WestLayerTab", {
			//id: "eastLayer",
			//collapsible: true,
		    //collapseDirection: 'top',
			id: "eastLayerTab",
			linkedLayerId: "Layer_East",
		    headerPosition: 'top',
			width: 350,
			height: 700,
			x: Ext.getBody().getWidth() - 350,
			y: 30,
			floating: true,
			draggable: true
		}).show();
		
		splitMapMain.add(splitMapContainer);
		splitMapMain.add(eastLayerPanel);
		
		var splitMapLeft = Ext.create("InAcc.view.map.CoreMap", {
			id: "_mapDiv_",
			map:null,
			baseMapLayers: [],
			//baseMapGroup:"",
			history :[],
			history_now :-1,
			click : false,
			delay :350
		});
		
		var panelWest = Ext.create("Ext.panel.Panel", {
			//title: "panel1",
			header: false,
			height: "100%",
			width: "50%",
			region: "center",
			listeners: {
				resize: function(){
					//console.info("aa");
					
					var coreMap = this.down("inacc-coremap");
					//console.info(coreMap);
					//console.info(coreMap.map.updateSize());
					//coreMap.map.setStyle("width", this.getWidth());
					//console.info(coreMap.map.getSize());
					
					//console.info(this.getWidth());
					//console.info(this.getHeight());
					
					//var extent = coreMap.map.getView().calculateExtent([this.getWidth(), this.getHeight()]);
					//console.info(extent);
					
					//coreMap.map.getView().fit(extent, [this.getWidth(), this.getHeight()]);
					
					//var coreExtent = coreMap.map.getView().calculateExtent(coreMap.map.getSize());
					//var zoom = coreMap.map.getView().getZoom();
					
					//coreMap.map.on('moveend', this.extentChange, coreMap);
				}
			}/*,
			extentChange: function(coreMap){
				//console.info("ldkjf");
				var eastMap = Ext.getCmp("_mapDiv_East");
				console.info(coreMap);
				var extent = coreMap.map.getView().calculateExtent(coreMap.map.getSize());
				var zoom = coreMap.map.getView().getZoom();
				
				console.info(extent);
				console.info(zoom);
				
				eastMap.map.getView().fit(extent, eastMap.map.getSize());
			}*/
		});
		
		panelWest.add(splitMapLeft);
		
		var splitMapRight = Ext.create("InAcc.view.map.CoreMap", {
			id: "_mapDiv_East",
			map:null,
			baseMapLayers: [],
			//baseMapGroup:"",
			history :[],
			history_now :-1,
			click : false,
			delay :350
		});
		
		var panelEast = Ext.create("Ext.panel.Panel", {
			//title: "panel1",
			header: false,
			height: "100%",
			width: "50%",
			region: "east",
			listeners: {
				resize: function(){
					//console.info("bb");
					
					//var coreMap = this.down("inacc-coremap");
					//console.info(coreMap);
					
					//console.info(coreMap.map.getSize());
				}
			}
		});
		
		panelEast.add(splitMapRight);
		
		splitMapContainer.add(panelWest);
		splitMapContainer.add(panelEast);
		
		//this.add(splitMapContainer);
		this.insert(0, splitMapContainer);
		//this.insert(0, splitMapMain);
		
		var leftExtentChange = function(coreMap){
			
			console.info(coreMap);
		}
		
		var me = this;
		
		var timer = setInterval(function(){
			//console.info(splitMapLeft.map);
			
			if(splitMapLeft.map != null){
				
				clearInterval(timer);
				
				splitMapLeft.map.getView().setCenter(center);
				splitMapLeft.map.getView().setZoom(zoom);
				
				var coreMap = Ext.getCmp("_mapDiv_");
				console.info(coreMap);
				
				coreMap.map.on('moveend', me.extentChangeLeft, coreMap);
				
				//splitMapRight.map.getView().setCenter(center);
				//splitMapRight.map.getView().setZoom(zoom);
				
				//console.info(preLayers);
				//console.info(splitMapLeft.map.getLayers());
				//console.info(splitMapRight.map.getLayers());
				
				for(var i = 0; i < preLayers.array_.length; i++){
					
					var layerType = preLayers.array_[i].values_.type;
					
					if(layerType != "base"){
						
						splitMapLeft.map.addLayer(preLayers.array_[i]);
						splitMapRight.map.addLayer(preLayers.array_[i]);
					}
				}
				//splitMapLeft.map.addLayer(layer);
				//var dLayer = Ext.getCmp("Layer_")
				//console.info(dLayer);
			}
		}, 1);
		
		//splitMapLeft.map.getView().setCenter(coreMap.map.getView().getCenter());
		
		/*splitMapContainer.add(splitMapLeft);
		splitMapContainer.add({
			xtype: "panel",
			title: "panel2",
			height: 500,
			width: 500,
			region: "east"
		});
		
		this.add(splitMapContainer);*/
		
		//var splitMap = Ext.create("InAcc.view.main.Main_Splitter");
		//this.add(splitMap);
	},
	extentChangeLeft: function(coreMap){
		
		var eastMap = Ext.getCmp("_mapDiv_East");
		//console.info(coreMap);
		var extent = coreMap.map.getView().calculateExtent(coreMap.map.getSize());
		var zoom = coreMap.map.getView().getZoom();
		var center = coreMap.map.getView().getCenter();
		
		console.info(extent);
		console.info(zoom);
		
		//eastMap.map.getView().fit(extent, eastMap.map.getSize());
		eastMap.map.getView().setCenter(center);
		eastMap.map.getView().setZoom(zoom);
	}
});