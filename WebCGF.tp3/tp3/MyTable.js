/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTable extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
		this.cube = new MyUnitCubeQuad(this.scene);

		this.wood = new CGFappearance(this.scene);
		this.wood.setAmbient(0.3,0.3,0.3,1);
		this.wood.setDiffuse(0.5,0.25,0,1);
		this.wood.setSpecular(0.1,0.1,0.1,1);
		this.wood.setShininess(0);

		this.metal = new CGFappearance(this.scene);
		this.metal.setAmbient(0.3,0.3,0.3,1);
		this.metal.setDiffuse(0.5,0.5,0.5,1);
		this.metal.setSpecular(1,1,1,1);
		this.metal.setShininess(120);
	};

	display()
	{
		this.scene.pushMatrix();
		this.scene.translate(0, 3.5 + 0.3/2, 0);
		this.scene.scale(5, 0.3, 3);
		this.wood.apply();
		this.cube.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(5/2.0 - 0.3/2, 3.5/2, 3/2.0 - 0.3/2);
		this.scene.scale(0.3, 3.5, 0.3);
		this.metal.apply();
		this.cube.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-5/2.0 + 0.3/2, 3.5/2, 3/2.0 - 0.3/2);
		this.scene.scale(0.3, 3.5, 0.3);
		this.cube.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(5/2.0 - 0.3/2, 3.5/2, -3/2.0 + 0.3/2);
		this.scene.scale(0.3, 3.5, 0.3);
		this.cube.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-5/2.0 + 0.3/2, 3.5/2, -3/2.0 + 0.3/2);
		this.scene.scale(0.3, 3.5, 0.3);
		this.cube.display();
		this.scene.popMatrix();
	}
};
