Ext.define("InAcc.store.west.WestTree1", {
	
	extend: "Ext.data.TreeStore",
	
	autoLoad: true,
	
	
	proxy: {
		type: 'ajax',
		url: 'resources/data/west/WestTree1.json',
		reader: {
			type: 'json'	
		}
	},
	
	constructor: function(){
		this.callParent();
		//console.info(this);
	},
	listeners: {

		load: function(store) {

		
		//console.info(store);
			
        }
	}	
});