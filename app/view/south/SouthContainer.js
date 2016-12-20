Ext.define("InAcc.view.south.SouthContainer", {
	
	extend: "Ext.window.Window",
	
	xtype: "inacc-southcontainer",
	
	itemId: "southContainer",
	
	height:250,
	width:1400,
	x:322,
	y:722,
    title:"검색 결과",
    maximizable:true,
    minimizable:true,
    items:[{ 
    	xtype:'tabpanel',
    	
    	itemId: "tabContainer",

    	items: [{
    		title:"tab1",
    		xtype: 'grid',
    		columnLines: true,
    		hideHeaders: false,
    		closable: true,
    		store: [{},{},{},{},{},{},{},{},{},{},{}],
    		columns:[{
    			align:'center',
    			dataIndex:'TITLE',
    			text:'FID',
    			width: 70
    		},{
    			align:'center',
    			dataIndex:'TITLE',
    			text:'Shape *',
    			width: 100
    		},{
    			align:'center',
    			dataIndex:'TITLE',
    			text:'구획면적',
    			width: 100
    		},{
    			align:'center',
    			dataIndex:'TITLE',
    			text:'건물면적',
    			width: 100
    		},{
    			align:'center',
    			dataIndex:'TITLE',
    			text:'건물층수',
    			width: 100
    		},{
    			align:'center',
    			dataIndex:'TITLE',
    			text:'건폐율',
    			width: 100
    		},{
    			align:'center',
    			dataIndex:'TITLE',
    			text:'용적률',
    			width: 100
    		},{
    			align:'center',
    			dataIndex:'TITLE',
    			text:'인구수',
    			width: 100
    		},{
    			align:'center',
    			dataIndex:'TITLE',
    			text:'가구수',
    			width: 100
    		},{
    			align:'center',
    			dataIndex:'TITLE',
    			text:'종류',
    			width: 50
    		},{
    			align:'center',
    			dataIndex:'TITLE',
    			text:'용도지역',
    			width: 100
    		},{
    			align:'center',
    			dataIndex:'TITLE',
    			text:'밀집정도',
    			width: 100
    		},{
    			align:'center',
    			dataIndex:'TITLE',
    			text:'구분',
    			width: 100
    		},{
    			align:'center',
    			dataIndex:'TITLE',
    			text:'제작년도',
    			width: 100
    		},{
    			align:'center',
    			dataIndex:'TITLE',
    			text:'기관',
    			width: 100
    		},{
    			align:'center',
    			dataIndex:'TITLE',
    			text:'기타설명',
    			width: 100
    		}]
    	},{
    		title:"tab2",
    		closable: true
    	},{
    		title:"tab3",
    		closable: true
    	}]
    }],
    border:false,
    initComponent: function(){
    	
    	this.callParent();
    	this.setWidth(Ext.getBody().getWidth() - 322);
    }
});