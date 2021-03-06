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
		this.table = new MyTable(this);
		this.wall = new MyQuad(this,-0.5,1.5,-0.5,1.5);
		this.wallRight = new Plane(this);
		this.floor = new MyQuad(this,0,10,0,12);
		this.chair = new MyChair(this);
		this.cylinder = new MyCylinder(this, 15, 20);
		this.coverCircularObject = new MyObjectsFront(this,15);
		this.lamp = new MyLamp(this,15,20);
		this.boardA = new Plane(this, BOARD_A_DIVISIONS, 0, 0.96, 0.1, 0.76);
		this.boardB = new Plane(this, BOARD_B_DIVISIONS);
		this.clock = new MyClock(this);

		this.plane = new MyPaperPlane(this);
		this.plane.setPosition(14.5, 3.88, 9);
		this.plane.setFlight(true);

		// Materials
		this.materialDefault = new CGFappearance(this);
		this.materialDefault.setDiffuse(0,0,0.25,1);
		this.materialDefault.setAmbient(0,0,0,1);
		
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

		// Textures
		this.enableTextures(true);

		this.wallWindow = new CGFappearance(this);
		this.wallWindow.loadTexture("../resources/images/window.png");
		this.wallWindow.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');
		this.wallWindow.setAmbient(1,1,1,1);
		this.wallWindow.setDiffuse(0.5,0.5,0.5,1);
		this.wallWindow.setSpecular(0.1,0.1,0.1,1);	
		this.wallWindow.setShininess(5);

		this.cylinderText = new CGFappearance(this);
		this.cylinderText.loadTexture("../resources/images/cylinder.png");
		this.cylinderText.setAmbient(0.3,0.3,0.3,1);
		this.cylinderText.setDiffuse(0.5,0.5,0.5,1);
		this.cylinderText.setSpecular(0.1,0.1,0.1,1);	
		this.cylinderText.setShininess(5);

		this.cylinderText2 = new CGFappearance(this);
		this.cylinderText2.loadTexture("../resources/images/cylinder2.jpg");
		this.cylinderText2.setAmbient(0.3,0.3,0.3,1);
		this.cylinderText2.setDiffuse(0.5,0.5,0.5,1);
		this.cylinderText2.setSpecular(0.1,0.1,0.1,1);	
		this.cylinderText2.setShininess(5);
		
		this.lampText = new CGFappearance(this);
		this.lampText.loadTexture("../resources/images/lamptext.jpg");
		this.lampText.setAmbient(0.3,0.3,0.3,1);
		this.lampText.setDiffuse(0.5,0.5,0.5,1);
		this.lampText.setSpecular(0.1,0.1,0.1,1);	
		this.lampText.setShininess(5);
		
		this.slidesAppearance = new CGFappearance(this);
		this.slidesAppearance.loadTexture("../resources/images/slides.png");
		this.slidesAppearance.setAmbient(0.3,0.3,0.3,1);
		this.slidesAppearance.setDiffuse(0.85,0.85,0.85,1);
		this.slidesAppearance.setSpecular(0.1,0.1,0.1,1);	
		this.slidesAppearance.setShininess(5);

		this.boardAppearance = new CGFappearance(this);
		this.boardAppearance.loadTexture("../resources/images/board.png");
		this.boardAppearance.setAmbient(0.6,0.6,0.6,1);
		this.boardAppearance.setDiffuse(0.2,0.2,0.2,1);
		this.boardAppearance.setSpecular(0.5,0.5,0.5,1);	
		this.boardAppearance.setShininess(75);
	
		this.floorAppearance = new CGFappearance(this);		
		this.floorAppearance.loadTexture("../resources/images/floor.png");
		this.floorAppearance.setTextureWrap("REPEAT", "REPEAT");

		this.planeColor = new CGFappearance(this);
		this.planeColor.loadTexture("../resources/images/plane.jpg");
		this.planeColor.setAmbient(0.3,0.3,0.3,1);
		this.planeColor.setDiffuse(0.85,0.85,0.85,1);
		this.planeColor.setSpecular(0.5,0.5,0.5,1);	
		this.planeColor.setShininess(5);

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
		
		this.lights[1].setPosition(6,7.5,6,1);
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

		this.materialDefault.apply();

		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section

		// cylinder
		this.pushMatrix();
			this.translate(5, 3.8, 8);
			this.scale(0.5, 1.5, 0.5); 
			this.rotate(-Math.PI / 2, 1, 0, 0); 
			this.cylinderText.apply();
			this.cylinder.display();
			this.translate(0,0,1);
			this.coverCircularObject.display();
			this.cylinderText2.apply();
			this.translate(14,0,-1);
			this.cylinder.display();						
			this.translate(0,0,1);
			this.coverCircularObject.display();	
		this.popMatrix();
		
		// lamp
		this.pushMatrix();
			this.translate(6,8,6);
			this.rotate(-3*Math.PI/2,1,0,0);
			this.lampText.apply();
			this.lamp.display();
			this.rotate(Math.PI,1,0,0);
			this.coverCircularObject.display();
		this.popMatrix();
		
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
			this.materialDefault.apply();
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
			this.translate(5,0,9.5);
			this.rotate(Math.PI,0,1,0);			
			this.scale(1.2,1,1);
			this.chair.display();
		this.popMatrix();

		// Second Chair
		this.pushMatrix();
			this.translate(12,0,9.5);
			this.rotate(Math.PI,0,1,0);
			this.scale(1.2,1,1);
			this.chair.display();
		this.popMatrix();
	
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
		
		// Clock
		this.pushMatrix();
			this.materialDefault.apply();
			this.translate(7.25,7.25,0.2);
			this.scale(0.6,0.6,0.1);
			this.clock.display();
		this.popMatrix();
		
		// Plane
		this.pushMatrix();		
			this.planeColor.apply();
			this.translate(this.plane.x,this.plane.y,this.plane.z);
			this.scale(1,1.5,1.5);
			this.rotate(this.plane.angle,this.plane.xRot,this.plane.yRot,this.plane.zRot);
			this.angle = 1/Math.tan((5-3.88)/14.5);
			this.plane.display();
		this.popMatrix();

		// ---- END Scene drawing section
	};

	update(currTime)
	{
		this.lastTime = this.lastTime || 0;

		this.deltaTime = currTime - this.lastTime;

		this.lastTime = currTime;

		this.clock.update(this.deltaTime);

		if(this.deltaTime <= 1000)
			this.plane.update(this.deltaTime);
	}
};
