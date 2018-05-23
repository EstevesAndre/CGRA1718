/**
 * MyTrapeziumCylindric
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTrapeziumCylindric extends CGFobject
{
	constructor(scene, B, b, h, offset) 
	{
		super(scene);
		
		// Object
			this.bar = new MyCylinderwCover(this.scene,12,true,1);
		
		// Parameters or default
			this.b = b || 1;
			this.B = B || 1;
			this.h = h || 1;
			this.offset = offset || 0;

		// Initialized angles for the sides of Trapezium
			this.angle_R = 0;
			this.angle_L = 0;

		// Change right and left angle variables		
			if(b+offset > B)
			{
				this.angle_R = -Math.atan((b+offset-B)/h);
			}
			else
			{			
				this.angle_R = Math.atan((B-(b+offset))/h);
			}

			if(offset > 0)
			{			
				this.angle_L = Math.atan(h/offset) + Math.PI/2.0;
			}
			else
			{			
				this.angle_L = Math.atan(-offset/h) + Math.PI;
			}
		
		// Shift right and Left
			this.deslocR = Math.sqrt(this.h*this.h + Math.pow(this.b+this.offset-this.B,2));
			this.deslocL = Math.sqrt(Math.pow(this.h,2) + Math.pow(this.offset,2));

	};

	/*	
		Render for the trapezium
		given the mask:
			default value -> 0x1111
			every trapezium cylindric is composed by 4 sides, but sometimes we don't need to display them all
			so: 0x1000 displays first side;
				0x0100 displays second side;
				0x0010 displays third side;
				0x0001 displays fourth side.
			and we can join them.				
	*/
	display(part) 
	{	
		let parts = part || 0x1111;
		
		if(parts & 0x1000)
		{	
			this.scene.pushMatrix();
				this.scene.translate(this.offset,0,0);
				this.scene.rotate(Math.PI/2.0,0,1,0);
				this.scene.scale(0.1,0.1,this.b);
				this.bar.display();
			this.scene.popMatrix();
		}

		if(parts & 0x0100)
		{
			this.scene.pushMatrix();
				this.scene.translate(this.b+this.offset,0,0);
				this.scene.rotate(this.angle_R,0,1,0);
				this.scene.scale(0.1,0.1,this.deslocR);
				this.bar.display();
			this.scene.popMatrix();
		}

		if(parts & 0x0010)
		{
			this.scene.pushMatrix();
				this.scene.translate(0,0,this.h);
				this.scene.rotate(Math.PI/2.0,0,1,0);
				this.scene.scale(0.1,0.1,this.B);
				this.bar.display();
			this.scene.popMatrix();
		}

		if(parts & 0x0001)
		{
			this.scene.pushMatrix();
				this.scene.translate(0,0,this.h);
				this.scene.rotate(this.angle_L,0,1,0);
				this.scene.scale(0.1,0.1,this.deslocL);
				this.bar.display();
			this.scene.popMatrix();
		}
	};


};
