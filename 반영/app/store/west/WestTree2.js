Ext.define("InAcc.store.west.WestTree2", {
	
	extend: "Ext.data.TreeStore",
	
	autoLoad: true,
	
	
	proxy: {
		type: 'ajax',
		url: 'resources/data/west/WestTree2.json',
		reader: {
			type: 'json'	
		}
	},
	
	constructor: function(){
		this.callParent();
	}
	
});