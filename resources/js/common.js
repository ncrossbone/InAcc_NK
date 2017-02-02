ZoomToExtent = function(sidoCd,sggCd){
   var coreMap = Ext.getCmp("_mapDiv_");
   
   var extent = "";
	if(sggCd != null && sggCd != "시군구"){
		//console.info("시군구");
		extent = InAcc.global.Function.sggExtent(sggCd);
		
	}else{
		if(sidoCd == "시도" && sggCd == "시군구"){
			return;
		}else if(sidoCd == null && sggCd == null){
			return;
		}else{
			//console.info("시도");
			extent = InAcc.global.Function.sidoExtent(sidoCd);
		}
		
	}
	var extentResult = ol.proj.transformExtent(extent, 'EPSG:5179', 'EPSG:3857');
   coreMap.map.getView().fit(extentResult, coreMap.map.getSize());
      
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
   
   var extentResult = ol.proj.transformExtent(extent, 'EPSG:5179', 'EPSG:3857');
   
   coreMap.map.getView().fit(extentResult, coreMap.map.getSize());
   
   
}



BuildDataSet = function(buildStore){
	
	var builddatasearchresult = Ext.ComponentQuery.query("#builddatasearchresult")[0];
	var builddatasearchresultgrid = Ext.ComponentQuery.query("#builddatasearchresultgrid")[0];

	if(builddatasearchresult.isVisible()==false){
		builddatasearchresult.show();	
	}
	builddatasearchresultgrid.setStore(buildStore);


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

_lyrId = [];
_offLyr = [];

imgLyr = function(id){
	var dlayer = Ext.getCmp("Layer_");
	
	var idIdx = this._offLyr.map(function(layer){
		return layer.id
	}).indexOf(id);
	
	
	if(idIdx==-1){
		var	proxyUrl = InAcc.global.Variable.getProxyUrl();
		var coreMap = Ext.getCmp("_mapDiv_");

		var layer = new ol.layer.Image({
			source: new ol.source.ImageWMS({
				url: InAcc.global.Variable.getMapServiceWmsUrl() + id,
				projection:"EPSG:5179",
				params : {
					LAYERS : "ROOT",
					CRS : "EPSG:5179",
					format : 'image/png',
					bgcolor : '0x000000', 
					exceptions : 'BLANK',
					label : 'HIDE_OVERLAP',
					graphic_buffer : '64',
					ANTI : 'true',
					TEXT_ANTI : 'true'
				}
			}),
			opacity: dlayer.opacity
		});
		coreMap.map.addLayer(layer);
		layer.setVisible(true);


		_offLyr.push({id:id, layer:layer});
		_lyrId = [];
	}else{
		_offLyr[idIdx].layer.setVisible(true);
	}
}

offImgLyr = function(id){
	
	var idIdx = this._offLyr.map(function(layer){
		return layer.id
	}).indexOf(id);
	
	_offLyr[idIdx].layer.setVisible(false);
}