/**
 * MyCarChassi
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCarChassi extends CGFobject
{
	constructor(scene)
	{
		super(scene);
		
		// yellow
		this.bar = new MyCylinderwCover(this.scene,12,1);

		// red
		this.barDown = new MyTrapeziumCylindric(this.scene,2,2,1.5,0);
		
		// blue
		this.barLeft = new MyTrapeziumCylindric(this.scene,3,2,0.5,0.5);
		
		// green
		this.barLeft2 = new MyTrapeziumCylindric(this.scene,2,1.5,0.7,0);
		
		// red
		this.barSide = new MyTrapeziumCylindric(this.scene,0.5,0.5,3,-1);
		
		this.barRear = new MyTrapeziumCylindric(this.scene,4,3,2,-1);
		
		this.red = new CGFappearance(this.scene);
		this.red.setDiffuse(1,0,0,1);

		this.blue = new CGFappearance(this.scene);
		this.blue.setDiffuse(0,0,1,1);

		this.green = new CGFappearance(this.scene);
		this.green.setDiffuse(0,1,0,1);

		this.yellow = new CGFappearance(this.scene);
		this.yellow.setDiffuse(1,1,0,1);

		
	};


	display() 
	{	
		this.scene.pushMatrix();
			
			this.scene.translate(-1,0,-0.5);
			
		this.red.apply();
			this.scene.pushMatrix();
				this.scene.translate(0,0,0.5);
				this.barDown.display(0x0111);
			this.scene.popMatrix();

		this.blue.apply();
			this.scene.pushMatrix();
				this.scene.translate(-0.5,0,2);
				this.scene.rotate(-Math.PI/6.0,1,0,0);
				this.barLeft.display(0x0111);
			this.scene.popMatrix();

		this.yellow.apply();
			this.scene.pushMatrix();	
				this.scene.translate(-1.5,0.88,2.8);
				this.scene.rotate(Math.PI/2.0,0,1,0);	
				this.scene.scale(0.1,0.1,5);
				this.bar.display();
			this.scene.popMatrix();		

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

		this.red.apply();
			this.scene.pushMatrix();
				this.scene.translate(3.5,0.9,2.8);
				this.scene.rotate(-3*Math.PI/6,1,0,0);
				this.barSide.display(0x0111);
			this.scene.popMatrix();

		this.yellow.apply();
			this.scene.pushMatrix();			
				this.scene.translate(2,0,2);
				this.scene.rotate(Math.PI/6.0,0,0,1);
				this.scene.rotate(Math.PI/2.0,0,1,0)
				this.scene.scale(0.1,0.1,4);
				this.bar.display();
			this.scene.popMatrix();

		this.green.apply();
			this.scene.pushMatrix();			
				this.scene.translate(4.6,1.5,2);
				this.scene.rotate(Math.PI/2.0,0,1,0)
				this.scene.scale(0.1,0.1,4);
				this.bar.display();
			this.scene.popMatrix();

		this.red.apply();
			this.scene.pushMatrix();			
				this.scene.translate(5.6,1.5,2);
				this.scene.rotate(Math.PI,0,1,0)
				this.scene.scale(0.1,0.1,1.5);
				this.bar.display();
			this.scene.popMatrix();

		this.yellow.apply();
			this.scene.pushMatrix();			
				this.scene.translate(0,0,2);
				this.scene.rotate(-Math.PI/6.0,0,0,1);
				this.scene.rotate(-Math.PI/2.0,0,1,0)
				this.scene.scale(0.1,0.1,4);
				this.bar.display();
			this.scene.popMatrix();

		this.green.apply();
			this.scene.pushMatrix();			
				this.scene.translate(-2.6,1.5,2);
				this.scene.rotate(-Math.PI/2.0,0,1,0)
				this.scene.scale(0.1,0.1,4);
				this.bar.display();
			this.scene.popMatrix();


		this.scene.popMatrix();
	};


};
