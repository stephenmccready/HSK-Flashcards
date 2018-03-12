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
	$('#Pinyin0').text('');
	$('#Pinyin1').text('');
	$('#Pinyin2').text('');
	$('#Pinyin3').text('');
	$('#Pinyin4').text('');
	$('#PartofSpeech').text('');
	$('#English').html('');
	$('#StrokeOrder').text('');
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState === 4) {
			if (request.status === 200) {
				if(request.responseText==="") {
					$('#HanziS').text("🚧");
					$('#Pinyin0').text('');
					$('#Pinyin1').text('');
					$('#Pinyin2').text('');
					$('#Pinyin3').text('');
					$('#Pinyin4').text('');
					$('#PartofSpeech').text('');
					$('#English').html("No cards for this criteria available.");
					$('#HanziS').show();
					$('#StrokeOrder').text('');
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
	var url='includes/loadFlashCards.php?HSK='+$('#selHSK option:selected').val()+'&Lesson='+$('#selLesson option:selected').val();
	request.open('GET', url, true);
	request.send();
}
function dispCard(action) {
	var arrLen=resultArray.length;
	$('#HanziS').text("");
	$('#StrokeOrder').text('');
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
		for(x=0; x <= col[1].length; x++) {
			if(col[1].substr(x, 1)=="(" || col[1].substr(x, 1)==")") {
				$('#HanziS').append(col[1].substr(x, 1));
			} else {
				if(col[1].substr(x, 1)!="") {
					$('#HanziS').append(col[1].substr(x, 1));
					$('#StrokeOrder').append('<a class="btn btn-default btn-xs btn-stroke-order" href="https://hanyu.baidu.com/s?wd='
								+col[1].substr(x, 1)+'&ptype=zici" target="_blank">'+col[1].substr(x, 1)+' stroke</a>');
				}
			}
		}
		getPinyinColor(col,null);
//		$('#Pinyin').html('<a herf="#" url="http://appcdn.fanyi.baidu.com/zhdict/mp3/dang1.mp3" class="mp3-play">'+col[3]+'</a>');
		$('#English').text(col[5]);
		$('#PartofSpeech').text(col[6]);
		$('#HSK').text(col[7]);
		$('#DBID').text(col[9]);
		col[12]++;
		$('#Views').html('HSK ' + col[7] + '-' + col[8] + '&nbsp;&nbsp;&nbsp;Views: ' + col[12]);
		var dispID=ID+1;
		$('#footCenter').text(dispID.toString() + ' of ' + arrLen.toString());
		resultArray[ID]=col[0]+'~'+col[1]+'~'+col[2]+'~'+col[3]+'~'+col[4]+'~'+col[5]+'~'+
						col[6]+'~'+col[7]+'~'+col[8]+'~'+col[9]+'~'+col[10]+'~'+col[11]+'~'+col[12]+'~'+col[13]+'~';	
		if(col[10]!=='')	{
			$('#Delete').html("<button class='btn btn-danger btn-xs' onclick='del("+col[10]+")'>Remove from Review</button>");
		} else {
			$('#Delete').html("");
		}
		if($('input[name=chkPINYIN]:checked').val()) {$('#Pinyin').show();} else {$('#Pinyin').hide();}
		if($('input[name=chkENGLISH]:checked').val()) {$('#English').show();} else {$('#English').hide();}
		if($('input[name=chkENGLISH]:checked').val()) {$('#PartofSpeech').show();} else {$('#PartofSpeech').hide();}
		setCookie("HSKLevel", $("#selHSK").val(), 120);
		setCookie("HSKLesson", $("#selLesson").val(), 120);
	}
}
function getPinyinColor(col,trNum) {
	if(trNum===null) { // Populate the flashcard
		$('#Pinyin0').text('');
		$('#Pinyin1').text('');
		$('#Pinyin2').text('');
		$('#Pinyin3').text('');
		$('#Pinyin4').text('');
		if(col[4]==="" || col[14]===-1){
			$('#Pinyin0').text(col[3]);
			$('#Pinyin0').removeClass();
		} else {
			var pinyin=col[4].replace(" ","");
			var pinyinLen=col[13];
			var offset=0;
			for(x=0; x<col[13].length; x++) {
				var pynTone=col[4].substr(x,1);
				var pynLen=col[13].substr(x,1);
				if(col[3].substr(offset,1)==" ") {
					offset++;
					$('#Pinyin'+x.toString()).append(" ");
				}
				if(col[3].substr(offset,1)=="'") {
					offset++;
					$('#Pinyin'+x.toString()).append("'");
				}
				$('#Pinyin'+x.toString()).append(col[3].substr(offset,pynLen));
				$('#Pinyin'+x.toString()).removeClass();
				$('#Pinyin'+x.toString()).addClass("tone"+pynTone);
				offset=offset+parseInt(pynLen);
			}
		}
	} else { // Populate the table (list)
		$('#tr'+trNum+'0').text('');
		$('#tr'+trNum+'1').text('');
		$('#tr'+trNum+'2').text('');
		$('#tr'+trNum+'3').text('');
		$('#tr'+trNum+'4').text('');
		if(col[4]==="" || col[14]===-1){
			$('#tr'+trNum+'0').text(col[3]);
			$('#tr'+trNum+'0').removeClass();
		} else {
			var pinyin=(col[4].replace(" ","")).replace("'","");
			var pinyinLen=col[13];
			var offset=0;
			for(x=0; x<col[13].length; x++) {
				var pynTone=col[4].substr(x,1);
				var pynLen=col[13].substr(x,1);
				if(col[3].substr(offset,1)==" ") {
					offset++;
					$('#tr'+trNum+x.toString()).append(" ");
				}
				if(col[3].substr(offset,1)=="'") {
					offset++;
					$('#tr'+trNum+x.toString()).append("'");
				}
				$('#tr'+trNum+x.toString()).append(col[3].substr(offset,pynLen));
				$('#tr'+trNum+x.toString()).removeClass();
				$('#tr'+trNum+x.toString()).addClass("tone"+pynTone);
				offset=offset+parseInt(pynLen);
			}
		}
	}
}
function populateTable(){
	$("#listTab tr").remove();
	$("#wordcount").html("");
	for (i = 0; i < resultArray.length; i++) {
		var col=resultArray[i].split("~");
    	$('#listTab').append('<tr><td>'+col[7]+'.'+col[8]+'</td><td>'+col[1]+'</td><td>'
    		+'<span id="tr'+i.toString()+'0"></span><span id="tr'+i.toString()+'1"></span><span id="tr'+i.toString()+'2"></span><span id="tr'+i.toString()+'3"></span><span id="tr'+i.toString()+'4"></span>'
    		+'</td><td>'+col[5]+'&nbsp;<span class="posTab">'+col[6]+'</span></td></tr>');
		getPinyinColor(col,i.toString());
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
	$('#Pinyin0').text('');
	$('#Pinyin1').text('');
	$('#Pinyin2').text('');
	$('#Pinyin3').text('');
	$('#Pinyin4').text('');
	$('#English').text('');
	$('#PartofSpeech').text('');
	$('#selLesson').val(1);
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
/*
class Swipe {
    constructor(element) {
        this.xDown = null;
        this.yDown = null;
        this.element = typeof(element) === 'string' ? document.querySelector(element) : element;
        this.element.addEventListener('touchstart', function(evt) {
            this.xDown = evt.touches[0].clientX;
            this.yDown = evt.touches[0].clientY;
        }.bind(this), false);
    }
    onLeft(callback) {this.onLeft = callback;return this;}
    onRight(callback) {this.onRight = callback;return this;}
    onUp(callback) {this.onUp = callback;return this;}
    onDown(callback) {this.onDown = callback;return this;}
    handleTouchMove(evt) {
        if ( ! this.xDown || ! this.yDown ) {
            return;
        }
        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;
        this.xDiff = this.xDown - xUp;
        this.yDiff = this.yDown - yUp;
        if ( Math.abs( this.xDiff ) > Math.abs( this.yDiff ) ) {
            if ( this.xDiff > 0 ) {this.onLeft();} else {this.onRight();}
        } else {
            if ( this.yDiff > 0 ) {this.onUp();} else {this.onDown();}
        }
        this.xDown = null;
        this.yDown = null;
    }
    run() {this.element.addEventListener('touchmove', function(evt) {this.handleTouchMove(evt).bind(this);}.bind(this), false);}
}
var swiper = new Swipe('#Card');
swiper.onLeft(function() { dispCard("prev") });
swiper.onRight(function() { dispCard("next") });
swiper.run();
*/
function add() {	// Add to review list
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState === 4) {
			if (request.status === 200) {
				$('#Views').append(request.responseText);
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
			}
		}
	};
	var url='includes/deleteReview.php?id='+idToDel;
	request.open('GET', url, true);
	request.send();
}
