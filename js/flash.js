
var resultArray;
var ID=0;
var deletedID=0;
var deletedRow;
function LoadFlashCards() {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState === 4) {
			if (request.status === 200) {
				var result = request.responseText;
				var resultLen = result.length;
				resultLen=resultLen-1;
				result = result.substr(0, resultLen);
				resultArray = result.split("|");
				ID=0;
				displayCard('first');
			}
		}
	};
	var url='includes/loadFlashCards.php?HSK='+$('#selHSK option:selected').val()+'&Lesson='+$('#selLesson option:selected').val();
	request.open('GET', url, true);
	request.send();
}
function displayCard(action) {
	var arrLen=resultArray.length;
	$('#HanziS').text("");
	if(arrLen==0) {
		alert("Completed");
		LoadFlashCards();
	} else {
		if(action=="prev"){
			if(ID!=0){
				ID--;
			}
			$('#debug').text("prev: " + ID.toString() + " " + arrLen.toString());		
		} else if(action=="next"){
			if((ID+1) < arrLen){
				ID++;
			}
			$('#debug').text("next: " + ID.toString() + " " + arrLen.toString());			
		} else if(action=="last"){
			ID=arrLen-1;
		} else if(action=="first") {
			ID=0;
		} else if($('input[name=chkRANDOM]:checked').val()) {
			ID=Math.floor(Math.random() * arrLen);
			if (arrLen!=0 && ID==lastID) {
				if(ID==0) {ID++;} else {ID--;};
			}
		} else if(action=="current"){
		} else {
			ID++;
			if(ID >= arrLen) {
				ID=0;
			}
		}
		var row=resultArray[ID];
		lastID=ID;
		var col=row.split("~");
		$('#HanziS').text(col[1]);
		$('#Pinyin').text(col[3]);
		$('#English').text(col[5]);
		$('#PartofSpeech').text(col[6]);
		col[8]++;
		$('#Views').text('Views: ' + col[8]);
		var dispID=ID+1;
		$('#footLeft').text(dispID.toString() + ' of ' + arrLen.toString());
		resultArray[ID]=col[0]+'~'+col[1]+'~'+col[2]+'~'+col[3]+'~'+col[4]+'~'+col[5]+'~'+col[6]+'~'+col[7]+'~'+col[8]+'~';
		if($('input[name=chkPINYIN]:checked').val()) {$('#Pinyin').show();} else {$('#Pinyin').hide();};
		if($('input[name=chkENGLISH]:checked').val()) {$('#English').show();} else {$('#English').hide();};
		if($('input[name=chkENGLISH]:checked').val()) {$('#PartofSpeech').show();} else {$('#PartofSpeech').hide();};
	}
}
function knowIt() {
	resultArray.splice(ID, 1);
	if(ID!=0) {ID--;};
	displayCard("current");
}
function pinyinChecked() {
	if($('input[name=chkPINYIN]:checked').val()) {
		$('#Pinyin').show();
	} else {
		$('#Pinyin').hide();
	}
}
function englishChecked() {
	if($('input[name=chkENGLISH]:checked').val()) {
		$('#English').show();
		$('#PartofSpeech').show();
	} else {
		$('#English').hide();
		$('#PartofSpeech').hide();
	}
}
