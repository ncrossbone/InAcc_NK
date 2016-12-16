/** 전역 변수 클래스
 *  config 속성의 변수를 get, set 메서드로 접근 가능함. (get변수명, set변수명)
 *  get, set 뒤 첫 알파벳은 대문자로 할 것
 *  ex) setGlobalTest(1234), getGlobalTest()
 *  requires: ["KRF.global.Var"], : Ext.application에 한번만 선언하면 됨
 *  참고
 *    - http://jsfiddle.net/prajavk/YhuWT/
 *    - https://wikidocs.net/3384 5.글로벌 변수 사용 */
Ext.define("InAcc.global.Variable", {
	singleton : true, // 요게 있어야 set, get 메서드 사용가능..
	config: {
		mapServiceUrl: null,
		proxyUrl: null
	},
	constructor: function(){
		
		var me = this;
		
		var confStore = Ext.create('Ext.data.Store', {
			
			proxy : {
				type : 'ajax',
				url : "./resources/config/AppVariable.conf",
				reader : {
					type : 'json'
				}
			}
		});

		confStore.load(function(record) {
			
			console.info(record);
			me.setMapServiceUrl(record[0].data.mapServiceUrl);
			me.setProxyUrl(record[0].data.proxyUrl);
			
			console.info(me.getMapServiceUrl());
		});
	}
});