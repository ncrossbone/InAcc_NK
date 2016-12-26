/**
 * 전역 변수 클래스 config 속성의 변수를 get, set 메서드로 접근 가능함. (get변수명, set변수명) get, set 뒤 첫
 * 알파벳은 대문자로 할 것 ex) setGlobalTest(1234), getGlobalTest() requires:
 * ["KRF.global.Var"], : Ext.application에 한번만 선언하면 됨 참고 -
 * http://jsfiddle.net/prajavk/YhuWT/ - https://wikidocs.net/3384 5.글로벌 변수 사용
 */
Ext
		.define(
				"InAcc.global.Function",
				{
					singleton : true, // 요게 있어야 set, get 메서드 사용가능..
					queryLayerName : "",
					colMapArray : [],
					comboArray : [],

					tableInfo : Ext.create('Ext.data.Store', {
						proxy : {
							type : 'ajax',
							url : './resources/data/tableInfo.json',
							reader : {
								type : 'json'
							}
						}
					}),
					/**
					 * GIS 데이터 가져오기 pContainer :
					 */
					getGeoNurisStore : function(pContainer) {

						// console.info(Ext.isString(param));
						// console.info(Ext.isObject({}));
						// console.info(Ext.isArray([]));
						// console.info(Ext.isNumeric(0.3232));

						var container = this.chkContainer(pContainer);

						if (container) {
							// console.info(container.queryLayerName);
							if (container.queryLayerName == "") {

								alert("레이어(구분)을 선택하세요.");
								return false;
							}

							this.queryLayerName = container.queryLayerName;

							this.getColArray(container);
							// console.info(this.colMapArray);
							var queryFilter = this.getQueryFilter();
							// console.info(queryWhere);
							var dataStore = this.getMapStore(queryFilter);

							this.colMapArray = [];

							return dataStore;
						}

						return false;
					},
					createGrid : function(data, confUrl) {

						var me = this;

						var recordData = null;
						var gridStore = null;

						var confStore = Ext.create('Ext.data.Store', {

							proxy : {
								type : 'ajax',
								url : confUrl,
								reader : {
									type : 'json'
								}
							}
						});

						confStore.load(function(record) {

							gridStore = Ext.create("Ext.data.Store", {
								// autoLoad: true,
								data : data
							});

							recordData = record[0].data;
						});

						var interval = 10; // 타이머 interval
						var interCnt = 0; // 타이머 실행 횟수
						var limitSec = 5; // 타이머 실행 제한 (초)
						var limitCnt = limitSec * 1000 / interval; // 타이머 실행 제한
																	// 횟수

						var timer = window
								.setInterval(
										function() {

											if (recordData != null) {

												// 타이머 중지
												window.clearInterval(timer);

												var bodyWidth = Ext.getBody()
														.getWidth();
												var bodyHeight = Ext.getBody()
														.getHeight();
												var windowWidth = bodyWidth - 300;
												var windowHeight = 300;

												var windowContainer = Ext.ComponentQuery
														.query("#southContainer")[0];

												if (windowContainer == undefined) {

													// windowContainer =
													// Ext.create("InAcc.view.south.SouthContainer");
													windowContainer = Ext
															.create(
																	"Ext.window.Window",
																	{
																		itemId : "southContainer",
																		title : "검색결과",
																		layout : {
																			type : "fit"
																		}
																	});
												}

												windowContainer.show();

												windowContainer
														.setWidth(windowWidth);
												windowContainer
														.setHeight(windowHeight);

												windowContainer.setX(bodyWidth
														- windowWidth);
												windowContainer.setY(bodyHeight
														- windowHeight);

												var tabContainer = windowContainer
														.query("#tabContainer")[0];

												if (tabContainer == undefined) {

													tabContainer = Ext
															.create(
																	"Ext.tab.Panel",
																	{

																		itemId : "tabContainer",
																		width : "100%",
																		height : "100%"
																	});

													windowContainer
															.add(tabContainer);
												}

												// tabContainer.setWidth(windowContainer.body.getWidth());
												// tabContainer.setHeight(windowContainer.body.getHeight());

												var grid = tabContainer
														.query("#"
																+ recordData.itemId)[0];

												if (grid == undefined) {

													var grid = Ext
															.create(
																	"Ext.grid.Panel",
																	{
																		closable : true,
																		itemId : recordData.itemId,
																		title : recordData.title,
																		width : recordData.width,
																		height : recordData.height,
																		columns : recordData.columns,
																		store : gridStore
																	});

													tabContainer.add(grid);
													tabContainer
															.setActiveTab(grid);
												} else {

													grid.setStore(gridStore);
												}
											} else {

												interCnt++;

												if (interCnt >= limitCnt) {

													// 타이머 중지
													window.clearInterval(timer);
													alert("제한시간 "
															+ limitSec
															+ "초를 초과하였습니다. 프로세스를 종료합니다.");
												}
											}
										}, interval);
					},
					chkContainer : function(pContainer) {

						var container = null;
						if (Ext.isString(pContainer)) {

							container = Ext.ComponentQuery.query("#"
									+ pContainer)[0];
						} else if (Ext.isObject(pContainer)) {

							container = pContainer;
						} else if (pContainer == null) {

							container = pContainer;
						} else {

							alert("파라메터 타입이 명확하지 않습니다.");
							return false;
						}

						return container;
					},
					getColArray : function(container) {

						var tmpItems = container.items;

						if (tmpItems != undefined) {

							if (Ext.isArray(tmpItems)) {

								for (var i = 0; i < tmpItems.length; i++) {

									if (tmpItems[i].colName != undefined) {

										var val = "";
										var colName = tmpItems[i].colName;
										var comparison = tmpItems[i].comparison;

										if (tmpItems[i].xtype == "textfield") {

											// console.info(tmpItems[i].getValue());
											val = tmpItems[i].getValue();
										}
										if (tmpItems[i].xtype == "combobox") {

											// console.info(tmpItems[i].getValue());
											// console.info(tmpItems[i].getDisplayValue());
											val = tmpItems[i].getValue();
										}
										if (tmpItems[i].xtype == "checkboxfield") {

											// console.info(tmpItems[i].getValue());
											// console.info(tmpItems[i].inputValue);
											val = tmpItems[i].inputValue;
										}
										if (tmpItems[i].xtype == "checkboxgroup") {

											// console.info(tmpItems[i].getValue());
											// console.info(tmpItems[i].getChecked());
											// console.info(tmpItems[i].getChecked()[0].inputValue);
											var chkValues = tmpItems[i]
													.getChecked();
											val = [];

											for (var chkCnt = 0; chkCnt < chkValues.length; chkCnt++) {

												val
														.push(chkValues[chkCnt].inputValue);
											}
										}
										if (tmpItems[i].xtype == "radiogroup") {

											// console.info(tmpItems[i].getValue());
											// console.info(tmpItems[i].getChecked());
											// console.info(tmpItems[i].getChecked()[0].inputValue);
											var chkValues = tmpItems[i]
													.getChecked();
											val = [];

											for (var chkCnt = 0; chkCnt < chkValues.length; chkCnt++) {

												val
														.push(chkValues[chkCnt].inputValue);
											}
										}

										if (colName != undefined && val != null
												&& val != "") {

											this.colMapArray.push({
												column : colName,
												value : val,
												comparison : comparison
											});
										}
									}

									this.getColArray(tmpItems[i]);
								}
							} else {

								this.getColArray(tmpItems);
							}
						}
					},
					getQueryFilter : function() {

						var andFilter = ol.format.filter.and();

						for (var i = 0; i < this.colMapArray.length; i++) {

							var orFilter = ol.format.filter.or();
							var tmpFilter = null;

							if (this.colMapArray[i].comparison == "LIKE") {

								tmpFilter = ol.format.filter.like(
										this.colMapArray[i].column,
										this.colMapArray[i].value);
							} else if (this.colMapArray[i].comparison == "=") {

								tmpFilter = ol.format.filter.equalTo(
										this.colMapArray[i].column,
										this.colMapArray[i].value);
							} else if (this.colMapArray[i].comparison == ">") {

								tmpFilter = ol.format.filter.greaterThan(
										this.colMapArray[i].column,
										this.colMapArray[i].value);
							} else if (this.colMapArray[i].comparison == ">=") {

								tmpFilter = ol.format.filter
										.greaterThanOrEqualTo(
												this.colMapArray[i].column,
												parseFloat(this.colMapArray[i].value));
							} else if (this.colMapArray[i].comparison == "<") {

								tmpFilter = ol.format.filter.lessThan(
										this.colMapArray[i].column,
										this.colMapArray[i].value);
							} else if (this.colMapArray[i].comparison == "<=") {

								tmpFilter = ol.format.filter.lessThanOrEqualTo(
										this.colMapArray[i].column,
										parseFloat(this.colMapArray[i].value));
							} else if (this.colMapArray[i].comparison == "<>") {

								tmpFilter = ol.format.filter.notEqualTo(
										this.colMapArray[i].column,
										this.colMapArray[i].value);
							} else if (this.colMapArray[i].comparison == "IN") {

								for (var j = 0; j < this.colMapArray[i].value.length; j++) {

									tmpFilter = ol.format.filter.equalTo(
											this.colMapArray[i].column,
											this.colMapArray[i].value[j]);

									if (orFilter.conditionA == undefined) {

										orFilter.conditionA = tmpFilter;
									} else if (orFilter.conditionB == undefined) {

										orFilter.conditionB = tmpFilter;
									} else {

										var tmpOrFilter = ol.format.filter.or();
										tmpOrFilter.conditionA = orFilter;
										tmpOrFilter.conditionB = tmpFilter;
										orFilter = tmpOrFilter;
									}
								}

								// console.info(orFilter);
								tmpFilter = orFilter;
							}

							if (andFilter.conditionA == undefined) {

								andFilter.conditionA = tmpFilter;
							} else if (andFilter.conditionB == undefined) {

								andFilter.conditionB = tmpFilter;
							} else {

								var tmpAndFilter = ol.format.filter.and();
								tmpAndFilter.conditionA = andFilter;
								tmpAndFilter.conditionB = tmpFilter;
								andFilter = tmpAndFilter;
							}
						}

						// console.info(andFilter);
						return andFilter;
					},
					getMapStore : function(queryFilter) {

						var me = this;

						// return;
						/* 조건설정 완료 후 삭제할 것 */
						/*
						 * queryFilter = ol.format.filter.or(
						 * ol.format.filter.like('NGJI_IDN','414*'),
						 * ol.format.filter.like('NGJI_IDN','2637*') );
						 */
						/* 조건설정 완료 후 삭제할 것 끝 */

						var featureRequest = new ol.format.WFS()
								.writeGetFeature({
									srsName : "EPSG:5179",
									featureTypes : [ me.queryLayerName ],
									outputFormat : 'application/json',
									geometryName : 'SHAPE',
									maxFeatures : 300,
									filter : queryFilter,
								});

						var data = [];

						$.ajax({
							url : InAcc.global.Variable.getProxyUrl()
									+ InAcc.global.Variable.getMapServiceUrl(),
							type : 'POST',
							data : new XMLSerializer()
									.serializeToString(featureRequest),
							// async : false,
							contentType : 'text/xml',
							success : function(response_) {
								// console.info(response_);
								var features = new ol.format.GeoJSON()
										.readFeatures(response_);
								// console.log( features );

								for (var i = 0; i < features.length; i++) {

									data.push(features[i].values_);
								}
							}
						});

						return data;
					},
					getComboArray : function(container) {

						var tmpItems = container.items;

						if (tmpItems != undefined) {

							if (Ext.isArray(tmpItems)) {

								for (var i = 0; i < tmpItems.length; i++) {

									if (tmpItems[i].lCode != undefined) {

										if (tmpItems[i].xtype == "combobox") {

											// console.info(tmpItems[i].getValue());
											// console.info(tmpItems[i].getDisplayValue());
											this.comboArray.push(tmpItems[i]);
										}
									}

									this.getComboArray(tmpItems[i]);
								}
							} else {

								this.getComboArray(tmpItems);
							}
						}
					},
					setComboStore : function(container) {

						this.getComboArray(container);
						var arrCombo = this.comboArray;

						this.tableInfo
								.load(function(record) {

									for (var arrCnt = 0; arrCnt < arrCombo.length; arrCnt++) {

										var recIdx = record.map(function(obj) {
											return obj.data.L_CODE;
										}).indexOf(arrCombo[arrCnt].lCode);

										var storeData = [];

										var sItem = record[recIdx].data.S_ITEM;

										var storeBind = Ext.create(
												'Ext.data.Store', {
													fields : [ 'S_CODE',
															'S_NAME' ],
													data : sItem
												});

										arrCombo[arrCnt].bindStore(storeBind);
									}
								});
					},

					getSido : function() {

						// $('#sidoSelect').append('<option>aaa</option>');

						var coreMap = Ext.getCmp("_mapDiv_");
						coreMap.sidoGeometry = [];

						// var proxy = "./resources/Proxy.jsp?url="
						var proxy = "./resources/Proxy.jsp?url=";

						var featureRequest = new ol.format.WFS()
								.writeGetFeature({
									srsName : "EPSG:5179",
									featureTypes : [ 'NK_SIDO' ],
									outputFormat : 'application/json',
									geometryName : 'SHAPE',
									maxFeatures : 300
								});

						// console.info(coreMap.map.getExtent());

						$
								.ajax({
									url : proxy
											+ 'http://202.68.238.120:8880/geonuris/wfs?GDX=NK_Test.xml',
									type : 'POST',
									data : new XMLSerializer()
											.serializeToString(featureRequest),
									async : false,
									contentType : 'text/xml',
									success : function(response_) {
										var features = new ol.format.GeoJSON()
												.readFeatures(response_);

										var receiveData = [];

										// containsXY
										Ext.each(features, function(media,
												index) {
											console.info(media);
											coreMap.sidoGeometry
													.push(media.values_);

											var nameVal = media.values_.SD_NM;
											var idVal = media.values_.SD_CD;

											receiveData.push({
												id : idVal,
												name : nameVal
											});

										});

										for (var i = 0; i < receiveData.length; i++) {
											$('#sidoSelect')
													.append(
															'<option value='
																	+ receiveData[i].id
																	+ ' >'
																	+ receiveData[i].name
																	+ '</option>');
										}

									}

								});

					},

					getSgg : function(sidoCd) {

						var coreMap = Ext.getCmp("_mapDiv_");
						coreMap.sggGeometry = [];

						var proxy = "./resources/Proxy.jsp?url="

						var featureRequest = new ol.format.WFS()
								.writeGetFeature({
									srsName : "EPSG:5179",
									featureTypes : [ 'NK_SGG' ],
									outputFormat : 'application/json',
									geometryName : 'SHAPE',
									maxFeatures : 300,
									filter : ol.format.filter.like('ADMCD',
											sidoCd + '*')
								});

						$
								.ajax({
									url : proxy
											+ 'http://202.68.238.120:8880/geonuris/wfs?GDX=NK_Test.xml',
									type : 'POST',
									data : new XMLSerializer()
											.serializeToString(featureRequest),
									async : false,
									contentType : 'text/xml',
									success : function(response_) {
										var features = new ol.format.GeoJSON()
												.readFeatures(response_);
										var receiveData = [];
										Ext.each(features, function(media,
												index) {

											coreMap.sggGeometry
													.push(media.values_);

											var nameVal = media.values_.SGG_NM;
											var idVal = media.values_.ADMCD;

											receiveData.push({
												id : idVal,
												name : nameVal
											});

										});
										$('#sggSelect *').remove();
										$('#sggSelect').append(
												'<option>시군구</option>');
										for (var i = 0; i < receiveData.length; i++) {
											$('#sggSelect')
													.append(
															'<option value='
																	+ receiveData[i].id
																	+ ' >'
																	+ receiveData[i].name
																	+ '</option>');
										}
									}
								});

					}
				});