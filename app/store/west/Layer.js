Ext.define("InAcc.store.west.Layer", {
	
	extend: "Ext.data.TreeStore",
	
	autoLoad: true,
	
	
	proxy: {
		type: 'ajax',
		url: 'resources/data/west/Layer.json',
		reader: {
			type: 'json'	
		}
	},
	
	constructor: function(){
		this.callParent();
	}
	
});