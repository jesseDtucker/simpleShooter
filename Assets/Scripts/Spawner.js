/*
This script will infinitely spawn enemies around the target (likely the player) at an infinite rate up to
a specified maximum.
Note: the gameObject must be at the orgin for this to function, will make more flexible later!
*/

var enemy : GameObject;
var maxEnemies = 0;
var maxSinleSpawn = 0;
var timeDelay = 0;
var spawnDistance = 0;
var target : Transform;	//the transform that identifies where the center of the spawn circle is

private var running = true;

function Start()
{

	//the below will use co-routines. This implementation is similar to the AI controls in the Widget example
	
	//attempt to spawn enemies
	spawnEnemies();
}

/*
turn the spawner on
*/
function turnOn()
{
	running = true;
	spawnEnemies();
}

/*
turn the spawner off
*/
function turnOff()
{
	running = false;
}

/**
* Kill all the enemies that this spawner has created
*/
function killAll()
{
	for(i = 0; i < gameObject.transform.GetChildCount() ; i++)
    {
       var child = gameObject.transform.GetChild(i);
       Destroy(child.gameObject);
    }
}

/*
attempt to spawn enemies, function will create a random amount up to the limit and then return
*/
private function spawnEnemies()
{
	while(running)
	{
		yield WaitForSeconds(timeDelay);
	
		var spawnCount = Random.value*(maxEnemies - transform.childCount);
		
		spawnCount = 2*Mathf.Sqrt(spawnCount);
		
		for(var i = 0 ; i < spawnCount ; i++)
		{
			createEnemy();
		}
		
		yield;
	}
}

/*
create an enemy at a specified distance from the player and at a random angle
*/
function createEnemy()
{
	//generate a random angle (in radians) and then determine the position vector that would place an enemy there
	var angle = Random.value * 2 * Mathf.PI;
	var pos = new Vector3(spawnDistance*Mathf.Cos(angle),0,spawnDistance*Mathf.Sin(angle));
	
	//now modify the position to be relative to the target
	pos += target.position;
	
	//finally instaniate this object and parent it to the spawner.
	var spawnedEnemy = Instantiate(enemy,pos,transform.rotation);
	spawnedEnemy.transform.parent = transform;
}