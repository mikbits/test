var changeStateEW = (function () {
    var state = 0,
        lamps = ["Red", "Yellow", "Green"],
        lampsLength = lamps.length,
        orderEW = [
            [10000, "Green"],
            [6000, "Yellow"],
            [16000, "Red"]
        ],
        orderLength = orderEW.length,
        lampIndex,
        orderIndex,
        sIdEW;

    return function (stop) {
        if (stop) {
            clearTimeout(sIdEW);
            return;
        }

        var lamp,
        lampDOM;

        for (lampIndex = 0; lampIndex < lampsLength; lampIndex += 1) {
            lamp = lamps[lampIndex];
            lampDOME = document.getElementById(lamp+"East");
			lampDOMW = document.getElementById(lamp+"West");
            if (orderEW[state].indexOf(lamp) !== -1) {
                lampDOME.classList.add("lamp" + lamp);
				lampDOMW.classList.add("lamp" + lamp);
            } else {
                lampDOME.classList.remove("lamp" + lamp);
				lampDOMW.classList.remove("lamp" + lamp);
            }
        }
		
        sIdEW = setTimeout(changeStateEW, orderEW[state][0]);
        state += 1;
        if (state >= orderLength) {
            state = 0;
        }
    };
}());

var changeStateNS = (function () {
    var stateNS = 0,
        lamps = ["Red", "Yellow", "Green"],
        lampsLength = lamps.length,
		orderNS = [
            [16000, "Red"],
            [10000, "Green"],
            [6000, "Yellow"]
        ],
        orderLength = orderNS.length,
        lampIndex,
        orderIndex,
        sIdNS;

    return function (stop) {
        if (stop) {
            clearTimeout(sIdNS);
            return;
        }

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
		
        sIdNS = setTimeout(changeStateNS, orderNS[stateNS][0]);
        stateNS += 1;
        if (stateNS >= orderLength) {
            stateNS = 0;
        }
    };
}());
document.getElementById("trafficLight").addEventListener("click", (function () {
    var state = false;
    
    return function () {
        changeStateEW(state);
		changeStateNS(state);
        state = !state;
    };
}()), false);