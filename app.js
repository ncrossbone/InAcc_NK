var _coreMap = null;

Ext.application({
    name   : 'InAcc',
    
    requires: [
    	"InAcc.global.Function",
    	"InAcc.global.Variable",
    	"InAcc.view.main.Main_Splitter"
    ],

    launch : function() {

    	var main = Ext.create("InAcc.view.main.Main", {
    		renderTo: Ext.getBody()
    	});

    	/*var mainSplitter = Ext.create("InAcc.view.main.Main_Splitter", {
    		renderTo: Ext.getBody(),
    		width: Ext.getBody().getWidth(),
    		height: Ext.getBody().getHeight()
    	});*/

    	Ext.on('resize', function(){

    		var width = Ext.getBody().getWidth();
    		var height = Ext.getBody().getHeight();

    		/*mainSplitter.setWidth(width);
    		mainSplitter.setHeight(height);*/

    		main.setWidth(width);
    		main.setHeight(height);

    	});
    }
});