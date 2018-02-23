function addParams() {
  document.querySelectorAll('.code').forEach(function(x) {
	  x.remove();
	});
	document.getElementById('parameters').value.trim();
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
  return codeOutput;
}

function changeLinks(frame,params) {
	var anchorList = frame.contentDocument.getElementsByTagName('a');
	for (i = 0; i < anchorList.length; i++) {
		var anchor = anchorList[i].getAttribute('href');
		var check = checkAnchor(anchor);
		var option = document.querySelector('input[name="options"]:checked').value;
		console.log(option);
		if (check) {
			if (anchor.indexOf('?') != -1) anchor = (anchor + "&" + params);
			else anchor = (anchor + "?" + params);
		  printOutput(anchor, 'outputLinks');
		  anchorList[i].setAttribute('href', anchor);
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
		printOutput(params,'outputParams');
		return params;
	}
}

function printOutput(text,target) {
	var target = target;
	var outputTarget = document.getElementById(target);
	var outputText = "<p class='code'>"+text+"</p>";
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
