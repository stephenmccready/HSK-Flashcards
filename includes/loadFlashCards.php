<?php
//test: https://stephenmccready.asia/mi/includes/loadFlashCards.php?HSK=1&Lesson=1
include_once 'db_connect.php';
$sql="SELECT HanziS,HanziT,Pinyin,PinyinNum,English,PartofSpeech,H.HSK,Chapter,H.ID,R.ID As RevID FROM Hanzi As H ";
if($_GET["Lesson"]=="Review") {
	$sql.=" JOIN Review AS R ON R.ID=H.ID WHERE H.HSK=" . $_GET["HSK"];	
} else if($_GET["HSK"]!="All") {
	$sql.=" LEFT OUTER JOIN Review AS R ON R.ID=H.ID WHERE H.HSK = " . $_GET["HSK"];	
	if($_GET["Lesson"]=="Verbs") {
		$sql.= " AND PartOfSpeech = 'verb'";
	} elseif($_GET["Lesson"]=="Adjectives") {
		$sql.= " AND PartOfSpeech = 'adjective'";
	} elseif($_GET["Lesson"]=="Adverbs") {
		$sql.= " AND PartOfSpeech = 'adverb'";
	} elseif($_GET["Lesson"]!="All") {
		$sql.= " AND Chapter = " . $_GET["Lesson"];
	}
} else {
	if($_GET["Lesson"]=="Verbs") {
		$sql.= " LEFT OUTER JOIN Review AS R ON R.ID=H.ID WHERE PartOfSpeech = 'verb'";
	} elseif($_GET["Lesson"]=="Adjectives") {
		$sql.= " LEFT OUTER JOIN Review AS R ON R.ID=H.ID WHERE PartOfSpeech = 'adjective'";
	} elseif($_GET["Lesson"]=="Adverbs") {
		$sql.= " LEFT OUTER JOIN Review AS R ON R.ID=H.ID WHERE PartOfSpeech = 'adverb'";
	} else if($_GET["Lesson"]!="All") {
		$sql.= " LEFT OUTER JOIN Review AS R ON R.ID=H.ID WHERE Chapter = " . $_GET["Lesson"];
	} else {
		$sql.= " LEFT OUTER JOIN Review AS R ON R.ID=H.ID";
	}
}
$sql.= " Order By H.HSK,CAST(Chapter AS UNSIGNED)";
$result=mysqli_query($mysqli,$sql);
mysqli_fetch_all($result,MYSQLI_ASSOC);
$rowNum=0;
foreach ($result as $row) {
	preg_match_all('!\d+!', $row["PinyinNum"], $num);
	$PinyinNum="";
	for($i=0; $i<=sizeof($num[0]); $i++) {
		$PinyinNum = $PinyinNum . $num[0][$i];
	}
	$pinyinArray=explode(" ",$row["PinyinNum"]);
	$PinyinSize="";
	for($x=0; $x<sizeof($pinyinArray); $x++) {
		$PinyinSize = $PinyinSize . strlen($pinyinArray[$x])-1;
	}
	echo $rowNum . "~" . $row["HanziS"] . "~" . $row["HanziT"] . "~" . $row["Pinyin"] . "~" . $PinyinNum . "~" . $row["English"] . "~" 
		 . $row["PartofSpeech"] . "~" . $row["HSK"] . "~" . $row["Chapter"] . "~" . $row["ID"] . "~" . $row["RevID"] . "~0~0~" . $PinyinSize
		 . "|";
	$rowNum++;
}

$mysqli->close();
