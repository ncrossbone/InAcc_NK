ZoomToExtent = function(){
	var coreMap = Ext.getCmp("_mapDiv_");
	
	
	var cmd_sido = Ext.getCmp("cmd_sido");
	var cmd_sgg = Ext.getCmp("cmd_sgg");
	
	if(cmd_sgg.value != null){
		for(var i = 0 ; i < coreMap.sggGeometry.length;i++){
			if(coreMap.sggGeometry[i].ADMCD == cmd_sgg.value){
				extent = coreMap.sggGeometry[i].geometry.getExtent();
			}
		}
	}else{
		for(var i = 0 ; i < coreMap.sidoGeometry.length;i++){
			if(coreMap.sidoGeometry[i].SD_CD == cmd_sido.value){
				extent = coreMap.sidoGeometry[i].geometry.getExtent();
			}
		}
	}
	
	coreMap.map.getView().fit(extent, coreMap.map.getSize());
		
}