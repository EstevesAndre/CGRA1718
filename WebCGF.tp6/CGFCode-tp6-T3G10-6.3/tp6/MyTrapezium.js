/**
 * MyTrapezium
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTrapezium extends CGFobject
{
	constructor(scene, B, b, h, H, offset) 
	{
		super(scene);

		this.b = b;
		this.B = B;
		this.h = h;
		this.H = H;
		this.offset = offset;
		
		this.angle_R = 0;
		this.angle_L = 0;
		
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
		
		this.xRight = Math.cos(this.angle_R);
		this.yRight = Math.sin(this.angle_R);
		this.xLeft = Math.cos(this.angle_L);
		this.yLeft = Math.sin(this.angle_L);

		this.initBuffers();
	};

	initBuffers() 
	{
		this.vertices = [
				0,0,0,
				0,0,0,
				0,0,0,
				this.offset,this.h, 0,
				this.offset,this.h, 0,
				this.offset,this.h, 0,
				this.offset + this.b, this.h, 0,
				this.offset + this.b, this.h, 0,
				this.offset + this.b, this.h, 0,
				this.B , 0,0,
				this.B , 0,0,
				this.B , 0,0,

				0,0,this.H,
				0,0,this.H,
				0,0,this.H,
				this.offset,this.h, this.H,
				this.offset,this.h, this.H,
				this.offset,this.h, this.H,
				this.offset + this.b, this.h, this.H,
				this.offset + this.b, this.h, this.H,
				this.offset + this.b, this.h, this.H,
				this.B , 0,this.H,
				this.B , 0,this.H,
				this.B , 0,this.H,				
			];

		this.indices = [
				// left side
				0,3,6,
				0,6,9,
				// right side
				18,15,12,
				18,12,21,
				// upper side
				7,4,16,
				7,16,19,
				// down side
				10,13,1,
				10,22,13,
				// diagonal left
				5,2,17,
				17,2,14,
				// diagonal right
				20,23,8,
				8,23,11
			];

		this.normals = [
				0,0,-1,// 0
				0,-1,0,// 1
				this.xLeft,this.yLeft,0, // 2
				0,0,-1,// 3
				0,1,0, // 4
				this.xLeft,this.yLeft,0, // 5 
				0,0,-1,// 6
				0,1,0, // 7
				this.xRight,this.yRight,0, // 8
				0,0,-1,// 9
				0,-1,0,// 10
				this.xRight,this.yRight,0, // 11
				0,0,1, // 12
				0,-1,0,// 13
				this.xLeft,this.yLeft,0, // 14
				0,0,1, // 15
				0,1,0, // 16
				this.xLeft,this.yLeft,0, // 17
				0,0,1, // 18
				0,1,0, // 19
				this.xRight,this.yRight,0, // 20
				0,0,1, // 21
				0,-1,0,// 22
				this.xRight,this.yRight,0  // 23					
			];
			
		
		this.texCoords = [
				0,1,
				0,0,
				0,1,//2
				0,0,
				0,0,
				0,0,//5
				1,0,
				1,0,
				1,0,
				1,1,//9
				1,0,
				1,1,
				0,1,
				0,1,//13
				1,1,
				0,0,
				0,1,
				1,0,
				1,0,
				1,1,//19
				0,0,
				1,1,
				1,1,
				0,1 //23
			];

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
