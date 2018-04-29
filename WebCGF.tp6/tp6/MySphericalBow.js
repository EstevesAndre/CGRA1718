/**
 * MySphericalBow
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MySphericalBow extends CGFobject
{
	constructor(scene, slicesCircle, sliceArc, side, rotation)
	{
		super(scene);
		this.slicesCircle = slicesCircle;
		this.sliceArc = sliceArc;
		this.rotation = rotation || (2*Math.PI);
		
		// TUNEL
		if(side != -1 && side != 1)
		{
			this.side = 1;
		}
		
		this.initBuffers();
	}


	initBuffers() 
	{
		this.vertices = [];

		this.indices = [];

		this.normals = [];

		this.texCoords = [];
		
		var angleArc = this.rotation / this.sliceArc;
		var angleCircle = (2*Math.PI)/this.slicesCircle;

		for(let angleS = 0; angleS <= 1; angleS++)
		{
			
			for(let slices = 0; slices <= this.slicesCircle; slices++)
			{
				this.vertices.push(1+ Math.cos(slices*angleCircle),
									Math.sin(slices*angleCircle),
									0);

				this.normals.push(this.side == 1 ? Math.cos(slices*angleCircle) : - Math.cos(slices*angleCircle),
								  this.side == 1 ? Math.sin(slices*angleCircle) : - Math.sin(slices*angleCircle),
								  0);
			
				this.texCoords.push(angleS*1/this.sliceArc, slices*1/this.slicesCircle);
				
				if(angleS != 0 && slices != 0)
				{
					console.log(this.vertices.size);
					console.log((this.slicesCircle+1) * (angleS-1) + slices);
					console.log((this.slicesCircle+1) * (angleS-1) + slices-1);
					console.log((this.slicesCircle+1) * (angleS) + slices-1);					
					console.log("-");
				/*	
					this.indices.push((this.slicesCircle+1) * (angleS-1) + slices ,
									  (this.slicesCircle+1) * (angleS-1) + slices - 1,
									  (this.slicesCircle+1) * angleS + slices-1);*/
									  this.indices.push(0,1,this.slicesCircle+1);
				}	
			}		
		}



		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
