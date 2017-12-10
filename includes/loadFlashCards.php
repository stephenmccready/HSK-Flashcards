<?php
include_once 'db_connect.php';
include_once 'functions.php';
$sql="SELECT HanziS,HanziT,Pinyin,PinyinNum,English,PartofSpeech FROM Hanzi";
if($_GET["HSK"]!="All") {
	$sql.=" WHERE HSK = " . $_GET["HSK"];	
	if($_GET["Lesson"]=="1-3") {
		$sql.=  " AND Chapter In(1,2,3)";
	} elseif($_GET["Lesson"]=="4-6") {
		$sql.=  " AND Chapter In(4,5,6)";
	} elseif($_GET["Lesson"]=="7-9") {
		$sql.=  " AND Chapter In(7,8,9)";
	} elseif($_GET["Lesson"]=="10-12") {
		$sql.=  " AND Chapter In(10,11,12)";
	} elseif($_GET["Lesson"]=="13-15") {
		$sql.=  " AND Chapter In(13,14,15)";
	} elseif($_GET["Lesson"]!="All") {
		$sql.= " AND Chapter = " . $_GET["Lesson"];
	}
} else {
	if($_GET["Lesson"]=="1-3") {
		$sql.=  " WHERE Chapter In(1,2,3)";
	} elseif($_GET["Lesson"]=="4-6") {
		$sql.=  " WHERE Chapter In(4,5,6)";
	} elseif($_GET["Lesson"]=="7-9") {
		$sql.=  " WHERE Chapter In(7,8,9)";
	} elseif($_GET["Lesson"]=="10-12") {
		$sql.=  " WHERE Chapter In(10,11,12)";
	} elseif($_GET["Lesson"]=="13-15") {
		$sql.=  " WHERE Chapter In(13,14,15)";
	} else if($_GET["Lesson"]!="All") {
		$sql.= " WHERE Chapter = " . $_GET["Lesson"];
	}
}
$result=mysqli_query($mysqli,$sql);
mysqli_fetch_all($result,MYSQLI_ASSOC);
foreach ($result as $key => $value) {
	echo $key;
	foreach($value as $key2 => $value2) {
	    echo "~" . $value2;
	}
	echo '~0~0|';
}
