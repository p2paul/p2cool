function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}
function getHigh(arr){
	var hi=0;

	for(var i=0;i<arr.length;i++){
		if(arr[i]>hi){
			hi = arr[i];
		}
	}
	return hi;
}
function getLow(arr){
	var lo=arr[0];
	for(var i=0;i<arr.length;i++){
		if(arr[i]<lo){
			lo=arr[i];
		}
	}
	return lo;
}
function scale(data,low,high,tlow,thigh){
	return((data-low)/(high-low)*thigh);
}

function compArray(a,fac,avgMe){
	var b = new Array();
	var c = new Array(0);
	nLen = Math.floor(a.length/fac);
	for(var i=0;i<=nLen;i++){
		b[i]=a[i*fac];
		if(avgMe){
			c[i]=0;
			for(var j=0;j<((i*fac));j++){
				c[i] = a[(i*fac)+j]+c[i];
			}
		}
	}
	if(avgMe){
		b[i] = avgArray(c);
	}
	return b;
	
}
function avgArray(a){
	var c = a.length;
	var b = 0;
	for (var i=0;i<a.length;i++){
		if ((isNaN(a[i]))||(a[i]==0)) {
			a[i]=0;
			c--;
		}else{
			b+=a[i];
		}
	}
	b = b/c;
	b=Math.round(b);
	return b;
}

//decimal to hex
function d2h(d) {
	var hex = d.toString(16);
	while (hex.length < 2) {
        hex = "0" + hex;
    }
	return hex;
}
