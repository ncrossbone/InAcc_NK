Ext.define("InAcc.view.west.WestContainer", {
	
	extend: "Ext.panel.Panel",
	xtype: "inacc-westcontainer",
    collapsible: true,
    collapseDirection: 'left',
    headerPosition: 'right',
    
	style:"margin-top:65px;  border-bottom:solid 5px #445676; border-top:solid 5px #445676;",
    header:{
    	width:8,
    	style:"background-color : #445676;",
    	titlePosition:1
    },
    id: "westcontainer",
    width: 350,
    border:false,
    bodyStyle:"background-color:#f6f6f6;",
    //header: false,
    //style:"border-right:solid 8px #ede5dc;",
    
   
    //requires: ["InAcc.view.west.WestLayerTab"],
    //tabBarPosition: 'top',
	
    defaults: {
        styleHtmlContent: true
    },
    
    
    layout:{
		type:'accordion'
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

				var dLayer = Ext.getCmp("Layer_");

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
		bufferedRenderer: false
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
	},{
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