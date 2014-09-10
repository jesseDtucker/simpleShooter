/**
* Class handles the basic properties that all standard enemies have
* This includes health, the number of points they drop
* Any powerups they drop, and anything else I come up with
*
*/

var maxHealth 	: int;

var pointsDrop 			: GameObject;
var deathExplosion 		: GameObject;

private var health : int;

/**
* Initialise the starting private variables
*
*/
function Start()
{
	health = maxHealth;
}

function dealDamage(damage : int) : void
{
	health-=damage;
	
	if(health <= 0)
	{
		die();
	}
}

private function die() : void
{
	dropPoints();
	dropPowerUps();
	
	Instantiate(deathExplosion,transform.position,transform.rotation);
	
	Destroy(gameObject);
}

private function dropPoints() : void
{
	Instantiate(pointsDrop,transform.position,transform.rotation);
}

private function dropPowerUps() : void
{
	//TODO: make this work!
}