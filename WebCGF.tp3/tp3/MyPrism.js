/**
 * MyPrism
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyPrism extends CGFobject
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

		var angle = (2* Math.PI) / this.slices;
		var division = 1.0 / this.stacks;
		
		for(let k = 0; k < this.stacks; k++)
		{
			for(let i = 0; i < this.slices; i++)
			{
				this.vertices.push(Math.cos(i * angle), Math.sin(i * angle), k * division);
				this.vertices.push(Math.cos(i * angle), Math.sin(i * angle), (k+1) * division);
				this.vertices.push(Math.cos((i+1) * angle), Math.sin((i+1) * angle), k * division);
				this.vertices.push(Math.cos((i+1) * angle), Math.sin((i+1) * angle), (k+1) * division);

				this.indices.push(4*i + k*4*this.slices, 4*i + 2 + k*4*this.slices, 4*i + 3 + k*4*this.slices);
				this.indices.push(4*i + 3 + k*4*this.slices, 4*i + 1 + k*4*this.slices, 4*i + k*4*this.slices);

				this.normals.push(Math.cos((i * angle) + angle / 2), Math.sin((i * angle) + angle / 2), 0);
				this.normals.push(Math.cos((i * angle) + angle / 2), Math.sin((i * angle) + angle / 2), 0);
				this.normals.push(Math.cos((i * angle) + angle / 2), Math.sin((i * angle) + angle / 2), 0);
				this.normals.push(Math.cos((i * angle) + angle / 2), Math.sin((i * angle) + angle / 2), 0);
			}
		}
		
		console.log(division);
		console.log(this.vertices.length);
		console.log(this.indices.length);
		console.log(this.normals.length);
	
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
