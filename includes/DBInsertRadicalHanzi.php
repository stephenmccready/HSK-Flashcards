<?php
include_once 'db_connect.php';
$radicalArray = array(
  array("氵","shui3"),		//water
  array("讠","yan2"),		//language and speech
  array("钅","jin1"),		//metal
  array("口","kou3"),		//the mouth
  array("辶","chuo4"),		//walking
  array("门","men2"),		//a room or a door
  array("口","kou3"),		//means being trapped or besieged
  array("礻","shi4"),		//a variant of "示",  deity, sacrificial rites and one's fortune
  array("阝","fu4"),			//a landform or location
  array("亻","ren2"),		//a person
  array("女","nv3"),			//women
  array("饣","shi2"),		//food
  array("日","ri4"),			//time
  array("目","mu4"),			//the eyes
  array("月","yue4"),		//the human body or flesh
  array("扌","shou3"),		//an action related to a hand
  array("艹","cao3"),		//grass, trees or plants
  array("宀","mian2"),		//houses
  array("⺩","yu3"),			//jade
  array("⻊","zu2"),			//one's feet
  array("⺮","zhu2"),		//bamboo
  array("欠","qian4"),		//movements of the mouth
  array("木","mu4"),			//plants
  array("⺉","dao1"),		//cutters or knives
  array("纟","yao1"),		//silk
  array("⺖","xin1"),		//ones mentality
  array("⼦","zi0"),			//children
  array("广","guang3"),		//buildings
  array("⺨","quan3"),		//animals
  array("⺗","xin0"),		//one's mental activities and emotions
  array("⼻","chi4"),		//the act of walking
  array("攵","pu1"),			//the act of whipping or beating
  array("ㄡ","ou1"),			//variety of meanings
  array("⼱","jin1_"),		//cotton or silk products or textiles
  array("土","tu3"),			//soil, land or buildings
  array("⺣","biao1"),		//fire
  array("⾛","zou3"),		//running or walking
  array("⽳","xue2"),		//holes, caves or houses
  array("疒","ne4"),			//diseases
  array("冫","bing1"),		//ice or coldness
  array("止","zhi3"),		//toes
  array("冂","jiong1"),		//relations among or images of things
  array("⽄","jin1__"),		//axes or cutting/whittling
  array("⻚","ye4"),			//head or face
  array("⻗","yu3"),			//clouds and rain
  array("⻉","bei4"),		//money or utensils
  array("山","shan1"),		//names, types and forms of mountains and islands
  array("大","da4")			//people
);
for ($row = 0; $row < count($radicalArray); $row++) {
	$sql="INSERT INTO RadicalHanzi(RadicalID,HanziID) "
	."SELECT DISTINCT Z.id AS RadicalID, H.id AS HanziID FROM ".$radicalArray[$row][1]." AS K "
	."JOIN Hanzi AS Z ON Z.HanziS='".$radicalArray[$row][0]."' And Z.PartofSpeech='Radical' "
	."JOIN Hanzi AS H ON H.HanziS Like CONCAT('%',K.HanziS,'%') "
	."LEFT OUTER JOIN RadicalHanzi As RH ON RH.RadicalID=Z.id AND RH.HanziID=H.id "
	."WHERE RH.id IS NULL";
	if ($mysqli->query($sql) === TRUE) {
		echo "OK " . $row . ": " . $radicalArray[$row][0] . " " . $radicalArray[$row][1] . "<br/>-------------------------<br/>";
	} else {
		echo "ERR: " . $row . ": " . $radicalArray[$row][0] . " " . $radicalArray[$row][1] 
		. "<br/>*****************************<br/>" . $conn->error . "<br/>" . $sql ."<br/>*****************************<br/>";
		$error++;
	}
}

$mysqli->close();
