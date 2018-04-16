/**
 * MyClock
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyClock extends CGFobject
{
	constructor(scene)
	{
		super(scene);

		this.clockSlices = new MyCylinder(this.scene,12,1);

		this.front = new MyClockFront(this.scene,12);
		
		this.minutePointer = new MyClockHand(this.scene,20,1);

		this.hourPointer = new MyClockHand(this.scene,20,1);

		this.secondPointer = new MyClockHand(this.scene,20,1);

		this.clockTexture = new CGFappearance(this.scene);
		this.clockTexture.setDiffuse(0.8,0.8,0.8,1);
  		this.clockTexture.setSpecular(0.2,0.2,0.2,1);
  		this.clockTexture.setShininess(10);
		this.clockTexture.loadTexture("../resources/images/clock.png");

	    this.materialDefault = new CGFappearance(this.scene);
	    this.materialDefault.setAmbient(0,0,0,1);
		this.materialDefault.setDiffuse(0,0,0,1);

		this.minutePointer.setSize(0.7);
		//this.minutePointer.setAngle(180);

		this.hourPointer.setSize(0.5);
		//this.hourPointer.setAngle(90);
		
		this.secondPointer.setSize(0.80);
		//this.secondPointer.setAngle(270);
	}


	display() 
	{		
		this.scene.pushMatrix();
			this.materialDefault.apply();
			this.clockSlices.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.clockTexture.apply();	
			this.scene.translate(0,0,1);
			this.front.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();		
			this.materialDefault.apply();
			this.scene.translate(0,0,1);
			this.minutePointer.display();
		this.scene.popMatrix();

	this.scene.pushMatrix();			
			this.materialDefault.apply();
			this.scene.translate(0,0,1);
			this.hourPointer.display();
		this.scene.popMatrix();


		this.scene.pushMatrix();		
			this.materialDefault.apply();
			this.scene.translate(0,0,1);
			this.secondPointer.display();
			
		this.scene.popMatrix();
	};

	update(currTime)
	{
		this.secondPointer.setAngle(this.secondPointer.angle + (360/60.0)*(currTime/1000.0));
		this.minutePointer.setAngle(this.minutePointer.angle + (360/3600.0)*(currTime/1000.0));
		this.hourPointer.setAngle(this.hourPointer.angle + (360.0/(60*60*12))*(currTime/1000.0));
	}
};
