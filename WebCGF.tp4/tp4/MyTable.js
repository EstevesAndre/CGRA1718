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

		this.tableAppearance = new CGFappearance(this.scene);
		this.tableAppearance.loadTexture("../resources/images/table.png");
		this.tableAppearance.setDiffuse(0.8,0.8,0.8,1);
  		this.tableAppearance.setSpecular(0.2,0.2,0.2,1);
  		this.tableAppearance.setShininess(10);

		this.metal = new CGFappearance(this.scene);
		this.metal.setAmbient(0.3,0.3,0.3,1);
		this.metal.setDiffuse(0.5,0.5,0.5,1);
		this.metal.setSpecular(1,1,1,1);
		this.metal.setShininess(120);


	};

	display()
	{
		this.tableAppearance.apply();
		
		this.scene.pushMatrix();
		this.scene.translate(0, 3.5 + 0.3/2, 0);
		this.scene.scale(5, 0.3, 3);
		this.cube.display();
		this.scene.popMatrix();

		this.metal.apply();
			
		this.scene.pushMatrix();
		this.scene.translate(5/2.0 - 0.3/2, 3.5/2, 3/2.0 - 0.3/2);
		this.scene.scale(0.3, 3.5, 0.3);
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
