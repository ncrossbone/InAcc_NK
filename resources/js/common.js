ZoomToExtent = function(sidoCd,sggCd){
   var coreMap = Ext.getCmp("_mapDiv_");
   console.info(sidoCd);
   console.info(sggCd);
   console.info(coreMap.map.getSize());
   var extent = "";
	if(sggCd != null && sggCd != "시군구"){
		console.info("시군구");
		extent = InAcc.global.Function.sggExtent(sggCd);
		
	}else{
		if(sidoCd == "시도" && sggCd == "시군구"){
			return;
		}else if(sidoCd == null && sggCd == null){
			return;
		}else{
			console.info("시도");
			extent = InAcc.global.Function.sidoExtent(sidoCd);
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
	buildSearch.add({xtype:"container",height:50},{
        xtype:"panel",
        id:"build",
        title:"검색결과",
        width:360,
        items:[{
           xtype:"grid",
           id: "buildList",
           height: 300,
           columnLines: true,
           hideHeaders: true,
           columns:[{
               align:'center',
               dataIndex:'name',
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
                        var x = Number(rec.data.x);
                        var y = Number(rec.data.y);
                        var coreMap = Ext.getCmp("_mapDiv_");
                        
                        coreMap.map.getView().setCenter([x,y]);
                        coreMap.map.getView().setZoom(17);
                        
                        //coreMap.map.getView().setCenter([rec.data.x,rec.data.y]);
	                }
				}]
			}]
        }]
     });
     
     var buildList = Ext.getCmp("buildList");
     buildList.setStore(buildStore);

}

aaa = function(){
	alert("?");
}


msg = function(title, format){
    if(!msgCt){
        msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
    }
    var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
    var m = Ext.DomHelper.append(msgCt, createBox(title, s), true);
    m.hide();
    m.slideIn('t').ghost("t", { delay: 1000, remove: true});
}