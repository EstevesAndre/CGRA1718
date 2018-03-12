/**
 * MyChair
 * @param gl {WebGLRenderingContext}
 * @constructor
 */


class MyChair extends CGFobject
{
  constructor(scene) 
	{
		super(scene);
		this.table=new MyUnitCubeQuad(this.scene);
	};  

	display()
	{		
		this.scene.pushMatrix();
		this.scene.translate(0.7,2.3/2,0.9);
		this.scene.scale(0.2,2.3,0.2);
		this.table.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-0.7,2.3/2,0.9);
		this.scene.scale(0.2,2.3,0.2);
		this.table.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0.7,2.3/2,-0.9);
		this.scene.scale(0.2,2.3,0.2);
		this.table.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-0.7,2.3/2,-0.9);
		this.scene.scale(0.2,2.3,0.2);
		this.table.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0,2 + 0.2*2,0);
		this.scene.scale(0.8*2,0.2,2);
		this.table.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0, 2.3 + 1 + 0.2,-0.9);
		this.scene.scale(0.8*2 ,2,0.2);
		this.table.display();
		this.scene.popMatrix();
	};
};


