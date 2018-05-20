/**
 * MyWheelDamper
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyWheelDamper extends CGFobject
{
	constructor(scene)
	{
		super(scene);
		
		this.cylinder = new MyCylinder(this.scene,24,1);
		this.cover = new MyObjectsFrontCircule(this.scene,24,0);
		this.wheel = new MyObjectsFrontCircule(this.scene,24,0.2);

		this.green = new CGFappearance(this.scene);
		this.green.setAmbient(0.1,1,0.3,1);
		this.green.setDiffuse(0,0,0,1);
		this.green.setSpecular(1,1,1,1);
		this.green.setShininess(120);	

		this.metal = new CGFappearance(this.scene);
		this.metal.setAmbient(0.05,0.05,0.05,1);
		this.metal.setDiffuse(0.2,0.2,0.7,1);
		this.metal.setSpecular(1,1,1,1);
		this.metal.setShininess(120);			
	};


	display() 
	{
		this.metal.apply();
		
		this.scene.pushMatrix();
			for(let i = 0; i < 2; i++)
			{				
				this.scene.pushMatrix();
					this.scene.scale(0.2,0.2,1);
					this.cylinder.display();
					this.scene.translate(0,0,1);
					this.cover.display();
					this.scene.translate(0,0,-1);
					this.scene.rotate(Math.PI,0,1,0);
					this.cover.display();
				this.scene.popMatrix();
				this.scene.translate(0,0,1);
			}									
		this.scene.popMatrix();

		this.green.apply();

		for(let i = 0.1; i < 2; i+=0.2)
		{
			this.scene.pushMatrix();
				this.scene.translate(0,0,i);
				this.scene.rotate(-Math.PI/10,0,1,0);
				this.scene.scale(0.3,0.3,1);
				this.wheel.display();						
				this.scene.rotate(Math.PI,0,1,0);
				this.wheel.display();
			this.scene.popMatrix();
		}

	};
};
