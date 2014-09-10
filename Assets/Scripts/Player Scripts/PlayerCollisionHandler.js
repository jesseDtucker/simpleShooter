/**
* All collisions that affect the player are handled here
*/

/**
* OnTriggerEnter is used for colliding with non-physical objects like explosions
*/
function OnTriggerEnter(other : Collider) : void
{
	var tag = other.gameObject.tag;
	
	if(tag == "explosion")
	{
		//then the player hit an explosion
		//deal damage to the player
		var damage = other.collider.gameObject.GetComponent("ExplosionGeneric").getDamage();
		this.GetComponent("PlayerStatus").applyDamage(damage);
	}
	
	
}

/**
* This is for anything where continous collisions matter, such as explosions
*/
function OnTriggerStay(other : Collider) : void
{
	var tag = other.gameObject.tag;
	
	if(tag == "explosion")
	{
		//then the player is in contact with an explosion
		//apply a force to the player
		var force = other.gameObject.GetComponent("ExplosionGeneric").getForce(transform.position);
		rigidbody.AddForce(force);
	}
}