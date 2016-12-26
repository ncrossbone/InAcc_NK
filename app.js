var _coreMap = null;

Ext.application({
    name   : 'InAcc',
    
    requires: [
    	"InAcc.global.Function",
    	"InAcc.global.Variable",
    	"InAcc.view.main.Main_Splitter"
    ],

    launch : function() {

    	Ext.create("InAcc.view.main.Main", {
    		renderTo: Ext.getBody()
    	});
    	
    	//console.info(Ext.getBody().getWidth());
    	//console.info(Ext.getBody().getHeight());
    	/*Ext.create("InAcc.view.main.Main_Splitter", {
    		renderTo: Ext.getBody()
    	});*/
    }
});