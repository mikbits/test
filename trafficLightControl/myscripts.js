
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
			setTimeout(function(){TLM.fun();document.getElementById("funTime").innerHTML= Math.floor(TLM.temp/60)+":"+TLM.temp%60;},1000);
			TLM.temp+=1;
		},
		stateEW :0,
		lampTime : 5000,
		yellowLampTime : 3000,
		sIdEW:null,
		changeLampColor	: function(direction){
			var dir1,dir2,state,order;
			if(direction ==="EW"){
				dir1="East";
				dir2="West";
				state = TLM.stateEW;
				order = TLM.orderEW;
			}else if(direction ==="NS"){
				dir1="North";
				dir2="South";
				state = TLM.stateNS;
				order = TLM.orderNS;
			}
			var lamp,
			lampDOM;
			for (var lampIndex = 0; lampIndex < TLM.lamps.length; lampIndex += 1) {
				lamp = TLM.lamps[lampIndex];
				lampDOM1 = document.getElementById(lamp+dir1);
				lampDOM2 = document.getElementById(lamp+dir2);
				if (order[state].indexOf(lamp) !== -1) {
					lampDOM1.classList.add("lamp" + lamp);
					lampDOM2.classList.add("lamp" + lamp);
				} else {
					lampDOM1.classList.remove("lamp" + lamp);
					lampDOM2.classList.remove("lamp" + lamp);
				}
			}
		},	
		changeStateEW : function(){				
			setTimeout(function(){clearTimeout(TLM.sIdEW);return;},TLM.totalTiime);
			TLM.changeLampColor("EW");
			TLM.sIdEW = setTimeout(TLM.changeStateEW, TLM.orderEW[TLM.stateEW][0]);
			TLM.stateEW += 1;
			if (TLM.stateEW >= TLM.lamps.length) {
				TLM.stateEW = 0;
			}
		},
		stateNS : 0,
		sIdNS : null,
		changeStateNS : function () {
				setTimeout(function(){clearTimeout(TLM.sIdNS);return;},TLM.totalTiime);
				TLM.changeLampColor("NS");
				TLM.sIdNS = setTimeout(TLM.changeStateNS, TLM.orderNS[TLM.stateNS][0]);
				TLM.stateNS += 1;
				if (TLM.stateNS >= TLM.lamps.length) {
					TLM.stateNS = 0;
				}

		},
		totalTiime:30000
	};
	
	TLM.lamps = ["Red", "Yellow", "Green"];
	TLM.orderEW = [
					[TLM.lampTime, "Green"],
					[TLM.yellowLampTime, "Yellow"],
					[TLM.lampTime+TLM.yellowLampTime, "Red"]
				];
	TLM.orderNS = [
					[TLM.lampTime+TLM.yellowLampTime, "Red"],
					[TLM.lampTime, "Green"],
					[TLM.yellowLampTime, "Yellow"]
				]
	TLM.init();
