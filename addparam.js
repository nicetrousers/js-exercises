// check for input field inputs
window.onload = function() {
	var paramIn = document.getElementById('parameters'); 
	var codeIn = document.getElementById('codeInput');
	paramIn.addEventListener('input',function(event) {
		inputChk(codeIn);
	});
	codeIn.addEventListener('input',function(event) {
		inputChk(paramIn);
	});
};

// activate submit button when both input fields have content
function inputChk(field) {
	var chk = field.value;
	if (chk.length > 1) { 
		document.getElementById('submit').removeAttribute('disabled');
	}
}

// set universal variables 
var anchorArray = [];
var params = "";

function addParams() {
	// remove any existing links on page
  document.querySelectorAll('.code').forEach(function(x) {
	  x.remove();
	});
	//disable submit button to prevent accidental overwrite of option changes
	document.getElementById('submit').setAttribute('disabled','true');

	// get input code and parameters
	var codeInput = document.getElementById('codeInput').value;
	params = document.getElementById('parameters').value; 
	params = checkParameters(params);
	var outputParams = document.getElementById('outputParams');
	outputParams.innerHTML += "<p class='code'>"+params+"</p>";

	// convert input code to iframe
	var codeObject = htmlStringToFrame(codeInput);
  createLinkList(codeObject); 

  //cycle through links, printing and adding to output code
	for (i = 0; i < anchorArray.length; i++) {
		printLink(anchorArray[i]);
	  changeLink(anchorArray[i],params);
	}
  // convert iframe back to string value
	var codeOutput = frameToHtmlString(codeObject);
	// add string to output box
	document.getElementById('codeOutput').innerHTML = codeOutput;
}

// update universal array and output code when options are made
function changeOption(id,input) {
	switch (input) {
		case '0':
			anchorArray[id][1] = 'append';
			break;
		case '1':
			anchorArray[id][1] = 'replace';
			break;
		case '2':
			anchorArray[id][1] = 'ignore';
			break;
		default:
			console.log("error");
	}
	changeLink(anchorArray[id]);
	var codeObject = document.getElementById('codeFrame');
	var codeOutput = frameToHtmlString(codeObject);
	document.getElementById('codeOutput').innerHTML = codeOutput;
}

// add parameters to links, depending on option selected 
function changeLink(arr) {
	var anchor = arr[0];
	var option = arr[1];
	var obj = arr[2];
	if (option === 'ignore') {
		obj.setAttribute('href', anchor)
	} else {
		if (anchor.indexOf('?') != -1) {
			if ( option === 'append') {
			  anchor = anchor + "&" + params
			} else if (option === 'replace') {
		  	anchor = anchor.split('?');
	  		anchor = anchor[0] + "?" + params;
	  	} 
  	} else {
  		anchor = (anchor + "?" + params);
  	}
	  obj.setAttribute('href', anchor);
	}
}

// convert input code to iframe
function htmlStringToFrame(html) {
  var frame = document.createElement('iframe');
  frame.style.display = 'none';
  document.body.appendChild(frame);
  frame.contentDocument.open();
  frame.contentDocument.write(html);
  frame.contentDocument.close();
  frame.setAttribute('id','codeFrame');
  return frame;
}

// convert iframe back to string value
function frameToHtmlString(frame) {
	var codeOutput = frame.contentDocument.documentElement.outerHTML;
	var doctype = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> \n';
  codeOutput = doctype + codeOutput;
  return codeOutput;
}

// add links and initial options to universal array
function createLinkList(frame) {
	if (anchorArray.length === 0) {
		var option = 'append';
	}
	var anchorList = frame.contentDocument.getElementsByTagName('a');
	for (k = 0; k < anchorList.length; k++) {
		var anchorHref = anchorList[k].getAttribute('href');
		var option = 'append';
		var check = checkAnchor(anchorHref);
		if (!check) { option = 'ignore' };
		anchorArray[k] = [anchorHref, option, anchorList[k]];
	};
	return anchorArray;
};

// add links and option buttons to page on initial submit
function printLink(arr) {
	var anchorString = arr[0];
	var anchorOption = arr[1];
	var anchorObject = arr[2];
	var outputClass ;
	var outputTextStart = "<form class='code' id='fieldset"+i+"' name='fieldset"+i+"'><fieldset><legend style='display:none;'>Options</legend><input type='radio' name='options"+i+"' id='append"+i+"' value='append' onClick=changeOption('"+i+"','0')><input type='radio' name='options"+i+"' id='replace"+i+"' value='replace' onClick=changeOption('"+i+"','1')><input type='radio' name='options"+i+"' id='ignore"+i+"' value='ignore' onClick=changeOption('"+i+"','2')></fieldset></div><p class='";
	var outputTextEnd = "</p>";
	var anchorURL = checkOrigin(anchorString);
	if (anchorURL) { outputClass += " orm" };
	var outputTarget = document.getElementById('outputLinks');
	var outputText = outputTextStart+outputClass+"'>"+anchorString+outputTextEnd;
	outputTarget.innerHTML += outputText;
	setCheck(anchorOption);
}

// check default options in radio buttons
function setCheck(option) {
	var optionID = option+i;
	var optionSet = document.getElementById(optionID);
	optionSet.setAttribute('checked',true);
}

// clean up parameters by removing invisible chars, initial question mark
function checkParameters(params) {
	if (params.charAt(0) === "?") {
    params = params.slice(1);
	}
	params = params.replace(/\s/g, '');
	return params;
}

// check links against default ignore list
function checkAnchor(link) {
	if (
		(link.indexOf('%%') == -1) &&
		(link.indexOf('mailto') == -1) &&
		(link.indexOf('{\\') == -1)) {
		return true;
	} else {
		return false;
	}
}

// check links against oreilly domain list
function checkOrigin(link) {
	var url = link;
	var domainsArray = [
		'oreilly.com',
		'safaribooksonline.com',
		'strataconf.com',
		'velocityconf.com',
		'fluentconf.com',
		'jupytercon.com',
		'softwarearchitectureconf.com',
		'oscon.com', ];
		for (n = 0; n < domainsArray.length; n++) {
			if (url.indexOf(domainsArray[n]) >= 0) return true; 
		}
	return false;
}