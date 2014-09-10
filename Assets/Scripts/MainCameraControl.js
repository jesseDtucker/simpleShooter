/*
This script will control the games main camera during shooting sequences
its behaviour is as follows:
	
	-The camera is too smoothly follow the player but not move unless
	they go beyond a certain distance from the cameras center (defined by a
	box of variable width and hieght)
	
	-it will sit at the height above the scene that it is assigned at the start
		Note: 	may later consider adding in some sort of zooming or panning controls
				to attempt to heighten the sense of action
	
	-it will always look down on the scene.
		Note:	as with above note may allow some rotation later for effect
*/

//the transform of the object the camera is to focus on
var target : Transform;

//the width and height of the box that defines where the object can move
//without the camera moving
var widthBounds = 1500;
var heightBounds= 1000;

//variables to define the movement dampening
var horizontalDampening = 1.50;
var verticalDampening= 1.00;
var rotationSpeed = 0.01;

function FixedUpdate()
{
	//ensure there is a target, if there isn't then do nothing
	if(!target)
		return;
		
	//get the cameras current position
	currentCameraPos = transform.position;
	
	//get the targets current position
	currentTargetPos = target.transform.position;
	
	if(checkIfInBounds(currentCameraPos , currentTargetPos))
		return;
		//then the target was within the bounds and so don't move the camera	
	
	//else, target was not in bounds, begin moving towards target
	moveSmoothly(currentTargetPos);
	
	rotateSmoothly(currentTargetPos);
}

/*
smoothly rotate the camera to look towards the target.
Note: doesn't adjust the y rotation!
*/
function rotateSmoothly(currentTargetPos : Vector3)
{
	//Note: for now only rotate in the x axis just to ensure proper orientation
	yDifference = transform.position.y - currentTargetPos.y;
	zDifference = transform.position.z - currentTargetPos.z;
	
	//the +90 is needed to keep the camera oriented downward
	var desiredAngle = Mathf.Atan(zDifference/yDifference)*360/(2*Mathf.PI);
	
	var deltaAngle = Mathf.LerpAngle(desiredAngle, transform.eulerAngles.x, Time.deltaTime*rotationSpeed) - transform.eulerAngles.x;
	
	transform.Rotate(deltaAngle,0,0);
	
}

/*
smoothly move the camera towards the target
*/
function moveSmoothly(target)
{
	//interpolate from the current position to the target, applying dampening
	transform.position.x = Mathf.Lerp(transform.position.x , target.x , horizontalDampening * Time.deltaTime);
	transform.position.z = Mathf.Lerp(transform.position.z , target.z , verticalDampening * Time.deltaTime);
}

/*
check whether or not the target is in the bounds of the camera
*/
function checkIfInBounds(currentCameraPos , currentTargetPos)
{
	//get the left, right, top and bottom bounds in world cords
	left   = currentCameraPos.x - widthBounds/2;
	right  = currentCameraPos.x + widthBounds/2;
	top    = currentCameraPos.z - heightBounds/2;
	bottom = currentCameraPos.z + heightBounds/2;
	
	//check if the object is within the above bounds
	//if it is within the bounds then the camera doesn't need to move
	//so do nothing and return
	
	//check left and right
	if(currentTargetPos.x > left && currentTargetPos.x < right)
	{
		//then the target is between the left and right bounds
		//next check the top and bottom bounds
		if(currentTargetPos.z > top && currentTargetPos.z < bottom)
		{
			//then the target is within the boundary box, so do not move
			return true;
		}
	}
	
	return false;
}