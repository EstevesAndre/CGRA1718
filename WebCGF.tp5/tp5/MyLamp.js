/**
 * MyLamp
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyLamp extends CGFobject
{
	constructor(scene, slices, stacks)
	{
		super(scene);
		this.slices = slices;
		this.stacks = stacks;
		this.initBuffers();
	}

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
			if(k == this.stacks)
			{
				this.vertices.push(Math.cos((this.slices-1) * angle)*Math.cos(Math.asin(division*(k))), Math.sin((this.slices-1) * angle)*Math.cos(Math.asin(division*(k))), k * division);
				this.normals.push(Math.cos((this.slices-1) * angle), Math.sin((this.slices-1) * angle), Math.cos(Math.asin(division*(k))));
				this.texCoords.push(0,0);
					
				for(let i = 0; i < this.slices; i++)
				{
					this.indices.push(this.slices*k, this.slices*(k-1) + i - 1, this.slices*(k-1) + i);
					
					if(i == (this.slices - 1))
					{
						this.indices.push(this.slices * (k-1) + i, this.slices * (k - 1), this.slices*k);
					}
				}	
			}
			else
			{
				for(let i = 0; i < this.slices; i++)
				{
					this.vertices.push(Math.cos(i * angle)*Math.cos(Math.asin(division*(k))), Math.sin(i * angle)*Math.cos(Math.asin(division*(k))), k * division);
					this.normals.push(Math.cos(i * angle), Math.sin(i * angle), Math.cos(Math.asin(division*(k))));
					this.texCoords.push(i/this.slices,k * division);
					
					if(k != 0 && i != 0)
					{
						this.indices.push(this.slices*k + i - 1, this.slices*(k-1) + i - 1, this.slices*(k-1) + i);
						this.indices.push(this.slices*k + i - 1, this.slices*(k-1) + i , this.slices*k + i);
						if(i == (this.slices - 1))
						{
							this.indices.push(this.slices * (k-1) + i, this.slices * (k - 1), this.slices*k+i);
							this.indices.push(this.slices*k+i, this.slices*(k-1), this.slices*k);
						}
					}
				}
			}
			
		
		}
		
		console.log(division);
		console.log("Number of SemiSphere vertices: " + this.vertices.length);
		console.log("Number of SemiSphere indices: " + this.indices.length);
		console.log("Number of SemiSphere normals: " +this.normals.length); 
		
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
