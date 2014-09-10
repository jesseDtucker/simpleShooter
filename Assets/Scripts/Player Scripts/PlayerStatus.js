/**
* This script will control the players current state/status
* This will include variables such as health, points and lives
*
*/

var initialLives 	: int;	//the number of lives the player starts with
var maxHealth		: int;	//the maximum health the player has
var initialPoints	: int;	//the number of points the player starts with

private var lives	: int;	//the number of lives the player currently has
private var health	: int;	//the amount of health the player currently has
private var points	: int;	//the number of points the player currently has

private var isDead	: boolean;	//test variable, true if player is currently dead

/**
* Initialise private variables to the starting variables
*/
function Start() : void
{
	lives = initialLives;
	health = maxHealth;
	points = initialPoints;
}

/**
* add the specified number of points to the players current score
*/
function addPoints(pointsToBeAdded : int) : void
{
	points += pointsToBeAdded;
}

/**
* deal damage to the player then check if they are dead
*/
function applyDamage(damage : int) : void
{
	//if the player is currently marked as dead do not apply damage
	if(!isDead)
	{
		health -= damage;
	
		if(health <= 0)
			die();
	}
}

/**
* return the players current health
*/
function getHealth() : int
{
	return health;
}

/**
* return the players current number of lives
*/
function getLives() : int
{
	return lives;
}

/**
* return the players current point count
*/
function getPoints() : int
{
	return points;
}

/**
* Kill the player
* Note: doesn't destroy the gameObject, just invalidates it for a while
*/
private function die() : void
{
	//if the player has more lives then respawn
	if(lives > 0)
	{
		lives--;
		reSpawn();
	}
	else
	{
		//then the player is out of lives, so gameOver
		GameObject.FindGameObjectWithTag("GameStatus").SendMessage("setGameOver",true);
	}
}

/*
* Respawn the player at their current position
* Destroy all nearby enemies
* pause game for 1 second
* create player
*/
private function reSpawn()
{
	isDead = true;

	//destroy all enemies
	//TODO: make this work for multiple spawners
	GameObject.FindGameObjectWithTag("spawner").GetComponent("Spawner").killAll();
	
	//make the player invisible
	//setVisibility(false);
	
	//pause game
	//Time.timeScale = 0.0;
	//TODO: this doesn't work!

	//wait
	yield WaitForSeconds(1.5);
	
	//make the player visible
	//setVisibility(true);
	
	//set the players health back to max
	health = maxHealth;
	
	isDead = false;
}

/**
* set the meshRenderer to either enabled or disabled
*/
private function setVisibility(state : boolean) : void
{
	if(state)
	{
		gameObject.SendMessage("setVisible");
	}
	else
	{
		gameObject.SendMessage("setInvisible");
	}
	
}