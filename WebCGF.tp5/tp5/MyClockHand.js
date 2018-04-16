/**
 * MyClockHand
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyClockHand extends CGFobject
{
	constructor(scene, slices, stacks)
	{
		super(scene);

		this.pointer = new MyCylinder(this.scene,slices,stacks);

		this.angle = 0;

		this.size = 1;

	}

	setAngle(angle)
	{
		this.angle = angle;		
	};

	setSize(size)
	{
		this.size = size;		
	};

	display() 
	{
		this.scene.pushMatrix();
			this.scene.rotate( -(Math.PI / 2), 1,0,0);
			this.scene.rotate( (Math.PI / 180.0) * this.angle, 0,1,0);
			this.scene.scale(0.01,0.01,this.size);
			this.pointer.display();
		this.scene.popMatrix();
	};
};
