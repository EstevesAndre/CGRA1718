/**
 * MyCylinder
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCylinder extends CGFobject
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
		this.vertices = [
				];

		this.indices = [
			];

		this.normals = [
			];

		var angle = (2* Math.PI) / this.slices;
		var division = 1.0 / this.stacks;
		
		for(let k = 0; k < this.stacks; k++)
		{
			this.vertices.push(Math.cos(angle), Math.sin(angle), k * division);
			this.vertices.push(Math.cos(angle), Math.sin(angle), (k+1) * division);
			this.normals.push(Math.cos((angle)), Math.sin((angle)), 0);
			this.normals.push(Math.cos((angle)), Math.sin((angle)), 0);

			for(let i = 0; i < this.slices; i++)
			{
				this.vertices.push(Math.cos((i+1) * angle), Math.sin((i+1) * angle), k * division);
				this.vertices.push(Math.cos((i+1) * angle), Math.sin((i+1) * angle), (k+1) * division);

				this.indices.push(2*i + k*2*(this.slices + 1), 2*i + 2 + k*2*(this.slices + 1), 2*i + 3 + k*2*(this.slices + 1));
				this.indices.push(2*i + 3 + k*2*(this.slices + 1), 2*i + 1 + k*2*(this.slices + 1), 2*i + k*2*(this.slices + 1));

				this.normals.push(Math.cos(((i+1) * angle)), Math.sin(((i+1) * angle)), 0);
				this.normals.push(Math.cos(((i+1) * angle) ), Math.sin(((i+1) * angle)), 0);
			}
		}
		/*	
		console.log(division);
		console.log(this.vertices.length);
		console.log(this.indices.length);
		console.log(this.normals.length);
		*/
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
