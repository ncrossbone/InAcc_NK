Ext.define("InAcc.view.west.WestLayerTab", {

	extend: "Ext.Panel",
	xtype: "inacc-westlayertab",
	layout:{
		type:'accordion'
	},
	id: "westLayerTab",
	linkedLayerId: "Layer_",
	border:false,
	title:"주제도",
	bodyStyle:"background-color:#f6f6f6;",
	setChecked: function(parentNode, chkNode, checked){
		
		console.info(parentNode);
		console.info(chkNode);
		
		if(parentNode.id == chkNode.id){
		
			if(parentNode.childNodes.length > 0){
				
				for(var i = 0; i < parentNode.childNodes.length; i++){
					
					parentNode.childNodes[i].set('checked', chkNode.data.checked);
					this.setChecked(parentNode.childNodes[i], chkNode, chkNode.data.checked);
				}
			}
			this.setChecked(parentNode, chkNode, true);
		}
		else{
			
			if(parentNode.childNodes.length > 0){
				
				for(var i = 0; i < parentNode.childNodes.length; i++){
					
					this.setChecked(parentNode.childNodes[i], chkNode);
				}
			}
		}
		
		if(parentNode.childNodes.length != 0){
			
			var nodes = parentNode.childNodes;
			
			for(var i = 0; i < nodes.length; i++){
				
				if(nodes[i].childNodes.length > 0){
					
					this.setChecked(nodes[i]);
				}
				console.info(nodes[i].id);
				console.info(chkNode.id);
				//if(nodes[i])
				
				/*if(node.data.checked==false){
					node.childNodes[i].set('checked',false);
					dLayer.layerOff(node.childNodes[i].id);
				}else{
					node.childNodes[i].set('checked',true);
					dLayer.layerOn(node.childNodes[i].id);
				}*/
			}
		}/*else{
			if(node.data.checked==false){
				dLayer.layerOff(node.id);
			}else{
				dLayer.layerOn(node.id);
			}
		}*/
	},
	items:[{
		title:"<img src='./resources/images/design/icon_folder_close.png'/> 실태DB",
		xtype:"treepanel",
		scroll: false,
		viewConfig: {
			style: { overflow: 'auto', overflowX: 'hidden' }
		},
		store: Ext.create('InAcc.store.west.WestTree1'),
		rootVisible: false,
		useArrows: false,
		lines:false,
		border: 0,
		bufferedRenderer: false,
		listeners: {
			checkchange:function(node){
				
				var layerTab = this.up("inacc-westlayertab");
				//var rootNode = layerTab.items.items[0].items.items[0].node
				//console.info(layerTab.items.items[0].items.items[0].node);
				//console.info(layerTab.items.items[1].items.items[0].node);
				//console.info(this);
				var rootNode = this.items.items[0].node
				
				//layerTab.setChecked(rootNode, node);
				
				var linkedLayerId = this.up("inacc-westlayertab").linkedLayerId;
				var dLayer = Ext.getCmp(linkedLayerId);
//console.info(dLayer);
				if(node.childNodes.length!=0){
					for(var i = 0; i < node.childNodes.length; i++){
						if(node.data.checked==false){
							node.childNodes[i].set('checked',false);
							dLayer.layerOff(node.childNodes[i].id);
						}else{
							node.childNodes[i].set('checked',true);
							dLayer.layerOn(node.childNodes[i].id);
						}
					}
				}else{
					if(node.data.checked==false){
						dLayer.layerOff(node.id);
					}else{
						dLayer.layerOn(node.id);
					}
				}
			}
		}
	},{
		title:"<img src='./resources/images/design/icon_folder_close.png'/> 수집DB",
		xtype:"treepanel",
		scroll: false,
		viewConfig: {
			style: { overflow: 'auto', overflowX: 'hidden' }
		},
		store: Ext.create('InAcc.store.west.WestTree2'),
		rootVisible: false,
		useArrows: true,
		lines:false,
		border: 0,
		bufferedRenderer: false,
		listeners: {
			checkchange:function(node){
				var dLayer = Ext.getCmp("Layer_");
				
				if(node.data.checked==false){
					dLayer.layerOff(node.id);
				}else{
					dLayer.layerOn(node.id);
				}
			}
		}
	},{
		title:"<img src='./resources/images/design/icon_folder_close.png'/> 기본공간정보",
		xtype:"treepanel",
		scroll: false,
		viewConfig: {
			style: { overflow: 'auto', overflowX: 'hidden' }
		},
		store: Ext.create('InAcc.store.west.WestTree3'),
		rootVisible: false,
		useArrows: true,
		lines:false,
		border: 0,
		bufferedRenderer: false,
		listeners: {
			checkchange:function(node){

				var dLayer = Ext.getCmp("Layer_");

					if(node.data.checked==false){
						dLayer.layerOff(node.id);
					}else{
						dLayer.layerOn(node.id);
					}
			}
		}

	},{
		title:"<img src='./resources/images/design/icon_folder_close.png'/> 행정구역별통계",

		xtype:"treepanel",
		scroll: false,
		viewConfig: {
			style: { overflow: 'auto', overflowX: 'hidden' }
		},
		store: Ext.create('InAcc.store.west.WestTree4'),
		rootVisible: false,
		useArrows: true,
		lines:false,
		border: 0,
		bufferedRenderer: false,
		listeners: {
			checkchange:function(node){

				var dLayer = Ext.getCmp("Layer_");

				
					if(node.data.checked==false){
						dLayer.layerOff(node.id);
					}else{
						dLayer.layerOn(node.id);
					}
			}
		}
	},{
		title:"<img src='./resources/images/design/icon_folder_close.png'/> 영상지도",
		xtype:"treepanel",
		scroll: false,
		viewConfig: {
			style: { overflow: 'auto', overflowX: 'hidden' }
		},
		store: Ext.create('InAcc.store.west.WestTree5'),
		rootVisible: false,
		useArrows: true,
		lines:false,
		border: 0,
		bufferedRenderer: false,
		listeners: {
			checkchange:function(node){
				/*var coreMap = Ext.getCmp("_mapDiv_");
				
				var layer = new ol.layer.Tile({
					source: new ol.source.TileWMS({
						url: 'http://202.68.238.120:8880/geonuris/wms?GDX=NK_Test_2.xml',
						params : {
			            	 LAYERS : "suj_C3.tif.prmd",
			                 CRS : "EPSG:5179",
			                 format : 'image/png',
			                 bgcolor : '0xffffff', 
			                 exceptions : 'BLANK',
			                 label : 'HIDE_OVERLAP',
			                 graphic_buffer : '64',
			                 ANTI : 'true',
			                 TEXT_ANTI : 'true'
			             }
						//serverType: 'geoserver'
					})
				})
				
				
				
				
				coreMap.map.addLayer(layer);
				layer.setVisible(true);*/
			
				/*var wmsSource = new ol.source.TileWMS({
		            url : serviceUrl,
		            params : {
		                LAYERS : 'ROOT',
		                CRS : mapCRS,
		                format : 'image/png',
		                bgcolor : '0xffffff', 
		                exceptions : 'BLANK',
		                label : 'HIDE_OVERLAP',
		                graphic_buffer : '64',
		                ANTI : 'true',
		                TEXT_ANTI : 'true'
		            }
		        });*/
			}
		}
	},{
		title:"<img src='./resources/images/design/icon_folder_close.png'/> 주제도",
		xtype:"treepanel",
		scroll: false,
		viewConfig: {
			style: { overflow: 'auto', overflowX: 'hidden' }
		},
		store: Ext.create('InAcc.store.west.WestTree6'),
		rootVisible: false,
		useArrows: true,
		lines:false,
		border: 0,
		bufferedRenderer: false,
		listeners: {
			checkchange:function(node){

				var dLayer = Ext.getCmp("Layer_");

				
					if(node.data.checked==false){
						dLayer.layerOff(node.id);
					}else{
						dLayer.layerOn(node.id);
					}
			}
		}
	}/*,{
		title:"<img src='./resources/images/design/icon_folder_close.png'/> POI조회",
		items:[{
			xtype:"container",
			height:10
		},{
			xtype:"panel",
			title:"Vworld POI 검색",
			border: false,
			layout:{
				type:'hbox'
			},
			items:[{
				xtype:"textfield"
			},{
				xtype:"button",
				text:"검색"
			}]
		},{
			xtype:"container",
			height:10
		},{
			xtype:"panel",
			title:"구축Data 통합명칭 검색",
			border: false,
			layout:{
				type:'hbox'
			},
			items:[{
				xtype:"textfield"
			},{
				xtype:"button",
				text:"검색"
			}]

		}]
	}*/]
});