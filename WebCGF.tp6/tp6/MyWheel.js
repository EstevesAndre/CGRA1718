/**
 * MyWheel
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyWheel extends CGFobject
{

	constructor(scene)
	{
		super(scene);

		this.lado = new MyObjectsFrontCircule(this.scene, 24,0.8);
		this.cylinderExterior = new MyCylinder(this.scene, 24,1,1);
		this.cylinderInterior = new MyCylinder(this.scene, 24,1,-1);
		this.smallPeace = new MyTrapezium(this.scene,0.1,0.1,0.1,0.6,0);
		this.center = new MySemiSphere(this.scene,8,4);


		this.wheelText = new CGFappearance(this.scene);
		this.wheelText.loadTexture("../resources/images/texture.jpg");
		this.wheelText.setAmbient(0.3,0.3,0.3,1);
		this.wheelText.setDiffuse(0.5,0.5,0.5,1);
		this.wheelText.setSpecular(1,1,1,1);
		this.wheelText.setShininess(120);		

		this.jante = new CGFappearance(this.scene);
		this.jante.loadTexture("../resources/images/logo.jpg");
		this.jante.setAmbient(0.3,0.3,0.3,1);
		this.jante.setDiffuse(0.5,0.5,0.5,1);
		this.jante.setSpecular(1,1,1,1);
		this.jante.setShininess(120);

		this.metal = new CGFappearance(this.scene);
		this.metal.loadTexture("../resources/images/metal2.jpg");
		this.metal.setAmbient(0.3,0.3,0.3,1);
		this.metal.setDiffuse(0.5,0.5,0.5,1);
		this.metal.setSpecular(1,1,1,1);
		this.metal.setShininess(120);	

		this.logo = new CGFappearance(this.scene);
		this.logo.loadTexture("../resources/images/metal.png");
		this.logo.setAmbient(0.3,0.3,0.3,1);
		this.logo.setDiffuse(0.5,0.5,0.5,1);
		this.logo.setSpecular(1,1,1,1);
		this.logo.setShininess(120);			
	}

	display() 
	{		
		this.jante.apply();

		this.scene.pushMatrix();
			let angle = (2*Math.PI)/12;
			this.scene.rotate(Math.PI/2,0,1,0);
			this.scene.translate(-0.15,-0.02,0);
			for(let i = 0; i < 12; i++)
			{	
				this.scene.translate(0,-Math.sin(i*angle)/5,Math.cos(i*angle)/5);
				this.scene.rotate(angle*i,1,0,0);
				this.smallPeace.display();
				this.scene.rotate(-angle*i,1,0,0);												
				this.scene.translate(0,Math.sin(i*angle)/5,-Math.cos(i*angle)/5);
			}
		this.scene.popMatrix();

		this.wheelText.apply();
		
		this.scene.pushMatrix();
			this.scene.scale(1,1,0.7);
			this.cylinderExterior.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
			this.scene.translate(0,0,0.7);
			this.lado.display();		
	   	this.scene.popMatrix();
		
		this.scene.pushMatrix();
			this.scene.rotate(Math.PI,0,1,0);
			this.lado.display();	
	   	this.scene.popMatrix();

		this.metal.apply();
		
		this.scene.pushMatrix();
			this.scene.scale(0.8,0.8,0.7);
			this.cylinderInterior.display();
		this.scene.popMatrix();
		
		this.logo.apply();
			
		this.scene.pushMatrix();
			this.scene.scale(0.27,0.27,1,1);
			this.scene.translate(0,0,0.2);
			this.center.display();
		this.scene.popMatrix();
			
		this.scene.pushMatrix();
			this.scene.scale(0.27,0.27,0.1,1);
			this.scene.rotate(Math.PI,0,1,0);
			this.scene.translate(0,0,-0.5);
			this.center.display();		
	   	this.scene.popMatrix();

	};
};
