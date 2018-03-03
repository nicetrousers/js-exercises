
window.onload = function() {
	inputListener();
}

function inputListener() {
	var paramIn = document.getElementById('parameters'); 
	var codeIn = document.getElementById('codeInput');
	paramIn.oninput = function() {
		var chk = codeIn.value;
		if (chk.length > 1) { addParams(); }
	}
	codeIn.oninput = function() {
		var chk = paramIn.value;
		if (chk.length > 1) { addParams(); }
	}
};


function addParams() {
  document.querySelectorAll('.code').forEach(function(x) {
	  x.remove();
	});
	var parameters = document.getElementById('parameters').value.trim(); 
	var codeInput = document.getElementById('codeInput').value;

	parameters = checkParameters(parameters);
	var codeObject = htmlStringToFrame(codeInput);
  changeLinks(codeObject, parameters);
	var codeOutput = frameToHtmlString(codeObject);
	document.getElementById('codeOutput').innerHTML = codeOutput;
	document.body.removeChild(codeObject)
}

function htmlStringToFrame(html) {
  var frame = document.createElement('iframe');
  frame.style.display = 'none';
  document.body.appendChild(frame);
  frame.contentDocument.open();
  frame.contentDocument.write(html);
  frame.contentDocument.close();
  return frame;
}

function frameToHtmlString(frame) {
	var codeOutput = frame.contentDocument.documentElement.outerHTML;
	var doctype = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> \n';
  codeOutput = doctype + codeOutput;
  return codeOutput;
}

function changeLinks(frame,params) {
	var anchorList = frame.contentDocument.getElementsByTagName('a');
	for (i = 0; i < anchorList.length; i++) {
		var anchor = anchorList[i].getAttribute('href');
		var check = checkAnchor(anchor);
		var option = document.querySelector('input[name="options"]:checked').value;
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
	return frame;
}

function checkParameters(params) {
	if (params.length < 1) {
		alert("please enter parameters")
		return false
	} else {
		if (params.charAt(0) === "?") {
	    params = params.slice(1);
		}
		params = params.replace(/\s/g, '');
		var outputParams = document.getElementById('outputParams');
		outputParams.innerHTML += "<p class='code'>"+params+"</p>";
		return params;
	}
}

function printOutput(link,option) {
	var link = link;
	var option = option;
	var outputClass = "code";
	var outputTextStart = "<div class='"+option+"' id=''><input type='checkbox' id=''><p class='";
	var outputTextEnd = "</p><fieldset><legend style='display:none;'>Options</legend><input type='radio' name='options' id='append' value='append' checked><input type='radio' name='options' id='overwrite' value='overwrite'><input type='radio' name='options' id='ignore' value='ignore'></fieldset>";
	var anchorURL = checkOrigin(link);
	if (anchorURL) {
		outputClass += " orm";
	};
	var outputTarget = document.getElementById('outputLinks');
	var outputText = outputTextStart+outputClass+"'>"+link+outputTextEnd;
	outputTarget.innerHTML += outputText;
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