
window.onload = function() {
	inputListener();


}


function testFunction(id,input) {
	
console.log(id);
console.log(input);

}

var anchorArray = [];

function inputListener() {
	var paramIn = document.getElementById('parameters'); 
	var codeIn = document.getElementById('codeInput');
	paramIn.addEventListener('input',function(event) {
		inputChk(codeIn);
	});
	codeIn.addEventListener('input',function(event) {
		inputChk(paramIn);
	});
};

function inputChk(field) {
	var chk = field.value;
	if (chk.length > 1) { 
		console.log("yay");
		activateSubmit(); 
	}
}

function activateSubmit() { 
	document.getElementById('submit').removeAttribute('disabled');
}

function addParams() {
	// remove any existing links on page
  document.querySelectorAll('.code').forEach(function(x) {
	  x.remove();
	});
	document.getElementById('submit').setAttribute('disabled','true');

	// get input parameters and code
	var parameters = document.getElementById('parameters').value; 
	var codeInput = document.getElementById('codeInput').value;
	// clean up and display parameters
	parameters = checkParameters(parameters);
	// convert input code to iframe
	var codeObject = htmlStringToFrame(codeInput);
	// if (anchorArray.length === 0) {
	  createLinkList(codeObject);
	// } 
	for (i = 0; i < anchorArray.length; i++) {
		var anchorString = anchorArray[i][0];
		var anchorOption = anchorArray[i][1];
		var anchorObject = anchorArray[i][2];
		printLink(anchorString,anchorOption,i);
	  changeLinks(anchorString,anchorOption,anchorObject,parameters);
	}
  // changeLinks(codeObject, parameters);
  // convert iframe back to string value
	var codeOutput = frameToHtmlString(codeObject);
	// add string to output box
	document.getElementById('codeOutput').innerHTML = codeOutput;
	// remove iframe
	document.body.removeChild(codeObject)
}

function changeLinks(anchor,option,obj,params) {
	if (option === 'ignore') {
		return true
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
  return frame;
}

// convert iframe back to string value
function frameToHtmlString(frame) {
	var codeOutput = frame.contentDocument.documentElement.outerHTML;
	var doctype = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> \n';
  codeOutput = doctype + codeOutput;
  return codeOutput;
}


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

function printLink(link,option,i) {
	var outputClass ;
	var outputTextStart = "<form class='code' id='fieldset"+i+"' name='fieldset"+i+"'><fieldset><legend style='display:none;'>Options</legend><input type='radio' name='options"+i+"' id='append"+i+"' value='append' onClick=testFunction('"+i+"','append"+i+"')><input type='radio' name='options"+i+"' id='replace"+i+"' value='replace' onClick=testFunction('"+i+"','replace"+i+"')><input type='radio' name='options"+i+"' id='ignore"+i+"' value='ignore' onClick=testFunction('"+i+"','ignore"+i+"')></fieldset></div><p class='";
	var outputTextEnd = "</p>";
	var anchorURL = checkOrigin(link);
	if (anchorURL) {
		outputClass += " orm";
	};
	var outputTarget = document.getElementById('outputLinks');
	var outputText = outputTextStart+outputClass+"'>"+link+outputTextEnd;
	outputTarget.innerHTML += outputText;
	setCheck(option);
}

function setCheck(option) {
	var optionID = option+i;
	var optionSet = document.getElementById(optionID);
	optionSet.setAttribute('checked',true);
}

//changeLinks goes here


function checkParameters(params) {
	if (params.charAt(0) === "?") {
    params = params.slice(1);
	}
	params = params.replace(/\s/g, '');
	var outputParams = document.getElementById('outputParams');
	outputParams.innerHTML += "<p class='code'>"+params+"</p>";
	return params;
}

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
		'oscon.com'
		];
		for (n = 0; n < domainsArray.length; n++) {
			if (url.indexOf(domainsArray[n]) >= 0) return true; 
		}
	return false;
}