/**
 * MyWheel
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyWheel extends CGFobject
{

	constructor(scene, rotate)
	{
		super(scene);
		
		// Objects
			this.lado = new MyObjectsFrontCircule(this.scene, 24,0.8);
			this.cylinderExterior = new MyCylinder(this.scene, 24,1,1);
			this.cylinderInterior = new MyCylinder(this.scene, 24,1,-1);
			this.smallPeace = new MyTrapezium(this.scene,0.1,0.1,0.1,0.6,0);
			this.center = new MySemiSphere(this.scene,8,4);
			this.alloy = new MyObjectsFrontCircule(this.scene,24,0.6);
			
		// texture	
			this.wheelText = new CGFappearance(this.scene);
			this.wheelText.loadTexture("../resources/images/wheelTex.jpg");
			this.wheelText.setAmbient(0.3,0.3,0.3,1);
			this.wheelText.setDiffuse(0.5,0.5,0.5,1);
			this.wheelText.setSpecular(1,1,1,1);
			this.wheelText.setShininess(120);		

		// Materials
			this.jante = new CGFappearance(this.scene);
			this.jante.setAmbient(0.13,0,0,1);
			this.jante.setDiffuse(0.14,0.14,0.14,1);
			this.jante.setSpecular(0.8,0.8,0.8,1);	
			this.jante.setShininess(120);

			this.janteIn = new CGFappearance(this.scene);
			this.janteIn.setAmbient(0.2,0.2,0.2,1);
			this.janteIn.setDiffuse(0.14,0.14,0.14,1);
			this.janteIn.setSpecular(1,1,1,1);	
			this.janteIn.setShininess(120);

			this.janteOut = new CGFappearance(this.scene);
			this.janteOut.setAmbient(0.05,0.05,0.05,1);
			this.janteOut.setDiffuse(0.5,0.4,0.2,1);
			this.janteOut.setSpecular(1,1,1,1);	
			this.janteOut.setShininess(120);

			this.metal = new CGFappearance(this.scene);
			this.metal.setAmbient(0.1,0.1,0.1,1);
			this.metal.setDiffuse(0.1,0.1,0.1,1);
			this.metal.setSpecular(1,1,1,1);
			this.metal.setShininess(120);	

		// Variables for movement
			this.speed = 0;
			this.x = 0;
			this.y = 0;
			this.z = 0;

			this.angle = 0;
			this.xRot = 0;
			this.yRot = 0;
			this.zRot = 0;

			this.rotate = rotate || false;
			this.direction = 0.0;

	};

	/*
		Sets the position of the car given x,y and z coordinates
	*/
	setPosition(x, y, z)
	{
		this.x = x;
		this.y = y;
		this.z = z;
	};
	

	/*
		render of the car
	*/
	display() 
	{		
		this.janteIn.apply();

		this.scene.pushMatrix();
			let angle = (2*Math.PI)/12;
			this.scene.rotate(Math.PI/2,0,1,0);
			this.scene.translate(-0.15,-0.02,0);
			for(let i = 0; i < 12; i++)
			{	
				this.scene.pushMatrix();
				this.scene.translate(0,-Math.sin(i*angle)/5,Math.cos(i*angle)/5);
				this.scene.rotate(angle*i,1,0,0);
				this.smallPeace.display();
				this.scene.popMatrix();
			}
		this.scene.popMatrix();

		this.metal.apply();
		
		this.scene.pushMatrix();
			this.scene.scale(1,1,0.73);
			this.cylinderExterior.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
			this.scene.translate(0,0,0.73);
			this.lado.display();		
	   	this.scene.popMatrix();
		
		this.scene.pushMatrix();
			this.scene.rotate(Math.PI,0,1,0);
			this.lado.display();	
	   	this.scene.popMatrix();

		this.metal.apply();
		
		this.scene.pushMatrix();
			this.scene.scale(0.8,0.8,0.73);
			this.cylinderInterior.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
			this.scene.scale(0.27,0.27,1,1);
			this.scene.translate(0,0,0.05);
			this.center.display();
		this.scene.popMatrix();
			
		this.scene.pushMatrix();
			this.scene.scale(0.27,0.27,0.1,1);
			this.scene.rotate(Math.PI,0,1,0);
			this.scene.translate(0,0,-0.5);
			this.center.display();		
	   	this.scene.popMatrix();

		this.janteOut.apply();
		
		this.scene.pushMatrix();
			this.scene.scale(0.8,0.8,0.8);
			this.scene.rotate(Math.PI,0,1,0);
			this.alloy.display();		
	   	this.scene.popMatrix();
		
		this.scene.pushMatrix();
			this.scene.translate(0,0,0.2);
			this.scene.scale(0.8,0.8,0.8);
			this.alloy.display();		
	   	this.scene.popMatrix();
	
		this.wheelText.apply();
		
		this.scene.pushMatrix();
			for(let z = 0; z < 5; z++)
			{
				angle = Math.PI/10;
				for(let x = 0; x < 40; x++)
				{
					this.scene.pushMatrix();
						this.scene.rotate(angle,0,0,1);
						this.scene.translate(1,0,0.08+z/7);
						this.scene.rotate(Math.PI/2.0,0,1,0);
						if(z%2!=0)
							this.scene.scale(0.15,0.15,0.1);						
						else
							this.scene.scale(0.08,0.08,0.1);
						
						this.center.display();
					this.scene.popMatrix();
					angle+=Math.PI/20;
				}
			}
		this.scene.popMatrix();
	};

	/*
		Updates the angle of the wheel and keeps the angle always between 0 and 2*Math.PI
	*/
	update(currTime)
	{
		this.angle += this.speed * currTime / 15;
		this.angle = this.angle%(2*Math.PI);
	};

	/*
		Updates de direction of the wheel only if the wheel rotates, i.e., only the front wheels of the Car
	*/
	updateDirection(direction)
	{
		if(this.rotate)
		{
			this.direction = direction;
		}
	}
};
