(function() {
	var TLM = {
		init: function() {
			var _this = this;
			document.getElementById("trafficLight").addEventListener("click", _this.bindEvent, false);
		},
		bindEvent: function(){
			TLM.changeStateEW();
			TLM.changeStateNS();
		},
		changeStateEW : (function(){
				var stateEW = 0,
				lampTime = 5000,
				yellowLampTime = 3000,
				lamps = ["Red", "Yellow", "Green"],
				lampsLength = lamps.length,
				orderEW = [
					[lampTime, "Green"],
					[yellowLampTime, "Yellow"],
					[lampTime+yellowLampTime, "Red"]
				],
				orderLength = orderEW.length,
				lampIndex,
				orderIndex,
				sIdEW;

			return function () {
				
				setTimeout(function(){clearTimeout(sIdEW);return;},64000);

				var lamp,
				lampDOM;

				for (lampIndex = 0; lampIndex < lampsLength; lampIndex += 1) {
					lamp = lamps[lampIndex];
					lampDOME = document.getElementById(lamp+"East");
					lampDOMW = document.getElementById(lamp+"West");
					if (orderEW[stateEW].indexOf(lamp) !== -1) {
						lampDOME.classList.add("lamp" + lamp);
						lampDOMW.classList.add("lamp" + lamp);
					} else {
						lampDOME.classList.remove("lamp" + lamp);
						lampDOMW.classList.remove("lamp" + lamp);
					}
				}
				
				sIdEW = setTimeout(TLM.changeStateEW, orderEW[stateEW][0]);
				stateEW += 1;
				if (stateEW >= orderLength) {
					stateEW = 0;
				}
			};
		})(),
		
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

				setTimeout(function(){clearTimeout(sIdNS);return;},64000);
				
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
		}())
	};
	
	TLM.LampTime = 5000;
	TLM.YellowLampTime = 3000;
	TLM.init();
})();