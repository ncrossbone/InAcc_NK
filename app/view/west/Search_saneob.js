Ext.define("InAcc.view.west.Search_saneob", {

	extend: "Ext.window.Window",

	xtype: "inacc-searchsanob",
	
	requires: [
		"InAcc.global.Function"
	],

	title:"산업에너지 속성 조회",
	
	itemId: "saneobWindow",

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
			//store: Ext.create('InAcc.store.west.Search_nongji')
			width:200,
			editable: false,
			colName: "SLTE_NAM",
			comparison: "="
		},{
			xtype:"container",
			width:20
		},{
			fieldLabel: "구획면적",
			width:200,
			labelStyle:"font-weight: bold;",
			xtype:"combobox",
			editable: false,
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
			xtype:"combobox",
			width:90,
			editable: false,
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
			labelStyle:"font-weight: bold;",
			xtype:"combobox",
			editable: false,
			colName: "ASGB_CDE",
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
			width:20
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
			width:20
		},{
			fieldLabel: "출처",
			width:150,
			labelWidth: 50,
			labelStyle:"font-weight: bold;",
			xtype:"combobox",
			editable: false
		},{
			xtype:"container",
			width:30
		},{
			width:150,
			labelWidth: 50,
			labelStyle:"font-weight: bold;",
			xtype:"combobox",
			editable: false
		},{
			xtype:"container",
			width:20
		},{
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
			handler:function(a,b,c,d){
				InAcc.global.Function.getGeoNurisStore("saneobWindow");
				//InAcc.global.Function.createGrid();
				Ext.create("InAcc.view.south.SouthContainer").show();
			}
		}]
	}]
});