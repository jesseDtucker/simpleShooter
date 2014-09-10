/**
* This class handles the basic actions a standard enemy will take when colliding with objects
* Specifically it will self-destruct when colliding with the player
* and it will take damage when colliding with a projectile that was not shot by an enemy.
*/

//explosion to be created upon demise
var hitPlayerExplosion	: GameObject;

private var enemyStatus : EnemyStatus;

/**
* Intitialize the gameObject to have a reference to the status for this enemy
*/
function Start() : void
{
	enemyStatus = gameObject.GetComponent("EnemyStatus");
}

function OnCollisionEnter(collision : Collision) : void
{
	//get the object's tag
	var tag : String;
	tag = collision.gameObject.tag;

	//test if it is a bullet
	if(tag == "playerBullet")
	{
		var bullet = collision.gameObject;
		//get damage
		var projectileComponent = bullet.GetComponent("basicProjectile");
		
		//deal damage to enemy
		enemyStatus.dealDamage(projectileComponent.getDamage());
		
		//call the projectiles hit enemy function
		projectileComponent.hitTarget();
	}
	
	//test if it is a player
	if(tag == "player")
	{
		//create an explosion here
		var newExplosion = Instantiate(hitPlayerExplosion,transform.position,transform.rotation);
		//then destroy the gameObject
		Destroy(gameObject);
	}
	
	//otherwise no response
}