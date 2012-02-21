
function load3D(xx,yy,zz,names){  
	var fac = graphComp;
	
	var g = new canvasGraph('agraph');  
	var gData=new Array();
	
	xx = compArray(xx,fac);
	zz = compArray(zz,fac);
	var leng=xx.length;
	
	var yHi = topSpeed;
	
	// time speed share miner_names // xx yy zz names 
	for(var v=0;v<uniqueMinerNames.length;v++){
		yy[v] = new Array();
		yy[v] = compArray(minarr[v],fac,true);
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
		
		var _z = parseInt(scale(zz[i],0,zHi,0,1000));
		gData[i-tmp]={x:_x, y:_y, z:_z};
	}
	g.drawGraph(gData);
	//printArray(minarr);
}