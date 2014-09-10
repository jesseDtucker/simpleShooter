/*
This script will define the games main menu, it will support a help screen, play button and quit button
*/

var mainMenuBackground : Texture;
var mainTitle : Texture;

private var playButton;
private var quitButton;
private var loadingMSG;
private var isLoading = false;

/*
create the starting values
*/
function Start()
{
	//initilize the button positions
	playButton = new Rect(400,250,100,20);
	quitButton = new Rect(250,100,100,20);
	loadingMSG = new Rect(100,500,300,40);
}

function OnGUI()
{
	//draw the background
	GUI.Label(Rect(0,0,mainMenuBackground.width,mainMenuBackground.height),mainMenuBackground);

	//if the player pushes the button play the game
	if(GUI.Button(playButton,"Play Game"))
	{
		loadGame();
	}
	
	//if it is loading let the user know
	if(isLoading)
	{
		GUI.Label(loadingMSG,"Now Loading");
	}
}

/*
load the first level of the game
*/
private function loadGame()
{
	isLoading = true;
	Application.LoadLevel(1);
}