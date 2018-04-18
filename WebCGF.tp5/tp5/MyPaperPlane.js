/**
 * MyPaperPlane
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyPaperPlane extends CGFobject
{
	constructor(scene) 
	{
		super(scene);

		this.x = 0;
		this.y = 0;
		this.z = 0;

		this.angle = 0;
		this.xRot = 0;
		this.yRot = 0;
		this.zRot = 0;

		this.angleRot = 0;
		this.xRotValue = 0;
		this.yRotValue = 0;

		this.straightFlight = false;
		this.loopFlight = false;
		this.fallFlight = false;

		this.initBuffers();
	};

	initBuffers() 
	{
		this.vertices = [
				-1,0,0,  
				0,0,-0.25,
				0,0,-0.05,
				0,0,0.25,
				0,0,0.05,
				0,-0.05,0,
				0,0,-0.05,
				0,0,0.05,
				-1, 0, 0
			];

		this.indices = [
				0, 2, 1, 
				0,3,4,
				0,5,2,
				0,4,5,
				0, 1, 2, 
				0,4,3,
				0,2,5,
				0,5,4
			];

		this.normals = [
				0, 0, 1,
				0, 0, 1,
				-Math.cos(Math.PI/4.0), 0, 0,
				0, 0, 1,
				Math.cos(Math.PI/4.0), 0, 0,
				0,0,-1,
				0, 0, 1,
				0, 0, 1,
				0,-1,0,
			];
			
		this.texCoords = [
				0.5,1,
				1,0,
				0.60,0,
				0,0,
				0.40,0,
				0.5,0,
				0.60,0,
				0.40,0,
				1,1
			];

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};

	setPosition(x, y, z)
	{
		this.x = x;
		this.y = y;
		this.z = z;
	}

	setFlight(fly)
	{
		this.straightFlight = fly;
	}


	fly()
	{
		if(this.straightFlight)
		{
			this.x -= 0.2;
			this.y += 2*(5-3.88)/135;

			if(this.x <= 8.6 && this.x >= 8.4)
			{
				this.straightFlight = false;
				this.loopFlight = true;
				this.xRotValue = this.x;
				this.yRotValue = this.y;
				this.angleRot = this.angle;
			}
			else if(this.x <= 1)
			{
				this.straightFlight = false;
				this.fallFlight = true;
			}
		}
		else if(this.loopFlight)
		{
			this.zRot = -1;
			this.angle += 0.1;
			this.x = this.xRotValue + 2*Math.cos(this.angle+Math.PI/2.0)-0.5;
			this.y = this.yRotValue + 2 - 2*Math.cos(this.angle);
			
			if(this.angle > this.angleRot + 2*Math.PI -0.1 && this.angle < this.angleRot + 2*Math.PI +0.1)
			{
				this.straightFlight = true;
				this.loopFlight = false;
				this.angle = this.angleRot;
			}
		}
		else if(this.fallFlight)
		{
			this.angle = Math.PI/2.0;
			this.zRot = 1;
			this.x = 0.1;
			this.y -= 0.1
			if(this.y <= 1.5)
			{
				this.fallFlight = false;
				this.angle = 0;
				this.x = 1;
				this.y = 0.1;
			}
		}
	}
};
