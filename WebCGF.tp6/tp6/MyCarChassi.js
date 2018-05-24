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
		
		// boolean to display the color debug for the car chassi
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
		
		// blue
		this.barSide2 = new MyTrapeziumCylindric(this.scene,0.5,0.5,2.6,-0.5);
		
		// green
		this.barLeft3 = new MyTrapeziumCylindric(this.scene,2,2,2,0.5);
		
		// red
		this.barUp = new MyTrapeziumCylindric(this.scene,2.3,2.3,3,0);

		// yellow
		this.barTop = new MyTrapeziumCylindric(this.scene,0.5,0.5,2.2,0);

		if(this.color)
		{
			this.red = new CGFappearance(this.scene);
			this.red.setAmbient(1,0.25,0.25,1);
			this.red.setDiffuse(1,0,0,1);

			this.blue = new CGFappearance(this.scene);
			this.blue.setAmbient(0.25,0.25,1,1);
			this.blue.setDiffuse(0,0,1,1);

			this.green = new CGFappearance(this.scene);
			this.green.setAmbient(0.25,1,0.25,1);
			this.green.setDiffuse(0,1,0,1);

			this.yellow = new CGFappearance(this.scene);
			this.yellow.setAmbient(1,1,0.25,1);
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
				this.scene.translate(-1.05,0.88,2.8);
				this.scene.rotate(Math.PI/2.0,0,1,0);	
				this.scene.scale(0.1,0.1,4.1);
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
				this.scene.rotate(-Math.PI/2,1,0,0);
				this.barSide.display(0x0111);
			this.scene.popMatrix();

		if(this.color)
			this.yellow.apply();
		
			this.scene.pushMatrix();			
				this.scene.translate(2,0,2);
				this.scene.rotate(Math.PI/6.0,0,0,1);
				this.scene.rotate(Math.PI/2.0,0,1,0)
				this.scene.scale(0.1,0.1,3);
				this.bar.display();
			this.scene.popMatrix();

		if(this.color)
			this.green.apply();
			
			this.scene.pushMatrix();			
				this.scene.translate(4.6,1.5,2);
				this.scene.rotate(-Math.PI/45,0,0,1);				
				this.scene.rotate(Math.PI/2.0,0,1,0)
				this.scene.scale(0.1,0.1,4);
				this.bar.display();
			this.scene.popMatrix();

		if(this.color)
			this.red.apply();
		
			this.scene.pushMatrix();			
				this.scene.translate(5.4,1.44,1.97);
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
				this.scene.scale(0.1,0.1,3);
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
				this.scene.scale(0.1,0.1,1.3/Math.cos(Math.PI/4.0));
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
				this.scene.translate(-6.6,2.8,0.67);
				this.scene.rotate(Math.PI/35.0,1,0,0);				
				this.scene.rotate(Math.PI/2.8,0,1,0);
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
				this.scene.rotate(-Math.PI/2,1,0,0);
				this.barLeft3.display(0x0111);
			this.scene.popMatrix();
			
		if(this.color)
			this.green.apply();
		
			this.scene.pushMatrix();
				this.scene.translate(-1,0.9,2.8);
				this.scene.rotate(-Math.PI/4.8,0,0,1);
				this.scene.rotate(-Math.PI/2,1,0,0);				
				this.scene.scale(0.1,0.1,2.5);
				this.bar.display();
			this.scene.popMatrix();
			this.scene.pushMatrix();
				this.scene.translate(1,0.9,2.8);
				this.scene.rotate(-Math.PI/3.5,0,0,1);
				this.scene.rotate(-Math.PI/2,1,0,0);				
				this.scene.scale(0.1,0.1,3.2);
				this.bar.display();
			this.scene.popMatrix();
	
		if(this.color)
			this.red.apply();
		
			this.scene.pushMatrix();
				this.scene.translate(-1.5,2.9,2.8);
				this.scene.rotate(Math.PI/3.0,0,0,1);
				this.scene.rotate(Math.PI/2.0,0,1,0);
				this.barUp.display(0x1001);
			this.scene.popMatrix();
			this.scene.pushMatrix();				
				this.scene.translate(0,5.5,2.8);
				this.scene.rotate(Math.PI,1,0,0);
				this.scene.scale(0.1,0.1,2.35);
				this.bar.display();
			this.scene.popMatrix();

		if(this.color)
			this.blue.apply();
		
			this.scene.pushMatrix();
				this.scene.translate(-1.5,3,1);
				this.scene.rotate(-Math.PI/15,1,0,0);
				this.scene.rotate(Math.PI/3.3,0,0,1);
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
				this.scene.scale(0.1,0.1,1.7);
				this.bar.display();
			this.scene.popMatrix();

		if(this.color)
			this.green.apply();
		
			this.scene.pushMatrix();
				this.scene.translate(-3.5,2.83,2);
				this.scene.rotate(Math.PI/2,0,1,0);
				this.scene.scale(0.1,0.1,0.95);
				this.bar.display();
			this.scene.popMatrix();

		if(this.color)
			this.green.apply();
		
			this.scene.pushMatrix();
				this.scene.translate(-2.6,2.83,1.99);
				this.scene.rotate(Math.PI/40,0,0,1);
				this.scene.rotate(Math.PI/2-Math.PI/5,0,1,0);
				this.scene.scale(0.1,0.1,1.4);
				this.bar.display();
			this.scene.popMatrix();
			
		if(this.color)
			this.yellow.apply();
		
			this.scene.pushMatrix();
				this.scene.translate(0.5,2.9,2.8);
				this.scene.rotate(-Math.PI/2.0,0,0,1);
				this.scene.rotate(-Math.PI/2,1,0,0);
				this.scene.scale(0.1,0.1,3);
				this.bar.display();
			this.scene.popMatrix();

		if(this.color)
			this.blue.apply();
			
			this.scene.pushMatrix();
				this.scene.translate(4,2.9,2.8);
				this.scene.rotate(-Math.PI/2,1,0,0);
				this.barSide2.display(0x0111);
			this.scene.popMatrix();

		if(this.color)
			this.yellow.apply();
			
			this.scene.pushMatrix();
				this.scene.translate(4,5.5,0.6);
				this.barTop.display(0x1101);
			this.scene.popMatrix();


		if(this.color)
			this.yellow.apply();
		
			this.scene.pushMatrix();
				this.scene.translate(0,5.5,2.8);
				this.scene.rotate(-Math.PI/2.0,0,0,1);
				this.scene.rotate(-Math.PI/2,1,0,0);
				this.scene.scale(0.1,0.1,4);
				this.bar.display();
			this.scene.popMatrix();

		if(this.color)
			this.green.apply();

			this.scene.pushMatrix();				
				this.scene.translate(8.55,1.2,2);
				this.scene.rotate(-Math.PI/6.0,0,0,1);
				this.scene.rotate(-Math.PI/2.9,1,0,0);
				this.scene.scale(0.1,0.1,1.7);
				this.bar.display();
			this.scene.popMatrix();

		if(this.color)
			this.blue.apply();
		
			this.scene.pushMatrix();
				this.scene.translate(4,2.9,2.8);
				this.scene.rotate(-Math.PI/45,0,0,1);
				this.scene.rotate(Math.PI/2.0,0,1,0);
				this.scene.scale(0.1,0.1,5.35);
				this.bar.display();
			this.scene.popMatrix();
	
		if(this.color)
			this.yellow.apply();
		
			this.scene.pushMatrix();
				this.scene.translate(5,2.85,2.8);
				this.scene.rotate(Math.PI,1,0,0);
				this.scene.scale(0.1,0.1,2.5);
				this.bar.display();
			this.scene.popMatrix();
	
		if(this.color)
			this.red.apply();
			
			this.scene.pushMatrix();
				this.scene.translate(4.5,5.5,2.8);
				this.scene.rotate(-Math.PI/10,0,0,1);
				this.scene.rotate(Math.PI/2.0,0,1,0);
				this.scene.scale(0.1,0.1,1.5);
				this.bar.display();
			this.scene.popMatrix();	
			this.scene.pushMatrix();
				this.scene.translate(5.9,5.05,2.8);
				this.scene.rotate(-Math.PI/7,0,0,1);
				this.scene.rotate(Math.PI/2.0,0,1,0);
				this.scene.scale(0.1,0.1,1.5);
				this.bar.display();
			this.scene.popMatrix();
			this.scene.pushMatrix();
				this.scene.translate(7.23,4.41,2.8);
				this.scene.rotate(-Math.PI/5,0,0,1);
				this.scene.rotate(Math.PI/2.0,0,1,0);
				this.scene.scale(0.1,0.1,1.5);
				this.bar.display();
			this.scene.popMatrix();
			this.scene.pushMatrix();
				this.scene.translate(8.4,3.55,2.8);
				this.scene.rotate(-Math.PI/4,0,0,1);
				this.scene.rotate(Math.PI/1.93,0,1,0);
				this.scene.scale(0.1,0.1,1.4);
				this.bar.display();
			this.scene.popMatrix();

		if(this.color)
			this.blue.apply();

			this.scene.pushMatrix();
				this.scene.translate(9.3,2.55,0.5);
				this.scene.scale(0.1,0.1,2.23);
				this.bar.display();
			this.scene.popMatrix();

		if(this.color)
			this.green.apply();

			this.scene.pushMatrix();
				this.scene.translate(4.5,5.5,0.6);				
				this.scene.rotate(-Math.PI/10,0,0,1);
				this.scene.rotate(Math.PI/2.5,0,1,0);
				this.scene.scale(0.1,0.1,1.6);
				this.bar.display();
			this.scene.popMatrix();
			this.scene.pushMatrix();
				this.scene.translate(5.92,5.04,1.09);	
				this.scene.rotate(-Math.PI/7.0,0,0,1);
				this.scene.rotate(Math.PI/2.5,0,1,0);
				this.scene.scale(0.1,0.1,1.6);
				this.bar.display();
			this.scene.popMatrix();
			this.scene.pushMatrix();
				this.scene.translate(7.23,4.41,1.565);			
				this.scene.rotate(-Math.PI/5.0,0,0,1);
				this.scene.rotate(Math.PI/2.5,0,1,0);
				this.scene.scale(0.1,0.1,1.6);
				this.bar.display();
			this.scene.popMatrix();
			this.scene.pushMatrix();
				this.scene.translate(8.45,3.53,2.06);			
				this.scene.rotate(-Math.PI/4.0,0,0,1);
				this.scene.rotate(Math.PI/2.8,0,1,0);
				this.scene.scale(0.1,0.1,1.5);
				this.bar.display();
			this.scene.popMatrix();

			

		this.scene.popMatrix();
		
	};
};
