Ext.define("InAcc.view.west.Search_nongji", {

	extend: "Ext.window.Window",

	xtype: "inacc-searchnongji",
	
	requires: [
		"InAcc.global.Function"
	],

	title:"농지 속성 조회",
	
	itemId: "nongjiWindow",

	height:210,
	width:1050,
	x:322,
	y:300,
	items:[{
		xtype:"container",
		height:20
	},{
		xtype:"panel",
		layout:{
			type:"hbox"
		},
		border:false,
		items:[{
			xtype:"container",
			width:20
		},{
			fieldLabel: "시범지역",
			labelStyle:"font-weight: bold;",
			xtype:"combobox",
			width:200,
			editable: false,
			colName: "SLTE_NAM",
			comparison: "=",
		},{
			xtype:"container",
			width:20
		},{
			fieldLabel: "구획면적",
			width:200,
			labelStyle:"font-weight: bold;",
			xtype:"textfield",
			colName: "SECT_ARA",
			comparison: ">="
		},{
			xtype:"container",
			width:20
		},{
			xtype:"label",
			style:"margin-top:5px; font-weight: bold;",
			text:"~"
		},{
			xtype:"container",
			width:20
		},{
			xtype:"textfield",
			width:90,
			colName: "SECT_ARA",
			comparison: "<="
		},{
			xtype:"container",
			width:10
		},{
			xtype:"label",
			style:"margin-top:7px;",
			text:"(Km^2)"
		},{
			xtype:"container",
			width:30
		},{
			fieldLabel: "구분",
			width:150,
			labelWidth: 50,
			labelStyle:"font-weight: bold;",
			xtype:"combobox",
			editable: false,
			colName: "LYGB_NAM",
			comparison: "="
		},{
			xtype:"container",
			width:20
		},{
			fieldLabel: "세부구분",
			width:200,
			displayField: 'name',
			valueField: 'id',
			labelStyle:"font-weight: bold;",
			xtype:"combobox",
			editable: false,
			id: "ASG",
			comparison: "="
		}]
	},{
		xtype:"container",
		height:20
	},{
		xtype:"panel",
		layout:{
			type:"hbox"
		},
		border:false,
		items:[{
			xtype:"container",
			width:20
		},{
			fieldLabel: "경사율",
			width:200,
			labelStyle:"font-weight: bold;",
			xtype:"combobox",
			editable: false,
			colName: "SLOP_RAT",
			comparison: ">="
		},{
			xtype:"container",
			width:20
		},{
			xtype:"label",
			style:"margin-top:5px; font-weight: bold;",
			text:"~"
		},{
			xtype:"container",
			width:20
		},{
			xtype:"combobox",
			width:90,
			editable: false,
			colName: "SLOP_RAT",
			comparison: "<="
		},{
			xtype:"label",
			text:"O"
		},{
			xtype:"container",
			width:80
		},{
			fieldLabel: "경사등급",
			width:200,
			labelStyle:"font-weight: bold;",
			xtype:"combobox",
			editable: false,
			colName: "SLOP_CDE",
			comparison: "="
		},{
			xtype:"container",
			width:80
		},{
			fieldLabel: "출처",
			width:150,
			labelWidth: 50,
			labelStyle:"font-weight: bold;",
			xtype:"combobox",
			editable: false
		}]
	},{
		xtype:"container",
		height:10
	},{
		xtype:"panel",
		border:false,
		layout:{
			type:"hbox"
		},
		items:[{
			xtype:"container",
			width:970
		},{
			xtype:"button",
			text:"검색",
			width:60,
			handler:function(){
				
				var dataStore = InAcc.global.Function.getGeoNurisStore("nongjiWindow");
				InAcc.global.Function.createGrid(dataStore, "./resources/config/GridNongji.conf");

			}
		}]
	}],
	
	initComponent:function(){
		this.callParent();

		var id = ["ASG"];
		var storeData = [];
		var store = Ext.create('Ext.data.Store', {
			proxy : {
				type : 'ajax',
				url : './resources/data/tableInfo.json',
				reader : {
					type : 'json'
				}
			}
		});
		//store.setFields() = ['id','name'];
		store.load(function(record) {
			
			for(var j=0; j<id.length; j++){
				for(var i=0; i<record.length; i++){
					var code = record[i].data.L_CODE;
					
					if(id[j]==code){
						//var receiveData = [];
						for(var k = 0; k<record[i].data.S_ITEM.length; k++){
							//console.info(record[i].data.S_ITEM[k].S_NAME);
							storeData.push({id: record[i].data.S_ITEM[k].S_CODE, name: record[i].data.S_ITEM[k].S_NAME});
						}
						//console.info(receiveData);

						//console.info(Ext.getCmp(code));
					}

				}
			}
			//console.info(Ext.getCmp(code).getStore());

		});
		
		
		var test = Ext.create('Ext.data.Store', {
			fields: ['id', 'name'],
			data:storeData
		});
		
		
		console.info(test);
		Ext.getCmp(id[0]).bindStore(test);
	}
});