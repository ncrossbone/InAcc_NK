Ext.define("InAcc.view.east.EastLayerTab", {

	extend: "Ext.panel.Panel",
	xtype: "inacc-eastlayertab",
	layout:{
		type:'accordion'
	},
	id: "eastLayerTab",
	linkedLayerId: "Layer_East",
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
				
				var layerTab = this.up("inacc-eastlayertab");
				var parentNode = this.items.items[0].node
				var layerObj = Ext.getCmp("Layer_East");
				
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

				var layerTab = this.up("inacc-eastlayertab");
				var parentNode = this.items.items[0].node
				var layerObj = Ext.getCmp("Layer_East");
				
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

				if(node.data.checked==false){
					offImgLyr(node.id);
				}else{
					imgLyr(node.id);
				}
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