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

		this.model = new MyCarModel(this.scene,"flames.jpg");

		this.chassiAppearance = new CGFappearance(this.scene);
		this.chassiAppearance.loadTexture("../resources/images/chassi.jpg");
		this.chassiAppearance.setAmbient(0.25,0.25,0.25,1);
		this.chassiAppearance.setDiffuse(0.1,0.1,0.1,1);
	};

	display() 
	{				
		this.scene.pushMatrix();
			this.scene.translate(-5,1.8,-4.6);
			this.scene.scale(2,2,2.5);
			this.scene.rotate(this.wheel.angle,0,0,1);	
			this.wheel.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();			
			this.scene.translate(5,1.8,-4.6);			
			this.scene.scale(2,2,2.5);
			this.scene.rotate(this.wheel.angle,0,0,1);	
			this.wheel.display();
		this.scene.popMatrix();	
			
		this.scene.pushMatrix();	
			this.scene.translate(5,1.8,4.7);
			this.scene.scale(2,2,2.5);
			this.scene.rotate(Math.PI,1,0,0);			
			this.scene.rotate(-this.wheel.angle,0,0,1);	
			this.wheel.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();			
			this.scene.translate(-5,1.8,4.7);
			this.scene.scale(2,2,2.5);
			this.scene.rotate(Math.PI,1,0,0);	
			this.scene.rotate(-this.wheel.angle,0,0,1);	
			this.wheel.display();
		this.scene.popMatrix();

		this.chassiAppearance.apply();
		this.scene.pushMatrix();
			this.scene.translate(0,2.3,0);
			this.scene.scale(1,1,1.3);
			this.chassi.display();
			this.scene.scale(1,1,-1);
			this.chassi.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
			this.scene.translate(0,2.3,0);			
			this.scene.scale(1,1,1.3);
			this.model.display();
			this.scene.scale(1,1,-1);
			this.model.display();
		this.scene.popMatrix();
		
	};

	update(currTime)
	{
		this.wheel.update(currTime);
	}
};
