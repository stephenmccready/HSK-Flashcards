<?php
include_once 'includes/db_connect.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Flashcards</title>
	<link type="text/css" rel="stylesheet" href="https://ajax.aspnetcdn.com/ajax/bootstrap/3.3.7/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="css/flash.css" />
	<link rel="stylesheet" type="text/css" href="css/cookieconsent.min.css" />
	<!--[if IE]>
	<script src="https://stephenmccready.asia/html5shiv.min.js"></script>
	<![endif]-->
</head>
<body onload="init();">
<div class="wrapper">
	<div class="col-xs-12 col-s-6 col">HSK Level&nbsp;
	<select id="selHSK" onchange="hskChange();">
		<option value="All">All</option>
		<option value="1">1</option>
		<option value="2">2</option>
		<option value="3">3</option>
		<option value="4">4</option>
		<option value="5">5</option>
		<option value="6">6</option>
	</select>&nbsp;&nbsp;Lesson&nbsp;
	<select id="selLesson" name="selLesson" onchange="$('#Pinyin').hide();$('#English').hide();LoadFlashCards();">
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
		<option value="Verbs">Verbs</option>
		<option value="Adjectives">Adjectives</option>
	</select>
	<p class="chk">
	<label class="checkbox-inline"><input type="checkbox" name="chkRANDOM" onclick="$('#Pinyin').hide();$('#English').hide();$('#PartofSpeech').hide(); dispCard();">Random</label>
	<label class="pynD checkbox-inline"><input type="checkbox" name="chkPINYIN" onclick="pinyinChecked();">Pinyin</label>
	<label class="engD checkbox-inline"><input type="checkbox" name="chkENGLISH" onclick="englishChecked();">English</label>
	</p>
	</div>
    <div class="main clearfix">
		<div class="clearfix" id="HanziS"></div>
		<div class="clearfix" id="Views"></div>
		<div class="clearfix pyn" id="Pinyin"></div>
		<div class="clearfix eng" id="English"></div>
		<div class="clearfix pos" id="PartofSpeech"></div>
	</div>
</div>
<div class="clearfix footer">
		<button type="button" class="btn btn-info btn-huge" onclick="$('#Pinyin').hide();$('#English').hide();$('#PartofSpeech').hide();dispCard('first');">
		<span class="glyphicon glyphicon-fast-backward"></span></button>
		<button type="button" class="btn btn-info btn-huge" onclick="$('#Pinyin').hide();$('#English').hide();$('#PartofSpeech').hide();dispCard('prev');">
		<span class="glyphicon glyphicon-backward"></span></button>
		<span id="footCenter"></span>
		<button type="button" class="btn btn-info btn-huge" onclick="$('#Pinyin').hide();$('#English').hide();$('#PartofSpeech').hide();dispCard('next');">
		<span class="glyphicon glyphicon-forward"></span></button>
		<button type="button" class="btn btn-info btn-huge" onclick="$('#Pinyin').hide();$('#English').hide();$('#PartofSpeech').hide();dispCard('last');">
		<span class="glyphicon glyphicon-fast-forward"></span></button>
	<div class="clearfix"></div>
	<div class="clearfix">
		<button class="btn btn-default btn-pinyin btn-huge" onclick="$('#Pinyin').toggle();">Pinyin</button>
		<button class="btn btn-default btn-english btn-huge" onclick="$('#English').toggle();$('#PartofSpeech').toggle();">English</button>
		<button class="btn btn-success btn-huge" onclick="$('#Pinyin').hide();$('#English').hide();$('#PartofSpeech').hide();knowIt();">
			<span class="glyphicon glyphicon-ok"></span></button>
		<button class="btn btn-danger btn-huge" onclick="$('#Pinyin').hide();$('#English').hide();$('#PartofSpeech').hide();dispCard();">
			<span class="glyphicon glyphicon-remove"></span></button>
	</div>
</div>
<script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.3.1.min.js"></script>
<script src="https://ajax.aspnetcdn.com/ajax/bootstrap/3.3.7/bootstrap.min.js"></script>
<script src="js/cookieconsent.min.js"></script>
<script src="js/flash.js"></script>
</body>
</html>
