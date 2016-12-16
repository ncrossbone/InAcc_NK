var _coreMap = null;

Ext.application({
    name   : 'InAcc',
    
    requires: [
    	"InAcc.global.Function",
    	"InAcc.global.Variable"
    ],

    launch : function() {

    	Ext.create("InAcc.view.main.Main", {
    		renderTo: Ext.getBody()
    	});
    }
});