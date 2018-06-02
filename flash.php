<?php
include_once 'includes/db_connect.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Flashcards</title>
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/cookieconsent.min.css" />
	<link rel="stylesheet" type="text/css" href="https://ajax.aspnetcdn.com/ajax/bootstrap/3.3.6/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="css/bootstrap-toggle.min.css">
	<!--[if IE]>
	<script src="https://stephenmccready.asia/html5shiv.min.js"></script>
	<![endif]-->
</head>
<body onload="init()">
<div class="wrapper">
<header>
	<div class="btn-group" id="navbar">
		<button id="dispHSK" type="button" class="btn btn-primary" onclick="$('#divHSK').slideToggle();"></button>
		<input type="text" id="holdHSK"></input>
		<button id="dispLesson" type="button" class="btn btn-primary" onclick="$('#divLesson').slideToggle();"></button>
		<input itype="text" id="holdLesson"></input>
		<button type="button" class="btn btn-primary" onclick="$('#divSearch').slideToggle();"><span class="glyphicon glyphicon-search"></span></button>
		<button type="button" class="btn btn-primary" onclick="$('#divSettings').slideToggle();"><span class="glyphicon glyphicon-cog"></span></button>
		<button type="button" class="btn btn-primary" onclick="$('#Card, #fCard, #pCard, #List').toggle(); $('#listButton').toggle(); $('#cardButton').toggle();">
			<span id="listButton" class="glyphicon glyphicon-list"></span>
			<span id="cardButton" class="glyphicon glyphicon-file"></span>
			</button>
	</div>
</header>
<div id="divHSK" class="clearfix well well-sm" class="btn-group" data-toggle="buttons">
	<h4>HSK Level</h4>
	<label id="labHSK1" class="btn btn-gender btn-default active"><input type="radio" id="radHSK" name="radHSK" value="1">1</label>
	<label id="labHSK2" class="btn btn-gender btn-default"><input type="radio" id="radHSK" name="radHSK" value="2">2</label>
	<label id="labHSK3" class="btn btn-gender btn-default"><input type="radio" id="radHSK" name="radHSK" value="3">3</label>
	<label id="labHSK4" class="btn btn-gender btn-default"><input type="radio" id="radHSK" name="radHSK" value="4">4</label>
	<label id="labHSK5" class="btn btn-gender btn-default"><input type="radio" id="radHSK" name="radHSK" value="5">5</label>
	<label id="labHSK6" class="btn btn-gender btn-default"><input type="radio" id="radHSK" name="radHSK" value="6">6</label>
	<label id="labHSKAll" class="btn btn-gender btn-default"><input type="radio" id="radHSK" name="radHSK" value="All">All</label>
	<div class="divclose"><button class="btn btn-default closeButton" onclick="$('#divHSK').slideUp();"><span class="glyphicon glyphicon-chevron-up"></span></button></div>
</div>
<div id="divLesson" class="clearfix well well-sm" class="btn-group col-md-2" data-toggle="buttons">
	<h4>Lesson</h4>
	<label id="labLess01" class="btn btn-gender btn-default active"><input type="radio" id="radLesson" name="radLesson" value="1"> 1</label>
	<label id="labLess02" class="btn btn-gender btn-default"><input type="radio" id="radLesson" name="radLesson" value="2"> 2</label>
	<label id="labLess03" class="btn btn-gender btn-default"><input type="radio" id="radLesson" name="radLesson" value="3"> 3</label>
	<label id="labLess04" class="btn btn-gender btn-default"><input type="radio" id="radLesson" name="radLesson" value="4"> 4</label>
	<label id="labLess05" class="btn btn-gender btn-default"><input type="radio" id="radLesson" name="radLesson" value="5"> 5</label>
	<label id="labLess06" class="btn btn-gender btn-default"><input type="radio" id="radLesson" name="radLesson" value="6"> 6</label>
	<label id="labLess07" class="btn btn-gender btn-default"><input type="radio" id="radLesson" name="radLesson" value="7"> 7</label>
	<label id="labLess08" class="btn btn-gender btn-default"><input type="radio" id="radLesson" name="radLesson" value="8"> 8</label>
	<label id="labLess09" class="btn btn-gender btn-default"><input type="radio" id="radLesson" name="radLesson" value="9"> 9</label>
	<label id="labLess10" class="btn btn-gender btn-default"><input type="radio" id="radLesson" name="radLesson" value="10"> 10</label>
	<label id="labLess11" class="btn btn-gender btn-default"><input type="radio" id="radLesson" name="radLesson" value="11"> 11</label>
	<label id="labLess12" class="btn btn-gender btn-default"><input type="radio" id="radLesson" name="radLesson" value="12"> 12</label>
	<label id="labLess13" class="btn btn-gender btn-default"><input type="radio" id="radLesson" name="radLesson" value="13"> 13</label>
	<label id="labLess14" class="btn btn-gender btn-default"><input type="radio" id="radLesson" name="radLesson" value="14"> 14</label>
	<label id="labLess15" class="btn btn-gender btn-default"><input type="radio" id="radLesson" name="radLesson" value="15"> 15</label>
	<label id="labLess16" class="btn btn-gender btn-default"><input type="radio" id="radLesson" name="radLesson" value="16"> 16</label>
	<label id="labLess17" class="btn btn-gender btn-default"><input type="radio" id="radLesson" name="radLesson" value="17"> 17</label>
	<label id="labLess18" class="btn btn-gender btn-default"><input type="radio" id="radLesson" name="radLesson" value="18"> 18</label>
	<label id="labLess19" class="btn btn-gender btn-default"><input type="radio" id="radLesson" name="radLesson" value="19"> 19</label>
	<label id="labLess20" class="btn btn-gender btn-default"><input type="radio" id="radLesson" name="radLesson" value="20"> 20</label>
	<label id="labLessAll" class="btn btn-gender btn-default"><input type="radio" id="radLesson" name="radLesson" value="All"> All</label>
	<label id="labLessAdjectives" class="btn btn-gender btn-default"><input type="radio" id="radLesson" name="radLesson" value="Adjectives"> Adjectives</label>
	<label id="labLessAdverbs" class="btn btn-gender btn-default"><input type="radio" id="radLesson" name="radLesson" value="Adverbs"> Adverbs</label>
	<label id="labLessMeasureWords" class="btn btn-gender btn-default"><input type="radio" id="radLesson" name="radLesson" value="Measure Words"> Measure Words</label>
	<label id="labLessNouns" class="btn btn-gender btn-default"><input type="radio" id="radLesson" name="radLesson" value="Nouns"> Nouns</label>
	<label id="labLessNumbers" class="btn btn-gender btn-default"><input type="radio" id="radLesson" name="radLesson" value="Numbers"> Numbers</label>
	<label id="labLessParticles" class="btn btn-gender btn-default"><input type="radio" id="radLesson" name="radLesson" value="Particles"> Particles</label>
	<label id="labLessPronouns" class="btn btn-gender btn-default"><input type="radio" id="radLesson" name="radLesson" value="Pronouns"> Pronouns</label>
	<label id="labLessProperNouns" class="btn btn-gender btn-default"><input type="radio" id="radLesson" name="radLesson" value="Proper Nouns"> Proper Nouns</label>
	<label id="labLessRadicals" class="btn btn-gender btn-default"><input type="radio" id="radLesson" name="radLesson" value="Radicals"> Radicals</label>
	<label id="labLessVerbs" class="btn btn-gender btn-default"><input type="radio" id="radLesson" name="radLesson" value="Verbs"> Verbs</label>
	<label id="labLessReview" class="btn btn-gender btn-warning"><input type="radio" id="radLesson" name="radLesson" value="Review"> <span class="glyphicon glyphicon-pushpin"></span> Review</label>
	<div class="divclose"><button class="btn btn-default closeButton" onclick="$('#divLesson').slideUp();"><span class="glyphicon glyphicon-chevron-up"></span></button></div>
</div>
<div class="clearfix well well-sm" id="divSearch">
	<h4>Search</h4>
	<input id="txtsearch" name="txtsearch" type="text" placeholder="Search..." aria-label="Search"><button id="btn-search" type="button" class="btn btn-default btn-huge" onclick="search();"><span class="glyphicon glyphicon-search"></span></button>
	<p>
	<div class="checkboxLabel">Exact word match&nbsp;</div>
	<div class="toggleBox"><input id="toggleEXACTMATCH" type="checkbox" data-toggle="toggle" data-on="On" data-off="Off" data-onstyle="success" data-offstyle="danger"></div>
	</p>
	<p>
	<div class="checkboxLabel">Case sensitive&nbsp;</div>
	<div class="toggleBox"><input id="toggleMATCHCASE" type="checkbox" data-toggle="toggle" data-on="On" data-off="Off" data-onstyle="success" data-offstyle="danger"></div>
	</p>
	<div class="divclose"><button class="btn btn-default closeButton" onclick="$('#divSearch').slideUp();"><span class="glyphicon glyphicon-chevron-up"></span></button></div>
</div>
<div class="clearfix well well-sm" id="divSettings">
	<form id="myform2" class="form-inline">
	<h4>Settings</h4>
	<p>
		<div class="checkboxLabel">Display label language&nbsp;</div>
		<div class="toggleBox"><input id="toggleLANGUAGE" type="checkbox" data-toggle="toggle" data-on="Hanzi" data-off="English" data-onstyle="default" data-offstyle="default" data-width="100"></div>
	</p>
	<p>
		<div class="checkboxLabel">Audio only on card display&nbsp;</div>
		<div class="toggleBox"><input id="toggleSOUND" type="checkbox" data-toggle="toggle" data-on="On" data-off="Off" data-onstyle="success" data-offstyle="danger"></div>
	</p>
	<h5>Stroke Quiz:</h5>
	<p>
		<div class="checkboxLabel">Display outline&nbsp;</div>
		<div class="toggleBox"><input id="toggleSHOWOUTLINE" type="checkbox" data-toggle="toggle" data-on="On" data-off="Off" data-onstyle="success" data-offstyle="danger"></div>
	</p>
	<p>
		<div class="checkboxLabel">Display stroke after x number of misses&nbsp;</div>
		<div class="toggleBox">
			<select class="form-control" id="selQuizMisses">
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3" selected="selected">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
				<option value="6">6</option>
			</select>
		</div>
	</p>
	</form>
	<div class="divclose"><button class="btn btn-default closeButton" onclick="$('#divSettings').slideUp();"><span class="glyphicon glyphicon-chevron-up"></span></button></div>
</div>
<div class="clearfix" id="divOptions">
<form id="myform1" class="form-inline">
	<input id="toggleSTROKEQUIZ" type="checkbox" data-toggle="toggle" 
		data-off="<span class='eng'>Stroke Quiz</span><span class='han'>Stroke Quiz</span>" 
		data-on="<span class='eng'>Stroke Quiz Off</span><span class='han'>Stroke Quiz Off</span>" 
		data-size="small" data-onstyle="default" data-offstyle="default"> 
	<input id="togglePINYIN" type="checkbox" data-toggle="toggle" 
		data-off="<span class='eng'>Show Pinyin</span><span class='han'>显示拼音</span>" 
		data-on="<span class='eng'>Hide Pinyin</span><span class='han'>隐藏拼音</span>" 
		data-size="small" data-onstyle="default" data-offstyle="default"> 
	<input id="toggleENGLISH" type="checkbox" data-toggle="toggle" 
		data-off="<span class='eng'>Show English</span><span class='han'>显示英语</span>" 
		data-on="<span class='eng'>Hide English</span><span class='han'>隐藏英语</span>" 
		data-size="small" data-onstyle="default" data-offstyle="default"> 
</form>
</div>
<div class="main clearfix">
    <div class="loader">Loading</div>
		<div id="List" class="clearfix">
			<table id="listTab" class="table table-responsive table-condensed table-hover table-striped table-borderless"><tbody></tbody></table>
			<span id="wordcount" class="posTab"></span><span id="wordcountsuffix" class="posTab"></span><br/><br/>
		</div>
    	<div id="Card">
			<div id="animation" class="clearfix">
				<div id="random-container"><span id="random-glyph" name="random-glyph" class="glyphicon glyphicon-random random-off"></span><span id="copy-glyph" name="copy-glyph" class="glyphicon glyphicon-copy"></span><span id="review-glyph" name="review-glyph" class="glyphicon glyphicon-pushpin review-off"></span></div>
				<div id="copied-container"><div id="copied"></div></div>
				<div id="ani-container" class="clearfix"><div id="HanziAni0" class="ani"></div><div id="HanziAni1" class="ani"></div><div id="HanziAni2" class="ani"></div><div id="HanziAni3" class="ani"></div><div id="HanziAni4" class="ani"></div></div>
			</div>
			<div id="animation-buttons" class="clearfix">
				<div id="div-ani0" class="div-btn"><button id="btn-ani0" type="button" class="btn btn-default btn-huge"><span class="glyphicon glyphicon-pencil"></span></button></div>
				<div id="div-ani1" class="div-btn"><button id="btn-ani1" type="button" class="btn btn-default btn-huge"><span class="glyphicon glyphicon-pencil"></span></button></div>
				<div id="div-ani2" class="div-btn"><button id="btn-ani2" type="button" class="btn btn-default btn-huge"><span class="glyphicon glyphicon-pencil"></span></button></div>
				<div id="div-ani3" class="div-btn"><button id="btn-ani3" type="button" class="btn btn-default btn-huge"><span class="glyphicon glyphicon-pencil"></span></button></div>
				<div id="div-ani4" class="div-btn"><button id="btn-ani4" type="button" class="btn btn-default btn-huge"><span class="glyphicon glyphicon-pencil"></span></button></div>
			</div>
			<div class="clearfix" id="Audio"></div>
			<div id="audio_player_container"></div>
			<div class="clearfix" id="Views"></div>
			<div class="clearfix" id="Pinyin">
			<span id="Pinyin0"></span><span id="Pinyin1"></span><span id="Pinyin2"></span><span id="Pinyin3"></span><span id="Pinyin4"></span>
			</div>
			<div class="clearfix" id="English"></div>
			<div class="clearfix pos" id="PartofSpeech"></div>
			<input type="text" hidden id="DBID"/>
			<input type="text" hidden id="HSK"/>
		</div>
	</div>
</div>
<div class="clearfix footer" id="fCard">
	<div class="clearfix"></div>
	<button type="button" class="btn btn-primary btn-huge" onclick="dispCard('first');"><span class="glyphicon glyphicon-fast-backward"></span></button>
	<button type="button" class="btn btn-primary btn-huge" onclick="dispCard('prev');"><span class="glyphicon glyphicon-backward"></span></button>
	<span id="footCenter"></span>
	<button type="button" class="btn btn-primary btn-huge" onclick="dispCard('next');"><span class="glyphicon glyphicon-forward"></span></button>
	<button type="button" class="btn btn-primary btn-huge" onclick="dispCard('last');"><span class="glyphicon glyphicon-fast-forward"></span></button>
	<div class="clearfix"></div>
	<div class="clearfix">
		<button class="btn btn-default btn-huge" onclick="$('#animation').toggle();$('#animation-buttons').toggle();">
			<span class="han">汉字</span><span class="eng">Han</span></button>
		<button class="btn btn-default btn-huge" onclick="$('#Pinyin').toggle();">
			<span class="han">拼音</span><span class="eng">Pyn</span></button>
		<button class="btn btn-default btn-huge" onclick="$('#English').toggle();$('#PartofSpeech').toggle();">
			<span class="han">英语</span><span class="eng">Eng</span></button>
		<button class="btn btn-success btn-huge" onclick="knowIt();"><span class="glyphicon glyphicon-ok"></span></button>
		<button class="btn btn-danger btn-huge" onclick="dispCard();"><span class="glyphicon glyphicon-remove"></span></button>
	</div>
</div>
<script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.12.2.min.js"></script>
<script async src="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/cookieconsent.min.js"></script>
<script async src="https://ajax.aspnetcdn.com/ajax/bootstrap/3.3.6/bootstrap.min.js"></script>
<script async src="js/bootstrap-toggle.min.js"></script>
<script async src="js/hanzi-writer.min.js"></script>
<script async src="js/clipboard.min.js"></script>
<script async src="js/flash.js"></script>
</body>
</html>
