/*
This is to describe a basic projectile's behavior.
It will make it fly in a straight line for a set amount of time and when it hits an enemy it will apply
a set amount of damage then destroy itself.
*/

//variable that define the projectiles behaviour
var speed = 10;
var damage = 10;
var flightTime = 10;	//in seconds

private var startTime;

/*
when the projectile is created set the time it was created
*/
function Start()
{
	startTime = Time.time;
}

/*
update the object (ie. move it!)

Note: using lateUpdate is maybe no the best approach
*/
function LateUpdate () {

	transform.Translate(-Vector3.forward * speed * Time.deltaTime);
	
	//check whether or not the projectile is out of time
	if(Time.time > startTime + flightTime)
	{
		Destroy(gameObject);
	}
}

function hitTarget() : void
{
	//for now destroy the object
	Destroy(gameObject);
}

function getDamage() : int
{
	return damage;
}