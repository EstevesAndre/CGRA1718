/**
 * myFloor
 * @param gl {WebGLRenderingContext}
 * @constructor
 */


class myFloor extends CGFobject
{
  constructor(scene) 
	{
		super(scene);
		this.floor=new MyUnitCubeQuad(this.scene);
		this.floor.initBuffers();
	};  

	display()
	{
		this.scene.pushMatrix();
		this.scene.translate(0,0.1/2,0);
		this.scene.scale(8,0.1,6);
		this.floor.display();
		this.scene.popMatrix();
	};
};


