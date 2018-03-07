/**
 * MyCouch
 * @param gl {WebGLRenderingContext}
 * @constructor
 */


class MyCouch extends CGFobject
{
  constructor(scene) 
	{
		super(scene);
		this.sofa=new MyUnitCubeQuad(this.scene);
	};  

	display()
	{	
		//sides
		this.scene.pushMatrix();
		this.scene.translate(3,1,0.25);
		this.scene.scale(1,2,3.5);
		this.sofa.display();
		this.scene.translate(-6,0,0);
		this.sofa.display();
		this.scene.popMatrix();
	
		// back
		this.scene.pushMatrix();
		this.scene.translate(0,1.5,-1);
		this.scene.scale(5,3,1);
		this.sofa.display();
		this.scene.popMatrix();
		
		// bottom
		this.scene.pushMatrix();
		this.scene.translate(0,0.5,0.75);
		this.scene.scale(5,1,2.5);
		this.sofa.display();
		this.scene.popMatrix();
/*
		this.scene.pushMatrix();
		this.scene.translate(2.9,2.25,0);
		this.scene.scale(0.8,0.5,3);
		this.sofa.display();
		this.scene.translate(-2.9*2 -1.45,0,0);
		this.sofa.display();
		this.scene.popMatrix();
*/
	};
};


