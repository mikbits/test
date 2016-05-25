
	var TLM = {
		init: function() {
			var _this = this;
			document.getElementById("trafficLight").addEventListener("click", _this.bindEvent, false);
		},
		bindEvent: function(){
			TLM.changeStateEW();
			TLM.changeStateNS();
			TLM.fun();
		},
		temp:0,
		fun:function(){
			TLM.temp+=1;
			alert(TLM.temp);
			setTimeout(TLM.fun,1000);
		},
		stateEW :0,
		lampTime : 5000,
		yellowLampTime : 3000,
		sIdEW:null,		
		changeStateEW : function(){				
			setTimeout(function(){clearTimeout(TLM.sIdEW);return;},TLM.totalTiime);
			var lamp,
			lampDOM;
			for (lampIndex = 0; lampIndex < TLM.lamps.length; lampIndex += 1) {
				lamp = TLM.lamps[lampIndex];
				lampDOME = document.getElementById(lamp+"East");
				lampDOMW = document.getElementById(lamp+"West");
				if (TLM.orderEW[TLM.stateEW].indexOf(lamp) !== -1) {
					lampDOME.classList.add("lamp" + lamp);
					lampDOMW.classList.add("lamp" + lamp);
				} else {
					lampDOME.classList.remove("lamp" + lamp);
					lampDOMW.classList.remove("lamp" + lamp);
				}
			}
			
			TLM.sIdEW = setTimeout(TLM.changeStateEW, TLM.orderEW[TLM.stateEW][0]);
			TLM.stateEW += 1;
			if (TLM.stateEW >= TLM.lamps.length) {
				TLM.stateEW = 0;
			}
	},
		changeStateNS : (function () {
				var stateNS = 0,
				lampTime = 5000,
				yellowLampTime = 3000,
				lamps = ["Red", "Yellow", "Green"],
				lampsLength = lamps.length,
				orderNS = [
					[lampTime+yellowLampTime, "Red"],
					[lampTime, "Green"],
					[yellowLampTime, "Yellow"]
				],
				orderLength = orderNS.length,
				lampIndex,
				orderIndex,
				sIdNS;

			return function () {

				setTimeout(function(){clearTimeout(sIdNS);return;},TLM.totalTiime);
				
				var lamp,
				lampDOM;
				
				for (lampIndex = 0; lampIndex < lampsLength; lampIndex += 1) {
					lamp = lamps[lampIndex];
					lampDOMN = document.getElementById(lamp+"North");
					lampDOMS = document.getElementById(lamp+"South");
					if (orderNS[stateNS].indexOf(lamp) !== -1) {
						lampDOMN.classList.add("lamp" + lamp);
						lampDOMS.classList.add("lamp" + lamp);
					} else {
						lampDOMN.classList.remove("lamp" + lamp);
						lampDOMS.classList.remove("lamp" + lamp);
					}
				}
				
				sIdNS = setTimeout(TLM.changeStateNS, orderNS[stateNS][0]);
				stateNS += 1;
				if (stateNS >= orderLength) {
					stateNS = 0;
				}
			};
		}()),
		totalTiime:30000
	};
	TLM.orderEW = [
					[TLM.lampTime, "Green"],
					[TLM.yellowLampTime, "Yellow"],
					[TLM.lampTime+TLM.yellowLampTime, "Red"]
				];
	TLM.lamps = ["Red", "Yellow", "Green"];
	TLM.init();
