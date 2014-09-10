/**
This will manage the in game Heads up Display, currently it only displays health but a points counter will also be added
*/

//health bar variables
var healthScaling : float;
var healthTexture : Texture;

//reference to the player for use with getting health
var player : Transform;

//pause menu texture
var pauseTexture : Texture;

//game over texture
var gameOverTexture : Texture;

var customSkin : GUISkin;


private var gameStatus : GameStatus;

/*
initialization goes here!
*/
function Start()
{
	gameStatus = GameObject.FindGameObjectWithTag("GameStatus").GetComponent("GameStatus");
}

/*
main GUI functionality goes here!
*/
function OnGUI()
{
	if(customSkin)
	    GUI.skin = customSkin;
	    
	//						Health Bar
	//<------------------------------------------------------------------->
	//TODO: organize the positioning better to be easily managed
	var health : int;
	health = player.transform.GetComponent("PlayerStatus").getHealth();
	GUI.BeginGroup(Rect(50,50,healthTexture.width, healthTexture.height*health*healthScaling));
	GUI.Label( Rect(0, 0, healthTexture.width, healthTexture.height), healthTexture);
	GUI.EndGroup();
	//<------------------------------------------------------------------->
	
	//						Lives Display
	//<------------------------------------------------------------------->
	var lives : int;
	lives = player.transform.GetComponent("PlayerStatus").getLives();
	
	GUI.Label(Rect(100,10,200,16) , ("Remaining Lives: " + lives.ToString()) );
	//<------------------------------------------------------------------->
	
	//						Points Display
	//<------------------------------------------------------------------->
	var points : int;
	points = player.transform.GetComponent("PlayerStatus").getPoints();
	
	GUI.Label(Rect(600,10,250,16) , ("Points: " + points.ToString()) );
	//<------------------------------------------------------------------->
	
	//						Pause Menu Display
	//<------------------------------------------------------------------->
	if(gameStatus.getIsPaused())
	{
		GUI.BeginGroup(Rect(300,75,pauseTexture.width,pauseTexture.height));
		//create a window
		GUI.Label(Rect(0,0,pauseTexture.width,pauseTexture.height),pauseTexture);
		//add 2 buttons, one to end the game and one to continue
		if(GUI.Button(Rect(75,200,75,20),"Continue"))
		{
			gameStatus.setPauseState(false);
		}
		
		if(GUI.Button(Rect(75,250,85,20),"Main Menu"))
		{
			Application.LoadLevel(0);
		}
		
		GUI.EndGroup();
	}
	//<------------------------------------------------------------------->
	
	//						Game Over Display
	//<------------------------------------------------------------------->
	if(gameStatus.getIsGameOver())
	{
		GUI.BeginGroup(Rect(300,75,gameOverTexture.width,gameOverTexture.height));
		GUI.Label(Rect(0,0,gameOverTexture.width,gameOverTexture.height),gameOverTexture);
		
		//display the players score
		//GUI.Label(Rect(20,20,150,20),("Final Score : " + ))
		//allow only one button that will take the player back to the main menu
		if(GUI.Button(Rect(60,200,85,20),"Main Menu"))
		{
			Application.LoadLevel(0);
		}
		
		GUI.EndGroup();
	}
	//<------------------------------------------------------------------->
}