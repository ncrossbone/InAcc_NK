Ext.define("InAcc.view.west.Search_bldgcity", {

	extend: "Ext.window.Window",

	xtype: "inacc-searchbldgcity",
	
	requires: [
		"InAcc.global.Function"
	],

	title:"주택도시 속성 조회",
	
	itemId: "bldgcityWindow",

	height:640,
	width:400,
	x:1520,
	y:36,
	items:[{
		xtype:"panel",
		layout:{
			type:"hbox"
		},
		bodyStyle:"border-bottom: 1px solid #e9e9e9;",
		border:false,
		height:42,
		items:[{
			fieldLabel: "<img src='./resources/images/design/blit_st_02.png' style='margin-left:10px;'> 시범지역",
			labelSeparator : '',
			labelStyle:"font-weight: bold;",
			style:"margin-top:5px;",
			xtype:"combobox",
			width:200,
			editable: false,
			colName: "SLTE_NAM",
			comparison: "=",
		}]
	},{
		xtype:"panel",
		border:false,
		bodyStyle:"background-color:#f6f6f6;",
		layout:{
			type:"hbox"
		},
		height:42,
		items:[{
			fieldLabel: "<img src='./resources/images/design/blit_st_02.png' style='margin-left:10px;'> 구획면적",
			width:200,
			labelSeparator : '',
			labelStyle:"font-weight: bold;",
			style:"margin-top:5px;",
			xtype:"textfield",
			colName: "SECT_ARA",
			comparison: ">="
		},{
			xtype:"label",
			style:"margin-top:10px; font-weight: bold;",
			text:"~"
		},{
			xtype:"textfield",
			width:90,
			style:"margin-top:5px;",
			colName: "SECT_ARA",
			comparison: "<="
		},{
			xtype:"container",
			width:10
		},{
			xtype:"label",
			style:"margin-top:10px;",
			text:"(Km^2)"
		}]

	},{
		xtype:"panel",
		border:false,
		layout:{
			type:"hbox"
		},
		height:42,
		items:[{
			fieldLabel: "<img src='./resources/images/design/blit_st_02.png' style='margin-left:10px;'> 구분",
			labelSeparator : '',
			width:200,
			style:"margin-top:5px;",
			displayField: 'name',
			valueField: 'id',
			labelStyle:"font-weight: bold;",
			xtype:"combobox",
			editable: false,
			//colName: "LYGB_NAM",
			displayField: 'S_NAME',
			valueField: 'S_CODE',
			lCode: "LAY04",
			comparison: "=",
			listeners:{
				select: function(combo){

					//alert(combo.getValue());
					this.up("window").queryLayerName = combo.getValue();
				}
			}
		}]
	},{
		xtype:"panel",
		border:false,
		bodyStyle:"background-color:#f6f6f6;",
		height:42,
		layout:{
			type:"hbox"
		},

		items:[{
			fieldLabel: "<img src='./resources/images/design/blit_st_02.png' style='margin-left:10px;'> 세부구분",
			labelSeparator : '',
			style:"margin-top:5px;",
			width:200,
			displayField: 'S_NAME',
			valueField: 'S_CODE',
			labelStyle:"font-weight: bold;",
			xtype:"combobox",
			colName: "BSGB_CDE",
			editable: false,
			lCode: "BSG",
			comparison: "="
		}]
	},{
		xtype:"panel",
		border:false,
		layout:{
			type:"hbox"
		},
		height:42,
		items:[{
			fieldLabel: "<img src='./resources/images/design/blit_st_02.png' style='margin-left:10px;'> 건물면적",
			labelSeparator : '',
			style:"margin-top:5px;",
			width:200,
			labelStyle:"font-weight: bold;",
			xtype:"textfield",
			colName: "SLOP_RAT",
			comparison: ">="
		},{
			xtype:"label",
			style:"margin-top:10px; font-weight: bold;",
			text:"~"
		},{
			xtype:"textfield",
			style:"margin-top:5px;",
			width:90,
			//editable: false,
			colName: "SLOP_RAT",
			comparison: "<="
		},{
			xtype:"container",
			width:10
		},{
			xtype:"label",
			style:"margin-top:10px;",
			text:"(Km^2)"
		}]

	},{
		xtype:"panel",
		border:false,
		layout:{
			type:"hbox"
		},
		bodyStyle:"background-color:#f6f6f6;",
		height:42,
		items:[{
			fieldLabel: "<img src='./resources/images/design/blit_st_02.png' style='margin-left:10px;'> 출처",
			bodyStyle:"border-bottom: 1px solid #e9e9e9;",
			labelSeparator : '',
			style:"margin-top:5px;",
			width:200,
			labelStyle:"font-weight: bold;",
			xtype:"combobox",
			editable: false
		}]
	},{
		xtype:"panel",
		border:false,
		height:42,
		layout:{
			type:"hbox"
		},
		items:[{
			fieldLabel: "<img src='./resources/images/design/blit_st_02.png' style='margin-left:10px;'> 건물종류",
			labelSeparator : '',
			style:"margin-top:5px;",
			width:200,
			displayField: 'S_NAME',
			valueField: 'S_CODE',
			labelStyle:"font-weight: bold;",
			xtype:"combobox",
			colName: "BDTY_CDE",
			editable: false,
			lCode: "BDT",
			comparison: "="
		}]
	},{
		xtype:"panel",
		border:false,
		height:42,
		layout:{
			type:"hbox"
		},
		bodyStyle:"background-color:#f6f6f6;",
		items:[{
			fieldLabel: "<img src='./resources/images/design/blit_st_02.png' style='margin-left:10px;'> 밀집정도",
			labelSeparator : '',
			style:"margin-top:5px;",
			width:200,
			displayField: 'S_NAME',
			valueField: 'S_CODE',
			labelStyle:"font-weight: bold;",
			xtype:"combobox",
			colName: "DNST_CDE",
			editable: false,
			lCode: "DNT",
			comparison: "="
		}]
	},{
		xtype:"panel",
		border:false,
		layout:{
			type:"hbox"
		},
		height:42,
		items:[{
			fieldLabel: "<img src='./resources/images/design/blit_st_02.png' style='margin-left:10px;'> 건폐율",
			labelSeparator : '',
			style:"margin-top:5px;",
			width:200,
			labelStyle:"font-weight: bold;",
			xtype:"textfield",
			colName: "SLOP_RAT",
			comparison: ">="
		},{
			xtype:"label",
			style:"margin-top:10px; font-weight: bold;",
			text:"~"
		},{
			xtype:"textfield",
			style:"margin-top:5px;",
			width:90,
			//editable: false,
			colName: "SLOP_RAT",
			comparison: "<="
		},{
			xtype:"container",
			width:10
		},{
			xtype:"label",
			style:"margin-top:10px;",
			text:"%"
		}]

	},{
		xtype:"panel",
		border:false,
		layout:{
			type:"hbox"
		},
		bodyStyle:"background-color:#f6f6f6;",
		height:42,
		items:[{
			fieldLabel: "<img src='./resources/images/design/blit_st_02.png' style='margin-left:10px;'> 용적률",
			labelSeparator : '',
			style:"margin-top:5px;",
			width:200,
			labelStyle:"font-weight: bold;",
			xtype:"textfield",
			colName: "SLOP_RAT",
			comparison: ">="
		},{
			xtype:"label",
			style:"margin-top:10px; font-weight: bold;",
			text:"~"
		},{
			xtype:"textfield",
			style:"margin-top:5px;",
			width:90,
			//editable: false,
			colName: "SLOP_RAT",
			comparison: "<="
		},{
			xtype:"container",
			width:10
		},{
			xtype:"label",
			style:"margin-top:10px;",
			text:"%"
		}]

	},{
		xtype:"panel",
		border:false,
		layout:{
			type:"hbox"
		},
		height:42,
		items:[{
			fieldLabel: "<img src='./resources/images/design/blit_st_02.png' style='margin-left:10px;'> 인구수",
			labelSeparator : '',
			style:"margin-top:5px;",
			width:200,
			labelStyle:"font-weight: bold;",
			xtype:"textfield",
			colName: "SLOP_RAT",
			comparison: ">="
		},{
			xtype:"label",
			style:"margin-top:10px; font-weight: bold;",
			text:"~"
		},{
			xtype:"textfield",
			style:"margin-top:5px;",
			width:90,
			//editable: false,
			colName: "SLOP_RAT",
			comparison: "<="
		},{
			xtype:"container",
			width:10
		},{
			xtype:"label",
			style:"margin-top:10px;",
			text:"%"
		}]

	},{
		xtype:"panel",
		border:false,
		layout:{
			type:"hbox"
		},
		bodyStyle:"background-color:#f6f6f6;",
		height:42,
		items:[{
			fieldLabel: "<img src='./resources/images/design/blit_st_02.png' style='margin-left:10px;'> 가구수",
			labelSeparator : '',
			style:"margin-top:5px;",
			width:200,
			labelStyle:"font-weight: bold;",
			xtype:"textfield",
			colName: "SLOP_RAT",
			comparison: ">="
		},{
			xtype:"label",
			style:"margin-top:10px; font-weight: bold;",
			text:"~"
		},{
			xtype:"textfield",
			style:"margin-top:5px;",
			width:90,
			//editable: false,
			colName: "SLOP_RAT",
			comparison: "<="
		},{
			xtype:"container",
			width:10
		},{
			xtype:"label",
			style:"margin-top:10px;",
			text:"%"
		}]

	},{
		xtype:"panel",
		border:false,
		layout:{
			type:"hbox"
		},
		height:42,
		items:[{
			fieldLabel: "<img src='./resources/images/design/blit_st_02.png' style='margin-left:10px;'> 건물층수",
			labelSeparator : '',
			style:"margin-top:5px;",
			width:200,
			labelStyle:"font-weight: bold;",
			xtype:"textfield",
			colName: "SLOP_RAT",
			comparison: ">="
		},{
			xtype:"label",
			style:"margin-top:10px; font-weight: bold;",
			text:"~"
		},{
			xtype:"textfield",
			style:"margin-top:5px;",
			width:90,
			//editable: false,
			colName: "SLOP_RAT",
			comparison: "<="
		},{
			xtype:"container",
			width:10
		},{
			xtype:"label",
			style:"margin-top:10px;",
			text:"%"
		}]

	},{
		xtype:"button",
		width:65,
		height:25,
		style:"background:url('./resources/images/design/btn_search.gif'); margin-left:170px; margin-top:10px;",
		border:false,
		handler:function(){
			var dataStore = InAcc.global.Function.getGeoNurisStore("bldgcityWindow");
			InAcc.global.Function.createGrid(dataStore, "./resources/config/GridBldgcity.conf");

		}
	}],
	
	initComponent:function(){
		this.callParent();		
		InAcc.global.Function.setComboStore(this);
		this.x = Ext.getBody().getWidth() - this.width;
	}
});