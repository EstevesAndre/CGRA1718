/**
 * MyHandWheel
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyHandWheel extends CGFobject
{

	constructor(scene)
	{
		super(scene);

		this.lado = new MyObjectsFrontCircule(this.scene, 24,0.8);
		this.cylinderExterior = new MyCylinder(this.scene, 24,1,1);
		this.cylinderInterior = new MyCylinder(this.scene, 24,1,-1);
		this.prism = new MyTrapezium(this.scene,2,3,1,2,-0.5);

		this.wheelText = new CGFappearance(this.scene);
		this.wheelText.loadTexture("../resources/images/texture.jpg");
		this.wheelText.setAmbient(0.3,0.3,0.3,1);
		this.wheelText.setDiffuse(0.5,0.5,0.5,1);
		this.wheelText.setSpecular(1,1,1,1);
		this.wheelText.setShininess(120);		
	}

	display() 
	{		
		var angle = -80*Math.PI/180.0;
		var dimension = (80+60)/7.0;

		for(let i = 0; i < 2; i++)
		{
			this.scene.pushMatrix();
				this.scene.rotate(angle,0,0,1);				
				this.prism.display();		
			this.scene.popMatrix();
			angle+=dimension;
		}
	};
};
