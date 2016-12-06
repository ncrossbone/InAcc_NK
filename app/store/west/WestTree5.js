Ext.define("InAcc.store.west.WestTree5", {
	
	extend: "Ext.data.TreeStore",
	
	autoLoad: true,
	
	
	proxy: {
		type: 'ajax',
		url: 'resources/data/west/WestTree5.json',
		reader: {
			type: 'json'	
		}
	},
	
	constructor: function(){
		this.callParent();
	}
	
});