Ext.define("InAcc.view.west.LayerTab", {

	extend: "Ext.panel.Panel",

	xtype: "inacc-layertab",
	width: "100%",
	height:"100%",

	title: "주제도",
	items:[{
		xtype: 'treepanel',
		scroll: false,
		viewConfig: {
			style: { overflow: 'auto', overflowX: 'hidden' }
		},
		store: Ext.create('InAcc.store.west.Layer'),
		rootVisible: false,
		useArrows: true,
		border: 0,
		bufferedRenderer: false,
		height: Ext.getBody().getViewSize().height - 70,
		listeners: {
			/*el: {
				click: function(){
					var dLayer = Ext.getCmp("dLayer");
					dLayer.layerOnOffTest({id: ""});
				}
			}*/
			checkchange:function(node){
				var dLayer = Ext.getCmp("Layer");
				
				if(node.childNodes.length!=0){
					for(var i = 0; i < node.childNodes.length; i++){
						if(node.data.checked==false){
							node.childNodes[i].set('checked',false);
							//dLayer.layerOff(node.childNodes[i].id);
						}else{
							node.childNodes[i].set('checked',true);
							dLayer.layerOn(node.childNodes[i].id);
						}
					}
				}
			}
		}
	}]
});