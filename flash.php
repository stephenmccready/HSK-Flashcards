<?php
include_once 'includes/db_connect.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Flashcards</title>
	<link type="text/css" rel="stylesheet" href="https://ajax.aspnetcdn.com/ajax/bootstrap/3.3.6/css/bootstrap.min.css">
  	<link type="text/css" rel="stylesheet" href="css/flash.css">
</head>
<body onload="LoadFlashCards();">
<div class="wrapper">
	<div class="col-xs-12 col-s-6 col">HSK&nbsp;
	<select id="selHSK" onchange="$('#Pinyin').hide();$('#English').hide();LoadFlashCards();">
		<option value="1">1</option>
		<option value="2">2</option>
		<option value="3" selected="selected">3</option>
		<option value="4">4</option>
		<option value="5">5</option>
		<option value="6">6</option>
		<option value="All">All</option>
	</select>&nbsp;&nbsp;Lesson&nbsp;
	<select id="selLesson" onchange="$('#Pinyin').hide();$('#English').hide();LoadFlashCards();">
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
		<option value="All">All</option>
		<option value="1-3">1-3</option>
		<option value="4-6">4-6</option>
		<option value="7-9">7-9</option>
		<option value="10-12">10-12</option>
		<option value="13-15">13-15</option>
	</select>
	<p class="chk">
	<label class="checkbox-inline"><input type="checkbox" name="chkRANDOM" onclick="$('#Pinyin').hide();$('#English').hide();$('#PartofSpeech').hide(); displayCard();">随机</label>
	<label class="pynD checkbox-inline"><input type="checkbox" name="chkPINYIN" onclick="pinyinChecked();">拼音</label>
	<label class="engD checkbox-inline"><input type="checkbox" name="chkENGLISH" onclick="englishChecked();">英语</label>
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
<div class="footer">
	<div class="ftrBtn">
		<button type="button" class="btn btn-info" onclick="$('#Pinyin').hide();$('#English').hide();$('#PartofSpeech').hide();displayCard('first');">
		<span class="glyphicon glyphicon-fast-backward"></span></button></div>
	<div class="ftrBtn">
		<button type="button" class="btn btn-info" onclick="$('#Pinyin').hide();$('#English').hide();$('#PartofSpeech').hide();displayCard('prev');">
		<span class="glyphicon glyphicon-backward"></span></button></div>
	<div id="footLeft"></div>
	<div class="ftrBtn">
		<button type="button" class="btn btn-info" onclick="$('#Pinyin').hide();$('#English').hide();$('#PartofSpeech').hide();displayCard('next');">
		<span class="glyphicon glyphicon-forward"></span></button></div>
	<div class="ftrBtn">
		<button type="button" class="btn btn-info" onclick="$('#Pinyin').hide();$('#English').hide();$('#PartofSpeech').hide();displayCard('last');">
		<span class="glyphicon glyphicon-fast-forward"></span></button></div>
	<div class="clearfix">
		<button class="btn btn-default btn-pinyin btn-huge" onclick="$('#Pinyin').toggle();">拼音</button>
		<button class="btn btn-default btn-english btn-huge" onclick="$('#English').toggle();$('#PartofSpeech').toggle();">英语</button>
		<button class="btn btn-success btn-huge" onclick="$('#Pinyin').hide();$('#English').hide();$('#PartofSpeech').hide();knowIt();">
			<span class="glyphicon glyphicon-ok"></span></button>
		<button class="btn btn-danger btn-huge" onclick="$('#Pinyin').hide();$('#English').hide();$('#PartofSpeech').hide();displayCard();">
			<span class="glyphicon glyphicon-remove"></span></button>
	</div>
</div>
<script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.12.2.min.js"></script>
<script src="https://ajax.aspnetcdn.com/ajax/bootstrap/3.3.6/bootstrap.min.js"></script>
<!--[if IE]>
<script src="https://stephenmccready.asia/html5shiv.min.js"></script>
<![endif]-->
<script src="js/flash.js"></script>
</body>
</html>
