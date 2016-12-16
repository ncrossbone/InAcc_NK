/** 전역 변수 클래스
 *  config 속성의 변수를 get, set 메서드로 접근 가능함. (get변수명, set변수명)
 *  get, set 뒤 첫 알파벳은 대문자로 할 것
 *  ex) setGlobalTest(1234), getGlobalTest()
 *  requires: ["KRF.global.Var"], : Ext.application에 한번만 선언하면 됨
 *  참고
 *    - http://jsfiddle.net/prajavk/YhuWT/
 *    - https://wikidocs.net/3384 5.글로벌 변수 사용 */
Ext.define("InAcc.global.Function", {
	singleton : true, // 요게 있어야 set, get 메서드 사용가능..
	colMapArray: [],
	getGeoNurisStore: function(pContainer){
		
		//console.info(Ext.isString(param));
		//console.info(Ext.isObject({}));
		//console.info(Ext.isArray([]));
		//console.info(Ext.isNumeric(0.3232));
		
		var container = null;
		if(Ext.isString(pContainer)){
			
			container = Ext.ComponentQuery.query("#" + pContainer)[0];
		}
		else if(Ext.isObject(pContainer)){
			
			container = pContainer;
		}
		else{
			
			alert("파라메터 타입이 명확하지 않습니다.");
			return false;
		}
		
		if(container == null){
			
			alert("컨테이너를 찾을 수 없습니다.");
			return false;
		}
		console.info(container);
		this.getColArray(container);
		//console.info(this.colMapArray);
		var queryWhere = this.getQueryWhere();
		var dataStore = this.getMapStore(queryWhere);
		
		this.createGrid(dataStore);
		
		this.colMapArray = [];
	},
	getColArray: function(container){
		
		var tmpItems = container.items;
		
		if(tmpItems != undefined){
			
			if(Ext.isArray(tmpItems)){
				
				for(var i = 0; i < tmpItems.length; i++){
					
					if(tmpItems[i].colName != undefined){
						
						var val = "";
						var colName = tmpItems[i].colName;
						var comparison = tmpItems[i].comparison;
						
						if(tmpItems[i].xtype == "textfield"){
							
							//console.info(tmpItems[i].getValue());
							val = tmpItems[i].getValue();
						}
						if(tmpItems[i].xtype == "combobox"){
							
							//console.info(tmpItems[i].getValue());
							//console.info(tmpItems[i].getDisplayValue());
							val = tmpItems[i].getValue();
						}
						if(tmpItems[i].xtype == "checkboxfield"){
							
							//console.info(tmpItems[i].getValue());
							//console.info(tmpItems[i].inputValue);
							val = tmpItems[i].inputValue;
						}
						if(tmpItems[i].xtype == "checkboxgroup"){
							
							//console.info(tmpItems[i].getValue());
							//console.info(tmpItems[i].getChecked());
							//console.info(tmpItems[i].getChecked()[0].inputValue);
							var chkValues = tmpItems[i].getChecked();
							val = [];
							
							for(var chkCnt = 0; chkCnt < chkValues.length; chkCnt++){
								
								val.push(chkValues[chkCnt].inputValue);
							}
						}
						if(tmpItems[i].xtype == "radiogroup"){
							
							//console.info(tmpItems[i].getValue());
							//console.info(tmpItems[i].getChecked());
							//console.info(tmpItems[i].getChecked()[0].inputValue);
							var chkValues = tmpItems[i].getChecked();
							val = [];
							
							for(var chkCnt = 0; chkCnt < chkValues.length; chkCnt++){
								
								val.push(chkValues[chkCnt].inputValue);
							}
						}
						
						if(colName != undefined && val != null && val != ""){
							
							this.colMapArray.push({column: colName, value: val, comparison: comparison});
						}
					}
					
					this.getColArray(tmpItems[i]);
				}
			}
			else{
				
				this.getColArray(tmpItems);
			}
		}
	},
	getQueryWhere: function(){
		
		var queryWhere = "";
		
		for(var i = 0; i < this.colMapArray.length; i++){
			
			queryWhere += this.colMapArray[i].column + " " + this.colMapArray[i].comparison + " "
			
			if(this.colMapArray[i].comparison == "LIKE"){
				
				queryWhere += "'%" + this.colMapArray[i].value + "%'";
			}
			else if(Ext.isString(this.colMapArray[i].value)){
				
				queryWhere += "'" + this.colMapArray[i].value + "'";
			}
			else if(Ext.isArray(this.colMapArray[i].value)){
				
				queryWhere += "(";
				
				for(var j = 0; j < this.colMapArray[i].value.length; j++){
					
					if(Ext.isString(this.colMapArray[i].value[j])){
						
						queryWhere += "'" + this.colMapArray[i].value[j] + "', ";
					}
					else if(Ext.isNumeric(this.colMapArray[i].value[j])){
						
						queryWhere += this.colMapArray[i].value[j] + ", ";
					}
				}
				
				queryWhere = queryWhere.substring(0, queryWhere.length - 2) + ")";
			}
			else if(Ext.isNumeric(this.colMapArray[i].value)){
				
				queryWhere += this.colMapArray[i].value;
			}
			
			if(i < this.colMapArray.length - 1){
				
				queryWhere += " AND ";
			}
		}
		
		return queryWhere;
	},
	getQueryFilter: function(){
		
		var filter = ol.format.filter;
		
		var queryWhere = "";
		
		for(var i = 0; i < this.colMapArray.length; i++){
			
			queryWhere += this.colMapArray[i].column + " " + this.colMapArray[i].comparison + " "
			
			if(this.colMapArray[i].comparison == "LIKE"){
				
				queryWhere += "'%" + this.colMapArray[i].value + "%'";
			}
			else if(Ext.isString(this.colMapArray[i].value)){
				
				queryWhere += "'" + this.colMapArray[i].value + "'";
			}
			else if(Ext.isArray(this.colMapArray[i].value)){
				
				queryWhere += "(";
				
				for(var j = 0; j < this.colMapArray[i].value.length; j++){
					
					if(Ext.isString(this.colMapArray[i].value[j])){
						
						queryWhere += "'" + this.colMapArray[i].value[j] + "', ";
					}
					else if(Ext.isNumeric(this.colMapArray[i].value[j])){
						
						queryWhere += this.colMapArray[i].value[j] + ", ";
					}
				}
				
				queryWhere = queryWhere.substring(0, queryWhere.length - 2) + ")";
			}
			else if(Ext.isNumeric(this.colMapArray[i].value)){
				
				queryWhere += this.colMapArray[i].value;
			}
			
			if(i < this.colMapArray.length - 1){
				
				queryWhere += " AND ";
			}
		}
		
		return queryWhere;
	},
	getMapStore: function(where){
		//console.info(where);
		var	proxy = "./resources/Proxy.jsp?url=";
		
		var featureRequest = new ol.format.WFS().writeGetFeature({
            srsName : "EPSG:5179",
            featureTypes : ['NONGJI_BA'],
            outputFormat : 'application/json',
            geometryName : 'SHAPE',
            maxFeatures : 300,
            filter: ol.format.filter.or(
            		ol.format.filter.like('NGJI_IDN','414*'),
            		ol.format.filter.like('NGJI_IDN','2637*')
            ),
            //filter: ol.format.filter.like('NGJI_IDN','2637*')
            /*params: {
            	CQL_FILTER: "NGJI_IDN = 414"
            }*/
        });
        
		var data = [];
		
        $.ajax({
            url : proxy+'http://202.68.238.120:8880/geonuris/wfs?GDX=NK_Test.xml',
            type : 'POST',
            data : new XMLSerializer().serializeToString( featureRequest ),
            async : false,
            contentType : 'text/xml',
            success : function(response_) {
            	console.info(response_);
            	var features = new ol.format.GeoJSON().readFeatures( response_ );   
            	console.log( features );
            	
            	for(var i = 0; i < features.length; i++){
            		
            		data.push(features[i].values_);
            	}
            }
        });
        console.info(data);
        return data;
	},
	createGrid: function(dataStore){
		
		var store = Ext.create('Ext.data.Store', {

			proxy : {
				type : 'ajax',
				url : './resources/config/GridNongji.conf',
				reader : {
					type : 'json'
				}
			}
		});

		store.load(function(record) {
			
			/*var gridStore = Ext.create("Ext.data.Store", {
				//autoLoad: true,
				data: [{
					ADMCD: "ldkjflsaj",
					SECT_ARA: "aaa"
				}, {
					ADMCD: "sss",
					SECT_ARA: "bbb"
				}]
			});*/
			//console.info(gridData);
			var gridStore = Ext.create("Ext.data.Store", {
				//autoLoad: true,
				data: dataStore
			});
			
			var data = record[0].data;
			
			Ext.create("Ext.grid.Panel", {
				floating: true,
				draggable: true,
				closable: true,
				x: 300,
				y: 300,
				id: data.id,
				title: data.title,
				//width: data.width,
				//height: data.height,
				width: 500,
				height: 300,
				columns: data.columns,
				store: gridStore
			}).show();
		});
		
		/*Ext.create("Ext.grid.Panel", {
			floating: true,
			x: 300,
			y: 300,
			initComponent: function(){
				
				this.id = "ddd";
				this.title = "테스트";
				this.width = 500;
				this.height = 300;				
				this.columns = [{
					id: "col1",
					text: "col1",
					dataIndex: "col1",
					width: 100,
					sortable: true
				}];
				
				this.callParent();
				console.info("dd");
			}
		});*/
	}
});