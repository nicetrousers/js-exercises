function addParams() {
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

		if (anchor.indexOf('%%') == -1) {
			if (anchor.indexOf('?') != -1) anchor = (anchor + "&" + params);
			else anchor = (anchor + "?" + params);
	 
		  console.log(anchor); // remove when done
		  printOutput(anchor, 'outputLinks');

		  anchorList[i].setAttribute('href', anchor);
		} else {
			// anchor = anchorList[i].href.value;
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