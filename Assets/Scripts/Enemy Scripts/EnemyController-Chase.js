/**
* Simple controller that will pursue the player directly
* No pathfinding is used, it will go straight for the target
* Note: doesn't shoot any projectiles, just chases player
*/

var target : GameObject;	//the target the enemy is supposed to pursue, defaults to player if non is provided

var deSpawnDistance	: int;	//the distance at which the enemy will despawn

private var moveController : MovementController;

/**
* Initilize the moveController and verify that target is valid
*/
function Start()
{
	moveController = gameObject.GetComponent("MovementController");
	
	if(!target)
	{
		//then no target was provided, get the player as a default target
		target = GameObject.FindGameObjectWithTag("player");
	}
}

/**
* Face the player then move towards the player at full speed
* Get the players position, face player, move towards player
*/
function Update()
{
	//despawn the enemy if it is to far from the player
	checkDespawn();

	//face the player
	faceTarget();
	
	//next move towards the player
	moveToTarget();
}

/*
* check if this enemy is to far from the target and should despawn
*/
private function checkDespawn() : void
{
	distance = (target.transform.position - transform.position).magnitude;
	
	if(distance > deSpawnDistance)
	{
		Destroy(gameObject);
	}
}

/**
* Face towards the target
*/
private function faceTarget() : void
{
	//get the direction to the target then face that direction
	var direction = getDirectionToTarget();
	moveController.face(direction);
}

/**
* Move towards the target
*/
private function moveToTarget() : void
{
	//get the direction to be moved
	var direction = getDirectionToTarget();
	
	//move in that direction (in world coords)
	moveController.move(direction);
}

/**
* Find the unit vector pointing from this gameObject to the target
*
*/
private function getDirectionToTarget() : Vector3
{
	var targetPos = target.transform.position;

	var direction = targetPos - gameObject.transform.position;
	direction = direction.normalized;
	return direction;
}