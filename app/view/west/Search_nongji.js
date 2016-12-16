Ext.define("InAcc.view.west.Search_nongji", {

	extend: "Ext.window.Window",

	xtype: "inacc-searchnongji",
	
	requires: [
		"InAcc.global.Function",
		"InAcc.global.Variable"
	],

	title:"농지 속성 조회",
	
	itemId: "nongjiWindow",
	//queryLayerName: "NONGJI_BA",
	queryLayerName: "",

	height:500,
	width:400,
	x:1520,
	y:36,
	items:[{
		xtype:"container",
		height:10
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
		xtype:"panel",
		border:false,
		layout:{
			type:"hbox"
		},
		items:[{
			fieldLabel: "구획면적",
			width:200,
			labelStyle:"font-weight: bold;",
			xtype:"textfield",
			colName: "SECT_ARA",
			comparison: ">="
		},{
			xtype:"label",
			style:"margin-top:5px; font-weight: bold;",
			text:"~"
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
		}]

	},{
		xtype:"container",
		height:10
	},{
		fieldLabel: "구분",
		width:200,
		displayField: 'name',
		valueField: 'id',
		labelStyle:"font-weight: bold;",
		xtype:"combobox",
		editable: false,
		//colName: "LYGB_NAM",
		displayField: 'S_NAME',
		valueField: 'S_CODE',
		lCode: "LAY01",
		comparison: "=",
		listeners:{
			select: function(combo){
			
				//alert(combo.getValue());
				this.up("window").queryLayerName = combo.getValue();
			}
		}
	},{
		xtype:"container",
		width:20
	},{
		fieldLabel: "세부구분",
		width:200,
		displayField: 'S_NAME',
		valueField: 'S_CODE',
		labelStyle:"font-weight: bold;",
		xtype:"combobox",
		colName: "ASGB_CDE",
		editable: false,
		lCode: "ASG",
		comparison: "="
	},{
		xtype:"panel",
		border:false,
		layout:{
			type:"hbox"
		},
		items:[{
			fieldLabel: "경사율",
			width:200,
			labelStyle:"font-weight: bold;",
			xtype:"textfield",
			colName: "SLOP_RAT",
			comparison: ">="
		},{
			xtype:"label",
			style:"margin-top:5px; font-weight: bold;",
			text:"~"
		},{
			xtype:"textfield",
			width:90,
			//editable: false,
			colName: "SLOP_RAT",
			comparison: "<="
		},{
			xtype:"label",
			text:"O"
		}]

	},{
		xtype:"container",
		height:10
	},{
		fieldLabel: "경사등급",
		width:200,
		displayField: 'S_NAME',
		valueField: 'S_CODE',
		labelStyle:"font-weight: bold;",
		xtype:"combobox",
		editable: false,
		lCode: "SLP",
		colName: "SLOP_CDE",
		comparison: "="
	},{
		xtype:"container",
		width:80
	},{
		fieldLabel: "출처",
		width:200,
		labelStyle:"font-weight: bold;",
		xtype:"combobox",
		editable: false
	},{
		xtype:"button",
		text:"검색",
		width:60,
		handler:function(){

			var dataStore = InAcc.global.Function.getGeoNurisStore("nongjiWindow");
			InAcc.global.Function.createGrid(dataStore, "./resources/config/GridNongji.conf");

		}
	}],
	
	initComponent:function(){
		this.callParent();
		InAcc.global.Function.setComboStore(this);
	}
});