/**
* Simple script to create a points Pickup object
* 
*/

var pointsValue 		: int;		//how many points the sphere is worth
var speed				: float;	//the speed at which it moves towards the player
var activateDistance	: int;		//the distance at which the sphere will start moving towards the player

private var isActive : boolean;

private var player : GameObject;


/**
* Initialise the player reference
*/
function Start() : void
{
	player = GameObject.FindGameObjectWithTag("player");
	isActive = true;
}

/**
* If it collides with a player destroy self and give the player points
*/
function OnCollisionEnter(collision : Collision) : void
{
	if(isActive)
	{
		var tag : String;
		tag = collision.gameObject.tag;
		
		if(tag == "player")
		{
			collision.gameObject.GetComponent("PlayerStatus").addPoints(pointsValue);
			fireLast();
		}
	}
}

/**
* Move towards the player at the inverse square of the distance between them
*/
function FixedUpdate() : void
{
	var moveDirection 	= (player.transform.position - transform.position);
	
	if(moveDirection.magnitude < activateDistance)
	{
		//if the player is within the activateDistance move towards the player
		var moveDistance 	= moveDirection.normalized * speed /  (moveDirection.magnitude);
	
		transform.Translate(moveDistance,Space.World);
	}
	
}

/**
* Finish creating particles then disapear.
*/
private function fireLast()
{
	particleEmitter.emit = false;
	isActive = false;
	
	yield WaitForSeconds(4.0);
	
	Destroy(gameObject);
}