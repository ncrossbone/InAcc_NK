ZoomToExtent = function(){
   var coreMap = Ext.getCmp("_mapDiv_");
   //var extent = [];
   var sidoCd = $("#sidoSelect option:selected")[0].value;
   var sggCd = $("#sggSelect option:selected")[0].value;

   if(sggCd != null && sggCd != "시군구"){
      for(var i = 0 ; i < coreMap.sggGeometry.length;i++){
         if(coreMap.sggGeometry[i].ADMCD == sggCd){
            extent = coreMap.sggGeometry[i].geometry.getExtent();
         }
      }
   }else{
      if(sidoCd == "시도" && sggCd == "시군구"){
         return;
      }
      for(var i = 0 ; i < coreMap.sidoGeometry.length;i++){
         if(coreMap.sidoGeometry[i].SD_CD == sidoCd){
            extent = coreMap.sidoGeometry[i].geometry.getExtent();
         }
      }
   }
   
   coreMap.map.getView().fit(extent, coreMap.map.getSize());
      
}

ZoomToExtentSearchTab = function(){
	var coreMap = Ext.getCmp("_mapDiv_");
	var extent = [];
	var sidoCd = Ext.getCmp("cmd_sido").lastMutatedValue;
	var sggCd = Ext.getCmp("cmd_sgg").lastMutatedValue;
	
	console.info(sidoCd);
	console.info(sggCd);

	if(sggCd != ""){
		for(var i = 0 ; i < coreMap.sgg2Geometry.length;i++){
			if(coreMap.sgg2Geometry[i].SGG_NM == sggCd){
				extent = coreMap.sgg2Geometry[i].geometry.getExtent();
			}
		}
	}else{
		if(sidoCd == "" && sggCd == ""){
			return;
		}
		for(var i = 0 ; i < coreMap.sido2Geometry.length;i++){
			if(coreMap.sido2Geometry[i].SD_NM == sidoCd){
				extent = coreMap.sido2Geometry[i].geometry.getExtent();
			}
		}
	}

	coreMap.map.getView().fit(extent, coreMap.map.getSize());

}

// 무산군 = [1124302.0917757652, 2426551.0481530065, 1172445.817177866, 2492576.5154793495]
// 남포 = [784109.2989931413, 2071147.123216339, 838462.0781753904, 2117312.225652784]
// 나선 = [1209795.5937384816, 2463837.7908414584, 1263615.7452388592, 2517201.3524904875]
// 신의주 = [729937.3230916734, 2228320.85379483, 748286.2368579231, 2245854.2741489513]
// 원산 = [975881.0744628821, 2112696.7071642065, 1011964.7144796613, 2137703.070526333]
// 청진 = [1153278.2609002688, 2411216.215598996, 1225104.9896020433, 2479789.3484978527]

DemonLocation = function(val){
   var coreMap = Ext.getCmp("_mapDiv_");
   
   if(val[0].value!=undefined){
	   var val = val[0].value;
   }
   
   var extent = [];
   
   if(val == "na" ){
      extent = [1209795.5937384816, 2463837.7908414584, 1263615.7452388592, 2517201.3524904875];
   }else if(val == "nam"){
      extent = [784109.2989931413, 2071147.123216339, 838462.0781753904, 2117312.225652784];
   }else if(val == "moo"){
      extent = [1124302.0917757652, 2426551.0481530065, 1172445.817177866, 2492576.5154793495];
   }else if(val == "sin"){
      extent = [729937.3230916734, 2228320.85379483, 748286.2368579231, 2245854.2741489513]
   }else if(val == "won"){
      extent = [975881.0744628821, 2112696.7071642065, 1011964.7144796613, 2137703.070526333];
   }else if(val == "chang"){
      extent = [1153278.2609002688, 2411216.215598996, 1225104.9896020433, 2479789.3484978527];
   }
   
   coreMap.map.getView().fit(extent, coreMap.map.getSize());
   
}



BuildDataSet = function(buildStore){
	
	var buildSearch = Ext.getCmp("buildSearch");
	
	console.info(buildStore.data.items);
	
	buildSearch.remove("build");
	buildSearch.add({
        xtype:"panel",
        id:"build",
        title:"검색결과",
        width:360,
        items:[{
           xtype:"grid",
           id: "buildList",
           columnLines: true,
            hideHeaders: true,
           columns:[{
               align:'center',
               dataIndex:'name',
               width: 280
            },{	 
				text:'이동',
				align:'center',
				xtype:'actioncolumn',
				width:50,
				items:[{ 
					icon: './resources/images/button/btn_move.png',  // Use a URL in the icon config
	                tooltip: 'Edit',
	                handler: function(grid, rowIndex, colIndex) {
	                	console.info("이동");
	                }
				}]
			}]
        }]
     });
     
     var buildList = Ext.getCmp("buildList");
     buildList.setStore(buildStore);
	
	
	/*for(var i = 0 ; i < buildStore.data.items.length ; i++){
		buildSearch.add({
			xtype:'panel',
			border: false,
			layout:{
				type: 'hbox'
			},
			items:[{
				style:"margin-left:15px; margin-top:15px;",
				xtype:"textfield",
				value: buildStore.data.items[i].data.name,
				width:240
			},{
				style:"margin-top:15px; background : #555; border: 1px solid #303030",
				xtype:"button",
				width:60,
				text:"이동"
			}]
		})
	}*/
	
	
}