$("#divHSK .btn").on('click touch', function () {var thisHSK=this.id.replace("labHSK", "");HSKchosen(thisHSK);});
function HSKchosen(HSK) {
	$('#holdHSK').text(HSK);
	$('#dispHSK').text("HSK: "+HSK);
	$('#divHSK').slideUp();
	$('#HanziS').text('');
	$('#Pinyin0, #Pinyin1, #Pinyin2, #Pinyin3, #Pinyin4').text('');
	$('#English').text('');
	$('#PartofSpeech').text('');
	$('#dispLesson').text($("input[name='radLesson']:checked").val());	
	setlabHSK(HSK);
	LoadFlashCards();
}
$("#divLesson .btn").on('click touch', function () {var thisLesson=this.id.replace("labLess", "");
	if($.isNumeric(thisLesson)) {
		LessonChosen(parseInt(thisLesson,10));
	} else {
		LessonChosen(thisLesson);
	}
});
function LessonChosen(Lesson) {
	$('#holdLesson').text(Lesson);
	$('#dispLesson').text(Lesson);
	$('#divLesson').slideUp();
	$('#HanziS').text('');
	$('#Pinyin0,#Pinyin1,#Pinyin2,#Pinyin3,#Pinyin4').text('');
	$('#English').text('');
	$('#PartofSpeech').text('');
	$('#dispHSK').text("HSK: "+$("input[name='radHSK']:checked").val());
	setlabLesson(Lesson);
	LoadFlashCards();
}
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
var randomize=document.querySelector('#random-glyph');
randomize.addEventListener('click', function(event) {
	if($('#random-glyph').hasClass("random-off")) {
		$('#random-glyph').removeClass("random-off");
		$('#random-glyph').addClass("random-on");
	} else {
		$('#random-glyph').removeClass("random-on");
		$('#random-glyph').addClass("random-off");
	}
});
var review=document.querySelector('#review-glyph');
review.addEventListener('click', function(event) {
	var col=resultArray[ID].split("~");
	if($('#review-glyph').hasClass("review-off")) {
		$('#review-glyph').removeClass("review-off");
		$('#review-glyph').addClass("review-on");
		addToReview();
	} else {
		$('#review-glyph').removeClass("review-on");
		$('#review-glyph').addClass("review-off");
		removeFromReview(col[25]);
	}
});
var copyHanzi=document.querySelector('#copy-glyph');
copyHanzi.addEventListener('click', function(event) {
	var clipboard=new ClipboardJS('#copy-glyph', {
    text: function() {
    	var col=resultArray[ID].split("~");
    	$("#copied").text(col[1]+col[2]+col[3]+col[4]+col[5]+" copied to clipboard");
    	$("#copied").show().delay(50).fadeOut(2000);
        return col[1]+col[2]+col[3]+col[4]+col[5];
    }
	});
});
copyHanzi.addEventListener('touchend', function(event) {
	var clipboard=new ClipboardJS('#copy-glyph', {
    text: function() {
    	var col=resultArray[ID].split("~");
    	$("#copied").text(col[1]+col[2]+col[3]+col[4]+col[5]+" copied to clipboard");
    	$("#copied").show().delay(50).fadeOut(2000);
        return col[1]+col[2]+col[3]+col[4]+col[5];
    }
	});
});
var HSKLevelCookie;
var HSKLessonCookie;
var AudioHanzi1=" ";
var AudioHanzi2=" ";
function init() {
	HSKLevelCookie=getCookie('HSKLevel');
	HSKLessonCookie=getCookie('HSKLesson');
	if(HSKLevelCookie==="" || HSKLevelCookie==="undefined"){HSKLevelCookie='1';}
	if(HSKLessonCookie==="" || HSKLessonCookie==="undefined"){HSKLessonCookie='1';}
	$("#holdHSK").text(HSKLevelCookie);
	$('#dispHSK').text("HSK: "+HSKLevelCookie);
	$("#holdLesson").text(HSKLessonCookie);
	$('#dispLesson').text(HSKLessonCookie);
	setlabHSK(HSKLevelCookie);
	setlabLesson(HSKLessonCookie);
	$("#divHSK,#divLesson").hide();
	LoadFlashCards();
}
function setlabHSK(x) {
	$("#labHSK1,#labHSK2,#labHSK3,#labHSK4,#labHSK5,#labHSK6,#labHSKAll").removeClass("active");
	$('#labHSK'+x).addClass("active");
	$("[name=radHSK]").val([x]);
	$("#holdHSK").text(x);
}
function setlabLesson(x) {
	$("#labLess01,#labLess02,#labLess03,#labLess04,#labLess05,#labLess06,#labLess07,#labLess08,#labLess09,#labLess10").removeClass("active");
	$("#labLess11,#labLess12,#labLess13,#labLess14,#labLess15,#labLess16,#labLess17,#labLess18,#labLess19,#labLess20").removeClass("active");
	$("#labLessAll,#labLessAdjectives,#labLessAdverbs,#labLessMeasureWords,#labLessNouns,#labLessNumbers").removeClass("active");
	$("#labLessParticles,#labLessPronouns,#labLessProperNouns,#labLessRadicals,#labLessVerbs,#labLessReview").removeClass("active");
	$('#labLess'+x).addClass("active");
	if($.isNumeric(x)){
		$("[name=radLesson]").val(parseInt(x,10));
		$("#holdLesson").text(parseInt(x,10));
	} else {
		$("[name=radLesson]").val([x]);
		$("#holdLesson").text(x);
	}
}
$('#myform1 :checkbox').change(function() {
	if(this.id=="toggleENGLISH") {
		if($('#toggleENGLISH').prop("checked") === true) {
			$('#English,#PartofSpeech,.colEnglish,.colPOS').show();
		} else {
			$('#English,#PartofSpeech,.colEnglish,.colPOS').hide();
		}
	} else {
		if(this.id=="togglePINYIN") {
			if($('#togglePINYIN').prop("checked") === true) {
				$('#Pinyin,.colPinyin').show();
			} else {
				$('#Pinyin,.colPinyin').hide();
			}
		} else {
			if(this.id=="toggleSTROKEQUIZ") {
				quizControl();
			}
		}
	}
});
$('#myform2 :checkbox').change(function() {
	if(this.id=="toggleLANGUAGE") {
		$('.han, .eng').toggle();
	} else {
		if(this.id=="toggleSOUND") {
			if($('#toggleSOUND').prop("checked") === true) {
				$('#animation, #animation-buttons').hide();
			} else {
				$('#animation, #animation-buttons').show();
			}
		} else {
			if(this.id=="toggleSHOWOUTLINE") {
				quizControl();
			}
		}
	}
});
$('#toggleCARDLIST').click(function() {
	dispCard('current');
	populateTable();
	$('#Card,#fCard,#pCard,#List,#listButton,#cardButton').toggle();
	if($('#togglePINYIN').prop("checked") == true) {$('#Pinyin,.colPinyin').show();} else {$('#Pinyin,.colPinyin').hide();}
	if($('#toggleENGLISH').prop("checked") == true) {$('#English,.colEnglish').show();} else {$('#English,.colEnglish').hide();}
	if($('#toggleENGLISH').prop("checked") == true) {$('#PartofSpeech,.colPOS').show();} else {$('#PartofSpeech,.colPOS').hide();}
});
$('#selQuizMisses').change(function() {
	if(this.id=="selQuizMisses") {
		writer0.quiz(options={showHintAfterMisses:$('select[id=selQuizMisses]').val()});
		var row=resultArray[ID];
		var col=row.split("~");
		if(col[2]!=""){writer1.quiz(options={showHintAfterMisses:$('select[id=selQuizMisses]').val()});}
		if(col[3]!=""){writer2.quiz(options={showHintAfterMisses:$('select[id=selQuizMisses]').val()});}
		if(col[4]!=""){writer3.quiz(options={showHintAfterMisses:$('select[id=selQuizMisses]').val()});}
		if(col[5]!=""){writer4.quiz(options={showHintAfterMisses:$('select[id=selQuizMisses]').val()});}
	}
});
$('#btn-search').click(function() {
	search();
});
$('#btn-clearsearch').click(function() {
	$("#txtsearch").val("");
});
$('#btn-rad').click(function() {
	$('.loader').show();
	var row=resultArray[ID];
	var col=row.split("~");
	var request=new XMLHttpRequest();
	request.onreadystatechange=function() {
		if (request.readyState===4) {
			if (request.status===200) {
				if(request.responseText==="") {
					$('.loader').hide();
					$('#btn-rad').html("No cards for <span lang='zh'>"+col[1]+"</span> exist yet.");
					$("#btn-rad").prop("disabled",true);
				} else {
					$("#btn-rad").prop("disabled",false);
					var result=request.responseText;
					var resultLen=result.length;
					resultLen=resultLen-1;
					result=result.substr(0, resultLen);
					resultArray=result.split("|");
					ID=0;
					holdID=999999;
					$('.loader').hide();
					populateTable();
					dispCard('first');
				}
			}
		}
	};
	var url='includes/searchRadical.php?RadicalID='+col[25];
	request.open('GET', url, true);
	request.send();
	row=null;
});
function quizControl() {
	var row=resultArray[ID];
	var col=row.split("~");
	if($('#toggleSTROKEQUIZ').prop("checked") === true) {
		$('#HanziAni0').css('border','1px solid silver');
		writer0.hideCharacter();
		writer0.quiz();
		if($('#toggleSHOWOUTLINE').prop("checked") === false) {writer0.hideOutline();}
		if(col[2]!=""){
			writer1.hideCharacter();
			if($('#toggleSHOWOUTLINE').prop("checked") === false) {writer1.hideOutline();}
			writer1.quiz();
			$('#HanziAni1').css('border','1px solid silver');
		} else {
			$('#HanziAni1').css('border','0');
		}
		if(col[3]!=""){
			writer2.hideCharacter();
			if($('#toggleSHOWOUTLINE').prop("checked") === false) {writer2.hideOutline();}
			writer2.quiz();
			$('#HanziAni2').css('border','1px solid silver');
		} else {
			$('#HanziAni2').css('border','0');
		}
		if(col[4]!=""){
			writer3.hideCharacter();
			if($('#toggleSHOWOUTLINE').prop("checked") === false) {writer3.hideOutline();}
			writer3.quiz();
			$('#HanziAni3').css('border','1px solid silver');
		} else {
			$('#HanziAni3').css('border','0');
		}
		if(col[5]!=""){
			writer4.hideCharacter();
			if($('#toggleSHOWOUTLINE').prop("checked") === false) {writer4.hideOutline();}
			writer4.quiz();
			$('#HanziAni4').css('border','1px solid silver');
		} else {
			$('#HanziAni4').css('border','0');
		}
	} else {
		$('#HanziAni0,#HanziAni1,#HanziAni2,#HanziAni3,#HanziAni4').css('border','0');
		writer0.showCharacter();writer0.cancelQuiz();
		if(col[2]!=""){writer1.showCharacter();writer1.cancelQuiz();}
		if(col[3]!=""){writer2.showCharacter();writer2.cancelQuiz();}
		if(col[4]!=""){writer3.showCharacter();writer3.cancelQuiz();}
		if(col[5]!=""){writer4.showCharacter();writer4.cancelQuiz();}			
	}
}
var resultArray;
var ID;
var holdID;
function LoadFlashCards() {
	writer0=writer1=writer2=writer3=writer4=null;
	$('#Pinyin0,#Pinyin1,#Pinyin2,#Pinyin3,#Pinyin4,#PartofSpeech,#Pinyin,#Views').text('');
	$("#div-ani0,#div-ani1,#div-ani2,#div-ani3,#div-ani4").hide();
	$('#Audio, #English').html('');
	$('').html('');
	$('.loader').show();
	var request=new XMLHttpRequest();
	request.onreadystatechange=function() {
		if (request.readyState===4) {
			if (request.status===200) {
				if(request.responseText==="") {
					$('#HanziAni0,#HanziAni1,#HanziAni2,#HanziAni3,#HanziAni4').html("");
					$("#HanziAni0,#HanziAni1,#HanziAni2,#HanziAni3,#HanziAni4").width("20%");
					$('#Pinyin,#PartofSpeech').text("");
					$('#English,#wordcount').html("No cards for <b>HSK: " + $('#holdHSK').text() + ", " +
						$('#holdLesson').text() + "</b> available yet.");
					$("#footCenter,#pinyin").html("");
					$('#HanziAni0,#HanziAni1,#HanziAni2,#HanziAni3,#HanziAni4,#English').show();
					$('#div-ani0,#div-ani1,#div-ani2,#div-ani3,#div-ani4,.loader,#Views,#Audio,#divRadicalBtn').hide();
					resultArray=[];
					$("#listTab tr").remove();
				} else {
					var result=request.responseText;
					var resultLen=result.length;
					resultLen=resultLen-1;
					result=result.substr(0, resultLen);
					resultArray=result.split("|");
					ID=0;
					holdID=999999;
					$('.loader').hide();
					populateTable();
					dispCard('first');
				}
			}
		}
	};
	var url='includes/loadFlashCards.php?HSK='+$('#holdHSK').text()+'&Lesson='+$('#holdLesson').text().replace(" ", "");
	request.open('GET', url, true);
	request.send();
}
function dispCard(action) {
	var arrLen=resultArray.length;
	if(arrLen===0) {
		$('#HanziAni0').html("&#128077");
		$('#HanziAni1,#HanziAni2,#HanziAni3,#HanziAni4').html('');
		$("#div-ani0,#div-ani1,#div-ani2,#div-ani3,#div-ani4").hide();
		var hsk=$("#holdHSK").text();
		var l=$("#holdLesson").text();
		if(hsk==="All"){
			if( (hsk<3 && l<15) || (hsk>2 && l<20) ){
				l++;
				$("#holdLesson").text(parseInt(l,10));
				$('#dispLesson').text(parseInt(l,10));
				$('input:radio[name=radLesson][value="'+l+'"]').click("quiet");
			} else {
				$("#holdLesson").text("Review");
				$("#dispLesson").text("Review");
				$('input:radio[name=radLesson][value="Review"]').click("quiet");
			}		
		} else {
			if($.isNumeric(l)){
				if( (hsk<3 && l<15) || (hsk>2 && l<20) ){
					l++;
					$("#holdLesson").text(parseInt(l,10));
					$('#dispLesson').text(parseInt(l,10));
					$('input:radio[name=radLesson][value="'+l+'"]').click("quiet");
				} else if( hsk==6 && l==20 ) {
					$("#holdHSK").text("All");
					$('#dispHSK').text("HSK: All");
					$("#holdLesson").text("All");
					$("#dispLesson").text("All");
					$('input:radio[name=radLesson][value="All"]').click("quiet");
				} else {
					hsk++;
					l=1;
					$("#holdHSK").text(hsk);
					$('#dispHSK').text("HSK: "+parseInt(hsk,10));
					$("#holdLesson").text(parseInt(l,10));
					$('#dispLesson').text(parseInt(l,10));
					$('input:radio[name=radLesson][value="'+l+'"]').click("quiet");
				}
			} else {
				$("#holdLesson").text("Review");
				$("#dispLesson").text("Review");
				$('input:radio[name=radLesson][value="Review"]').click("quiet");
			}
		}
		LoadFlashCards();
	} else {
		$("#Views").show();
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
			} else if(action=="current"){
				/* Do nothing */
			} else if($('#random-glyph').hasClass("random-on")) {
				ID=Math.floor(Math.random() * arrLen);
				if (arrLen!==0 && ID===lastID) {
					if(ID===0) {ID++;} else {ID--;}
				}
			} else {
				ID++;
				if(ID >= arrLen) {
					ID=0;
				}
			}
		}
	if(holdID!==ID) {
		holdID=ID;
		var row=resultArray[ID];
		var col=row.split("~");
		lastID=ID;
		$("#HanziAni0").html('');
		$('#Audio').html('');
		$('#OnRevList').text("");
		if(col[2]!="") {$("#HanziAni1").html('');}
		if(col[3]!="") {$("#HanziAni2").html('');}
		if(col[4]!="") {$("#HanziAni3").html('');}
		if(col[5]!="") {$("#HanziAni4").html('');}
		var wSize=Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		var w=148;var h=148;
		$('#HanziAni0,#HanziAni1,#HanziAni2,#HanziAni3,#HanziAni4').css('height','148px');
		if(wSize<621) {
			w=69;
			h=69;
			$('#HanziAni0,#HanziAni1,#HanziAni2,#HanziAni3,#HanziAni4').css('height','75px');
		} else if(wSize<1024) {
			w=123;
			h=123;
			$('#HanziAni0,#HanziAni1,#HanziAni2,#HanziAni3,#HanziAni4').css('height','125px');
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
/*
		if(col[5]!=="") {
			$("#ani-container").css({"fontSize": "7em","height":"1.25em"});
		} else if(col[4]!=="") {
			$("#ani-container").css({"fontSize": "9em","height":"1.25em"});
		} else if(col[3]!=="") {
			$("#ani-container").css({"fontSize": "11em","height":"1.25em"});
		} else if(col[2]!=="") {
			$("#ani-container").css({"fontSize": "13em","height":"1.25em"});
		} else {
			$("#ani-container").css({"fontSize": "13em","height":"1.25em"});
		}
		$("#HanziAni0").text(col[1]);
		$("#HanziAni0").css({"color": strokeCol1});
		$("#HanziAni1").text(col[2]);
		$("#HanziAni1").css({"color": strokeCol2});
		$("#HanziAni2").text(col[3]);
		$("#HanziAni2").css({"color": strokeCol3});
		$("#HanziAni3").text(col[4]);
		$("#HanziAni3").css({"color": strokeCol4});
		$("#HanziAni4").text(col[5]);
		$("#HanziAni4").css({"color": strokeCol5});
*/
		var showChar="true";
		if($('#toggleSTROKEQUIZ').prop("checked") === true) {
			showChar="false";
		}
		var showOut="true";
		if($('#toggleSTROKEOUTLINE').prop("checked") === true) {
			showOut="false";
		}
		$('#HanziAni0,#HanziAni1,#HanziAni2,#HanziAni3,#HanziAni4').css('border','0');
		$("#HanziAni0").html('');
		$("#HanziAni0").css('color', strokeCol1);
		$("#btn-ani0").show();
		writer0=new HanziWriter('HanziAni0', col[1],
			{width:w,height:h,padding:0,delayBetweenStrokes:50,showHintAfterMisses:$('select[id=selQuizMisses]').val(),
				strokeColor:strokeCol1,showCharacter:showChar,showOutline:showOut
				,onLoadCharDataSuccess: function(data) {
				}
				,onLoadCharDataError: function(reason) {
					$("#HanziAni0").html('<div class="hanzi">'+col[1]+'</div><div class="disabled">No stroke order</div>');
					$("#HanziAni0").css('color', strokeCol1);
					$("#btn-ani0").hide();
				}
			}
		);
		if($('#toggleSTROKEQUIZ').prop("checked") === true) {
			writer0.hideCharacter();
			$('#HanziAni0').css('border','1px solid silver');
			writer0.quiz();
		}		
		var y=1;
		if(col[2]!="") {
			$("#btn-ani1").show();
			$("#HanziAni1").html('');
			writer1=new HanziWriter('HanziAni1', col[2], {width:w,height:h,padding:0,delayBetweenStrokes:50,showHintAfterMisses:$('select[id=selQuizMisses]').val(),
				strokeColor:strokeCol2,showCharacter:showChar,showOutline:showOut,
					onLoadCharDataError: function(reason) {
						$("#HanziAni1").html('<div class="hanzi">'+col[2]+'</div><div class="disabled">No stroke order</div>');
						$("#HanziAni1").css('color', strokeCol1);
						$("#btn-ani1").hide();}});
			$("#btn-ani1").css("color", strokeCol2);
			y++;
			if($('#toggleSTROKEQUIZ').prop("checked") === true) {
				writer1.hideCharacter();
				$('#HanziAni1').css('border','1px solid silver');
				writer1.quiz();
			}
		} 
		if(col[3]!="") {
			$("#HanziAni2").html('');
			writer2=new HanziWriter('HanziAni2', col[3], {width:w,height:h,padding:0,delayBetweenStrokes:50,showHintAfterMisses:$('select[id=selQuizMisses]').val(),
				strokeColor:strokeCol3,showCharacter:showChar,showOutline:showOut,
					onLoadCharDataError: function(reason) {
						$("#HanziAni2").html('<div class="hanzi">'+col[3]+'</div><div class="disabled">No stroke order</div>');
						$("#HanziAni2").css('color', strokeCol1);
						$("#btn-ani2").hide();}});
			$("#btn-ani2").css("color", strokeCol3);
			y++;
			if($('#toggleSTROKEQUIZ').prop("checked") === true) {
				writer2.hideCharacter();
				$('#HanziAni2').css('border','1px solid silver');
				writer2.quiz();
			}
		} 
		if(col[4]!="") {
			$("#HanziAni3").html('');
			writer3=new HanziWriter('HanziAni3', col[4], {width:w,height:h,padding:0,delayBetweenStrokes:50,showHintAfterMisses:$('select[id=selQuizMisses]').val(),
				strokeColor:strokeCol4,showCharacter:showChar,showOutline:showOut,
					onLoadCharDataError: function(reason) {
						$("#HanziAni3").html('<div class="hanzi">'+col[4]+'</div><div class="disabled">No stroke order</div>');
						$("#HanziAni3").css('color', strokeCol1);
						$("#btn-ani3").hide();}});
			$("#btn-ani3").css("color", strokeCol4);
			y++;
			if($('#toggleSTROKEQUIZ').prop("checked") === true) {
				writer3.hideCharacter();
				$('#HanziAni3').css('border','1px solid silver');
				writer3.quiz();
			}
		} 
		if(col[5]!="") {
			$("#HanziAni4").html('');
			writer4=new HanziWriter('HanziAni4', col[5], {width:w,height:h,padding:0,delayBetweenStrokes:50,showHintAfterMisses:$('select[id=selQuizMisses]').val(),
				strokeColor:strokeCol5,showCharacter:showChar,showOutline:showOut,
					onLoadCharDataError: function(reason) {
						$("#HanziAni4").html('<div class="hanzi">'+col[5]+'</div><div class="disabled">No stroke order</div>');
						$("#HanziAni4").css('color', strokeCol1);
						$("#btn-ani4").hide();}});
			$("#btn-ani4").css("color", strokeCol5);
			y++;
			if($('#toggleSTROKEQUIZ').prop("checked") === true) {
				writer4.hideCharacter();
				$('#HanziAni4').css('border','1px solid silver');
				writer4.quiz();
			}
		}
		$("#div-ani0").show();
		if(y==1){
			$("#HanziAni0,#div-ani0").width("98%");
			$("#HanziAni1,#HanziAni2,#HanziAni3,#HanziAni4,#div-ani1,#div-ani2,#div-ani3,#div-ani4").width("0%");
			$("#ani-container, #animation-buttons").width("20%");
			$("#div-ani1").hide();$("#div-ani2").hide();$("#div-ani3").hide();$("#div-ani4").hide();
		} else if(y==2){
			$("#HanziAni0,#HanziAni1").width("48%");$("#div-ani0,#div-ani1").width("50%");
			$("#HanziAni2,#HanziAni3,#HanziAni4,#div-ani2,#div-ani3,#div-ani4").width("0%");
			$("#ani-container, #animation-buttons").width("44%");
			$("#div-ani1").show();$("#div-ani2").hide();$("#div-ani3").hide();$("#div-ani4").hide();
		} else if(y==3){
			$("#HanziAni0,#HanziAni1,#HanziAni2").width("31%");
			$("#div-ani0,#div-ani1,#div-ani2").width("33.3%");
			$("#HanziAni3,#HanziAni4,#div-ani3,#div-ani4").width("0%");$("#ani-container, #animation-buttons").width("66%");
			$("#div-ani1").show();$("#div-ani2").show();$("#div-ani3").hide();$("#div-ani4").hide();
		} else if(y==4){
			$("#HanziAni0,#HanziAni1,#HanziAni2,#HanziAni3").width("22.5%");
			$("#div-ani0,#div-ani1,#div-ani2,#div-ani3").width("25%");
			$("#HanziAni4, #div-ani4").width("0%");$("#ani-container, #animation-buttons").width("80%");
			$("#div-ani1").show();$("#div-ani2").show();$("#div-ani3").show();$("#div-ani4").hide();
		} else if(y==5){
			$("#HanziAni0,#HanziAni1,#HanziAni2,#HanziAni3,#HanziAni4").width("18%");
			$("#div-ani0,#div-ani1,#div-ani2,#div-ani3,#div-ani4").width("20%");
			$("#ani-container, #animation-buttons").width("100%");
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
		$('#Audio').append('<button class="btn btn-default btn-sm btn-audio" onclick="playBAudio(\''+AudioHanzi1.toLowerCase()+'\',\''+AudioHanzi2.toLowerCase()+'\','+hanziSize+')"><span class="glyphicon glyphicon-volume-up"></span></button>');
		var PNspace1="", PNspace2="", PNspace3="", PNspace4="";
		if(col[22]=="proper noun") {
			if(col[12].substr(0,1)===col[12].substr(0,1).toUpperCase()) {PNspace1=" ";}
			if(col[13].substr(0,1)===col[13].substr(0,1).toUpperCase()) {PNspace2=" ";}
			if(col[14].substr(0,1)===col[14].substr(0,1).toUpperCase()) {PNspace3=" ";}
			if(col[15].substr(0,1)===col[15].substr(0,1).toUpperCase()) {PNspace4=" ";}
		}
		$('#Pinyin').html('<span class="tone'+col[6]+'">'+col[11]+'</span>'+PNspace1
    		+'<span class="tone'+col[7]+'">'+col[12]+'</span>'+PNspace2
    		+'<span class="tone'+col[8]+'">'+col[13]+'</span>'+PNspace3
    		+'<span class="tone'+col[9]+'">'+col[14]+'</span>'+PNspace4
    		+'<span class="tone'+col[10]+'">'+col[15]+'</span>');
		$('#English').text(col[21]);
		$('#PartofSpeech').text(col[22]);
		if(col[22]==="radical") {
			$("#btn-rad").html('<span class="glyphicon glyphicon-list"> Characters containing</span> <span lang="zh">'+col[1]+'</span>');
			$("#divRadicalBtn").show();
			$("#btn-rad").prop("disabled",false);
		} else {
			$("#divRadicalBtn").hide();
		}
		$('#HSK').text(col[23]);
		$('#DBID').text(col[25]);
		col[27]++;
		$('#Views').html('<span class="han">汉语水平考试 </span><span class="eng">HSK </span> ' + col[23] + '-' + col[24] + '&nbsp;&nbsp;&nbsp;<span class="han">浏览量</span><span class="eng">Views</span>: ' + col[27]);
		var dispID=ID+1;
		$('#footCenter').html(dispID.toString() + ' <span class="han">的</span><span class="eng">of</span> ' + arrLen.toString());
		if(col[26]!=='')	{
			$('#review-glyph').removeClass("review-off");
			$('#review-glyph').addClass("review-on");
		} else {
			$('#review-glyph').removeClass("review-on");
			$('#review-glyph').addClass("review-off");
		}
		resultArray[ID]=col[0]+'~'+col[1]+'~'+col[2]+'~'+col[3]+'~'+col[4]+'~'+col[5]+'~'+
						col[6]+'~'+col[7]+'~'+col[8]+'~'+col[9]+'~'+col[10]+'~'+col[11]+'~'+col[12]+'~'+col[13]+'~'+col[14]+'~'+
						col[15]+'~'+col[16]+'~'+col[17]+'~'+col[18]+'~'+col[19]+'~'+col[20]+'~'+col[21]+'~'+col[22]+'~'+col[23]+'~'+
						col[24]+'~'+col[25]+'~'+col[26]+'~'+col[27]+'~';
		if($('#togglePINYIN').prop("checked") == true) {$('#Pinyin,.colPinyin').show();} else {$('#Pinyin,.colPinyin').hide();}
		if($('#toggleENGLISH').prop("checked") == true) {$('#English,.colEnglish').show();} else {$('#English,.colEnglish').hide();}
		if($('#toggleENGLISH').prop("checked") == true) {$('#PartofSpeech,.colPOS').show();} else {$('#PartofSpeech,.colPOS').hide();}
		if($('#toggleSOUND').prop("checked")) {
			$('#animation').hide();
			$('#animation-buttons').hide();
			playBAudio(AudioHanzi1.toLowerCase(),AudioHanzi2.toLowerCase(),hanziSize);
		}
	}
		setCookie("HSKLevel", $("#holdHSK").text(), 120);
		setCookie("HSKLesson", $("#holdLesson").text(), 120);
	}
}
function populateTable(){
	$("#listTab tr").remove();
	$("#wordcount").html("");
	for (i=0; i < resultArray.length; i++) {
		var col=resultArray[i].split("~");
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
		var PNspace1="", PNspace2="", PNspace3="", PNspace4="";
		if(col[22]=="proper noun") {
			if(col[12].substr(0,1)===col[12].substr(0,1).toUpperCase()) {PNspace1=" ";}
			if(col[13].substr(0,1)===col[13].substr(0,1).toUpperCase()) {PNspace2=" ";}
			if(col[14].substr(0,1)===col[14].substr(0,1).toUpperCase()) {PNspace3=" ";}
			if(col[15].substr(0,1)===col[15].substr(0,1).toUpperCase()) {PNspace4=" ";}
		}
		var tdReview="";
		if(col[26]!=='') {
			tdReview='<td class="tdReview" id="td'+col[25]+'td'+i+'td'+col[23]+'"><span id="tabRevGlyph'+i+'" class="glyphicon glyphicon-pushpin review-on"></span></td>';
		} else {
			tdReview='<td class="tdReview" id="td'+col[25]+'td'+i+'td'+col[23]+'"><span id="tabRevGlyph'+i+'" class="glyphicon glyphicon-pushpin review-off"></span></td>';
		}
    	$('#listTab').append('<tr id="tr'+col[25]+'"><td>'+col[23]+'.'+col[24]+'</td>'
    		+'<td><button class="btn btn-default btn-xs btn-audio" onclick="ID='+i+';dispCard(\'current\');populateTable();$(\'#Card, #fCard, #pCard, #List\').toggle(); $(\'#listButton\').toggle(); $(\'#cardButton\').toggle();"><span class="glyphicon glyphicon-file"></span></button></td>'
    		+'<td><span class="tone'+col[6]+'" lang="zh">'+col[1]+'</span>'
    		+'<span class="tone'+col[7]+' lang="zh"">'+col[2]+'</span>'
    		+'<span class="tone'+col[8]+' lang="zh"">'+col[3]+'</span>'
    		+'<span class="tone'+col[9]+' lang="zh"">'+col[4]+'</span>'
    		+'<span class="tone'+col[10]+' lang="zh"">'+col[5]+'</span></td>'
    		+'<td><button class="btn btn-default btn-xs btn-audio" onclick="playBAudio(\''
    			+AudioHanzi1.toLowerCase()+'\',\''+AudioHanzi2.toLowerCase()+'\','+hanziSize
    			+')"><span class="glyphicon glyphicon-volume-up"></span></button></td>'
    		+'<td><span class="colPinyin tone'+col[6]+'">'+col[11]+'</span>'+PNspace1
    		+'<span class="colPinyin tone'+col[7]+'">'+col[12]+'</span>'+PNspace2
    		+'<span class="colPinyin tone'+col[8]+'">'+col[13]+'</span>'+PNspace3
    		+'<span class="colPinyin tone'+col[9]+'">'+col[14]+'</span>'+PNspace4
    		+'<span class="colPinyin tone'+col[10]+'">'+col[15]+'</span></td>'
    		+'<td><span class="colEnglish">'+col[21]+'</span>&nbsp;<span class="colPOS">'+col[22]+'</span></td>'
    		+tdReview+'</tr>');
	}
	$("#wordcount").html(resultArray.length);
	$("#wordcountsuffix").html(" words");
}
$("#listTab").on("click","td",function() {
	var tdArray=this.id.split("td");
	if(this.id !== '') {
		ID=tdArray[2];
		var col=resultArray[ID].split("~");
		if($("#tabRevGlyph"+tdArray[2]).hasClass("review-off")) {
			$('#DBID').text(tdArray[1]);
			$('#HSK').text(tdArray[3]);
			addToReview();
			$("#review-glyph,#tabRevGlyph"+tdArray[2]).removeClass("review-off");
			$("#review-glyph,#tabRevGlyph"+tdArray[2]).addClass("review-on");
		} else {
			removeFromReview(tdArray[1]);
			$("#review-glyph,#tabRevGlyph"+tdArray[2]).removeClass("review-on");
			$("#review-glyph,#tabRevGlyph"+tdArray[2]).addClass("review-off");
		}
	}
});
function knowIt() {
	var col=resultArray[ID].split("~");
	resultArray.splice(ID, 1);
	if(ID >= resultArray.length) {
		ID--;
	}
	holdID=999999;
	$('#tr'+col[25]).remove();
	var wordcount=$('#wordcount').html();
	wordcount--;
	$('#wordcount').html(wordcount);
	dispCard("current");
}
function setCookie(cname, cvalue, exdays) {
    var d=new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires="expires="+ d.toUTCString();
    document.cookie=cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name=cname + "=";
    var decodedCookie=decodeURIComponent(document.cookie);
    var ca=decodedCookie.split(';');
    for(var i=0; i <ca.length; i++) {
        var c=ca[i];
        while (c.charAt(0)==' ') {
        	c=c.substring(1);
        }
        if (c.indexOf(name)===0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function addToReview() {
	var request=new XMLHttpRequest();
	request.onreadystatechange=function() {
		if (request.readyState===4) {
			if (request.status===200) {
				var col=resultArray[ID].split("~");
				resultArray[ID]=col[0]+'~'+col[1]+'~'+col[2]+'~'+col[3]+'~'+col[4]+'~'+col[5]+'~'+
						col[6]+'~'+col[7]+'~'+col[8]+'~'+col[9]+'~'+col[10]+'~'+col[11]+'~'+col[12]+'~'+col[13]+'~'+col[14]+'~'+
						col[15]+'~'+col[16]+'~'+col[17]+'~'+col[18]+'~'+col[19]+'~'+col[20]+'~'+col[21]+'~'+col[22]+'~'+col[23]+'~'+
						col[24]+'~'+col[25]+'~'+col[25]+'~'+col[27]+'~';
			}
		}
	};
	var url='includes/insertIntoReview.php?id='+$('#DBID').text()+'&HSK='+$('#HSK').text();
	request.open('GET', url, true);
	request.send();
}
function removeFromReview(idToDel) {
	var request=new XMLHttpRequest();
	request.onreadystatechange=function() {
		if (request.readyState===4) {
			if (request.status===200) {
				var col=resultArray[ID].split("~");
				resultArray[ID]=col[0]+'~'+col[1]+'~'+col[2]+'~'+col[3]+'~'+col[4]+'~'+col[5]+'~'+
						col[6]+'~'+col[7]+'~'+col[8]+'~'+col[9]+'~'+col[10]+'~'+col[11]+'~'+col[12]+'~'+col[13]+'~'+col[14]+'~'+
						col[15]+'~'+col[16]+'~'+col[17]+'~'+col[18]+'~'+col[19]+'~'+col[20]+'~'+col[21]+'~'+col[22]+'~'+col[23]+'~'+
						col[24]+'~'+col[25]+'~'+''+'~'+col[27]+'~';
			}
		}
	};
	var url='includes/deleteReview.php?id='+idToDel;
	request.open('GET', url, true);
	request.send();
}
function playBAudio(pinyinAud1,pinyinAud2,charCount) {
	if(charCount>1) {
		var audio_markup='<audio id="audio_player" controls="" preload="auto"><source id="audio_src" src="https://ss0.baidu.com/6KAZsjip0QIZ8tyhnq/text2audio?tex='+pinyinAud1+'&cuid=dict&lan=ZH&ctp=1&pdt=30&vol=9&spd=4\" type="audio/mpeg"></audio>';
	} else {
		var audio_markup='<audio id="audio_player" controls="" preload="auto"><source id="audio_src" src="https://appcdn.fanyi.baidu.com/zhdict/mp3/'+pinyinAud2+'.mp3" type="audio/mpeg"></audio>';
	}
	$("#audio_player_container").html(audio_markup);
	var player=$("#audio_player"); 
	player[0].play();
}
function search() {
	$('#Pinyin0, #Pinyin1, #Pinyin2, #Pinyin3, #Pinyin4, #PartofSpeech, #Pinyin, #Views').text('');
	$("#divSearch, #div-ani0, #div-ani1, #div-ani2, #div-ani3, #div-ani4").hide();
	$('#Audio, #English').html('');
	$('.loader').show();
	var request=new XMLHttpRequest();
	request.onreadystatechange=function() {
		if (request.readyState===4) {
			if (request.status===200) {
				if(request.responseText==="") {
					$('#HanziAni0,#HanziAni1,#HanziAni2,#HanziAni3,#HanziAni4,#footCenter,#wordcountsuffix').html("");
					$("#HanziAni0,#HanziAni1,#HanziAni2,#HanziAni3,#HanziAni4").width("20%");
					$('#English,#wordcount').html("No cards for this search criteria exist.");
					$('#HanziAni0,#HanziAni1,#HanziAni2,#HanziAni3,#HanziAni4,#English').show();
					$('#div-ani0,#div-ani1,#div-ani2,#div-ani3,#div-ani4,.loader').hide();
					resultArray=[];
					$("#listTab tr").remove();
				} else {
					var result=request.responseText;
					var resultLen=result.length;
					resultLen=resultLen-1;
					result=result.substr(0, resultLen);
					resultArray=result.split("|");
					ID=0;
					holdID=999999;
					$('.loader').hide();
//					$('#dispHSK').text("Search");
//					$('#dispLesson').text($('#txtsearch').val());
					populateTable();
					dispCard('first');
				}
			}
		}
	};
	var url='includes/search.php?search='+$('#txtsearch').val()
		+'&exact='+$('#toggleEXACTMATCH').prop("checked")
		+'&case='+$('#toggleMATCHCASE').prop("checked");
	request.open('GET', url, true);
	request.send();
}
document.getElementById('btn-ani0').addEventListener('click', function() {
	writer0.animateCharacter({onComplete: function() {
		if($('#toggleSTROKEQUIZ').prop("checked") === true) {
			writer0.hideCharacter();
			writer0.quiz();
		}
	}
	});
});
document.getElementById('btn-ani1').addEventListener('click', function() {
	writer1.animateCharacter({onComplete: function() {
		if($('#toggleSTROKEQUIZ').prop("checked") === true) {
			writer1.hideCharacter();
			writer1.quiz();
		}
	}
	});
});
document.getElementById('btn-ani2').addEventListener('click', function() {
	writer2.animateCharacter({onComplete: function() {
		if($('#toggleSTROKEQUIZ').prop("checked") === true) {
			writer2.hideCharacter();
			writer2.quiz();
		}
	}
	});
});
document.getElementById('btn-ani3').addEventListener('click', function() {
	writer3.animateCharacter({onComplete: function() {
		if($('#toggleSTROKEQUIZ').prop("checked") === true) {
			writer3.hideCharacter();
			writer3.quiz();
		}
	}
	});
});
document.getElementById('btn-ani4').addEventListener('click', function() {
	writer4.animateCharacter({onComplete: function() {
		if($('#toggleSTROKEQUIZ').prop("checked") === true) {
			writer4.hideCharacter();
			writer4.quiz();
		}
	}
	});
});
