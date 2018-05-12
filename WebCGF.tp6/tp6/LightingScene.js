var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

var FPS = 30;

var SPEED_CONSTANT = 0.01;
var SPEED_MAX = 0.5;
var SPEED_MAX_BACK = 0.2;

var WHEEL_DIRECTION_CONSTANT = Math.PI/50.0;
var WHEEL_DIRECTION_MAX = Math.PI/5.0;

var GROUND_SIZE_WIDTH = 50;
var GROUND_SIZE_WEIGHT = 50;

class LightingScene extends CGFscene 
{
	constructor()
	{
		super();
	};

	init(application) 
	{
		super.init(application);

		this.initCameras();

		this.initLights();

		this.Paint = "Flames";
		this.PaintControl = "";

		this.Sun = true;
		this.CarLights = true;
		this.axisDisplay = false;

		this.gl.clearColor(0.7, 0.7, 1.0, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);

		// Scene elements
		this.floor = new MyTerrain(this,20, 0,10,0,10);
		this.car = new MyOffRoadCar(this);
		
		// Materials
		this.materialDefault = new CGFappearance(this);
		this.materialDefault.setDiffuse(0.25,0.25,0.25,1);
		this.materialDefault.setAmbient(0.2,0.2,0.2,1);
		
		// Textures
		this.enableTextures(true);

		this.terrainAppearance = new CGFappearance(this);
		this.terrainAppearance.loadTexture("../resources/images/terrain.png");
		this.terrainAppearance.setAmbient(0.4,0.4,0.4,1);
		
		this.setUpdatePeriod(1000/FPS);
	};

	initCameras() 
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights() 
	{
		this.setGlobalAmbientLight(1,1,1, 1.0);
		
		this.lights[0].setPosition(0, 50, 0, 1);
		this.lights[0].setVisible(true);
		
		this.lights[0].setAmbient(1.0, 1.0, 1.0, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].enable();

		this.lights[1].setPosition(-2, 1, 0, 1);
		this.lights[1].setVisible(true);
		
		this.lights[1].setAmbient(1.0, 1.0, 0.0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 0.0, 1.0);
		this.lights[1].enable();
	};

	updateLights() 
	{
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();
	};


	display() 
	{
		// ---- BEGIN Background, camera and axis setup

		// Clear image and depth buffer everytime we update the scene
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// Initialize Model-View matrix as identity (no transformation)
		this.updateProjectionMatrix();
		this.loadIdentity();

		// Apply transformations corresponding to the camera position relative to the origin
		this.applyViewMatrix();

		// Update all lights used
		this.evalLights();
		this.updateLights();

		// Draw axis
		if(this.axisDisplay)
			this.axis.display();


		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section
		
		// Floor
		this.pushMatrix();		
			this.terrainAppearance.apply();
			this.rotate(-90 * degToRad, 1, 0, 0);
			this.scale(GROUND_SIZE_WIDTH, GROUND_SIZE_WEIGHT, 0);
			this.floor.display();
		this.popMatrix();
			
		this.pushMatrix();
			if(this.Paint != this.PaintControl)
			{
				this.car.setPaint(this.Paint);
				this.PaintControl = this.Paint;
			}
			this.car.updatePos();
			this.translate(this.car.xPos,0,this.car.zPos);
			this.rotate(this.car.directionCar - Math.PI,0,1,0);			
			this.lights[1].setPosition(-2 + this.car.xPos, 1, this.car.zPos, 1);					
			this.car.display();
		this.popMatrix();
		
		// ---- END Scene drawing section	
	};

	update(currTime)
	{
		this.lastTime = this.lastTime || 0;

		this.deltaTime = currTime - this.lastTime;

		this.lastTime = currTime;
		
		if(this.deltaTime <= 1000)
		{
			this.car.update(this.deltaTime);		
		}		

		this.checkKeys();		
	};

	toggleAxis()
	{
		this.axisDisplay = !this.axisDisplay;
	};

	evalLights()
	{
		if(this.Sun)
		{
			this.lights[0].enable();
		}
		else
		{
			this.lights[0].disable();
		}

		if(this.CarLights)
		{
			this.lights[1].enable();
		}
		else
		{
			this.lights[1].disable();
		}
	};

	checkKeys ()
	{
		var text="Keys pressed: ";
		var keysPressed=false;
		
		if (this.gui.isKeyPressed("KeyW"))
		{
			text+=" W ";
			this.car.setSpeed(SPEED_CONSTANT);
			keysPressed=true;
		}

		if (this.gui.isKeyPressed("KeyS"))
		{
			text+=" S ";
			this.car.setSpeed(-SPEED_CONSTANT);
			keysPressed=true;
		}

		if (this.gui.isKeyPressed("KeyD"))
		{
			text+=" D ";
			this.car.setWheelDirection(-WHEEL_DIRECTION_CONSTANT);
			keysPressed=true;
		}

		if (this.gui.isKeyPressed("KeyA"))
		{
			text+=" A ";
			this.car.setWheelDirection(WHEEL_DIRECTION_CONSTANT);
			keysPressed=true;
		}

		if (keysPressed)
			console.log(text);
	};
};


