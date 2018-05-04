var writer0;var writer1;var writer2;var writer3;var writer4;
window.addEventListener("load", function(){
window.cookieconsent.initialise({
  "palette": {
    "popup": {
      "background": "#efefef",
      "text": "#404040"
    },
    "button": {
      "background": "#8ec760",
      "text": "#ffffff"
    }
  }
})});
var HSKLevelCookie;
var HSKLessonCookie;
var AudioHanzi='';
function init() {
	$('#toggleX').bootstrapToggle({
		off: ' List',
		on: ' Flashcards',
		size: 'mini'
	});
	HSKLevelCookie=getCookie('HSKLevel');
	HSKLessonCookie=getCookie('HSKLesson');
	if(HSKLevelCookie===""){HSKLevelCookie='1';}
	if(HSKLessonCookie===""){HSKLessonCookie='1';}
	$("#selHSK").val(HSKLevelCookie);
	$("#selLesson").val(HSKLessonCookie);
	LoadFlashCards();
}
$('#myform :checkbox').change(function() {
	if(this.id == "toggleX") {
		$('#Card').toggle();
		$('#fCard').toggle();
		$('#pCard').toggle();
		$('#List').toggle();
	}
});
var resultArray;
var ID=0;
function LoadFlashCards() {
	$('.loader').show();
	$('#HanziS').text('');
	$('#Pinyin0, #Pinyin1, #Pinyin2, #Pinyin3, #Pinyin4').text('');
	$('#PartofSpeech').text('');
	$('#English').html('');
	$('#StrokeOrder').text('');
	$('#Audio').html('');
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState === 4) {
			if (request.status === 200) {
				if(request.responseText==="") {
					$('#HanziAni0').text("🚧");
					$('#Pinyin0, #Pinyin1, #Pinyin2, #Pinyin3, #Pinyin4').text('');
					$('#PartofSpeech').text('');
					$('#English').html("No cards for this criteria available.");
					$('#Audio').html('');
					$('#Views').text('');
					$('#English').show();
					$('.loader').hide();
					resultArray = [];
					$('#List').html("🚧 <br/>No cards for this criteria available.");
				} else {
					var result = request.responseText;
					var resultLen = result.length;
					resultLen=resultLen-1;
					result = result.substr(0, resultLen);
					resultArray = result.split("|");
					ID=0;
					$('.loader').hide();
					dispCard('first');
					populateTable();
				}
			}
		}
	};
	var url='includes/LoadFlashCards.php?HSK='+$('#selHSK option:selected').val()+'&Lesson='+$('#selLesson option:selected').val();
	request.open('GET', url, true);
	request.send();
}
function dispCard(action) {
	$("#HanziAni0").html("");$("#HanziAni1").html("");$("#HanziAni2").html("");$("#HanziAni3").html("");$("#HanziAni4").html("");
	var arrLen=resultArray.length;
	$('#HanziS').text("");
	$('#StrokeOrder').text('');
	$('#Audio').html('');
	$('#OnRevList').text("");
	if(arrLen===0) {
		$('#HanziS').text("👍");
		var hsk=$("#selHSK").val();
		var l=$("#selLesson").val();
		if( (hsk<3 && l<15) || (hsk>2 && l<20) ){
			l++;
			$("#selLesson").val(l);
		} else if( hsk==6 && l==20 ) {
			$("#selHSK").val("All");
			$("#selLesson").val("All");
		} else {
			hsk++;
			l=1;
			$("#selHSK").val(hsk);
			$("#selLesson").val(l);
		}
		LoadFlashCards();
	} else {
		if(arrLen!=1) {
			if(action=="prev"){
				if(ID!=0){
					ID--;
				}
			} else if(action=="next"){
				if((ID+1) < arrLen){
					ID++;
				}
			} else if(action=="last"){
				ID=arrLen-1;
			} else if(action=="first") {
				ID=0;
			} else if($('input[name=chkRANDOM]:checked').val()) {
				ID=Math.floor(Math.random() * arrLen);
				if (arrLen!==0 && ID===lastID) {
					if(ID===0) {ID++;} else {ID--;}
				}
			} else if(action=="current"){
				// Do nothing
			} else {
				ID++;
				if(ID >= arrLen) {
					ID=0;
				}
			}
		}
		var row=resultArray[ID];
		lastID=ID;
		var col=row.split("~");
		var wSize = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		var w=125;var h=125;
		if(wSize<621) {
			w=75;
			h=75;
			$(".ani").height("75px");
		}
		var strokeCol1="#808080";
		switch (col[6]) {
			case "1": strokeCol1="#FF0000"; break;
			case "2": strokeCol1="#008000"; break;
			case "3": strokeCol1="#0000FF"; break;
			case "4": strokeCol1="#800080"; break;
		}
		var strokeCol2="#808080";
		switch (col[7]) {
			case "1": strokeCol2="#FF0000"; break;
			case "2": strokeCol2="#008000"; break;
			case "3": strokeCol2="#0000FF"; break;
			case "4": strokeCol2="#800080"; break;
		}
		var strokeCol3="#808080";
		switch (col[8]) {
			case "1": strokeCol3="#FF0000"; break;
			case "2": strokeCol3="#008000"; break;
			case "3": strokeCol3="#0000FF"; break;
			case "4": strokeCol3="#800080"; break;
		}
		var strokeCol4="#808080";
		switch (col[9]) {
			case "1": strokeCol4="#FF0000"; break;
			case "2": strokeCol4="#008000"; break;
			case "3": strokeCol4="#0000FF"; break;
			case "4": strokeCol4="#800080"; break;
		}
		var strokeCol5="#808080";
		switch (col[10]) {
			case "1": strokeCol5="#FF0000"; break;
			case "2": strokeCol5="#008000"; break;
			case "3": strokeCol5="#0000FF"; break;
			case "4": strokeCol5="#800080"; break;
		}
		writer0 = new HanziWriter('HanziAni0', "", {width:w,height:h,padding:0,delayBetweenStrokes:50,strokeColor:strokeCol1});
		writer0.setCharacter(col[1]);
		$("#btn-ani0").css("color", strokeCol1);
		var y=1;
		if(col[2]!="") {
			writer1 = new HanziWriter('HanziAni1', "", {width:w,height:h,padding:0,delayBetweenStrokes:50,strokeColor:strokeCol2});
			writer1.setCharacter(col[2]);
			$("#btn-ani1").css("color", strokeCol2);
			y++;
		} 
		if(col[3]!="") {
			writer2 = new HanziWriter('HanziAni2', "", {width:w,height:h,padding:0,delayBetweenStrokes:50,strokeColor:strokeCol3});
			writer2.setCharacter(col[3]);
			$("#btn-ani2").css("color", strokeCol3);
			y++;
		} 
		if(col[4]!="") {
			writer3 = new HanziWriter('HanziAni3', "", {width:w,height:h,padding:0,delayBetweenStrokes:50,strokeColor:strokeCol4});
			writer3.setCharacter(col[4]);
			$("#btn-ani3").css("color", strokeCol4);
			y++;
		} 
		if(col[5]!="") {
			writer4 = new HanziWriter('HanziAni4', "", {width:w,height:h,padding:0,delayBetweenStrokes:50,strokeColor:strokeCol5});
			writer4.setCharacter(col[5]);
			$("#btn-ani4").css("color", strokeCol5);
			y++;
		} 
		if(y==1){
			$("#HanziAni0, #div-ani0").width("100%");$("#HanziAni1, #div-ani1").width("0%");
			$("#HanziAni2, #div-ani2").width("0%");$("#HanziAni3, #div-ani3").width("0%");
			$("#HanziAni4, #div-ani4").width("0%");$("#ani-container, #animation-buttons").width("20%");
			$("#div-ani1").hide();$("#div-ani2").hide();$("#div-ani3").hide();$("#div-ani4").hide();
		} else if(y==2){
			$("#HanziAni0, #div-ani0").width("50%");$("#HanziAni1, #div-ani1").width("50%");
			$("#HanziAni2, #div-ani2").width("0%");$("#HanziAni3, #div-ani3").width("0%");
			$("#HanziAni4, #div-ani4").width("0%");$("#ani-container, #animation-buttons").width("40%");
			$("#div-ani1").show();$("#div-ani2").hide();$("#div-ani3").hide();$("#div-ani4").hide();
		} else if(y==3){
			$("#HanziAni0, #div-ani0").width("33.3%");$("#HanziAni1, #div-ani1").width("33.3%");
			$("#HanziAni2, #div-ani2").width("33.3%");$("#HanziAni3, #div-ani3").width("0%");
			$("#HanziAni4, #div-ani4").width("0%");$("#ani-container, #animation-buttons").width("60%");
			$("#div-ani1").show();$("#div-ani2").show();$("#div-ani3").hide();$("#div-ani4").hide();
		} else if(y==4){
			$("#HanziAni0, #div-ani0").width("25%");$("#HanziAni1, #div-ani1").width("25%");
			$("#HanziAni2, #div-ani2").width("25%");$("#HanziAni3, #div-ani3").width("25%");
			$("#HanziAni4, #div-ani4").width("0%");$("#ani-container, #animation-buttons").width("80%");
			$("#div-ani1").show();$("#div-ani2").show();$("#div-ani3").show();$("#div-ani4").hide();
		} else if(y==5){
			$("#HanziAni0, #div-ani0").width("20%");$("#HanziAni1, #div-ani1").width("20%");
			$("#HanziAni2, #div-ani2").width("20%");$("#HanziAni3, #div-ani3").width("20%");
			$("#HanziAni4, #div-ani4").width("20%");$("#ani-container, #animation-buttons").width("100%");
			$("#div-ani1").show();$("#div-ani2").show();$("#div-ani3").show();$("#div-ani4").show();
		}
		AudioHanzi1="";
		AudioHanzi2="";
		AudioHanzi1=col[1]+"%28"+col[16]+"%29";
		AudioHanzi2=col[16];
		hanziSize=1;
		if(col[2] != "") {
			AudioHanzi1=AudioHanzi1+col[2]+"%28"+col[17]+"%29";
			AudioHanzi2=AudioHanzi2+col[17];
			hanziSize=2;
		}
		if(col[3] != "") {
			AudioHanzi1=AudioHanzi1+col[3]+"%28"+col[18]+"%29";
			AudioHanzi2=AudioHanzi2+col[18];
			hanziSize=3;
		}
		if(col[4] != "") {
			AudioHanzi1=AudioHanzi1+col[4]+"%28"+col[19]+"%29";
			AudioHanzi2=AudioHanzi2+col[19];
			hanziSize=4;
		}
		if(col[5] != "") {
			AudioHanzi1=AudioHanzi1+col[5]+"%28"+col[20]+"%29";
			AudioHanzi2=AudioHanzi2+col[20];
			hanziSize=5;
		}
		$('#Audio').append('<button class="btn btn-default btn-sm btn-audio" onclick="playBAudio(\''+AudioHanzi1+'\',\''+AudioHanzi2+'\','+hanziSize+')"><span class="glyphicon glyphicon-volume-up"></span></button>');
		$('#Pinyin').html('<span class="tone'+col[6]+'">'+col[11]+'</span>'
    		+'<span class="tone'+col[7]+'">'+col[12]+'</span>'
    		+'<span class="tone'+col[8]+'">'+col[13]+'</span>'
    		+'<span class="tone'+col[9]+'">'+col[14]+'</span>'
    		+'<span class="tone'+col[10]+'">'+col[15]+'</span>');
		$('#English').text(col[21]);
		$('#PartofSpeech').text(col[22]);
		$('#HSK').text(col[23]);
		$('#DBID').text(col[25]);
		col[27]++;
		$('#Views').html('HSK ' + col[23] + '-' + col[24] + '&nbsp;&nbsp;&nbsp;Views: ' + col[27]);
		var dispID=ID+1;
		$('#footCenter').text(dispID.toString() + ' of ' + arrLen.toString());
		if(col[26]!=='')	{
			$('#Delete').html("<button class='btn btn-danger btn-sm' onclick='del("+col[10]+")'>Remove from Review</button>");
		} else {
			$('#Delete').html("");
		}
		resultArray[ID]=col[0]+'~'+col[1]+'~'+col[2]+'~'+col[3]+'~'+col[4]+'~'+col[5]+'~'+
						col[6]+'~'+col[7]+'~'+col[8]+'~'+col[9]+'~'+col[10]+'~'+col[11]+'~'+col[12]+'~'+col[13]+'~'+col[14]+'~'+
						col[15]+'~'+col[16]+'~'+col[17]+'~'+col[18]+'~'+col[19]+'~'+col[20]+'~'+col[21]+'~'+col[22]+'~'+col[23]+'~'+
						col[24]+'~'+col[25]+'~'+col[26]+'~'+col[27]+'~';
		if($('input[name=chkPINYIN]:checked').val()) {$('#Pinyin').show();} else {$('#Pinyin').hide();}
		if($('input[name=chkENGLISH]:checked').val()) {$('#English').show();} else {$('#English').hide();}
		if($('input[name=chkENGLISH]:checked').val()) {$('#PartofSpeech').show();} else {$('#PartofSpeech').hide();}
		setCookie("HSKLevel", $("#selHSK").val(), 120);
		setCookie("HSKLesson", $("#selLesson").val(), 120);
	}
}
function populateTable(){
	$("#listTab tr").remove();
	$("#wordcount").html("");
	for (i = 0; i < resultArray.length; i++) {
		var col=resultArray[i].split("~");
    	$('#listTab').append('<tr><td>'+col[23]+'.'+col[24]+'</td><td>'+col[1]+col[2]+col[3]+col[4]+col[5]+'</td><td>'
    		+'<span class="tone'+col[6]+'">'+col[11]+'</span>'
    		+'<span class="tone'+col[7]+'">'+col[12]+'</span>'
    		+'<span class="tone'+col[8]+'">'+col[13]+'</span>'
    		+'<span class="tone'+col[9]+'">'+col[14]+'</span>'
    		+'<span class="tone'+col[10]+'">'+col[15]+'</span>'
    		+'</td><td>'+col[21]+'&nbsp;<span class="posTab">'+col[22]+'</span></td></tr>');
	}
	$("#wordcount").html(resultArray.length+1);
	$("#wordcount").append(" words");
}
function knowIt() {
	resultArray.splice(ID, 1);
	if(ID >= resultArray.length) {
		ID--;
	}
	dispCard("current");
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
function hskChange() {
	$('#HanziS').text('');
	$('#Pinyin0, #Pinyin1, #Pinyin2, #Pinyin3, #Pinyin4').text('');
	$('#English').text('');
	$('#PartofSpeech').text('');
	var hsk=$("#selHSK").val();
	if(hsk<3) {
		$('select[name*="selLesson"] option[value="16"]').remove();
		$('select[name*="selLesson"] option[value="17"]').remove();
		$('select[name*="selLesson"] option[value="18"]').remove();
		$('select[name*="selLesson"] option[value="19"]').remove();
		$('select[name*="selLesson"] option[value="20"]').remove();
	} else {
		$('#selLesson').append( new Option("16","16") );
		$('#selLesson').append( new Option("17","17") );
		$('#selLesson').append( new Option("18","18") );
		$('#selLesson').append( new Option("19","19") );
		$('#selLesson').append( new Option("20","20") );
	}
	LoadFlashCards();
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        	c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function add() {	// Add to review list
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState === 4) {
			if (request.status === 200) {
				$('#Views').append(request.responseText);
				var col=resultArray[ID].split("~");
				resultArray[ID]=col[0]+"~"+col[1]+"~"+col[2]+"~"+col[3]+"~"+col[4]+"~"+col[5]+"~"+col[6]+"~"+col[7]+"~"+col[8]
								+"~"+col[9]+"~"+col[9]+"~"+col[11]+"~"+col[12]+"~"+col[13]+"~"+col[14]+'~';
				$('#Delete').html("<button class='btn btn-danger btn-sm' onclick='del("+col[9]+")'>Remove from Review</button>");
			}
		}
	};
	var url='includes/insertIntoReview.php?id='+$('#DBID').text()+'&HSK='+$('#HSK').text();
	request.open('GET', url, true);
	request.send();
}
function del(idToDel) {	// Remove from review list
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState === 4) {
			if (request.status === 200) {
				$('#Delete').html("");
				var col=resultArray[ID].split("~");
				resultArray[ID]=col[0]+"~"+col[1]+"~"+col[2]+"~"+col[3]+"~"+col[4]+"~"+col[5]+"~"+col[6]+"~"+col[7]+"~"+col[8]
								+"~"+col[9]+"~~"+col[11]+"~"+col[12]+"~"+col[13]+"~"+col[14]+'~';
				dispCard("next");
			}
		}
	};
	var url='includes/deleteReview.php?id='+idToDel;
	request.open('GET', url, true);
	request.send();
}
function playAudio(pinyin) {
var audio_markup='<audio id="audio_player" controls="" preload="auto"><source id="audio_src" src="https://www.stephenmccready.asia/mandarin/audio/'+pinyin+'.mp3?rnd='+Math.random().toString()+'" type="audio/mpeg"></audio>';
	$("#audio_player_container").html(audio_markup);
	var player = $("#audio_player"); 
	player[0].play();
}
function playBAudio(pinyinAud1,pinyinAud2,charCount) {
	console.log(pinyinAud1+" ~ "+charCount);
	console.log(pinyinAud2+" ~ "+charCount);
	if(charCount>1) {
		var audio_markup='<audio id="audio_player" controls="" preload="auto"><source id="audio_src" src="https://ss0.baidu.com/6KAZsjip0QIZ8tyhnq/text2audio?tex='+pinyinAud1+'&cuid=dict&lan=ZH&ctp=1&pdt=30&vol=9&spd=4\" type="audio/mpeg"></audio>';
	} else {
		//https://appcdn.fanyi.baidu.com/zhdict/mp3/guan1.mp3
		var audio_markup='<audio id="audio_player" controls="" preload="auto"><source id="audio_src" src="https://appcdn.fanyi.baidu.com/zhdict/mp3/'+pinyinAud2+'.mp3" type="audio/mpeg"></audio>';
	}
	$("#audio_player_container").html(audio_markup);
	var player = $("#audio_player"); 
	player[0].play();
}
