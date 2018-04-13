var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

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
		this.table = new MyTable(this);
		this.wall = new MyQuad(this,-0.5,1.5,-0.5,1.5);
		this.wallRight = new Plane(this);
		this.floor = new MyQuad(this,0,10,0,12);
		this.chair = new MyChair(this);
		this.couch = new MyCouch(this);
		this.prism = new MyPrism(this, 8, 20);
		this.cylinder = new MyCylinder(this, 8, 1,0,5,0,5);
		this.lamp = new MyLamp(this,8,20);
		this.boardA = new Plane(this, BOARD_A_DIVISIONS, 0, 0.96, 0.1, 0.76);
		this.boardB = new Plane(this, BOARD_B_DIVISIONS);

		// Materials
		this.materialDefault = new CGFappearance(this);
		
		this.materialA = new CGFappearance(this);
		this.materialA.setAmbient(0.3,0.3,0.3,1);
		this.materialA.setDiffuse(0.6,0.6,0.6,1);
		this.materialA.setSpecular(0,0.2,0.8,1);
		this.materialA.setShininess(120);

		this.materialB = new CGFappearance(this);
		this.materialB.setAmbient(0.3,0.3,0.3,1);
		this.materialB.setDiffuse(0.6,0.6,0.6,1);
		this.materialB.setSpecular(0.8,0.8,0.8,1);	
		this.materialB.setShininess(120);

		this.wallM = new CGFappearance(this);
		this.wallM.setAmbient(0.3,0.3,0.3,1);
		this.wallM.setDiffuse(0.5,0.5,0.5,1);
		this.wallM.setSpecular(0.1,0.1,0.1,1);	
		this.wallM.setShininess(5);

		this.wallWindow = new CGFappearance(this);
		this.wallWindow.loadTexture("../resources/images/window.png");
		this.wallWindow.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');
		this.wallWindow.setAmbient(0.3,0.3,0.3,1);
		this.wallWindow.setDiffuse(0.5,0.5,0.5,1);
		this.wallWindow.setSpecular(0.1,0.1,0.1,1);	
		this.wallWindow.setShininess(5);

		this.cylinderTest = new CGFappearance(this);
		this.cylinderTest.loadTexture("../resources/images/floor.png");
		this.cylinderTest.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');
		this.wallWindow.setAmbient(0.3,0.3,0.3,1);
		this.wallWindow.setDiffuse(0.5,0.5,0.5,1);
		this.wallWindow.setSpecular(0.1,0.1,0.1,1);	
		this.wallWindow.setShininess(5);

		this.floorM = new CGFappearance(this);
		this.floorM.setAmbient(0.3,0.3,0.3,1);
		this.floorM.setDiffuse(0.78,0.39,0.25,1);
		this.floorM.setSpecular(0.75,0.75,0.75,1);	
		this.floorM.setShininess(75);

		this.slidesAppearance = new CGFappearance(this);
		this.slidesAppearance.loadTexture("../resources/images/slides.png");
		this.slidesAppearance.setAmbient(0.3,0.3,0.3,1);
		this.slidesAppearance.setDiffuse(0.85,0.85,0.85,1);
		this.slidesAppearance.setSpecular(0.1,0.1,0.1,1);	
		this.slidesAppearance.setShininess(5);

		this.boardAppearance = new CGFappearance(this);
		this.boardAppearance.loadTexture("../resources/images/board.png");
		this.boardAppearance.setAmbient(0.3,0.3,0.3,1);
		this.boardAppearance.setDiffuse(0.25,0.25,0.25,1);
		this.boardAppearance.setSpecular(0.5,0.5,0.5,1);	
		this.boardAppearance.setShininess(75);
		
		// Textures
		this.enableTextures(true);
	
		this.floorAppearance = new CGFappearance(this);		
		this.floorAppearance.loadTexture("../resources/images/floor.png");
		this.floorAppearance.setTextureWrap("REPEAT", "REPEAT");

	};

	initCameras() 
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights() 
	{
		this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);
		
		// Positions for four lights
		this.lights[0].setPosition(0, 4, 7.5, 1);
		this.lights[0].setVisible(true); 
		
		this.lights[1].setPosition(6,7,6,1);
		this.lights[1].setVisible(true); 
		
		this.lights[0].setAmbient(0, 0, 0, 1);
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

		this.materialDefault.apply();

		
		this.pushMatrix();
			this.translate(5, 3.8, 8);
			this.scale(0.5, 1.5, 0.5); 
			this.rotate(-Math.PI / 2, 1, 0, 0); 
			this.cylinderTest.apply();
			this.cylinder.display();
		this.popMatrix();
		
		this.pushMatrix();
			this.translate(12, 3.8, 8);
			this.scale(0.5, 1.5, 0.5);
			this.rotate(-Math.PI / 2, 1, 0, 0);
			this.prism.display();
		this.popMatrix();
		
		this.pushMatrix();
			this.translate(6,8,6);
			this.rotate(-3*Math.PI/2,1,0,0);
			this.floorM.apply();
			this.lamp.display();
		this.popMatrix();
		

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

		// Left Wall
		this.pushMatrix();
			this.translate(0, 4, 7.5);
			this.rotate(90 * degToRad, 0, 1, 0);
			this.scale(15, 8, 0.2);
			this.wallWindow.apply();
			this.wall.display();
		this.popMatrix();

		// Plane Wall
		this.pushMatrix();
			this.wallM.apply();
			this.translate(7.5, 4, 0);
			this.scale(15, 8, 0.2);			
			this.wallRight.display();
		this.popMatrix();

		// First Table
		this.pushMatrix();
			this.translate(5, 0, 8);
			this.table.display();
		this.popMatrix();

		// Second Table
		this.pushMatrix();
			this.translate(12, 0, 8);
			this.table.display();
		this.popMatrix();

		// First Chair
		this.pushMatrix();
			this.translate(5,0,6);
			this.chair.display();
		this.popMatrix();

		// Second Chair
		this.pushMatrix();
			this.translate(12,0,6);
			this.chair.display();
		this.popMatrix();
		

		// Couch
		/*this.pushMatrix();
			this.translate(8.5,0,13.5);
			this.rotate(Math.PI , 0,1,0);
			this.couch.display();
		this.popMatrix();*/



		// Board A
		this.pushMatrix();
			this.translate(4, 4.5, 0.2);
			this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
			
			this.slidesAppearance.apply();
			this.boardA.display();
		this.popMatrix();

		// Board B
		this.pushMatrix();
			this.translate(10.5, 4.5, 0.2);
			this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
			
			this.boardAppearance.apply();
			this.boardB.display();
		this.popMatrix();
		
		// ---- END Scene drawing section
	};
};
