Ext.define('InAcc.view.west.SearchRealDB', {
	extend: 'Ext.Component',
	initComponent: function(){
		this.callParent();
	},
	
	searchCase:function(val){
		var extString = "InAcc.view.west.Search_";
		
		
		var extCreate = Ext.create(extString + val);
		
		//var isShow = extCreate.isVisible();
		
		extCreate.show();
	}
});