Ext.define("InAcc.store.west.WestTree3", {
	
	extend: "Ext.data.TreeStore",
	
	autoLoad: true,
	
	
	proxy: {
		type: 'ajax',
		url: 'resources/data/west/WestTree3.json',
		reader: {
			type: 'json'	
		}
	},
	
	constructor: function(){
		this.callParent();
	}
	
});