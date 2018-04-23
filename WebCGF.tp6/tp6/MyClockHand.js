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
		this.backPointer = new MyCylinder(this.scene,slices,stacks);

		this.angle = 0;
		this.angle2 = this.angle + 180;
		this.thickness = 0.01;
		this.size = 1;
		this.sizeBack = 0.15;

	}

	setAngle(angle)
	{
		this.angle = angle;	
		this.angle2 = angle + 180;
	};

	setThickness(thick)
	{
		this.thickness = thick;	
	};

	setSize(size, sizeBack)
	{
		this.size = size;
		sizeBack = typeof sizeBack !== 'undefined' ? sizeBack : 0.15;
					
		this.sizeBack = sizeBack;
	};

	display() 
	{
		this.scene.pushMatrix();
			this.scene.rotate( -(Math.PI / 2), 1,0,0);
			this.scene.rotate( (Math.PI / 180.0) * this.angle, 0,1,0);
			this.scene.scale(this.thickness,this.thickness,this.size);
			this.pointer.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.rotate( -(Math.PI / 2), 1,0,0);
			this.scene.rotate( (Math.PI / 180.0) * this.angle2, 0,1,0);
			this.scene.scale(this.thickness,this.thickness,this.sizeBack);
			this.backPointer.display();
		this.scene.popMatrix();
	};
};
