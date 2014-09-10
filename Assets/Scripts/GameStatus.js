/**
All states of the game are handled through here
currently allows for gameOver and pause control
*/

private var isPaused : boolean;
private var isGameOver : boolean;

var inputDelay = 1;

//the last time the user input info (set to less than zero so user can input immediatley)
private var lastInputTime = -inputDelay;

function Start()
{
	Time.timeScale = 1;
}

/**
set the whether or not the game is over (as in player is out of lives)
*/
function setGameOver(gameOver : boolean) : void
{
	isGameOver = gameOver;
	
	if(isGameOver)
	{
		Time.timeScale = 0;
	}
};

/**
Set the pause state
*/
function setPauseState(pause : boolean) : void
{
	isPaused = pause;
	
	if(isPaused)
	{
		Time.timeScale = 0;
	}
	else
	{
		Time.timeScale = 1;
	}
};


/**
Check whether or not the game is currently paused
*/
function getIsPaused() : boolean
{
	return isPaused;
};

/**
Check whether or not the game is currently over (as in player is out of lives)
*/
function getIsGameOver() : boolean
{
	return isGameOver;
};

function Update()
{
	//check for pause button
	if(Input.GetButtonDown("Pause"))
	{
		lastInputTime = Time.time;
	
		if(isPaused)
		{
			setPauseState(false);
		}
		else
		{
			setPauseState(true);
		}
	}
	
}