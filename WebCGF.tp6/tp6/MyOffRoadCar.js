/**
 * MyOffRoadCar
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyOffRoadCar extends CGFobject
{

	constructor(scene)
	{
		super(scene);

		this.wheel = new MyWheel(this.scene,12,1);
		
		this.chassi = new MyCarChassi(this.scene,0);	

		this.model = new MyCarModel(this.scene);//"camouflageTex.jpg",
											   //"camouflageTex.jpg",
											   //"camouflageTex.jpg");

		this.handWheel = new MyHandWheel(this.scene);

		this.seat = new MySeat(this.scene);

		this.crate = new MyUnitCubeQuad(this.scene);

		this.chassiAppearance = new CGFappearance(this.scene);
		this.chassiAppearance.loadTexture("../resources/images/chassi.jpg");
		this.chassiAppearance.setAmbient(0.25,0.25,0.25,1);
		this.chassiAppearance.setDiffuse(0,0,0,1);

		this.crateTex = new CGFappearance(this.scene);
		this.crateTex.loadTexture("../resources/images/crate.jpg");


	};

	display() 
	{					
		this.scene.pushMatrix();
			this.scene.translate(-1.5,0.51,-1.1);			
			this.scene.scale(0.45,0.45,0.45);
			this.scene.rotate(this.wheel.angle,0,0,1);	
			this.wheel.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();			
			this.scene.translate(1.4,0.51,-1.1);			
			this.scene.scale(0.45,0.45,0.45);
			this.scene.rotate(this.wheel.angle,0,0,1);	
			this.wheel.display();
		this.scene.popMatrix();	
			
		this.scene.pushMatrix();	
			this.scene.translate(1.4,0.51,1.1);			
			this.scene.scale(0.45,0.45,0.45);
			this.scene.rotate(Math.PI,1,0,0);			
			this.scene.rotate(-this.wheel.angle,0,0,1);	
			this.wheel.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();			
			this.scene.translate(-1.5,0.51,1.1);			
			this.scene.scale(0.45,0.45,0.45);
			this.scene.rotate(Math.PI,1,0,0);	
			this.scene.rotate(-this.wheel.angle,0,0,1);	
			this.wheel.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();				
			this.scene.scale(0.20,0.25,0.25);
			this.scene.translate(1.4,3,0.1);
			this.seat.display();
			this.scene.translate(0,0,-2.2);
			this.seat.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();		
			this.scene.translate(-0.25,1.35,0.3);
			this.scene.scale(0.25,0.25,0.25);	
			this.scene.rotate(Math.PI/6,0,0,1);
			this.scene.rotate(Math.PI/2,0,1,0);
			this.handWheel.display();
		this.scene.popMatrix();
		
		this.chassiAppearance.apply();
		
		this.scene.pushMatrix();
			this.scene.translate(0,0.45,0);
			this.scene.scale(0.25,0.28,0.3);
			this.chassi.display();
			this.scene.scale(1,1,-1);
			this.chassi.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
			this.scene.translate(0,0.45,0);			
			this.scene.scale(0.25,0.28,0.3);
			this.model.display();
			this.scene.scale(1,1,-1);
			this.model.display();
		this.scene.popMatrix();
		
		this.crateTex.apply();

		this.scene.pushMatrix();
			this.scene.translate(1.55,1.19,0);	
			this.scene.scale(0.7,0.7,0.7);	
			this.scene.rotate(-Math.PI/45.0,0,0,1);
			this.crate.display();
		this.scene.popMatrix();
		
		
	};

	update(currTime)
	{
		this.wheel.update(currTime);
		this.handWheel.setAngle(this.handWheel.angle + currTime/1000);
	};
	
	setPaint(Paint)
	{
		if(Paint == 'Flames')
		{
			this.model = new MyCarModel(this.scene);
		}
		else
		{
			this.model = new MyCarModel(this.scene, "camouflageTex.jpg", "camouflageTex.jpg");
		}
	};
};
