Ext.define("InAcc.view.west.WestMoveTab", {
	
	extend: "Ext.Panel",
	
	xtype: "inacc-westmovetab",
	title:"검색",
	layout:{
		type:'accordion'
	},
	bodyStyle:"background-color:#f6f6f6;",
	border:false,
	//height:70,
	items:[{
		xtype:"panel",
		title:"<img src='./resources/images/design/blit_st_02_02.png' style='margin-bottom:-3px;'/> 시범지역위치이동",
		width:330,
		//style:" margin-top:5px; margin-left:5px;",
		items:[{
			xtype: 'combobox',
			labelStyle:"font-weight: bold;",
			style:" margin-top:15px; margin-left:15px;",
			fieldLabel: "<img src='./resources/images/design/blit_st_03.png'/> 시범지역위치이동",
			labelWidth: 120,
			width:300,
			labelSeparator : '',
			editable: false,
			displayField:'name',
			valueField:'id',
			listeners:{
				select: function(val){
					var selectValue = val.value;
					DemonLocation(selectValue);
					
				}
			},
			store:Ext.create('Ext.data.Store',{
				fields:['id','name'],
				data:[['na','나선'],
				      ['nam','남포'],
				      ['moo','무산'],
				      ['sin','신의주'],
				      ['won','원산'],
				      ['chang','청진']]
			})
		},{
			xtype:"container",
			height:35
		}]
	},{
		xtype:'form',
		reference : 'form',
		//style:"margin-left:5px;",
		title:"<img src='./resources/images/design/blit_st_02_02.png' style='margin-bottom:-3px;'/> 행정구역이동",
		width:330,
		layout:{
			type:"vbox"
		},
		//bodyStyle:{"background-color": "#ececec"},
		//style:"margin-top:10px;",
		items:[{
			xtype:"combobox",
			labelStyle:"font-weight: bold;",
			style:" margin-top:15px; margin-left:15px;",
			fieldLabel: "<img src='./resources/images/design/blit_st_03.png'/> 시·도",
			labelSeparator : '',
			id: 'cmd_sido',
			displayField: 'name',
			valueField: 'id',
			store: Ext.create('InAcc.store.north.Sido'),
			width:290,
			editable: false,
			listeners:{
				select: function(){
					var cmd_sgg = Ext.getCmp("cmd_sgg");
					cmd_sgg.value = null;
					var sidoCd = this.value;
					var sggStore = Ext.create('InAcc.store.north.Sgg',{
						sidoCd : sidoCd
					});
					sggStore.load();
					console.info(sggStore);

					cmd_sgg.setStore(sggStore);
				}
			}
		},{
			xtype:"combobox",
			labelStyle:"font-weight: bold;",
			style:"margin-left:15px;",
			fieldLabel: "<img src='./resources/images/design/blit_st_03.png'/> 시·군·구",
			labelSeparator : '',
			id: "cmd_sgg",
			displayField: 'name',
			valueField: 'id',
			width:290,
			editable: false
		},{
			xtype:"button",
			text:"이동",
			style:" margin-top:25px; margin-left:120px; margin-bottom:35px; background:#0c61a7; border: 1px solid #004581;",
			width:90,
			handler: function() {
				/*var searchResultWindow = Ext.create("InAcc.view.south.SouthContainer");

				searchResultWindow.show();*/
				var sidoCd = Ext.getCmp("cmd_sido").value;
				var sggCd = Ext.getCmp("cmd_sgg").value;
				
				ZoomToExtent(sidoCd,sggCd);

			}
		}]
	},{
		xtype:"panel",
		//style:"margin-left:5px;",
		title:"<img src='./resources/images/design/blit_st_02_02.png' style='margin-bottom:-3px;'/> Vworld POI 검색",
		width:330,
		height:130,
		layout:{
			type:'vbox'
		},
		items:[{
			xtype:"panel",
			layout:{
				type:'hbox'
			},
			border:false,
			items:[{
				style:"margin-left:15px; margin-top:15px;",
				itemId:"poisearchname",
				xtype:"textfield",
				width:240
			},{
				style:"margin-top:15px; background : #555; border: 1px solid #303030",
				xtype:"button",
				width:60,
				text:"검색",
				handler:function(){
					InAcc.global.Function.getVworldPoi();
				}
			}]
		},{
			xtype:"container",
			height:50
		},{
			xtype:"panel",
			title:"검색결과",
			itemId:"poisearchresult",
			hidden:true,
			width:330,
			
			items:[{
				xtype:"grid",
				itemId:"poisearchresultgrid",
				//store: [{},{},{}],
				height:300,
				columnLines: true,
				hideHeaders: true,
				//autoScroll:true,
				columns:[{
					align:'left',
					dataIndex:'nameFull',
					text:'이름',
					width: 200
				},{    
		            text:'이동',
		            align:'center',
		            xtype:'actioncolumn',
		            width:110,
		            items:[{ 
		            	icon: './resources/images/button/btn_move.png',  // Use a URL in the icon config
		            	tooltip: 'move',
		            	handler: function(grid, rowIndex, colIndex) {
		            		var rec = grid.getStore().getAt(rowIndex);
		            		var coreMap = Ext.getCmp("_mapDiv_");
		            		coreMap.map.getView().setCenter(ol.proj.transform([rec.data.xpos,rec.data.ypos], 'EPSG:4326', 'EPSG:5179'));
		            		coreMap.map.getView().setZoom(11);
		            	}   
		            }]
		         }]
			}]
		}]
	},{
		xtype:"panel",
		//style:"margin-left:5px;",
		title:"<img src='./resources/images/design/blit_st_02_02.png' style='margin-bottom:-3px;'/> 구축Data 통합명칭 검색",
		width:360,
		id:"buildSearch",
		height:130,
		layout:{
			type:'vbox'
		},
		items:[{
			xtype:"panel",
			border: false,
			layout:{
				type:'hbox'
			},
			items:[{
				style:"margin-left:15px; margin-top:15px;",
				xtype:"textfield",
				id: "bildData",
				width:240
			},{
				style:"margin-top:15px; background : #555; border: 1px solid #303030",
				xtype:"button",
				width:60,
				text:"검색",
				handler: function(){
					//InAcc.store.west.BuildDataSeachName
					var bildData = Ext.getCmp("bildData").value;
					console.info(bildData);
					var buildStore = Ext.create("InAcc.store.west.BuildDataSearchName",{
						buildData: bildData
					});
					buildStore.load();
					
					
					
					var timerCnt = 0;
					var timerId = window.setInterval(function(){
						
						if(buildStore.data.items.length > 0 && buildStore.data.items.length > 0){

							window.clearInterval(timerId);
							
							BuildDataSet(buildStore);
							
						}
						else{
							
							timerCnt++;
							
							if(timerCnt > 5){
								alert("데이터가 없습니다");
								window.clearInterval(timerId);
							}
						}
					}, 500);
					
					
					
				}
			}]
		}]

	}]
});