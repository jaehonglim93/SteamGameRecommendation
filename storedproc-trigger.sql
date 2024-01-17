CREATE DEFINER=`root`@`%` PROCEDURE `RecommendGames`(IN userId INT)
BEGIN
	DECLARE done INT DEFAULT 0;
    DECLARE curGameId INT;
	DECLARE curGenreId INT;
	DECLARE curDeveloperId INT;
	DECLARE userGenreId INT;
	DECLARE genreScore INT;
    
	DECLARE gameCursor CURSOR FOR
	SELECT G.GameId, G.Genre_GenreId, D.Developer_DeveloperId
	FROM Game AS G
	JOIN Game_Has_Developer AS D ON G.GameId = D.Game_GameId
	WHERE G.GameId NOT IN (SELECT Game_GameId FROM User_Plays_Game WHERE User_UserId = userId)
		AND G.GameId NOT IN (SELECT Game_GameId FROM User_Recommended_Game WHERE User_UserId = userId);
        
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

	SELECT User.Genre_GenreId INTO userGenreId FROM User WHERE User.UserId = userId LIMIT 1;

	OPEN gameCursor;

	game_loop: LOOP
		FETCH gameCursor INTO curGameId, curGenreId, curDeveloperId;

		IF done THEN
			LEAVE game_loop;
		END IF;

		SET genreScore = (
			SELECT
				(G.isIndie = U.isIndie) + (G.isAction = U.isAction) + (G.isAdventure = U.isAdventure) +
				(G.isCasual = U.isCasual) + (G.isStrategy = U.isStrategy) + (G.isRPG = U.isRPG) +
				(G.isSimulation = U.isSimulation) + (G.isSports = U.isSports) + (G.isRacing = U.isRacing) +
				(G.isMassivelyMultiplayer = U.isMassivelyMultiplayer)
			FROM Genre AS G
			JOIN Genre AS U ON G.GenreId = curGenreId AND U.GenreId = userGenreId
		);


		IF (genreScore >= 8) OR
		   (EXISTS (SELECT * FROM User_Plays_Game AS UPG
					JOIN Game_Has_Developer AS GD ON UPG.Game_GameId = GD.Game_GameId
					WHERE UPG.User_UserId = userId AND GD.Developer_DeveloperId = curDeveloperId)) THEN
		  INSERT INTO User_Recommended_Game (User_UserId, Game_GameId, RecommendationCount) 
		  VALUES (userId, curGameId, 1)
          ON DUPLICATE KEY UPDATE RecommendationCount = RecommendationCount + 1;
		END IF;
	END LOOP;
	CLOSE gameCursor;
END

CREATE DEFINER=`root`@`%` TRIGGER `User_Plays_Game_AFTER_INSERT` AFTER INSERT ON `User_Plays_Game` FOR EACH ROW BEGIN
    IF (SELECT COUNT(*) FROM User_Recommended_Game WHERE User_UserId = NEW.User_UserId AND Game_GameId = NEW.Game_GameId) > 0 THEN
        DELETE FROM User_Recommended_Game
        WHERE User_UserId = NEW.User_UserId AND Game_GameId = NEW.Game_GameId;
    END IF;
END