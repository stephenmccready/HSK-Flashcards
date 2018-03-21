SELECT * FROM Hanzi
Where (	(BINARY Pinyin LIKE '%ā%' OR BINARY Pinyin LIKE '%ē%' OR BINARY Pinyin LIKE '%ī%' OR BINARY Pinyin LIKE '%ō%' OR BINARY Pinyin LIKE '%ū%' OR BINARY Pinyin LIKE '%ǖ%')
		AND BINARY PinyinNum NOT LIKE '%1%' )
OR	(	(BINARY Pinyin LIKE '%á%' OR BINARY Pinyin LIKE '%é%' OR BINARY Pinyin LIKE '%í%' OR BINARY Pinyin LIKE '%ó%' OR BINARY Pinyin LIKE '%ú%' OR BINARY Pinyin LIKE '%ǘ%')
		AND BINARY PinyinNum NOT LIKE '%2%' 
		)
OR	(	(BINARY Pinyin LIKE '%ǎ%' OR BINARY Pinyin LIKE '%ě%' OR BINARY Pinyin LIKE '%ǐ%' OR BINARY Pinyin LIKE '%ǒ%' OR BINARY Pinyin LIKE '%ǔ%' OR BINARY Pinyin LIKE '%ǚ%')
		AND BINARY PinyinNum NOT LIKE '%3%' 
		)
OR	(	(BINARY Pinyin LIKE '%à%' OR BINARY Pinyin LIKE '%è%' OR BINARY Pinyin LIKE '%ì%' OR BINARY Pinyin LIKE '%ò%' OR BINARY Pinyin LIKE '%ù%' OR BINARY Pinyin LIKE '%ǜ%')
		AND BINARY PinyinNum NOT LIKE '%4%' 
		)
