Ext.define('InAcc.view.west.SearchRealDB', {
	extend: 'Ext.Component',

	
	initComponent: function(){
		this.callParent();
	},
	
	searchCase:function(val){
		var defineString = "InAcc.view.west.Search_" + val;
		var extString = "#" + val + "Window";

		var windowContainer = Ext.ComponentQuery.query(extString)[0];
		
		if(windowContainer==undefined){
			var create = Ext.create(defineString);
			create.show();
		}
		
		
		//var isShow = extCreate.isVisible();
		
		
	}
});