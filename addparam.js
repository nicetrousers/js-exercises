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
					printOutput(anchor, 'notOutputLinks');
				} else {
					if ( option === 'append') {
					  anchor = anchor + "&" + params
					} else if (option === 'overwrite') {
				  	anchor = anchor.split('?');
			  		anchor = anchor[0] + "?" + params
			  	}
					printOutput(anchor, 'outputLinks');
	  		  anchorList[i].setAttribute('href', anchor);
	  		} 
	  	} else {
				anchor = (anchor + "?" + params);
				printOutput(anchor, 'outputLinks');
  		  anchorList[i].setAttribute('href', anchor);
  		}
		} else {
			printOutput(anchor, 'notOutputLinks');
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

function printOutput(link,target) {
	var link = link;
	var target = target;
	var outputClass = "code"
	var anchorURL = checkOrigin(link);
	if (anchorURL) {
		outputClass += " orm";
		console.log(outputClass);
	};

	var outputTarget = document.getElementById(target);
	var outputText = "<p class='"+outputClass+"'>"+link+"</p>";
	outputTarget.innerHTML += outputText;
}

function checkAnchor(link) {
	if (
		(link.indexOf('%%') == -1) &&
		(link.indexOf('mailto') == -1) &&
		(link.indexOf('{\\link') == -1)) {
		return true;
	} else {
		return false;
	}
}

function checkOrigin(link) {
	var url = link;
	var domainsArray = [
		'www.oreilly.com',
		'www.safaribooksonline.com',
		'www.strataconf.com',
		'www.velocityconf.com',
		'www.fluentconf.com',
		'www.jupytercon.com',
		'www.softwarearchitectureconf.com',
		'www.oscon.com'
		];
		for (n = 0; n < domainsArray.length; n++) {
			if (url.indexOf(domainsArray[n]) >= 0) {
				return true;
			} 
		}
	return false;
}