/**
 * myTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */


class myTable extends CGFobject
{
  constructor(scene) 
	{
		super(scene);
		this.table=new MyUnitCubeQuad(this.scene);
	};  

	display()
	{	
		this.scene.pushMatrix();
		this.scene.translate(2.5 - 0.3/2.0,3.5/2.0,1.5 - 0.3/2.0);
		this.scene.scale(0.3,3.5,0.3);
		this.table.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-2.5 + 0.3/2.0,3.5/2.0,-1.5 + 0.3/2.0);
		this.scene.scale(0.3,3.5,0.3);
		this.table.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(2.5 - 0.3/2.0,3.5/2.0,-1.5 + 0.3/2.0);
		this.scene.scale(0.3,3.5,0.3);
		this.table.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-2.5 + 0.3/2.0,3.5/2.0,1.5 - 0.3/2.0);
		this.scene.scale(0.3,3.5,0.3);
		this.table.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0,3.5 + 0.3/2.0,0);
		this.scene.scale(5,0.3,3);
		this.table.display();
		this.scene.popMatrix();
	};
};


