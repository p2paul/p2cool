///////////////
//Spin controls
/////////////

function reload3dGraph(ctrl,val){
	graphComp = val;
	getJSONdata();
}
function setRefresh(ctrl,val){
	refreshRate = val;
}


function drawSpinControls(){
	var graphCompCtrl = new SpinControl();
	graphCompCtrl.GetAccelerationCollection().Add(new SpinControlAcceleration(1, 500));
	graphCompCtrl.SetCurrentValue(graphComp);
	graphCompCtrl.SetMaxValue(32);
	graphCompCtrl.SetMinValue(1);
	document.getElementById('controls').appendChild(graphCompCtrl.GetContainer());

	var refreshRateCtrl = new SpinControl();
	refreshRateCtrl.GetAccelerationCollection().Add(new SpinControlAcceleration(1, 800));
	refreshRateCtrl.GetAccelerationCollection().Add(new SpinControlAcceleration(5, 1750));
	refreshRateCtrl.GetAccelerationCollection().Add(new SpinControlAcceleration(20, 3500));
	refreshRateCtrl.SetMinValue(5);
	refreshRateCtrl.SetMaxValue(3600);
	refreshRateCtrl.SetCurrentValue(refreshRate);
	document.getElementById('refreshControl').appendChild(refreshRateCtrl.GetContainer());

	graphCompCtrl.StartListening();
	refreshRateCtrl.StartListening();
	graphCompCtrl.AttachValueChangedListener(reload3dGraph);
	refreshRateCtrl.AttachValueChangedListener(setRefresh);
}