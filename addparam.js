
function addParams() {
	var parameters = document.getElementById('parameters'); 
	var codeInput = document.getElementById('codeInput');

	parameters = parameters.value;
	codeInput = codeInput.value;

	htmlStringToFrame(codeInput);


	// var codeObject = document.getElementById('codeFrame');
	var codeObject = document.getElementById('framewrap');

	console.log(codeObject)
	console.log(typeof(codeObject));

	var codeOutput = frameToHtmlString(codeObject);

	console.log(codeOutput)
	console.log(typeof(codeOutput));

	document.getElementById('codeOutput').innerHTML = codeOutput;
	// document.getElementById('codeOutput').innerHTML = codeObject;
	return false;
}

function htmlStringToFrame(html) {
  var frame = document.getElementById('codeFrame');
  frame.contentDocument.open();
  frame.contentDocument.write(html);
  frame.contentDocument.close();
}

function frameToHtmlString(frame) {
  // var codeOutput = frame.contentDocument.body.innerHTML;
  var codeOutput = frame.contentDocument.innerHTML;

  // var codeOutput = frame.innerHTML;

  return codeOutput;
}
