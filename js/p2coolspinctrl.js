///////////////
//Spin controls
/////////////

function reload3dGraph(ctrl,val){
	graphComp = val;
	getJSONdata();
}
function setRefresh(ctrl,val){
	refreshRate = val;
	set_cookie('RefreshRate',refreshRate,365);
}


function drawSpinControls(which){
	if(which==undefined){
		var graphCompCtrl = new SpinControl();
		graphCompCtrl.GetAccelerationCollection().Add(new SpinControlAcceleration(1, 500));
		graphCompCtrl.SetCurrentValue(graphComp);
		graphCompCtrl.SetMaxValue(32);
		graphCompCtrl.SetMinValue(1);
		document.getElementById('spinctrl3d').appendChild(graphCompCtrl.GetContainer());
		graphCompCtrl.StartListening();
		graphCompCtrl.AttachValueChangedListener(reload3dGraph);
	}

	var refreshRateCtrl = new SpinControl();
	refreshRateCtrl.GetAccelerationCollection().Add(new SpinControlAcceleration(1, 800));
	refreshRateCtrl.GetAccelerationCollection().Add(new SpinControlAcceleration(5, 1750));
	refreshRateCtrl.GetAccelerationCollection().Add(new SpinControlAcceleration(20, 3500));
	refreshRateCtrl.SetMinValue(5);
	refreshRateCtrl.SetMaxValue(3600);
	refreshRateCtrl.SetCurrentValue(refreshRate);
	document.getElementById('refreshControl').appendChild(refreshRateCtrl.GetContainer());
	refreshRateCtrl.StartListening();
	refreshRateCtrl.AttachValueChangedListener(setRefresh);
}