var avgTime = 12; //12*5min=1hr of data
var aTMin = avgTime*5;

function getStatAvg(arr,deep){
	if(arr!='undefined'){
		var n = arr.length-1;
		var o = n-deep;
		var a = new Array();
		for (var i=n;i>o;i--){
			a.push(arr[i]);
		}
		var avg = avgArray(a); //ignores 0
		return avg;
	}else{
		return 0;
	}
}

function colorStat(elm,inp,thisPage){
	//writeConsole(mrarr);
	var cur = 0;
	var avg = 0;
	var rng = 0;
	switch(inp){
	case 0:
		cur = Math.round(localspeed/1000000);
		for(var i=0;i<activeMiners;i++){
			if(minarr[i]!='undefined'){
				avg+=getStatAvg(minarr[i],avgTime);
			}
		}
		rng = Math.round(avg/20); //20 sensitivity 10 would be less
		break;
	case 1:
		var foo;
		break;
	default:
	  writeConsole("p2coolcolor.js case: "+inp+" not specified");
	}

	if(thisPage=="dash"){
		if(cur>avg){
			var f = Math.round((cur-avg)/rng);
			if(f>5)f=5;
			var r=d2h(255-(f*25));
			var g=d2h(255-(f*5));
			var b=d2h(255-(f*25));
			//writeConsole(r+" "+g+" "+b);
			elm.style.backgroundColor = "#"+r+""+g+""+b;
		}
		if(cur<avg){
			var f = Math.round((avg-cur)/rng);
			if(f>5)f=5;
			var r=d2h(255-(f*5));
			var g=d2h(255-(f*25));
			var b=d2h(255-(f*25));
			//writeConsole(r+" "+g+" "+b);
			elm.style.backgroundColor = "#"+r+""+g+""+b;
		}
	} else if(thisPage=="min"){
		if(cur>avg){
			var f = Math.round((cur-avg)/rng);
			if(f>5)f=5;
			var r=d2h(255-(f*25));
			var g=d2h(255-(f*5));
			var b=d2h(255-(f*25));
			elm.style.color = "#"+r+""+g+""+b;
		}
		if(cur<avg){
			var f = Math.round((avg-cur)/rng);
			if(f>5)f=5;
			var r=d2h(255-(f*5));
			var g=d2h(255-(f*25));
			var b=d2h(255-(f*25));
			elm.style.color = "#"+r+""+g+""+b; //full green	ratio 1:5:1
		}
	}
}
