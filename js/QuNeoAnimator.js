var _currentPage;
var _padSize = 80;
var _padSpacing = 20;
var _ledButtonSize = 10;

var _frameStates;
var _frameBrightnesses;

var _copiedFrameStates;
var _copiedFrameBrightnesses;

var _greenNoteArray = new Array(
						112, 114, 96, 98,
						116, 118, 100, 102,
						120, 122, 104, 106,
						124, 126, 108, 110,
						
						80, 82, 64, 66,
						84, 86, 68, 70,
						88, 90, 72, 74,
						92, 94, 76, 78,
						
						48, 50, 32, 34,
						52, 54, 36, 38,
						56, 58, 40, 42,
						60, 62, 44, 46,
						
						16, 18, 0, 2,
						20, 22, 4, 6,
						24, 26, 8, 10,
						28, 32, 12, 14);
						
var _redNoteArray = new Array(64);

var _padNum = 0;
var	_ledNum = 0;
var _currentFrame = 0;
var _currentLED = -1;
var _slider;
var _currentLedNum = -1;

var _DEBUG = document.getElementById("debug");


//---------------------------------------------------------------------------//
//-----------------------------Initialization--------------------------------//
//---------------------------------------------------------------------------//

function initArrays()
{

	//---------------------------------- Frame Storage ----------------------------------//
	_frameStates = new Array(100);
	_frameBrightnesses = new Array(100);

	for(var i=0; i < 100; i++)
	{
		_frameStates[i] = new Array(64);
		_frameBrightnesses[i] = new Array(64);
		
		for(var j =0; j<64; j++)
		{
			_frameStates[i][j] = 0;
			_frameBrightnesses[i][j] = 17;
		}
	}
	
	//---------------------------------- Frame Clipboard ----------------------------------//
	_copiedFrameBrightnesses = new Array(64);
	_copiedFrameStates = new Array(64);
	
	for(var i =0; i<64; i++)
	{
		_copiedFrameBrightnesses[i] = -1;
		_copiedFrameStates[i] = -1
	}
	
	//---------------------------------- Note Arrays ----------------------------------//

						

	
	for(var i=0; i<64; i++)
	{
		_redNoteArray[i] = _greenNoteArray[i] + 1;	
	}
}

function createPadTable()
{	
	//Rows
	for(var row = 0; row<4; row++)
	{
		//Columns
	for(var column = 0; column<4; column++)
		{
			createPad(row, column);
			

			//LEDs
			for(var k = 0; k<4; k++)
			{
				createLedButton(k, row, column);
				_ledNum++;
			}
			
			_padNum++;
		}	
	}
}

function createPad(row, column)
{
	var divTag = document.createElement("div");
	divTag.id = String("pad") + _padNum;
	divTag.className = "pad";
	divTag.style.width = String(_padSize) + String("px");
	divTag.style.height = String(_padSize) + String("px");
	divTag.style.left = String((column) * (_padSize + _padSpacing) + _padSpacing) + String("px");
	divTag.style.top = String((row) * (_padSize + _padSpacing) + _padSpacing) + String("px");
	document.getElementById("padsFrame").appendChild(divTag);
}

function createLedButton(ledButtonNum, padRow, padColumn)
{
	var buttonBorderTag = document.createElement("div");
	buttonBorderTag.id = String("ledBorder") + _ledNum;
	buttonBorderTag.className = "ledBorder";

	var buttonTag = document.createElement("div");
	buttonTag.id = String("led") + _ledNum;
	buttonTag.className = "led";
	
	switch(ledButtonNum)
	{
		case 0:
			//buttonTag.style.left = "4px";
			//buttonTag.style.top = "4px";
			
			buttonBorderTag.style.left = "-4px";
			buttonBorderTag.style.top = "-4px";
			break;
		case 1:
			//buttonTag.style.left = "4px";
			//buttonTag.style.top = "4px";
			
			buttonBorderTag.style.right = "-4px";
			buttonBorderTag.style.top = "-4px";		
			break;
		case 2:
			//buttonTag.style.left = "4px";
			//buttonTag.style.top = "4px";
			
			buttonBorderTag.style.left = "-4px";
			buttonBorderTag.style.bottom = "-4px";		
			break;
		case 3:
			//buttonTag.style.left = "4px";
			//buttonTag.style.top = "4px";
			
			buttonBorderTag.style.right = "-4px";
			buttonBorderTag.style.bottom = "-4px";		
			break;
		default:
			break;
			
	}

	var padString = String("pad") + _padNum;
	//document.getElementById("debug").innerHTML = padString;
	
	//Add Border to Document (will encapsulate LED)
	document.getElementById(padString).appendChild(buttonBorderTag);
	
	//Add LED to document
	document.getElementById(buttonBorderTag.id).appendChild(buttonTag);
	
	buttonTag.onclick = function(){incLedState(buttonTag, buttonBorderTag);};

}

function incLedState(buttonTag, buttonBorderTag)
{
	//If the button is a newly selected
	if(_currentLED.id != buttonTag.id)
	{
		//Make Current led the most recent button clicked
		_currentLED = buttonTag;
	
		//Set the global current LED num	
		if(_currentLED.id.length == 4)
		{
			_currentLedNum = parseInt(_currentLED.id.substr(3, 1));
		}
		
		else
		{
			_currentLedNum = parseInt(_currentLED.id.substr(3, 2));
		}
		
		
		//_DEBUG.innerHTML = _currentLedNum;
		
		var border;
	
		//Set borders for all leds
		for(var i = 0; i<64; i++)
		{
			//Border iteration
			border = document.getElementById(String("ledBorder") + i);
			
			//If current iteration does not equal last clicked
			if(buttonBorderTag != border)
			{
				//Set border transparent
				border.style.border = "2px solid rgba(0,0,0,0)";
				border.style.boxShadow =  "0px 0px 4px 2px rgba(100,100,100,0)";
			}
			
			//If current iteration is last clicked
			else
			{
				//Show border
				border.style.border = "2px solid rgba(50,50,50,1)";
				border.style.boxShadow =  "0px 0px 8px 2px rgba(10,10,10,1)";
			}
		}
		
		$( "#slider" ).slider( "value", _frameBrightnesses[_currentFrame][_currentLedNum] );
			
	}
	
	//If this button has already been clicked
	else
	{	
	
		var state = _frameStates[_currentFrame][_currentLedNum];
			
		//Increment the color state
		state++;
	
		//Reset if state is beyond number of states
		if(state > 3)
		{
			state = 0;
		}
		
		storeState(state);
	}
		updateLedDisplay(_currentLedNum, _frameStates[_currentFrame][_currentLedNum], _frameBrightnesses[_currentFrame][_currentLedNum]);
		updateSliderDisplay();
		
		_DEBUG.innerHTML = _currentLed.id;
}

function sliderInit()
{
	 _slider =	document.getElementById("slider");
	
	//Create the Slider
	$(function()
		{
			$( _slider ).slider();  
		}
  	);
  
  //Initialize Slider Options
  $("#slider").slider({orientation: "vertical", min: 0, max: 17, step: 1});
  
  //Set Slider Callback
        $('#slider').slider({
            slide: function( event, ui ) {
                var value = ui.value;               
                storeBrightness(value);
            }
        });
}

//---------------------------------------------------------------------------//
//----------------------------Frame Functions--------------------------------//
//---------------------------------------------------------------------------//

function incFrame()
{		

	if(_currentFrame < 100)
	{
		_currentFrame++;		
	}
	
	else
	
	{
		_currentFrame = 0;	
	}
	
	
	if(_currentFrame < 10)
	{
		document.getElementById("currentFrame").innerHTML = String("00") + _currentFrame;		
	}
	else if(_currentFrame < 100)
	{
		document.getElementById("currentFrame").innerHTML = String("0") + _currentFrame;
	}
	
	else if(_currentFrame < 1000)
	{
		document.getElementById("currentFrame").innerHTML = _currentFrame;	
	}
	
	//Display the array
	recallFrame();
}

function decFrame()
{
	//Dec Frame if within range
	if(_currentFrame > 0)
	{
		_currentFrame--;		
	}
	else
	{
		_currentFrame = 100;
	}
	
	//Set frame text
	if(_currentFrame < 10)
	{
		document.getElementById("currentFrame").innerHTML = String("00") + _currentFrame;		
	}
	else if(_currentFrame < 100)
	{
		document.getElementById("currentFrame").innerHTML = String("0") + _currentFrame;
	}
	
	else if(_currentFrame < 1000)
	{
		document.getElementById("currentFrame").innerHTML = _currentFrame;	
	}
	
	//Display the array
	recallFrame();
	
}

function clearFrame()
{
	for(var i =0; i<64; i++)
	{
		_frameBrightnesses[_currentFrame][i] = 17;
		_frameStates[_currentFrame][i] = 0;
		updateLedDisplay(i, 0, 17);
	}
	
	updateSliderDisplay();
}

function copyFrame()
{

	for(var i=0; i<64; i++)
	{
		_copiedFrameBrightnesses[i] = _frameBrightnesses[_currentFrame][i];
		_copiedFrameStates[i] = _frameStates[_currentFrame][i];
	}

}

function pasteFrame()
{
	for(var i = 0; i < 64; i++)
	{
		if(_copiedFrameBrightnesses[i] != -1 && _copiedFrameStates[i] != -1)
		{
			_frameBrightnesses[_currentFrame][i] = _copiedFrameBrightnesses[i];
			_frameStates[_currentFrame][i] = _copiedFrameStates[i];
		}
		else
		{
			alert("Corrpt Frame");
		}
	}
	
	recallFrame();
}

function recallFrame()
{

	var led;

	//_DEBUG.innerHTML = "called";
	
	//----- Clear the LEDs display
	//Scan an LEDs
	for(var i =0; i<64; i++)
	{	
		//Get led being scanned
		led = document.getElementById('led' + i);
		
		led.display = "block";
		led.style.background = "rgba(100,100,100,0.3)";
		led.style.boxShadow =  "0px 0px 4px 2px rgba(100,100,100,0.2)";

		var brightness = _frameBrightnesses[_currentFrame][i];
		var state = _frameStates[_currentFrame][i];
		
		updateLedDisplay(i, state, brightness);
	}

	updateSliderDisplay();
}


//---------------------------------------------------------------------------//
//----------------------------Array Management-------------------------------//
//---------------------------------------------------------------------------//

function storeState(state)
{
	_frameStates[_currentFrame][_currentLedNum] = state;
}

function storeBrightness(brightness)
{
	_frameBrightnesses[_currentFrame][_currentLedNum] = brightness;
	
	updateLedDisplay(_currentLedNum, _frameStates[_currentFrame][_currentLedNum], brightness)
}


//---------------------------------------------------------------------------//
//----------------------------Display Management-----------------------------//
//---------------------------------------------------------------------------//

function updateLedDisplay(ledNum, state, brightness)
{	
	var led = document.getElementById('led' + ledNum);
	
		//Off
		if(state == 0)
		{			
			led.display = "block";
			led.style.background = "rgba(100,100,100,0.3)";
			led.style.boxShadow =  "0px 0px 4px 2px rgba(100,100,100,0.2)";
		}
		
		//Green					
		else if(state == 1)
		{				
			led.display = "block";
			led.style.background = String("rgba(0,255,0,") + ((brightness/17*0.8)+0.2) + String(")");
			led.style.boxShadow = String("0px 0px 4px 2px rgba(0,255,0,") + ((brightness/17*0.8)+0.2) + String(")");
		}
		
		//Red
		else if(state == 2)
		{
			led.display = "block";
			led.style.background = String("rgba(255,0,0,") + ((brightness/17*0.8)+0.2) + String(")");
			led.style.boxShadow = String("0px 0px 4px 2px rgba(240,0,0,") + ((brightness/17*0.8)+0.2) + String(")");
		}
		
		//Yellow
		else if(state == 3)
		{
			led.display = "block";
			led.style.background = String("rgba(255,255,0,") + ((brightness/17*0.8)+0.2) + String(")");
			led.style.boxShadow = String("0px 0px 4px 2px rgba(255,230,0,") + ((brightness/17*0.8)+0.2) + String(")");
		}
}

function updateSliderDisplay()
{

	var state = _frameStates[_currentFrame][_currentLedNum];
	var brightness = _frameBrightnesses[_currentFrame][_currentLedNum];
	var slider = document.getElementById("slider");
	
	//_DEBUG.innerHTML = 'state ' + state;
	
	//Off
	if(state == 0)
	{			
		slider.style.background ="-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255,255,255,1)),color-stop(90%,rgba(150,150,150,1)),color-stop(100%,rgba(10,10,10,1)))";
	}
		
	//Green					
	else if(state == 1)
	{				
		slider.style.background ="-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,255,0,1)),color-stop(90%,rgba(150,150,150,1)),color-stop(100%,rgba(10,10,10,1)))";
	}
		
	//Red
	else if(state == 2)
	{
		slider.style.background ="-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255,0,0,1)),color-stop(90%,rgba(150,150,150,1)),color-stop(100%,rgba(10,10,10,1)))";
	}
		
	//Yellow
	else if(state == 3)
	{	
		slider.style.background ="-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255,255,0,1)),color-stop(90%,rgba(150,150,150,1)),color-stop(100%,rgba(10,10,10,1)))";
	}
	
	$("#slider").slider("value", brightness);	
}


//---------------------------------------------------------------------------//
//----------------------------Animation Control------------------------------//
//---------------------------------------------------------------------------//

var interval;

var bpm = 120;
var beatResolution = 16;
var playing = false;

function playSeq()
{
	if(!playing)
	{
		playing = true;
		
		_currentFrame = -1;
	
		var fps = 1000 / ( (bpm / 60) * (beatResolution / 4) );

		interval = setInterval(function(){incFrame()}, fps);
	}

}

function pauseSeq()
{
	if(playing)
	{
		playing = false;
		clearInterval(interval);
	}
}

function exportSeq()
{

}

