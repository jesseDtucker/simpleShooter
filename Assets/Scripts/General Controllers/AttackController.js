/**
* This will control the attack ability
* Main functions:
* 	-PrimaryFire()
*	-SecondaryFire()
*/

//fire rate
var primaryRateOfFire 	: float;
var secondaryRateOfFire : float;

//spread constants (determine how much the bullets spread out from center)
var primarySpread	: float;
var secondarySpread : float;

//whether the spread fire is random or centered
var isPrimarySpreadRandom 	: boolean;
var isSecondarySpreadRandom	: boolean;

//ammunition to be fired
var primaryBullet	: GameObject;
var secondaryBullet	: GameObject;

//max Ammo
var primaryMaxAmmo 		: int;
var secondaryMaxAmmo	: int;

//current ammo
private var primaryAmmo		: int;
private var secondaryAmmo	: int;

//last time a weapon was fired
//TODO: may be exploited by rapidly alternating between weapons, consider rebalance
private var primaryLastTime		: float;
private var secondaryLastTime 	: float;

/**
* Initilize the ammo to the starting max values
*/
function Start() : void
{
	primaryAmmo 	= primaryMaxAmmo;
 	secondaryAmmo 	= secondaryMaxAmmo;
}

/**
* Fire the bullet assigned to the primaryAmmo and decrease the ammo count
* Note: will not fire if it hasn't finished reloading
* (ie time since last fire has not passed the threashold)
*
*/
function primaryFire() : void
{
	if(!canShootPrimary())
	{
		return;
	}
	
	//fire
	Instantiate(primaryBullet,transform.position,transform.rotation);
	
	//reset time
	primaryLastTime = Time.time;
	
	
	//decrease ammo count
	primaryAmmo--;
}

/**
* Fire the bullet assigned to the secondaryAmmo and decrease the ammo count
* Note: will not fire if it hasn't finished reloading
* (ie time since last fire has not passed the threashold)
*
*/
function secondaryFire() : void
{
	
	if(!canShootSecondary())
	{
		return;
	}
	
	//fire
	Instantiate(secondaryBullet,transform.position,transform.rotation);
	//TODO: remember to account for multi-fire, bullet spread, ect.
	
	//reset time
	primaryLastTime = Time.time;
	
	//decrease ammo count
	primaryAmmo--;
}


/**
* check if the primary weapon is ready to fire
* checks time and ammo constraints
* TODO: decide what to do about infinite ammo
*/
private function canShootPrimary() : boolean
{
	//test time
	if(!(Time.time > primaryLastTime + primaryRateOfFire))
	{
		return false;
	}
	
	//check if ammo is available
	if(primaryAmmo <= 0)
	{
		return false;
	}
	
	return true;
}

/**
* check if the secondary weapon is ready to fire
* checks time and ammo constraints
* TODO: decide what to do about infinite ammo
*/
private function canShootSecondary() : boolean
{
	//test time
	if(!(Time.time > secondaryLastTime + secondaryRateOfFire))
	{
		return false;
	}
	
	//check if ammo is available
	if(secondaryAmmo >= 0)
	{
		return false;
	}
	
	return true;
}