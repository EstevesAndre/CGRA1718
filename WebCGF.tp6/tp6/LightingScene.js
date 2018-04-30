var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

var FPS = 30;

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

		this.gl.clearColor(0.7, 0.7, 1.0, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);

		// Scene elements
		this.floor = new MyTerrain(this,20, 0,10,0,10);
		this.car = new MyOffRoadCar(this);
		
		//test
		this.trapezium = new MyTrapezium(this,5,0,0.1,2,0);
		this.cyl = new MyHandWheel(this);
		this.chassi = new MyCarChassi(this,1);
		this.model = new MyCarModel(this,"flames.jpg");



		// Materials
		

		// Textures
		this.enableTextures(true);

		this.materialDefault = new CGFappearance(this);
		this.materialDefault.loadTexture("../resources/images/lamptext.jpg");
		//this.materialDefault.setDiffuse(0,0,0.25,1);
		this.materialDefault.setAmbient(0.2,0.2,0.2,1);
		
		this.flame = new CGFappearance(this);
		this.flame.loadTexture("../resources/images/flames.jpg");
		//this.materialDefault.setDiffuse(0,0,0.25,1);
		this.flame.setAmbient(0.2,0.2,0.2,1);

		this.terrainAppearance = new CGFappearance(this);
		this.terrainAppearance.loadTexture("../resources/images/terrain.png");
	
		
		this.setUpdatePeriod(1000/FPS);
	};

	initCameras() 
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights() 
	{
		this.setGlobalAmbientLight(1,1,1, 1.0);
		
		this.lights[0].setPosition(0, 4, 7.5, 1);
		this.lights[0].setVisible(true); 
		
		this.lights[1].setPosition(3,4.5,2,1);
		this.lights[1].setVisible(true); 

		this.lights[2].setPosition(2,0,2,1);
		this.lights[2].setVisible(true); 		
		
		this.lights[0].setAmbient(0.5, 0.5, 0.5, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].enable();

		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[1].enable();

		this.lights[2].setAmbient(0.5,0.5,0.5,1);
		this.lights[2].setDiffuse(1,1,1,1);
		this.lights[2].enable();
	};

	updateLights() 
	{
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();
	}


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
		this.updateLights();

		// Draw axis
		this.axis.display();


		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section

		// Floor
		this.pushMatrix();		
			this.terrainAppearance.apply();
			this.rotate(-90 * degToRad, 1, 0, 0);
			this.scale(50, 50, 0);
			this.floor.display();
		this.popMatrix();

		
	/*	this.pushMatrix();
			this.flame.apply();
			this.translate(3,3,2.45);
			this.rotate(Math.PI,0,0,1);
			this.rotate(-Math.PI/2.0,1,0,0);
			this.trapezium.display();
		this.popMatrix();
*/

		this.pushMatrix();
			//this.scale(1.5,1.5,1.5);
		//	this.translate(8,2,5);
//			this.chassi.display();
//			this.scale(1,1,-1);
//			this.chassi.display();
		this.popMatrix();
		
		this.pushMatrix();
			this.translate(8,0,5);
			if(this.Paint != this.PaintControl)
			{
				this.car.setPaint(this.Paint);
				this.PaintControl = this.Paint;
			}
			this.car.display();
		this.popMatrix();

		this.pushMatrix();
			//this.translate(8,0,5);
			//this.model.display();
		this.popMatrix();
		// ---- END Scene drawing section
	};

	update(currTime)
	{
		this.lastTime = this.lastTime || 0;

		this.deltaTime = currTime - this.lastTime;

		this.lastTime = currTime;

		if(this.deltaTime <= 1000)
			this.car.update(this.deltaTime);
	};

};


