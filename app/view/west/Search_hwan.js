Ext.define("InAcc.view.west.Search_hwan", {

	extend: "Ext.window.Window",

	xtype: "inacc-searchhwan",
	
	requires: [
		"InAcc.global.Function"
	],

	title:"환경 속성 조회",
	
	itemId: "hwanWindow",

	height:390,
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
			fieldLabel: "<img src='./resources/images/design/blit_st_02.png' style='margin-left:10px;'> 시범지역 <span style='color: red;'>*</span>",
			labelSeparator : '',
			labelStyle:"font-weight: bold;",
			style:"margin-top:5px;",
			xtype:"combobox",
			width:200,
			editable: false,
			displayField: 'S_NAME',
			valueField: 'S_CODE',
			lCode: "DEMOADM",
			colName: "SLTE_NAM",
			comparison: "=",
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
			fieldLabel: "<img src='./resources/images/design/blit_st_02.png' style='margin-left:10px;'> 구분 <span style='color: red;'>*</span>",
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
			lCode: "LAY05",
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
			colName: "SEGB_CDE",
			editable: false,
			lCode: "ESG",
			comparison: "="
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
			fieldLabel: "<img src='./resources/images/design/blit_st_02.png' style='margin-left:10px;'> 경사율",
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
			xtype:"label",
			style:"margin-top:5px;",
			text:"o"
		}]

	},{
		xtype:"panel",
		border:false,
		layout:{
			type:"hbox"
		},
		height:42,
		items:[{
			fieldLabel: "<img src='./resources/images/design/blit_st_02.png' style='margin-left:10px;'> 경사등급",
			labelSeparator : '',
			style:"margin-top:5px;",
			width:200,
			displayField: 'S_NAME',
			valueField: 'S_CODE',
			labelStyle:"font-weight: bold;",
			xtype:"combobox",
			editable: false,
			lCode: "SLP",
			colName: "SLOP_CDE",
			comparison: "="
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
			width:270,
			labelStyle:"font-weight: bold;",
			xtype:"combobox",
			editable: false,
			displayField: 'S_NAME',
			valueField: 'S_CODE',
			lCode: "ORG_NAM_HWAN",
			colName: "ORGN_NAM",
			comparison: "="
		}]
	},{
		xtype:"button",
		width:65,
		height:25,
		style:"background:url('./resources/images/design/btn_search.gif'); margin-left:170px; margin-top:10px;",
		border:false,
		handler:function(){
			var dataStore = InAcc.global.Function.getGeoNurisStore("hwanWindow");
			InAcc.global.Function.createGrid(dataStore, "./resources/config/GridHyangyeong.conf");

		}
	}],
	
	initComponent:function(){
		this.callParent();
		InAcc.global.Function.setComboStore(this);
		this.x = Ext.getBody().getWidth() - this.width;
	},
	listeners:{
		'close':function(val){
			InAcc.global.Function.comboArray=[];
		}

	}
});