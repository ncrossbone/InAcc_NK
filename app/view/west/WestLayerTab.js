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
	setChecked: function(parentNode, chkNode, layerObj){

		if(parentNode.id == chkNode.id){
		
			if(parentNode.childNodes.length > 0){
				
				for(var i = 0; i < parentNode.childNodes.length; i++){
					
					parentNode.childNodes[i].set('checked', chkNode.data.checked);
					this.setChecked(parentNode.childNodes[i], parentNode.childNodes[i], layerObj);
				}
			}
			else{
				
				parentNode.set('checked', chkNode.data.checked);
				
				if(chkNode.data.checked == true){
					
					layerObj.layerOn(parentNode.id);
				}
				else{
					
					layerObj.layerOff(parentNode.id);
				}
			}
		}
		else{
			
			if(parentNode.childNodes.length > 0){
				
				for(var i = 0; i < parentNode.childNodes.length; i++){
					
					this.setChecked(parentNode.childNodes[i], chkNode, layerObj);
				}

			}
		}
	},
	setInitChecked: function(layerObj, ids){
		
		var layerTab = this;
    	var treeCtls = layerTab.items.items;
    	
    	for(var i = 0; i < treeCtls.length; i++){
    		
    		var parentNode = treeCtls[i].items.items[0].node;
    		
    		for(var j = 0; j < ids.length; j++){
    			
    			this.setChecked(parentNode, {id: ids[j], data: {checked: true}}, layerObj);
    		}
    		
    		/*var idIdx = ids.map(function(obj){
    			return obj;
    		}).indexOf(parentNode.id);
    		
    		if(idIdx > -1){
    			
    			console.info(parentNode);
    		}
    		else{
    			
    			
    		}*/
    	}
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
				var parentNode = this.items.items[0].node;
				var layerObj = Ext.getCmp("Layer_");
				
				layerTab.setChecked(parentNode, node, layerObj);

				/*if(node.childNodes.length!=0){
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
				}*/
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
				if(node.data.checked==false){
					offImgLyr(node.id);
				}else{
					imgLyr(node.id);
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
				
				var layerTab = this.up("inacc-westlayertab");
				var parentNode = this.items.items[0].node;
				var layerObj = Ext.getCmp("Layer_");
				
				layerTab.setChecked(parentNode, node, layerObj);

				/*var dLayer = Ext.getCmp("Layer_");
				
				if(node.data.checked==false){
					dLayer.layerOff(node.id);
				}else{
					dLayer.layerOn(node.id);
				}*/
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
				var coreMap = Ext.getCmp("_mapDiv_");
				/*var projection = ol.proj.get('null');
				var projectionExtent = [722478.95225,2121052.48378,1262489.62317,2496765.68442];
				var maxResolution = 1222.99245256249;
				var resolutions = new Array(12);
				var matrixIds = new Array(12);
				resolutions[0] = 1222.99245256249;
		matrixIds[0] = 'L0';
		resolutions[1] = 611.496226281245;
		matrixIds[1] = 'L1';
		resolutions[2] = 305.7481131406225;
		matrixIds[2] = 'L2';
		resolutions[3] = 152.87405657031124;
		matrixIds[3] = 'L3';
		resolutions[4] = 76.43702828515562;
		matrixIds[4] = 'L4';
		resolutions[5] = 38.21851414257781;
		matrixIds[5] = 'L5';
		resolutions[6] = 19.109257071288905;
		matrixIds[6] = 'L6';
		resolutions[7] = 9.554628535644452;
		matrixIds[7] = 'L7';
		resolutions[8] = 4.777314267822226;
		matrixIds[8] = 'L8';
		resolutions[9] = 2.388657133911113;
		matrixIds[9] = 'L9';
		resolutions[10] = 1.1943285669555566;
		matrixIds[10] = 'L10';
		resolutions[11] = 0.5971642834777783;
		matrixIds[11] = 'L11';


				
				
				var attribution = new ol.Attribution({
					  html: 'Tiles &copy; <a href="http://202.68.238.120:8880/geonuris/wmts?">GeoNURIS</a>'
					});

				var layer = new ol.layer.Tile({
					opacity: 0.8,
					extent: projectionExtent,
					source: new ol.source.WMTS({
						attributions: [attribution],
						url: "http://202.68.238.120:8880/geonuris/wmts?",
						layer : "S$SLOPE5M",
						matrixSet: 'S$SLOPE5M_MATRIXSET',
						format: 'image/png',
						projection: ol.proj.get('EPSG:5179'),
						tileGrid: new ol.tilegrid.WMTS({
							origins: [[722478.95225, 2747224.619491995], [722478.95225, 2747224.619491995], [722478.95225, 2590681.585563996], [722478.95225, 2512410.0685999966], [722478.95225, 2512410.0685999966], [722478.95225, 2512410.0685999966], [722478.95225, 2502626.1289794967], [722478.95225, 2497734.159169247], [722478.95225, 2497734.159169247], [722478.95225, 2497734.159169247], [722478.95225, 2497122.6629429655], [722478.95225, 2496816.914829825]],
					          resolutions: resolutions,
					          tileSize: 512,
					          matrixIds: matrixIds
					        }),
					        style: 'default'
					})
				});
				coreMap.map.addLayer(layer);
				layer.setVisible(true);*/
				
				if(node.data.checked==false){
					offImgLyr(node.id);
				}else{
					imgLyr(node.id);
				}
				
				/*var layer = new ol.layer.Image({
					source: new ol.source.ImageWMS({
						url: "http://202.68.238.120:8880/geonuris/wms?GDX=Aspect5m.xml",
						params : {
							LAYERS : "ROOT",
							CRS : "EPSG:5179",
							format : 'image/png',
							bgcolor : '0xffffff', 
							exceptions : 'BLANK',
							label : 'HIDE_OVERLAP',
							graphic_buffer : '64',
							ANTI : 'true',
							TEXT_ANTI : 'true'
						}
					})
				});

				coreMap.map.addLayer(layer);
				layer.setVisible(true);*/
				
				
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