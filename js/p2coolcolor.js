//break 3dgraph code dependency

var avgTime = 12; //12*5min=1hr of data
var aTMin = avgTime*5;

function storePayout(){
	
}

function getStatAvg(arr,deep){
	if(arr!='undefined'){
		var n = arr.length-1;
		var o = n-deep;
		var a = new Array();
		for (var i=n;i>o;i--){
			//writeConsole(i+" - "+arr[i]);
			a.push(arr[i]);
		}
		var avg = avgArray(a); //ignores 0
		//writeConsole(avg);
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
		cur = Math.round(0);
		break;
	default:
	  writeConsole("p2coolcolor.js case: "+inp+" not specified");
	}
	
	if(thisPage=="dash"){
		if(cur>avg){
			var f = Math.round((cur-avg)/rng);
			if(f>5)f=5;
			var r=255-(f*25);
			var g=255-(f*5);
			var b=255-(f*25);
			//writeConsole(r+" "+g+" "+b);
			elm.style.backgroundColor = "rgb("+r+","+g+","+b+")"; //full green	ratio 1:5:1
		}
		if(cur<avg){
			var f = Math.round((avg-cur)/rng);
			if(f>5)f=5;
			var r=255-(f*5);
			var g=255-(f*25);
			var b=255-(f*25);
			//writeConsole(r+" "+g+" "+b);
			elm.style.backgroundColor = "rgb("+r+","+g+","+b+")"; //full green	ratio 1:5:1
		}

	} else if(thisPage=="min"){
		if(cur>avg){
			var f = Math.round((cur-avg)/rng);
			if(f>5)f=5;
			var r=255-(f*25);
			var g=255-(f*5);
			var b=255-(f*25);
			//writeConsole(r+" "+g+" "+b);
			elm.style.color = "rgb("+r+","+g+","+b+")"; //full green	ratio 1:5:1
		}
		if(cur<avg){
			var f = Math.round((avg-cur)/rng);
			if(f>5)f=5;
			var r=255-(f*5);
			var g=255-(f*25);
			var b=255-(f*25);
			//writeConsole(r+" "+g+" "+b);
			elm.style.color = "rgb("+r+","+g+","+b+")"; //full green	ratio 1:5:1
		}
	}
}