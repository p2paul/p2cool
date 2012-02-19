function load3D(xx,yy,zz,names){  
	var fac = graphComp;
	
	var g = new canvasGraph('agraph');  
	var gData=new Array();
	
	//spot miner names
	var mi = 0;
	var uniqueMinerNames = new Array();
	var minerIsActive = new Array();
	var activeMiners = 0;
	var minarr = new Array();
	for (var q=0;q<yy.length-1;q++){
		for(var t=0;t<names[q].length;t++){
			if ((uniqueMinerNames.indexOf(names[q][t]) == -1)&&(typeof names[q][t] != 'undefined')){
				uniqueMinerNames.push(names[q][t]);
				
				minarr[mi]=new Array();
				mi++;
			}
		}
	}
			
	for (var q=1;q<xx.length;q++){
		for(var t=0;t<uniqueMinerNames.length;t++){
		//$('#console').append(q+" "+t+": "+yy[q][t]+"\n");
			if(typeof yy[q][t] != 'undefined'){
				minarr[t].push(Math.round(yy[q][t]/1000000));
			} else {
				minarr[t].push(0);
			}
		}
	}
	//$('#console').append(minarr[0]+" - "+minarr[1]+" - "+minarr[2]+" - "+minarr[3]+"\n");
	xx = compArray(xx,fac);
	zz = compArray(zz,fac);
	var leng=zz.length;
	var yHi = 0;
	
	//only getHigh for active miners
	
	for(var v=0;v<uniqueMinerNames.length;v++){
		if (minarr[v][minarr[v].length-1]==0){
			minerIsActive[v]=false;
		}else{
			//$('#console').append(minarr[v][minarr[v].length-1]+"\n");
			minerIsActive[v]=true;
			activeMiners++;
			yHi += getHigh(minarr[v]);
		}
		yy[v] = new Array();
		yy[v] = compArray(minarr[v],fac,true);
		//$('#console').append(uniqueMinerNames[v]+": "+minarr[v][minarr[v].length-1]+"\n");
	}
	// time speed share miner_names // xx yy zz names 
	
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
}