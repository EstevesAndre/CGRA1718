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

		this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);

		// Scene elements
		this.floor = new MyQuad(this,0,10,0,12);
		this.trapezium = new MyTrapezium(this,6.5,0,0.3,3.5,0);
		this.wheel = new MyWheel(this,12,1);
		// Materials
		

		// Textures
		this.enableTextures(true);

		this.materialDefault = new CGFappearance(this);
		this.materialDefault.loadTexture("../resources/images/lamptext.jpg");
		this.materialDefault.setDiffuse(0,0,0.25,1);
		this.materialDefault.setAmbient(0.2,0.2,0.2,1);
		
		this.floorAppearance = new CGFappearance(this);		
		this.floorAppearance.loadTexture("../resources/images/floor.png");
		this.floorAppearance.setTextureWrap("REPEAT", "REPEAT");

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
		
		this.lights[0].setAmbient(0.5, 0.5, 0.5, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].enable();

		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 0.4, 1.0);
		this.lights[1].enable();
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
			this.floorAppearance.apply();
			this.translate(7.5, 0, 7.5);
			this.rotate(-90 * degToRad, 1, 0, 0);
			this.scale(15, 15, 0.2);
			this.floor.display();
		this.popMatrix();

		this.pushMatrix();
			this.translate(2,1,2);
			this.wheel.display();
			this.translate(6,0,0);
			this.wheel.display();
			this.translate(0,0,5);
			this.rotate(Math.PI,1,0,0);
			this.wheel.display();
			this.translate(-6,0,0);
			this.wheel.display();
		this.popMatrix();
		
		this.pushMatrix();
			this.materialDefault.apply();
			this.translate(8.3,1.25,6.23);
			this.rotate(Math.PI,0,1,0);
			this.trapezium.display();
		this.popMatrix();

		
		// ---- END Scene drawing section
	};

	update(currTime)
	{
		this.lastTime = this.lastTime || 0;

		this.deltaTime = currTime - this.lastTime;

		this.lastTime = currTime;
	};
};
