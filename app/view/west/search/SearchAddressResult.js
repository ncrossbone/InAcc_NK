Ext.define("InAcc.view.west.search.SearchAddressResult", {
	
	extend: "Ext.panel.Panel",
	
	xtype: "inacc-west-search-SearchAddressResult",

    layout :{
    	type:"vbox"
    },
    width: "100%",
    height: "100%",
    items:[{
    	xtype:"container",
    	width: '100%',
		height: '100%',
		items:[{
			xtype: 'grid',
			columnLines: true,
			hideHeaders: false,
			title:'검색결과',
			selType: 'checkboxmodel',
			store: [{'NAME': '단위유역','TITLE': '가평A'},
		         	{'NAME': '특대유역','TITLE': '가평A1'},
		         	{'NAME': '중권역','TITLE': '의암댐'},
		         	{'NAME': '환경기초시설','TITLE': '가평하수종말처리장'}],
		    columns:[{
		    	align:'center',
		    	dataIndex:'NAME',
		    	text:'분류',
				width: 120
		    },{
		    	align:'center',
		    	dataIndex:'TITLE',
		    	text:'명칭',
				width: 120
		    }]
		}]
    }]
});