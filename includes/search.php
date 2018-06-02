<?php
include_once 'db_connect.php';
if(preg_match("/\p{Han}+/u",  $_GET["search"])) {
	$searchfield="HanziS";$utf8="";
} else if(preg_match("/[āēīōūǖáéíóúǘǎěǐǒǔǚàèìòùǜ]/u",  $_GET["search"])) {
	$searchfield="Pinyin";$utf8=" collate utf8_bin";
} else if(preg_match("/[012345]/u",  $_GET["search"])) {
	$searchfield="PinyinNum";$utf8="";
} else {
	$searchfield="English";$utf8="";
}
if($_GET["case"]=="false") {
	$case1="lcase(";
	$case2=")";
} else {
	$case1="";
	$case2="";
}
if($_GET["exact"]=="true") {
	$sql="SELECT HanziS,Pinyin,PinyinNum,English,PartofSpeech,H.HSK,Chapter,H.ID,R.ID As RevID FROM Hanzi As H LEFT OUTER JOIN Review AS R ON R.ID=H.ID Where " . $case1 . $searchfield . $case2 . " = " . $case1 . "'" . $_GET["search"] . "'" . $case2 . $utf8;
} else {
	$sql="SELECT HanziS,Pinyin,PinyinNum,English,PartofSpeech,H.HSK,Chapter,H.ID,R.ID As RevID FROM Hanzi As H LEFT OUTER JOIN Review AS R ON R.ID=H.ID Where " . $case1 . $searchfield . $case2 . " Like " . $case1 . "'%" . $_GET["search"] . "%'" . $case2 . $utf8;
}
$result=mysqli_query($mysqli,$sql);
mysqli_fetch_all($result,MYSQLI_ASSOC);
$rowNum=0;
foreach ($result as $row) {
	preg_match_all('!\d+!', $row["PinyinNum"], $num);
	$Color=array();
	for($i=0; $i<=sizeof($num[0]); $i++) {
		$Color[$i]=$num[0][$i];
	}
	$PinyinNum=explode(" ",$row["PinyinNum"]);
	$Pinyin=array();
	$PinyinStr=str_replace(" ","",$row["Pinyin"]);
	$i=0; $offset=0;
	for($x=0; $x<sizeof($PinyinNum); $x++) {
		$Pinyin[$i] = mb_substr($PinyinStr,$offset,strlen($PinyinNum[$x])-1);
		$offset=$offset+strlen($PinyinNum[$x])-1;
		$i++;
	}
	$Hanzi=array();
	$offset=0;
	for($i=0; $i<5; $i++) {
		if(mb_substr($row["HanziS"],$offset,1)=="(" || mb_substr($row["HanziS"],$offset,1)==")") {
			$offset++;
		}
		$Hanzi[$i]=mb_substr($row["HanziS"],$offset,1);
		$offset++;
	}
	echo $rowNum . "~"
		. $Hanzi[0] . "~" . $Hanzi[1] . "~" . $Hanzi[2] . "~" . $Hanzi[3] . "~" . $Hanzi[4] . "~"
		. $Color[0] . "~" . $Color[1] . "~" . $Color[2] . "~" . $Color[3] . "~" . $Color[4] . "~"
	    . $Pinyin[0] . "~" . $Pinyin[1] . "~" . $Pinyin[2] . "~" . $Pinyin[3] . "~" . $Pinyin[4] . "~"
	    . $PinyinNum[0] . "~" . $PinyinNum[1] . "~" . $PinyinNum[2] . "~" . $PinyinNum[3] . "~" . $PinyinNum[4] . "~"
		. $row["English"] . "~" . $row["PartofSpeech"] . "~" 
		. $row["HSK"] . "~" . $row["Chapter"] . "~" 
		. $row["ID"] . "~" . $row["RevID"] . "~"
		. "0" . "|";
	$rowNum++;
}
$mysqli->close();
