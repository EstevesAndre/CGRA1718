/**
 * MyCarChassi
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCarChassi extends CGFobject
{
	constructor(scene)
	{
		super(scene);

///		this.bar = new MyCylinder(this.scene,12,1);

	}


	display() 
	{		
		this.scene.pushMatrix();
		//	this.bar.display();
		this.scene.popMatrix();

	};


};
