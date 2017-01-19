Ext.define("InAcc.store.west.WestTree4", {
	
	extend: "Ext.data.TreeStore",
	
	autoLoad: true,
	
	
	proxy: {
		type: 'ajax',
		url: 'resources/data/west/WestTree4.json',
		reader: {
			type: 'json'	
		}
	},
	
	constructor: function(){
		this.callParent();
	}
	
});