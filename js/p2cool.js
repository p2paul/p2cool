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
var funcTimedOut = 5000;
var timeOutTimer;

var htxt="http://";
var localIP = "";
var onLoginScreen = true;

//Spin controls
var graphComp = 9;
var refreshRate = 30;

function pageLoaded(){
	var li = getCookie('LocalIP');
	localIP = li;
	if(li==""){
		document.getElementById('apDiv0').style.display = "block";
		document.forms.form0.p2poolip.focus();
	} else {
		onLoginScreen = false;
		localIP = li;
		timeOutTimer=setTimeout("derpMe()",funcTimedOut);
		document.getElementById('apDiv1').style.display = "block";
		document.getElementById("dispIP").innerHTML = li;
		getJSONdata();
		loadGraphImages();
		drawSpinControls();

	}
	var nwd = window.innerWidth;
	var ndp = parseInt((nwd - 820) / 2)+"px";
	document.getElementById('MainContainer').style.marginLeft = ndp;
}

function derpMe(){
	window.stop();
	var answer = confirm('Couldn\'t connect to specified address: '+localIP+'\ntimeout='+funcTimedOut+'\n\nWould you like to try another ip?');
	if (answer) remIP();
}

function checkInput(form){
	//alert(form.p2poolip.value);
	localIP = document.getElementById('IPIN').value;
	document.getElementById('IPIN').value = "";
	setCookie('LocalIP', localIP);
	document.getElementById('apDiv1').style.display = "block";
	document.getElementById('apDiv0').style.display = "none";
	document.getElementById("dispIP").innerHTML = localIP;
	timeOutTimer=setTimeout("derpMe()",funcTimedOut);
	getJSONdata();
	loadGraphImages();
	drawSpinControls();
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
			document.bigGraph.src = htxt+localIP+graphsarr[i];
			setCookie('FavGraph',i);
		}
	}
}

function remIP(){
	clearCookie('LocalIP');
	history.go(0);
}

function loadGraphImages(){
	var fg = getCookie('FavGraph');
	if (fg>0||fg<7){
		document.bigGraph.src = htxt+localIP+graphsarr[1];
	}else{
		document.bigGraph.src = htxt+localIP+graphsarr[fg];
	}
	for (var i=1;i<7;i++){
		document.getElementById('graph'+i).src = htxt+localIP+graphsarr[i];
	}
}

function noClutter() {
	var NewWinHeight=650;
	var NewWinWidth=830;
	var NewWinPutX=10;
	var NewWinPutY=10;
	TheNewWin =window.open("dashboard.html",'p2pool dashboard','fullscreen=no,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no');
	TheNewWin.resizeTo(NewWinWidth,NewWinHeight);
	//TheNewWin.moveTo(NewWinPutX,NewWinPutY);
}


window.onresize = function(event){
	var nwd = window.innerWidth;
	var ndp = parseInt((nwd - 820) / 2)+"px";
	document.getElementById('MainContainer').style.marginLeft = ndp;
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
var rf;
var uptime;
function getJSONdata(){
	var lsurl = htxt+localIP+'/local_stats';
	var gsurl = htxt+localIP+'/global_stats';
	var paurl = htxt+localIP+'/payout_addr';
	var cpurl = htxt+localIP+'/current_payouts';
	var wlurl = htxt+localIP+'/web/log';
	var uturl = htxt+localIP+'/uptime';
	/*$(document).ajaxError(function(event, request, settings, err) {alert("error: " + settings.url + ": " + err.message);});*/
	/*$.get(servaddr + '/rate', function(data) {$('#hashrate').html(data / 1000000000);});*/
	$.get(uturl,function(uptime) {
		uptime = parseInt(uptime);
		var d=Math.floor(uptime/86400);
		var h=Math.floor((uptime%86400)/3600);
		var m=Math.floor((uptime%3600)/60);
		var s=Math.ceil(uptime%60);
		if (h<10)h="0"+h;
		if (m<10)m="0"+m;
		if (s<10)s="0"+s;
		$('#upTime').html('uptime:  '+d+'d  '+h+':'+m+':'+s);
		$("#console").append(" refreshed at: "+d+'d '+h+':'+m+':'+s+" \n");
	});
	
	$.ajax({
		url: lsurl,
		dataType: 'json',
		success: function(k){
			var localspeed = 0;
			for(var i in k.miner_hash_rates) {
				localspeed = localspeed + k.miner_hash_rates[i];
			}
			document.form1.lcspd.value = roundNumber((localspeed/1000000),2);
		},
		timeout: 1000
	});
	
	$.ajax({
		url:paurl,
		dataType:'json',
		success: function(d){
			$('#dispWal').html("Payout to: "+d.replace("Address. Address:",""));
			$.getJSON(cpurl, function(pays){
				document.form1.lcpo.value=roundNumber(pays[d],4);
			});
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
				document.form1.plsr.value = roundNumber(ssarr[lai]/sharr[lai]*100,2)+"%";
				document.form1.lcef.value = roundNumber((1-(ssarr[lai]/sharr[lai]))/(1-psarr[lai])*100, 2)+"%";
				document.form1.lcdoa.value = roundNumber(sdarr[lai]/sharr[lai]*100,2)+"%";
			}
			document.form1.lcsh.value = sharr[lai]+"/"+ssarr[lai];
			var ft2 = new Date().getTime();
			$('#console').append("Processed "+d.length+" records in "+"~"+(ft2-ft1)+" ms \n");
			
			if(document.getElementById('graph3d').checked){
				load3D(tmarr,mrarr,sharr,mnarr);
				document.getElementById('controls').style.display='block';
				document.getElementById('canvasDiv').style.display='block';
			} else {
				document.getElementById('controls').style.display='none';
				document.getElementById('canvasDiv').style.display='none';
			}
		},
		timeout: 2000
	});

	$.ajax({
		url: gsurl,
		dataType: 'json',
		success: function(k){
			document.form1.plspd.value = roundNumber(k.pool_hash_rate/1000000000, 2);
			clearTimeout(timeOutTimer);
		},
		timeout: 1000
	});
	
	if (refreshRate>0){
		if(rf)clearTimeout(rf);
		rf=setTimeout("getJSONdata()",(refreshRate*1000));
	}
}