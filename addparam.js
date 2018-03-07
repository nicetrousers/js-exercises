
window.onload = function() {
	inputListener();
}

function inputListener() {
	var paramIn = document.getElementById('parameters'); 
	var codeIn = document.getElementById('codeInput');
	paramIn.addEventListener('input',function(event) {
		pauseChk(codeIn);
	});
	codeIn.addEventListener('input',function(event) {
		pauseChk(paramIn);
	});
};

function pauseChk(field) {
	var timeout = null;
	clearTimeout(timeout);
  timeout = setTimeout(function () {
		var chk = field.value;
		if (chk.length > 1) { addParams(); }  
	}, 500); //change to 500
};

function addParams() {
	// remove any existing links on page
  document.querySelectorAll('.code').forEach(function(x) {
	  x.remove();
	});
	// get input parameters and code
	var parameters = document.getElementById('parameters').value; 
	var codeInput = document.getElementById('codeInput').value;
	// clean up and display parameters
	parameters = checkParameters(parameters);
	// convert input code to iframe
	var codeObject = htmlStringToFrame(codeInput);
	// add parameters to input code and page
  // changeLinks(codeObject, parameters);
  createLinkList(codeObject);
  // convert iframe back to string value
	var codeOutput = frameToHtmlString(codeObject);
	// add string to output box
	document.getElementById('codeOutput').innerHTML = codeOutput;
	// remove iframe
	document.body.removeChild(codeObject)
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

var anchorArray = [];

function createLinkList(frame) {
	var anchorList = frame.contentDocument.getElementsByTagName('a');
	for (k = 0; k < anchorList.length; k++) {
		var anchorHref = anchorList[k].getAttribute('href');
		var option = 'append';
		anchorArray[k] = [anchorHref, option];
	};
};

function changeLinks(frame,params) {
	var anchorList = frame.contentDocument.getElementsByTagName('a');
	var option = "append";;
	for (i = 0; i < anchorList.length; i++) {
		var anchor = anchorList[i].getAttribute('href');
		// var option = "append";
		var check = checkAnchor(anchor);
		if (check) {
			if (anchor.indexOf('?') != -1) {
				if ( option === 'ignore') {
					printOutput(anchor, 'ignore');
				} else {
					var optionClass;
					if ( option === 'append') {
					  anchor = anchor + "&" + params
					  optionClass = 'append';
					} else if (option === 'overwrite') {
				  	anchor = anchor.split('?');
			  		anchor = anchor[0] + "?" + params;
			  		optionClass = 'overwrite';
			  	}
					printOutput(anchor, option);
	  		  anchorList[i].setAttribute('href', anchor);
	  		} 
	  	} else {
				anchor = (anchor + "?" + params);
				printOutput(anchor, option);
  		  anchorList[i].setAttribute('href', optionClass);
  		}
		} else {
			printOutput(anchor, 'ignore');
		}
	};
	setCheck(option);
	return frame;
}

function checkParameters(params) {
	if (params.charAt(0) === "?") {
    params = params.slice(1);
	}
	params = params.replace(/\s/g, '');
	var outputParams = document.getElementById('outputParams');
	outputParams.innerHTML += "<p class='code'>"+params+"</p>";
	return params;
}

function printOutput(link,option) {
	var link = link;
	var option = option;
	var optionNumber = "options"+i;
	var outputClass ;
	var outputTextStart = "<form class='code' id='fieldset"+i+"' name='fieldset"+i+"'><fieldset><legend style='display:none;'>Options</legend><input type='radio' name='options"+i+"' id='append"+i+"' value='append'><input type='radio' name='options"+i+"' id='overwrite"+i+"' value='overwrite'><input type='radio' name='options"+i+"' id='ignore"+i+"' value='ignore'></fieldset></div><p class='";
	var outputTextEnd = "</p>";
	var anchorURL = checkOrigin(link);
	if (anchorURL) {
		outputClass += " orm";
	};
	var outputTarget = document.getElementById('outputLinks');
	var outputText = outputTextStart+outputClass+"'>"+link+outputTextEnd;
	outputTarget.innerHTML += outputText;
	// setCheck(option);
}

function setCheck(option) {
	// optionID = option+i;
	// var optionSet = document.getElementById(optionID);
	// optionSet.setAttribute('checked',true);

	var optionID = option+i;
	var fieldSet = 'fieldset'+i;
	var optionSet = document.getElementById('fieldset'+i);

	console.log(optionSet);

	// var optionName = 'options'+i;
	// document.forms[fieldSet][optionName].checked=true;

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