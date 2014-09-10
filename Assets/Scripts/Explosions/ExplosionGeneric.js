/**
* This script will control the basic explosions by giving them a radius of effect
* and a lifetime.
*
*/

var lifeTime 	: float;		//measured in seconds
var radius		: float;		//measured in meters
var force		: float;		//the force the object exerts on other objects
var damage		: int;

private var creationTime	: float;	//the time this explosion was created

function Start() : void
{
	creationTime = Time.time;
}

function FixedUpdate() : void
{
	if(Time.time >= creationTime + lifeTime)
	{
		//then the explosion has outlived itself
		Destroy(gameObject);
	}
}

/**
* return the force felt by an object at the point position
* The force is inversly proportional to the square of the radius
*/
function getForce(position : Vector3) : Vector3
{
	//get the direction, last term accounts for the radius
	var direction = position - transform.position + Vector3(radius,0,radius);
	//get the radius
	var distanceFromCenter = direction.magnitude;
	
	var forceStrength = force / Mathf.Pow(distanceFromCenter,2);
	
	//cap the forceStrength to be less than the force
	if(forceStrength > force)
		forceStrength = force;
	
	var forceVector = forceStrength * direction.normalized;
	
	return forceVector;
	
}

/**
* @return int : the damage the explosion will cause a target
*/
function getDamage() : int
{
	return damage;
}

/**
* set this explosion to deal damage of the specified value
*/
function setDamage(dmg : int) : void
{
	this.damage = dmg;
}