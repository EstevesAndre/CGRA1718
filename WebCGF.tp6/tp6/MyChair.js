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

		this.chairBody = new CGFappearance(this.scene);
		this.chairBody.loadTexture("../resources/images/table.png");
		this.chairBody.setAmbient(0.3,0.3,0.3,1);
		this.chairBody.setDiffuse(0.5,0.5,0.5,1);
		this.chairBody.setSpecular(0.5,0.5,0.5,1);
		this.chairBody.setShininess(20);

		this.chairLegs = new CGFappearance(this.scene);
		this.chairLegs.loadTexture("../resources/images/legs.jpg");
		this.chairLegs.setAmbient(0.3,0.3,0.3,1);
		this.chairLegs.setDiffuse(0.5,0.5,0.5,1);
		this.chairLegs.setSpecular(0.5,0.5,0.5,1);
		this.chairLegs.setShininess(20);		
	};  
	
	display()
	{		
		this.chairLegs.apply();
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

		this.chairBody.apply();
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


