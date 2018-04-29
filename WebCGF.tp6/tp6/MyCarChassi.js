/**
 * MyCarChassi
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCarChassi extends CGFobject
{
	constructor(scene,color)
	{
		super(scene);
		
		this.color = color || 0;

		// yellow
		this.bar = new MyCylinderwCover(this.scene,12,1);

		// red
		this.barDown = new MyTrapeziumCylindric(this.scene,2,2,1.5,0);
		
		// blue
		this.barLeft = new MyTrapeziumCylindric(this.scene,3,2,0.5,0.5);
		
		// green
		this.barLeft2 = new MyTrapeziumCylindric(this.scene,2,1.5,0.7,0);
		
		// red
		this.barSide = new MyTrapeziumCylindric(this.scene,0.5,0.5,2,-1);
		
		// green
		this.barLeft3 = new MyTrapeziumCylindric(this.scene,2,2,2,0.5);
		
		// red
		this.barUp = new MyTrapeziumCylindric(this.scene,2.3,2.3,3,0);


		if(this.color)
		{
			this.red = new CGFappearance(this.scene);
			this.red.setDiffuse(1,0,0,1);

			this.blue = new CGFappearance(this.scene);
			this.blue.setDiffuse(0,0,1,1);

			this.green = new CGFappearance(this.scene);
			this.green.setDiffuse(0,1,0,1);

			this.yellow = new CGFappearance(this.scene);
			this.yellow.setDiffuse(1,1,0,1);
		}
		
	};


	display() 
	{	
		this.scene.pushMatrix();
			
			this.scene.translate(-1,0,-0.5);
	
		if(this.color)
			this.red.apply();
	
			this.scene.pushMatrix();
				this.scene.translate(0,0,0.5);
				this.barDown.display(0x0111);
			this.scene.popMatrix();
	
		if(this.color)
			this.blue.apply();
			
			this.scene.pushMatrix();
				this.scene.translate(-0.5,0,2);
				this.scene.rotate(-Math.PI/6.0,1,0,0);
				this.barLeft.display(0x0111);
			this.scene.popMatrix();

		if(this.color)
			this.yellow.apply();
		
			this.scene.pushMatrix();	
				this.scene.translate(-1.5,0.88,2.8);
				this.scene.rotate(Math.PI/2.0,0,1,0);	
				this.scene.scale(0.1,0.1,5);
				this.bar.display();
			this.scene.popMatrix();		

		if(this.color)
			this.green.apply();
		
			this.scene.pushMatrix();
				this.scene.translate(1,Math.sin(Math.PI/12.0),2.44);
				this.scene.rotate(-Math.PI/3.0,1,0,0);
				this.barLeft2.display(0x0101);
				this.scene.rotate(Math.PI,0,0,1);
				this.barLeft2.display(0x0100);
			this.scene.popMatrix();			
			this.scene.pushMatrix();
				this.scene.translate(-0.5,Math.sin(Math.PI/12.0),2.44);
				this.scene.rotate(Math.PI/6.0,1,0,0);
				this.scene.rotate(Math.PI/7.5,0,0,1);
				this.scene.rotate(Math.PI/2.0,0,1,0);
				this.scene.scale(0.1,0.1,1.6);
				this.bar.display();
			this.scene.popMatrix();			
			this.scene.pushMatrix();
				this.scene.translate(2.5,Math.sin(Math.PI/12.0),2.44);
				this.scene.rotate(Math.PI/6.0,1,0,0);
				this.scene.rotate(-Math.PI/7.5,0,0,1);
				this.scene.rotate(-Math.PI/2.0,0,1,0);
				this.scene.scale(0.1,0.1,1.6);
				this.bar.display();
			this.scene.popMatrix();	

		if(this.color)
			this.red.apply();
			
			this.scene.pushMatrix();
				this.scene.translate(3.5,0.9,2.8);
				this.scene.rotate(-3*Math.PI/6,1,0,0);
				this.barSide.display(0x0111);
			this.scene.popMatrix();

		if(this.color)
			this.yellow.apply();
		
			this.scene.pushMatrix();			
				this.scene.translate(2,0,2);
				this.scene.rotate(Math.PI/6.0,0,0,1);
				this.scene.rotate(Math.PI/2.0,0,1,0)
				this.scene.scale(0.1,0.1,4);
				this.bar.display();
			this.scene.popMatrix();

		if(this.color)
			this.green.apply();
			
			this.scene.pushMatrix();			
				this.scene.translate(4.6,1.5,2);
				this.scene.rotate(Math.PI/2.0,0,1,0)
				this.scene.scale(0.1,0.1,4);
				this.bar.display();
			this.scene.popMatrix();

		if(this.color)
			this.red.apply();
		
			this.scene.pushMatrix();			
				this.scene.translate(5.6,1.5,2);
				this.scene.rotate(Math.PI,0,1,0)
				this.scene.scale(0.1,0.1,1.5);
				this.bar.display();
			this.scene.popMatrix();
	
		if(this.color)
			this.yellow.apply();
	
			this.scene.pushMatrix();			
				this.scene.translate(0,0,2);
				this.scene.rotate(-Math.PI/6.0,0,0,1);
				this.scene.rotate(-Math.PI/2.0,0,1,0)
				this.scene.scale(0.1,0.1,4);
				this.bar.display();
			this.scene.popMatrix();

		if(this.color)
			this.green.apply();
		
			this.scene.pushMatrix();			
				this.scene.translate(-2.6,1.5,2);
				this.scene.rotate(-Math.PI/2.0,0,1,0)
				this.scene.scale(0.1,0.1,4);
				this.bar.display();
			this.scene.popMatrix();

		if(this.color)
			this.blue.apply();
		
			this.scene.pushMatrix();			
				this.scene.translate(-6.6,1.5,2);
				this.scene.rotate(Math.PI/4.0,1,0,0);
				this.scene.rotate(Math.PI,0,1,0)
				this.scene.scale(0.1,0.1,1.5/Math.cos(Math.PI/4.0));
				this.bar.display();
			this.scene.popMatrix();
			
		if(this.color)
			this.red.apply();
		
			this.scene.pushMatrix();			
				this.scene.translate(-6.6,1.5,2);
				this.scene.rotate(Math.PI,0,1,0);
				this.scene.scale(0.1,0.1,1.5);
				this.bar.display();
			this.scene.popMatrix();

		if(this.color)
			this.yellow.apply();
		
			this.scene.pushMatrix();
				this.scene.translate(-6.6,1.5,0.5);
				this.scene.rotate(Math.PI/4.0,0,1,0);
				this.scene.rotate(-Math.PI/6.0,1,0,0);
				this.scene.scale(0.1,0.1,0.5);
				this.bar.display();
			this.scene.popMatrix();
	
		if(this.color)
			this.red.apply();
		
			this.scene.pushMatrix();			
				this.scene.translate(-6.6,3,0.5);
				this.scene.rotate(Math.PI/12.0,1,0,0);				
				this.scene.rotate(Math.PI/3,0,1,0);
				this.scene.scale(0.1,0.1,1.8);
				this.bar.display();
			this.scene.popMatrix();

		if(this.color)
			this.green.apply();
		
			this.scene.pushMatrix();			
				this.scene.translate(-6.3,1.75,0.8);
				this.scene.rotate(Math.PI/4.8,0,0,1);
				this.scene.rotate(Math.PI/2.57,0,1,0);
				this.scene.scale(0.1,0.1,1.7);
				this.bar.display();
			this.scene.popMatrix();

		if(this.color)
			this.blue.apply();
		
			this.scene.pushMatrix();
				this.scene.translate(-1.5,0.9,2.8);
				this.scene.rotate(-3*Math.PI/6,1,0,0);
				this.barLeft3.display(0x0111);
			this.scene.popMatrix();
			
		if(this.color)
			this.green.apply();
		
			this.scene.pushMatrix();
				this.scene.translate(-1,0.9,2.8);
				this.scene.rotate(-Math.PI/4.8,0,0,1);
				this.scene.rotate(-3*Math.PI/6,1,0,0);				
				this.scene.scale(0.1,0.1,2.5);
				this.bar.display();
			this.scene.popMatrix();
			this.scene.pushMatrix();
				this.scene.translate(1,0.9,2.8);
				this.scene.rotate(-Math.PI/3.5,0,0,1);
				this.scene.rotate(-3*Math.PI/6,1,0,0);				
				this.scene.scale(0.1,0.1,3.2);
				this.bar.display();
			this.scene.popMatrix();
	
		if(this.color)
			this.red.apply();
		
			this.scene.pushMatrix();
				this.scene.translate(-1.5,2.9,2.8);
				this.scene.rotate(Math.PI/3.0,0,0,1);
				this.scene.rotate(Math.PI/2.0,0,1,0);
				this.barUp.display(0x1011);
			this.scene.popMatrix();

		if(this.color)
			this.blue.apply();
		
			this.scene.pushMatrix();
				this.scene.translate(-1.5,2.9,1.2);
				this.scene.rotate(-Math.PI/12.5,1,0,0);
				this.scene.rotate(Math.PI/3.0,0,0,1);
				this.scene.rotate(Math.PI/2.0,0,1,0);
				this.scene.scale(0.05,0.05,3);
 				this.bar.display();
			this.scene.popMatrix();
			
		if(this.color)
			this.yellow.apply();
		
			this.scene.pushMatrix();
				this.scene.translate(-5.05,2.75,1.37);
				this.scene.rotate(Math.PI/70,0,0,1);
				this.scene.rotate(Math.PI/2-Math.PI/8.2,0,1,0);
				this.scene.scale(0.1,0.1,3.85);
				this.bar.display();
			this.scene.popMatrix();

		if(this.color)
			this.yellow.apply();
		
			this.scene.pushMatrix();
				this.scene.translate(0.5,2.9,2.8);
				this.scene.rotate(-Math.PI/2.0,0,0,1);
				this.scene.rotate(-3*Math.PI/6,1,0,0);
				this.scene.scale(0.1,0.1,3);
				this.bar.display();
			this.scene.popMatrix();

		this.scene.popMatrix();
		
	};


};
