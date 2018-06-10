<?php
include_once 'db_connect.php';
$sql="SELECT DISTINCT HanziS,Pinyin,PinyinNum,English,PartofSpeech,H.HSK,Chapter,H.ID,R.ID As RevID FROM RadicalHanzi As RH Join Hanzi As H ON RH.HanziID=H.ID LEFT OUTER JOIN Review AS R ON R.ID=H.ID WHERE RH.RadicalID=" . $_GET["RadicalID"];
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
		if(mb_substr($PinyinStr,$offset,1)=="'"){
			$plusone=1;
		} else {
			$plusone=0;
		}
		$Pinyin[$i] = mb_substr($PinyinStr,$offset,strlen($PinyinNum[$x])-1+$plusone);
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
