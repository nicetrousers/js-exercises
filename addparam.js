
function addParams() {
	var parameters = document.getElementById('parameters').value; 
	var codeInput = document.getElementById('codeInput').value;

	var codeObject = htmlStringToFrame(codeInput);
  changeLinks(codeObject, parameters);
	var codeOutput = frameToHtmlString(codeObject);
	document.getElementById('codeOutput').innerHTML = codeOutput;
	removeFrame(codeObject);

	// return false;
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

function removeFrame(frame) {
	document.body.removeChild(frame);
};

function changeLinks(frame,parameters) {
	var anchorList = frame.contentDocument.getElementsByTagName('a');
	for (i = 0; i < anchorList.length; i++) {
		var anchor = anchorList[i];
	  anchor = (anchorList[i].href.split('?')[0] + parameters);
	  console.log(anchor);
	  anchorList[i].setAttribute('href', anchor);
	};
	return frame;
}