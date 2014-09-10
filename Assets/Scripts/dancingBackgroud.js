/*
This script will accept a GameObject as a varaible and then populate a grid around the object it
is attached to with these objects. The grid size is specified at runtime. The objects will rotate,
change colour and move in response to the players input, and enemy positions

Current plan:
	rotating player cause shifting of objects, they will be in 2 sets that move in different directions
	moving player cause rotation of the objects.
	The objects near the player will shift to one colour while objects near the enemy will shift to another colour
	
Properties:
	Colour
	rotation
	position
	grid size (width x height)
	grid center (transform) //this will likely be the player
	
The dancingBackgroud script will instantate the objects when the game starts and attach a seperate behaviour controlling script to them
The purpose of this one is to set them up.
*/

var width = 0;		//the width of the area the objects will span
var height = 0;		//the height of the area the objects will span
var numObjectsWide = 0;		//the number of objects that will be placed across the width
var numObjectsHigh = 0;		//the number of objects that will be placed across the height
var center : GameObject;		//the object to be centered on, should also be the cameras focus
var depth = 0;				//the depth at which the backround objects should be created
var tolerance = 1.1;			//a tolerance value for when to shift objects 1 = no tolerance. >1 = larger tolerance

var object : GameObject;	//The object that is to populate the background (should be a pre-fab)

//the extreme values of the area
private var right = 0;
private var left = 0;
private var top = 0;
private var bottom = 0;

/*
Will create the background objects when this object is created
*/
function Start()
{
	//the width and height between each object
	var deltaWidth = width/numObjectsWide;
	var deltaHeight= height/numObjectsHigh;
	
	//starting in the top left corner create the prefab objects and attach them to this gameObject
	for(var i = -numObjectsWide/2 ; i <= numObjectsWide/2 ; i++)
	{
		for(var j = -numObjectsHigh/2 ; j <= numObjectsHigh/2 ; j++)
		{
			//get the next position that an object should be created at and create it there
			createObject(new Vector3(deltaWidth*i,depth,deltaHeight*j));
		}
	}
}

/*
update this object by creating objects as the character moves and deleting old objects
*/
function Update()
{
	//iterate through all elements in objectArray
	//for those that are found to be out of the range move them to the opposite side
	
	//set the extreme bounds
	setBounds();
	
	for (var child : Transform in transform)
	{
		//test the object to see if it is in the horizontal or vertical range
		if(isOutOfHorizontal(child))
		{
			//then move it such that it is on the opposite end of the range
			shiftHorizontally(child);
		}
		if(isOutOfVertical(child))
		{
			//then move it so that it is on the opposite end of this range
			shiftVertically(child);
		}
		
	}
	
}

/*
Set the boundaries to match the new center position
*/
private function setBounds()
{
	var pos = center.transform.position;
	
	left = pos.x - width/2;
	right = pos.x + width/2;
	top = pos.z + height/2;
	bottom = pos.z - height/2;
}

/*
Shift the object horizontally to keep it in range
*/
private function shiftHorizontally(obj : Transform)
{
	var offset = width/numObjectsWide;
	//check if it is currently to the left or the right
	if(obj.position.x <= left)
	{
		obj.position.x += width;
	}
	else if(obj.position.x >= right)
	{
		//then it is to the right
		obj.position.x -= width;
	}
	else
	{
		//then the above code has an error, or a bad shift was choosen
		Debug.Log("shift Horizontal error!");
	}
}

/*
shift the object vertically to keep it in range
*/
private function shiftVertically(obj : Transform)
{
	var offset = height/numObjectsHigh;
	//check if it is currently to the left or the right
	if(obj.position.z >= top)
	{
		//then its too the left, so shift it to the right
		obj.position.z -= height;
	}
	else if(obj.position.z <= bottom)
	{
		//then it is to the right
		obj.position.z += height;
	}
	else
	{
		//then the above code has an error, or a bad shift was choosen
		Debug.Log("shift vertical error!");
	}
}

/*
tests whether or not the provided object is in the horizontal range
*/
private function isOutOfHorizontal(obj : Transform)
{
	//test left
	if(center.transform.position.x - width/2*tolerance > obj.position.x)
		return true;
	
	//test right
	if(center.transform.position.x + width/2*tolerance < obj.position.x)
		return true;
}

/*
tests whether or not the proved object is in the vertical range
*/
private function isOutOfVertical(obj : Transform)
{
	//test bottom
	if(center.transform.position.z - height/2*tolerance > obj.position.z)
		return true;
	
	//test top
	if(center.transform.position.z + height/2*tolerance < obj.position.z)
		return true;
}

/*
this will create an object at the designated point
*/
private function createObject(nextPoint : Vector3)
{
	//create the object then parent it to this object
	var obj = Instantiate(object,nextPoint,transform.rotation);
	obj.transform.parent = transform;
	
	//test and set the extreme values
	//test left
	if(nextPoint.x < left)
		left = nextPoint.x;
	//test right
	if(nextPoint.x > right)
		right = nextPoint.x;		
	//test top
	if(nextPoint.y > top)
		top = nextPoint.z;
	//test bottom
	if(nextPoint.y < bottom)
		bottom = nextPoint.z;
}