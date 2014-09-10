/**
* This script handles input from the player for the purpose of
* controlling the player's ship.
*
*/



private var isControllable 		: boolean;				//is the player able to control the ship?
private var moveController 		: MovementController;	//the movement controller that applies movement
private var attackController 	: AttackController;		//the attack controller that controls the players firing ability



/**
* Initialize the players controllers
*/
function Start() : void
{
	moveController 		= gameObject.GetComponent("MovementController");
	attackController	= gameObject.GetComponent("AttackController");
}

/**
* Every physics timeStep check for input and apply it to the movementController
* to move the player accordingly, also if the player pushes the fire button
* then attempt to fire
*/
function FixedUpdate() : void
{
	//handle input for player movement
	handleMove();
	
	//handle input to rotate the player
	handleRotate();
	
	//handle input to cause the player to fire
	handleFire();
}

/**
* get the players movement input and apply it to the MovementController
*/
private function handleMove() : void
{
	//get the movement direction based upon the input and send it to the moveController
	//Note normalized vector is a safeguard, but not required as it should be handled by the moveController
	moveDirection = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));

	moveController.move(moveDirection.normalized);
}

/**
* get the players mouse position and translate it into a rotation
* to be applied to the MovementController
*/
private function handleRotate() : void
{
	//get the mouses screen coords relative to the center of the screen.
	var mousePosition = Input.mousePosition;
	//ensure that the values remain in the plane
	mousePosition.z = mousePosition.y;
	mousePosition.y = 0;
	
	var direction = mousePosition - new Vector3(Screen.width/2,0,Screen.height/2);
	
	moveController.face(-direction.normalized);
}

/**
* get the players fire input and send it to the AttackController
*/
private function handleFire() : void
{
	if(Input.GetButton("primaryFire"))
	{
		//attempt to fire the primary weapon, the attack controller will handle the details
		attackController.primaryFire();
	}
	else if(Input.GetButton("secondaryFire"))
	{
		//attempt to fire the primary weapon, the attack controller will handle the details
		attackController.secondaryFire();
	}
}