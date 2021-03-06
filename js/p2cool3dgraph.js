var zZero = false;

function noZ(elm){
	if(elm.checked){
		zZero=true;
	}else{
		zZero=false;
	}
	getJSONdata();
}

function load3D(xx,yy,zz,names){  
	var g = new canvasGraph('agraph');  
	var gData=new Array();
	
	xx = compArray(xx,graphComp);
	zz = compArray(zz,graphComp);
	var leng=xx.length;
	var yHi = topSpeed;
	
	// time speed share miner_names // xx yy zz names
	var yy = new Array();
	for(var v=0;v<uniqueMinerNames.length;v++){
		yy[v] = new Array();
		yy[v] = compArray(minarr[v],graphComp,true);
	}
	var xHi = getHigh(xx);
	var xLo = getLow(xx);
	//var yHi = getHigh(yy);
	//var yLo = getLow(yy);
	var zHi = getHigh(zz);
	var zLo = getLow(zz);

	var tmp=leng-leng;
	for(var i=tmp;i<leng;i++){
		gData[i-tmp]=new Array();
		var _x = parseInt(scale(xx[i],xLo,xHi,0,1000));
		var _y=0;
		for(var v=0;v<uniqueMinerNames.length;v++){
			_y += yy[v][i];
		}

		_y = parseInt(scale(_y,0,yHi,0,1000));
		if(isNaN(_y)) _y = 0;

		var _z=0;
		if(zZero){
			_z=990;
		}else{
			_z = parseInt(scale(zz[i],zLo,zHi,0,1000));
			if(isNaN(_z)) _z = 0;
		}
		//writeConsole(_x+" _ "+_y+" _ "+_z);
		gData[i-tmp]={x:_x, y:_y, z:_z};
	}
	g.drawGraph(gData);
}
