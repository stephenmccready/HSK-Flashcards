<?php
include_once 'includes/db_connect.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Flashcards</title>
	<link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/cookieconsent.min.css" />
	<script src="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/cookieconsent.min.js"></script>
	<link type="text/css" rel="stylesheet" href="https://ajax.aspnetcdn.com/ajax/bootstrap/3.3.6/css/bootstrap.min.css">
	<script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.12.2.min.js"></script>
	<script src="https://ajax.aspnetcdn.com/ajax/bootstrap/3.3.6/bootstrap.min.js"></script>
	<script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>
	<link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet">
	<link href="css/flash.css" rel="stylesheet" type="text/css" />
	<script src="js/flash.js"></script>
	<!--[if IE]>
	<script src="https://stephenmccready.asia/html5shiv.min.js"></script>
	<![endif]-->
</head>
<body onload="init();">
<div class="wrapper">
	<div class="col-xs-12 col header">
	<form id="myform" class="form-inline">
	HSK 
	<select id="selHSK" onchange="hskChange();">
		<option value="All">All</option>
		<option value="1">1</option>
		<option value="2">2</option>
		<option value="3">3</option>
<!--		<option value="4">4</option>
		<option value="5">5</option>
		<option value="6">6</option>	-->
	</select>&nbsp;&nbsp;Lesson 
	<select id="selLesson" name="selLesson" onchange="$('#Pinyin').hide();$('#English').hide();LoadFlashCards();">
		<option value="Review">Review</option>
		<option value="Verbs">Verbs</option>
		<option value="Adjectives">Adjectives</option>
		<option value="Adverbs">Adverbs</option>
		<option value="All">All</option>
		<option value="1">1</option>
		<option value="2">2</option>
		<option value="3">3</option>
		<option value="4">4</option>
		<option value="5">5</option>
		<option value="6">6</option>
		<option value="7">7</option>
		<option value="8">8</option>
		<option value="9">9</option>
		<option value="10">10</option>
		<option value="11">11</option>
		<option value="12">12</option>
		<option value="13">13</option>
		<option value="14">14</option>
		<option value="15">15</option>
		<option value="16">16</option>
		<option value="17">17</option>
		<option value="18">18</option>
		<option value="19">19</option>
		<option value="20">20</option>
	</select>&nbsp;
		<input id="toggleX" type="checkbox" data-onstyle="default" data-offstyle="default">
	</form>
	<p class="chk" id="pCard">
		<label class="checkbox-inline"><input type="checkbox" name="chkRANDOM" onclick="$('#Pinyin').hide();$('#English').hide();$('#PartofSpeech').hide(); dispCard();">Random</label>
		<label class="pyn checkbox-inline"><input type="checkbox" name="chkPINYIN" onclick="pinyinChecked();">Pinyin</label>
		<label class="eng checkbox-inline"><input type="checkbox" name="chkENGLISH" onclick="englishChecked();">English</label>
	</p>
	</div>
    <div class="main clearfix">
		<div id="List" class="clearfix">
			<table id="listTab" class="table table-responsive table-condensed table-hover table-striped"><tbody></tbody></table>
			<span id="wordcount" class="posTab"></span><br/><br/>
		</div>
    	<div id="Card">
    		<div class="loader">Loading</div>
			<div class="clearfix" id="HanziS"></div>
			<div class="clearfix" id="Views"></div>
			<div class="clearfix" id="Delete"></div>
			<div class="clearfix pyn" id="Pinyin"></div>
			<div class="clearfix eng" id="English"></div>
			<div class="clearfix pos" id="PartofSpeech"></div>
			<input type="text" hidden id="DBID"/>
			<input type="text" hidden id="HSK"/>
		</div>
	</div>
</div>
<div class="clearfix footer" id="fCard">
	<div class="clearfix"></div>
	<button type="button" class="btn btn-info btn-huge" onclick="dispCard('first');"><span class="glyphicon glyphicon-fast-backward"></span></button>
	<button type="button" class="btn btn-info btn-huge" onclick="dispCard('prev');"><span class="glyphicon glyphicon-backward"></span></button>
	<span id="footCenter"></span>
	<button type="button" class="btn btn-info btn-huge" onclick="dispCard('next');"><span class="glyphicon glyphicon-forward"></span></button>
	<button type="button" class="btn btn-info btn-huge" onclick="dispCard('last');"><span class="glyphicon glyphicon-fast-forward"></span></button>
	<div class="clearfix"></div>
	<div class="clearfix">
		<button class="btn btn-default btn-pinyin btn-huge" onclick="$('#Pinyin').toggle();">Pyn</button>
		<button class="btn btn-default btn-english btn-huge" onclick="$('#English').toggle();$('#PartofSpeech').toggle();">Eng</button>
		<button class="btn btn-warning btn-huge" onclick="add();">Rev</button>
		<button class="btn btn-success btn-huge" onclick="knowIt();"><span class="glyphicon glyphicon-ok"></span></button>
		<button class="btn btn-danger btn-huge" onclick="dispCard();"><span class="glyphicon glyphicon-remove"></span></button>
	</div>
</div>
</body>
</html>
