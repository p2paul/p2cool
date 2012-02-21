/*
    p2cool a javascript stats display for p2pool
    Copyright (C) 2012  p2paul

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
var funcTimedOut = 8000;
var timeOutTimer;
var thisPage="";

var htxt="http://";

var inputs = new Array(); //array to store stat elements

var li = get_cookie('LocalIP');  //comment this
//var li = "127.0.0.1:9332";  //change and uncomment this


var onLoginScreen = true;
var show3dGraph = 0;
var rr = get_cookie('RefreshRate');

//Spin controls
var graphComp = 9;
var refreshRate = 30;

function dashLoaded(){
	thisPage="dash";
	if(get_cookie('Show3dGraph')==1){
		document.getElementById("graph3dcheck").checked = true;
		show3dGraph=1;
	}else{
		document.getElementById("graph3dcheck").checked = false;
		show3dGraph=0;
	}
	if(rr!=undefined){
		refreshRate=rr;
	}
	if(li==undefined){  //if ip is undefined prompt
		document.getElementById('apDiv0').style.display = "block";
		document.forms.form0.p2poolip.focus();
	} else {			//not on "login" screen
		onLoginScreen = false;
		timeOutTimer=setTimeout("derpMe()",funcTimedOut);
		document.getElementById('apDiv1').style.display = "block";
		document.getElementById("dispIP").innerHTML = li;
		getJSONdata();
		loadGraphImages();
		drawSpinControls();
		inputs[0]=document.form1.lcspd;
	}
	var nwd = window.innerWidth;
	var ndp = parseInt((nwd - 820) / 2)+"px";
	document.getElementById("MainContainer").style.marginLeft = ndp;
}

function minLoaded(){
	thisPage = "min";
	if(rr!=undefined){
		refreshRate=rr;
	}
	if(li==undefined){
		document.getElementById('apDiv0').style.display = "block";
		document.forms.form0.p2poolip.focus();
	} else {
		onLoginScreen = false;
		timeOutTimer=setTimeout("derpMe()",funcTimedOut);
		document.getElementById('apDiv1').style.display = "block";
		getJSONdata();
		//loadGraphImages();
		drawSpinControls('minimal');
	}
}

function derpMe(){
	window.stop();
	if(thisPage=="dash"){
		var answer = confirm('Couldn\'t connect to specified address: '+li+'\ntimeout='+funcTimedOut+'\n\nWould you like to try another ip?');
		if (answer) remIP();
	} else if(thisPage=="min"){
		remIP();
	}
}

function checkInput(form){
	//alert(form.p2poolip.value);
	li = document.getElementById('IPIN').value;
	document.getElementById('IPIN').value = "";
	set_cookie('LocalIP', li, 365);
	document.getElementById('apDiv1').style.display = "block";
	document.getElementById('apDiv0').style.display = "none";
	if(document.getElementById("dispIP")!=undefined)document.getElementById("dispIP").innerHTML = li;
	timeOutTimer=setTimeout("derpMe()",funcTimedOut);
	getJSONdata();
	if(thisPage=="min"){
		drawSpinControls('minimal');
	}else if(thisPage=="dash"){
		loadGraphImages();
		drawSpinControls();
	}
}

function toggle3dGraph(box){
	if(box.checked){
		set_cookie('Show3dGraph',1,365);
		show3dGraph = 1;
	} else {
		set_cookie('Show3dGraph',0,365);
		show3dGraph = 0;
	}
	getJSONdata();
}

function keyHandler(e){
	if (onLoginScreen){
		var charCode;
		if(e && e.which){
			charCode = e.which;
		}else if(window.event){
			e = window.event;
			charCode = e.keyCode;
		}
		
		if(e.keyCode == 13 || e.keyCode == 39) { //enterkey or right arrow
			checkInput(document.form0);
		}
	}
}
document.onkeypress=keyHandler;

var graphsarr=new Array(
0,
'/graphs/localrate_day',
'/graphs/localrate_week',
'/graphs/localrate_month',
'/graphs/poolrate_day',
'/graphs/poolrate_week',
'/graphs/poolrate_month'
);

function selectGraph(graphNum){
	for (var i=1;i<7;i++){
		if (graphNum==i){
			document.bigGraph.src = htxt+li+graphsarr[i];
			set_cookie('FavGraph',i,365);
		}
	}
}

function remIP(){
	del_cookie('LocalIP');
	history.go(0);
}

function loadGraphImages(){
	var fg = parseInt(get_cookie('FavGraph'));
	if (fg>0&&fg<7){
		document.bigGraph.src = htxt+li+graphsarr[fg];
	}else{
		document.bigGraph.src = htxt+li+graphsarr[1];
	}
	for (var i=1;i<7;i++){
		document.getElementById('graph'+i).src = htxt+li+graphsarr[i];
	}
}

function noClutter() {
	var NewWinHeight=280;
	var NewWinWidth=140;
	var NewWinPutX=10;
	var NewWinPutY=10;
	TheNewWin =window.open("minimal.html",'p2pool dashboard','fullscreen=no,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no');
	TheNewWin.resizeTo(NewWinWidth,NewWinHeight);
	//TheNewWin.moveTo(NewWinPutX,NewWinPutY);
}


window.onresize = function(event){
	if(thisPage=="dash"){
		var nwd = window.innerWidth;
		var ndp = parseInt((nwd - 820) / 2)+"px";
		document.getElementById('MainContainer').style.marginLeft = ndp;
	}
}
function checkTime(i){
	if (i<10){
		i="0" + i;
	}
	return i;
}
function getCurrentTime(){
	var d = new Date();
	var h=d.getHours();
	var m=d.getMinutes();
	var s=d.getSeconds();
	h=checkTime(h);
	m=checkTime(m);
	s=checkTime(s);
	return(h+":"+m+":"+s);
}

var cbfr=0;
function writeConsole(str){
	if(cbfr>50){
		$("#console").empty();
		cbfr=0;
	}
	$("#console").prepend(str+"\n");
	cbfr++;
}
function printArray(a){
	document.write("<table width=\"100\" border=\"1\">");
	for (var i=0; i<a.length; i++) {
		document.write("<tr><td>" +i+ "</td><td>" +a[i]+ "</td></tr>");
	}
	document.write("</table>");
	document.close();
}

var ssarr = new Array(); //stale_shares
var mnarr = new Array(); //local_hash_rates  key  (miner name)
var mrarr = new Array(); //local_hash_rates value (miner data)
var prarr = new Array(); //pool_hash_rate
var sharr = new Array(); //shares
var psarr = new Array(); //pool_stale_prop
var tmarr = new Array(); //time
var sdarr = new Array(); //stale_shares_breakdown.doa
var soarr = new Array(); //stale_shares_breakdown.orphan
var mdarr = new Array(); //local_dead_hash_rates (miner data)

var localspeed = 0; // current local speed
var rf;
var uptime;

var minarr = new Array();
var topSpeed = 0;

function clearVars(){
	minarr= [];
	ssarr = [];
	mnarr = [];
	mrarr = [];
	prarr = [];
	sharr = [];
	psarr = [];
	tmarr = [];
	sdarr = [];
	soarr = [];
	mdarr = [];
	uniqueMinerNames = [];
	minerIsActive = [];
	activeMiners = 0;
	topSpeed = 0
}
function sortMinerData(){
	//spot miner names
	var mi = 0;
	for (var q=0;q<mrarr.length-1;q++){
		for(var t=0;t<mnarr[q].length;t++){
			if ((uniqueMinerNames.indexOf(mnarr[q][t]) == -1)&&(typeof mnarr[q][t] != 'undefined')){
				uniqueMinerNames.push(mnarr[q][t]);
				minarr[mi]=new Array();
				mi++;
			}
		}
	}
	for (var q=0;q<tmarr.length-1;q++){
		for(var t=0;t<uniqueMinerNames.length;t++){
		//writeConsole(q+" "+t+": "+mrarr[q][t]);
			if(typeof mrarr[q][t] != 'undefined'){
				minarr[t].push(Math.round(mrarr[q][t]/1000000));
			} else {
				minarr[t].push(0);
			}
		}
	}
	for(var v=0;v<uniqueMinerNames.length;v++){
		if (minarr[v][minarr[v].length-1]==0){
			minerIsActive[v]=false;
		}else{
			//$('#console').append(minarr[v][minarr[v].length-1]+"\n");
			minerIsActive[v]=true;
			activeMiners++;
		}
		topSpeed += getHigh(minarr[v]);
		//$('#console').append(uniqueMinerNames[v]+": "+minarr[v][minarr[v].length-1]+"\n");
	}

}

function getJSONdata(){

	clearVars();

	var lsurl = htxt+li+'/local_stats';
	var gsurl = htxt+li+'/global_stats';
	var paurl = htxt+li+'/payout_addr';
	var cpurl = htxt+li+'/current_payouts';
	var wlurl = htxt+li+'/web/log';
	var uturl = htxt+li+'/uptime';

	var fwarr = new Array(0,0,0,0,0);

	//when all functions in GetJSONdata have populated local arrays
	function funcWatch(ind){
		fwarr[ind]=1;
		if(thisPage=="dash"&&fwarr[0]==1&&fwarr[1]==1&&fwarr[2]==1&&fwarr[3]==1&&fwarr[4]==1){
			sortMinerData();
			colorStat(inputs[0],thisPage);
			var g3dchk = document.getElementById('graph3dcheck');
			if(g3dchk != undefined){
				if(show3dGraph == 1 ){
					document.getElementById('canvasDiv').style.display='block';
					document.getElementById('controls').style.display='block';
					load3D(tmarr,mrarr,sharr,mnarr);
				} else if(show3dGraph == 0 ){
					document.getElementById('canvasDiv').style.display='none';
					document.getElementById('controls').style.display='none';
				}
			}
			fwarr=[];
		}
	}

	/*$(document).ajaxError(function(event, request, settings, err) {alert("error: " + settings.url + ": " + err.message);});*/
	/*$.get(servaddr + '/rate', function(data) {$('#hashrate').html(data / 1000000000);});*/
	$.get(uturl,function(uptime) {
		uptime = parseInt(uptime);
		var d=Math.floor(uptime/86400);
		var h=Math.floor((uptime%86400)/3600);
		var m=Math.floor((uptime%3600)/60);
		var s=Math.ceil(uptime%60);
		h=checkTime(h);
		m=checkTime(m);
		s=checkTime(s);
		$('#upTime').html('uptime:  '+d+'d  '+h+':'+m+':'+s);
		//$("#console").append(" refreshed at: "+d+'d '+h+':'+m+':'+s+" \n");
		funcWatch(0);
	});
	localspeed = 0;
	$.ajax({
		url: lsurl,
		dataType: 'json',
		success: function(k){
			for(var i in k.miner_hash_rates) {
				localspeed = localspeed + k.miner_hash_rates[i];
				var sp = Math.round(k.miner_hash_rates[i]/10000)/100
				writeConsole(getCurrentTime()+" "+i+": "+sp+" MH/s");
			}
			document.form1.lcspd.value = roundNumber((localspeed/1000000),2);
			funcWatch(1);
		},
		timeout: 3000
	});
	$.ajax({
		url:paurl,
		dataType:'json',
		success: function(d){
			var e = "Address. Address: "+d;
			$('#dispWal').html("Payout to: "+d.replace("Address. Address:",""));
			$.getJSON(cpurl, function(pays){
				document.form1.lcpo.value=roundNumber(pays[e],4);
			});
			funcWatch(2);
		}
	});
	

	var fastCall = $.ajax({
		url: wlurl,
		dataType: 'json',
		success: function(d){
			var ft1 = new Date().getTime();
			var it=0;
			var it2=0;
			var processor; // needs to be defined prior
			processor = function(dataItem, idx) {

				//todo put miners under consistent index ??
				if (typeof dataItem === 'object') {
					if (idx =="local_hash_rates"){
						mnarr[it] = new Array();
						mrarr[it] = new Array();
						
						
						//todo write zero for empty miner data
						$.map(dataItem, function(r,n){
							mnarr[it].push(n);
							mrarr[it].push(parseInt(r));
						});
					}
					if (idx =="stale_shares_breakdown"){
						sdarr[it] = new Array(); //doa
						soarr[it] = new Array(); //orphan
						$.map(dataItem, function(d,i){
							if (i=="doa"){
								sdarr[it].push(d)
							}else if(i=="orphan"){
								soarr[it].push(d)
							}
							it2++;
						});
					}
					if (idx =="local_dead_hash_rates"){
						mnarr[it] = new Array();
						mdarr[it] = new Array();
						$.map(dataItem, function(d,n){
							mnarr[it].push(n);
							mdarr[it].push(d);
						});
					}
					return $.map(dataItem,processor);
	        	} else {
					if (idx=="stale_shares")	{ ssarr[it] = dataItem }
					if (idx=="pool_hash_rate")	{ prarr[it] = parseInt(dataItem) }
					if (idx=="shares")			{ sharr[it] = dataItem }
					if (idx=="pool_stale_prop")	{ psarr[it] = dataItem }
					if (idx=="time")			{ tmarr[it] = parseInt(dataItem) }
            		return;
        		}
    		};

			$.map(d, function(a,b){ processor(a,b); it++; });
			var lai = d.length-1;
			var shr = 0;
			if(sharr[lai]>0){
				document.form1.plsr.value = roundNumber(psarr[lai]*100,2)+"%";
				document.form1.lcef.value = roundNumber((1-(ssarr[lai]/sharr[lai]))/(1-psarr[lai])*100, 2)+"%";
				document.form1.lcdoa.value = roundNumber(sdarr[lai]/sharr[lai]*100,2)+"%";
			}
			document.form1.lcsh.value = sharr[lai]+"/"+ssarr[lai];
			var ft2 = new Date().getTime();
			//writeConsole("Processed "+d.length+" records in "+"~"+(ft2-ft1)+" ms");

			funcWatch(3);
		},
		timeout: 4000
	});

	$.ajax({
		url: gsurl,
		dataType: 'json',
		success: function(k){
			document.form1.plspd.value = roundNumber(k.pool_hash_rate/1000000000, 2);
			clearTimeout(timeOutTimer);
			funcWatch(4);
		},
		timeout: 3000
	});
	
	if (refreshRate>0){
		if(rf)clearTimeout(rf);
		rf=setTimeout("getJSONdata()",(refreshRate*1000));
	}
}
