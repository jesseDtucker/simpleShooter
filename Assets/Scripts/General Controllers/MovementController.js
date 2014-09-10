/**
*Controls movement for the attached GameObject. Defines movement and rotation speed and modifies the transform
*appropriately.
*
*Important functions:
*	move(direction,speed%)
*	face(direction,speed%)
*/

var rotateSpeed		: float;		//the speed at which the object rotates
var moveSpeed		: float;		//the speed at which the object moves

//Smooths the input recieved by interpolating with past values
var inputSmoothing : float;			//value greater than zero and less than 1. higher values cause less smoothing
var useTranslate : boolean;			//does the object move by using forces on a rigidbody or directly my moving the transform?

private var moveDirection : Vector3;	//the direction the object is supposed to move
private var faceDirection : Vector3;	//the direction the object is supposed to face
private var currentDirection : Vector3;	//the direction the object is currently facing

private var moveModifier 	: float;	//modifies the movement by a factor
private var rotateModifier 	: float;	//modifies the rotation by a factor

private var previousInput		: Vector3;	//the players previous input, used to smooth the input

/**
* Initialize the default values for private variables
*/
function Start()
{
	//arbitrary direction choosen
	moveDirection 		= Vector3.up;
	faceDirection 		= Vector3.up;
	currentDirection 	= Vector3.up;
	
	moveModifier 	= 1.0;
	rotateModifier 	= 1.0;
}

/**
* Move and rotate the object according to the last provided directions
*/
function FixedUpdate()
{
	moveObject();
	faceObject();
}

/**
*Causes the object to move in the specified direction at full speed until
*it is told otherwise
*Note: assumes direction is in world coordinates
*/
function move(direction : Vector3) : void
{
	move(direction, 1.0);
}

/**
*Causes the object to move in the specified direction at a given speed until
*it is told otherwise. The speed is provided as a percentage of full speed
*Note: assumes direction is in world coordinates
*/
function move(direction : Vector3, mod : float) : void
{
	moveDirection = direction;
	moveModifier = mod;
	
	//normalize the direction
	moveDirection = moveDirection.normalized;
	
	//smooth the input
	moveDirection = smoothInput(moveDirection);
}

/**
* Smooth the players input to prevent jerkiness
*/
private function smoothInput(newInput : Vector3) : Vector3
{
	previousInput = Vector3.Lerp(previousInput,newInput,inputSmoothing);
	
	return previousInput;
}

/**
* Move the object in the last indicated direction
*/
private function moveObject()
{
	//translate the object in the direction indicated by direction and the provided speed direction
	if(useTranslate)
		transform.Translate(moveDirection * moveModifier * moveSpeed * Time.deltaTime,Space.World);
	else
		rigidbody.AddForce( moveDirection * moveModifier * moveSpeed);
		
	//temporary movement resriction
	transform.position.y = 0;
	
}

/**
* set the object to face a given direction and to rotate to this direction at full speed
*/
function face(direction : Vector3) : void
{
	face(direction,1.0);
}

/**
* set the object to face a given direction and to rotate to this direction at full speed
*/
function face(direction : Vector3, mod : float) : void
{
	faceDirection = direction;
	rotateModifier = mod;
	
	//normalize the direction
	direction = direction.normalized;
}

/**
* Rotate the object ot face the last provided direction
*/
private function faceObject() : void
{
	//determine a middle direction between the current and the desired direction and face the object to that direction
	//interpolate for x,y,z
	var x = Mathf.Lerp(currentDirection.x,faceDirection.x,Time.fixedDeltaTime*rotateSpeed);
	var y = Mathf.Lerp(currentDirection.y,faceDirection.y,Time.fixedDeltaTime*rotateSpeed);
	var z = Mathf.Lerp(currentDirection.z,faceDirection.z,Time.fixedDeltaTime*rotateSpeed);
	
	currentDirection = new Vector3(x,y,z);

	var relativeDirection = currentDirection + transform.position;
	
	transform.LookAt(relativeDirection);
}