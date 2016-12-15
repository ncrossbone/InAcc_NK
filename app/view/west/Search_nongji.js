Ext.define("InAcc.view.west.Search_nongji", {

	extend: "Ext.window.Window",

	xtype: "inacc-searchnongji",

	title:"농지 속성 조회",

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
			colName: "column1",
			comparison: "LIKE"
		},{
			xtype:"container",
			width:20
		},{
			fieldLabel: "구획면적",
			width:200,
			labelStyle:"font-weight: bold;",
			xtype:"combobox",
			editable: false
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
			editable: false
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
			editable: false
		},{
			xtype:"container",
			width:20
		},{
			fieldLabel: "세부구분",
			width:200,
			labelStyle:"font-weight: bold;",
			xtype:"combobox",
			editable: false
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
			editable: false
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
			editable: false
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
			editable: false
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
				Ext.create("InAcc.view.south.SouthContainer").show();
			}
		}]
	}]
});