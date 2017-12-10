var resultArray;
var randID=0;
var lastID=0;
function LoadFlashCards() {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState === 4) {
			if (request.status === 200) {
				var result = request.responseText;
				resultArray = result.split("|");
				randID=0;
				displayCard('first');
			}
		}
	};
	var url='includes/loadFlashCards.php?HSK='+$('#selHSK option:selected').val()+'&Lesson='+$('#selLesson option:selected').val();
	request.open('GET', url, true);
	request.send();
}
function displayCard(action) {
	var arrLen = resultArray.length-1;
	if(arrLen==0) {
		alert("Completed");
		LoadFlashCards();
	} else {
		if(action=="prev"){
			if(randID!=0){
				randID=randID-1;
			}
		} else if(action=="next"){
			if(randID<arrLen){
				randID=randID+1;
			}
		} else if(action=="last"){
			randID=arrLen-1;
		} else if(action=="first") {
			randID=0;
		} else if($('input[name=chkRANDOM]:checked').val()) {
			randID=Math.floor(Math.random() * arrLen);
			if (arrLen!=0 && randID==lastID) {
				if(randID==0) {randID++;} else {randID--;};
			}
		} else {
			randID++;
			if(randID >= arrLen) {
				randID=0;
			}
		}
		var arrLen = resultArray.length-1;
		var row=resultArray[randID];
		lastID=randID;
		var col=row.split("~");
		$('#HanziS').text(col[1]);
		$('#Pinyin').text(col[3]);
		$('#English').text(col[5]);
		$('#PartofSpeech').text(col[6]);
		col[8]++;
		$('#Views').text('Views: ' + col[8]);
		$('#footLeft').text((randID+1).toString() + ' of ' + arrLen);
		resultArray[randID]=col[0]+'~'+col[1]+'~'+col[2]+'~'+col[3]+'~'+col[4]+'~'+col[5]+'~'+col[6]+'~'+col[7]+'~'+col[8]+'~';
		if($('input[name=chkPINYIN]:checked').val()) {$('#Pinyin').show();} else {$('#Pinyin').hide();};
		if($('input[name=chkENGLISH]:checked').val()) {$('#English').show();} else {$('#English').hide();};
		if($('input[name=chkENGLISH]:checked').val()) {$('#PartofSpeech').show();} else {$('#PartofSpeech').hide();};
	}
}
function knowIt() {
	resultArray.splice(randID, 1);
	displayCard();
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
