Ext.define("InAcc.view.south.SouthContainer", {
	
	extend: "Ext.window.Window",
	
	xtype: "inacc-southcontainer",
	
	height:250,
	width:1400,
	x:322,
	y:722,
    title:"Search Result",
    items: [{
		xtype: 'grid',
		columnLines: true,
		hideHeaders: false,
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
    }],
    border:false,
    initComponent: function(){
    	
    	this.callParent();
    	this.setWidth(Ext.getBody().getWidth() - 322);
    }
});