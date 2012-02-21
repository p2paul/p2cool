//break 3dgraph code dependency

var avgTime = 12; //12*5min=1hr of data
var aTMin = avgTime*5;

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

function colorStat(elm,thisPage){
	//writeConsole(mrarr);
	var cur = Math.round(localspeed/1000000);
	var avg = 0;
	for(var i=0;i<activeMiners;i++){
		if(minarr[i]!='undefined'){
			avg+=getStatAvg(minarr[i],avgTime);
		}
	}
	//writeConsole("cur: "+cur+" - avg: "+avg+"/"+aTMin+" mins");
	var range = Math.round(avg/20); //20 sensitivity 10 would be less
	var col="";
	if(cur>avg){
		var f = Math.round((cur-avg)/range);
		if(f>5)f=5;
		var r=255-(f*25);
		var g=255-(f*5);
		var b=255-(f*25);
		//writeConsole(r+" "+g+" "+b);
		elm.style.backgroundColor = "rgb("+r+","+g+","+b+")"; //full green	ratio 1:5:1
	}
	if(cur<avg){
		var f = Math.round((avg-cur)/range);
		if(f>5)f=5;
		var r=255-(f*5);
		var g=255-(f*25);
		var b=255-(f*25);
		//writeConsole(r+" "+g+" "+b);
		elm.style.backgroundColor = "rgb("+r+","+g+","+b+")"; //full green	ratio 1:5:1
	}
	/*
	if(thisPage=="dash"){
		elm.style.backgroundColor = "rgb(255,51,51)"; //full red 	ratio 5:1:1
		elm.style.backgroundColor = "rgb(51,255,51)"; //full green	ratio 1:5:1
	} else if(thisPage=="min"){
		
	}
	*/
}