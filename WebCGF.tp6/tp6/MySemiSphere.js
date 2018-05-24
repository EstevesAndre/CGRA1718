/**
 * MySemiSphere
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MySemiSphere extends CGFobject
{
	constructor(scene, slices, stacks, debug)
	{
		super(scene);

		this.slices = slices;
		this.stacks = stacks;
		
		// debug variable used to confirm the initBuffers function
		this.debug = debug || false;
		
		this.initBuffers();
	};

	initBuffers() 
	{
		this.vertices = [];

		this.indices = [];

		this.normals = [];

		this.texCoords = [];

		var angle = (2* Math.PI) / this.slices;
		var division = 1.0 / this.stacks;

		for(let k = 0; k <= this.stacks; k++)
		{
			// last stack
			if(k == this.stacks)
			{
				this.vertices.push(Math.cos((this.slices-1) * angle)*Math.cos(Math.asin(division*(k))), Math.sin((this.slices-1) * angle)*Math.cos(Math.asin(division*(k))), k * division);
				this.normals.push(Math.cos((this.slices-1) * angle), Math.sin((this.slices-1) * angle), Math.cos(Math.asin(division*(k))));
				this.texCoords.push(0.5,0.5);
					
				for(let i = 0; i <= this.slices; i++)
				{
					this.indices.push((this.slices+1)*k,(this.slices+1)*(k-1) + i, (this.slices+1)*(k-1) + i + 1);				
				}	
			}
			else
			{
				if(this.debug)
					console.log("Stack = " + (k + 1));
				
				for(let i = 0; i <= this.slices; i++)
				{
					this.vertices.push(Math.cos(i * angle)*Math.cos(Math.asin(division*(k))), Math.sin(i * angle)*Math.cos(Math.asin(division*(k))), k * division);
					this.normals.push(Math.cos(i * angle), Math.sin(i * angle), Math.cos(Math.asin(division*(k))));
									
					this.texCoords.push( (Math.cos(i * angle)*Math.cos(Math.asin(division*(k))) ) / 2.0 + 0.5, -(Math.sin(i * angle)*Math.cos(Math.asin(division*(k))) ) / 2.0 + 0.5);					
						
					if(this.debug)
					{		
						console.log("Slice = " + i);			
						console.log("3s -> " + ((Math.cos(i * angle)*Math.cos(Math.asin(division*(k))) ) / 2.0 + 0.5));
						console.log("3t -> " + (-(Math.sin(i * angle)*Math.cos(Math.asin(division*(k))) ) / 2.0 + 0.5));				
					}
					

					if(k != 0 && i != 0)
					{
						this.indices.push((this.slices+1)*k + i - 1, (this.slices+1)*(k-1) + i - 1, (this.slices+1)*(k-1) + i);
						this.indices.push((this.slices+1)*k + i - 1, (this.slices+1)*(k-1) + i , (this.slices+1)*k + i);
						
					}
				}
			}
		}
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
