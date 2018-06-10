<?php
include_once 'db_connect.php';
$sql="SELECT DISTINCT HanziS,Pinyin,PinyinNum,English,PartofSpeech,H.HSK,Chapter,H.ID,R.ID As RevID FROM Hanzi As H ";
if($_GET["Lesson"]=="Review") {
	$sql.=" JOIN Review AS R ON R.ID=H.ID";
	if($_GET["HSK"]!="All") {
		$sql.=" WHERE H.HSK=" . $_GET["HSK"];
	}
} else if($_GET["Lesson"]=="Review" && $_GET["HSK"]=="All") {
	$sql.=" JOIN Review AS R ON R.ID=H.ID";
} else if($_GET["HSK"]!="All") {
	$sql.=" LEFT OUTER JOIN Review AS R ON R.ID=H.ID WHERE H.HSK = " . $_GET["HSK"];	
	if($_GET["Lesson"]=="Verbs") {
		$sql.= " AND (PartOfSpeech = 'verb' or PartOfSpeech = 'verb/noun' or PartOfSpeech = 'modal verb')";
	} elseif($_GET["Lesson"]=="Nouns") {
		$sql.= " AND (PartOfSpeech = 'noun' or PartOfSpeech = 'verb/noun')";
	} elseif($_GET["Lesson"]=="Adjectives") {
		$sql.= " AND PartOfSpeech = 'adjective'";
	} elseif($_GET["Lesson"]=="Adverbs") {
		$sql.= " AND PartOfSpeech = 'adverb'";
	} elseif($_GET["Lesson"]=="MeasureWords") {
		$sql.= " AND PartOfSpeech = 'measure word'";
	} elseif($_GET["Lesson"]=="Numbers") {
		$sql.= " AND PartOfSpeech = 'number'";
	} elseif($_GET["Lesson"]=="Particles") {
		$sql.= " AND PartOfSpeech = 'particle'";
	} elseif($_GET["Lesson"]=="Pronouns") {
		$sql.= " AND PartOfSpeech = 'pronoun'";
	} elseif($_GET["Lesson"]=="ProperNouns") {
		$sql.= " AND PartOfSpeech = 'proper noun'";
	} elseif($_GET["Lesson"]=="Radicals") {
		$sql.= " AND PartOfSpeech = 'radical'";
	} elseif($_GET["Lesson"]!="All") {
		$sql.= " AND Chapter = " . $_GET["Lesson"];
	}
} else {
	if($_GET["Lesson"]=="Verbs") {
		$sql.= " LEFT OUTER JOIN Review AS R ON R.ID=H.ID WHERE (PartOfSpeech = 'verb' or PartOfSpeech = 'verb/noun' or PartOfSpeech = 'modal verb')";
	} elseif($_GET["Lesson"]=="Nouns") {
		$sql.= " LEFT OUTER JOIN Review AS R ON R.ID=H.ID WHERE (PartOfSpeech = 'noun' or PartOfSpeech = 'verb/noun')";
	} elseif($_GET["Lesson"]=="Adjectives") {
		$sql.= " LEFT OUTER JOIN Review AS R ON R.ID=H.ID WHERE PartOfSpeech = 'adjective'";
	} elseif($_GET["Lesson"]=="Adverbs") {
		$sql.= " LEFT OUTER JOIN Review AS R ON R.ID=H.ID WHERE PartOfSpeech = 'adverb'";
	} elseif($_GET["Lesson"]=="MeasureWords") {
		$sql.= " LEFT OUTER JOIN Review AS R ON R.ID=H.ID WHERE PartOfSpeech = 'measure word'";
	} elseif($_GET["Lesson"]=="Numbers") {
		$sql.= " LEFT OUTER JOIN Review AS R ON R.ID=H.ID WHERE PartOfSpeech = 'number'";
	} elseif($_GET["Lesson"]=="Particles") {
		$sql.= " LEFT OUTER JOIN Review AS R ON R.ID=H.ID WHERE PartOfSpeech = 'particle'";
	} elseif($_GET["Lesson"]=="Pronouns") {
		$sql.= " LEFT OUTER JOIN Review AS R ON R.ID=H.ID WHERE PartOfSpeech = 'pronoun'";
	} elseif($_GET["Lesson"]=="ProperNouns") {
		$sql.= " LEFT OUTER JOIN Review AS R ON R.ID=H.ID WHERE PartOfSpeech = 'proper noun'";
	} elseif($_GET["Lesson"]=="Radicals") {
		$sql.= " LEFT OUTER JOIN Review AS R ON R.ID=H.ID WHERE PartOfSpeech = 'radical'";
	} else if($_GET["Lesson"]!="All") {
		$sql.= " LEFT OUTER JOIN Review AS R ON R.ID=H.ID WHERE Chapter = " . $_GET["Lesson"];
	} else {
		$sql.= " LEFT OUTER JOIN Review AS R ON R.ID=H.ID";
	}
}
if($_GET["Lesson"]!="All") {
	$sql.= " Order By H.ID";
} else {
	$sql.= " Order By H.HSK,CAST(Chapter AS UNSIGNED),H.ID";
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
