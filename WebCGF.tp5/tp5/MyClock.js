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
		
		this.clockTexture = new CGFappearance(this.scene);
		this.clockTexture.setDiffuse(0.8,0.8,0.8,1);
  		this.clockTexture.setSpecular(0.2,0.2,0.2,1);
  		this.clockTexture.setShininess(10);
		this.clockTexture.loadTexture("../resources/images/clock.png");

	    this.materialDefault = new CGFappearance(this.scene);
		this.materialDefault.setDiffuse(1,1,1,1);

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

	};
};
