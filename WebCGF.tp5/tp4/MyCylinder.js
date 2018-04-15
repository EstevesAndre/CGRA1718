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

		this.texCoords = [
			];

		var angle = (2* Math.PI) / this.slices;
		var division = 1.0 / this.stacks;
		
		// Here we do 1 division per iteration so it's k <= this.stacks.
		// We actually do k + 1 divisions to have exactly the right number of stacks
		for(let k = 0; k <= this.stacks; k++)
		{
			for(let i = 0; i <= this.slices; i++)
			{
				this.vertices.push(Math.cos(i * angle), Math.sin(i * angle), k * division);
				this.normals.push(Math.cos(i * angle), Math.sin(i * angle), 0);
			
				// Place to texCoords				
				this.texCoords.push(i/this.slices,k*division);
				
				if(k != 0 && i != 0)
				{
					this.indices.push((this.slices+1)*k + i - 1, (this.slices+1)*(k-1) + i - 1, (this.slices+1)*(k-1) + i);
					this.indices.push((this.slices+1)*k + i - 1, (this.slices+1)*(k-1) + i , (this.slices+1)*k + i);
				}
			}
		}
		
		console.log(division);
		console.log("Number of Cylinder vertices: " + this.vertices.length); // slices * (stacks + 1) * 3 <-- geral
		// 8 slices * (20 + 1) * stacks * 3 sizeOf <-- case of 20 stacks and 8 slices

		console.log("Number of Cylinder indices: " + this.indices.length); // 2 * slices * stacks * 3 <-- geral
		// 2 * 8 twoTrianglesPerSlice * 20 stacks * 3 sizeOf <-- case of 20 stacks and 8 slices

		console.log("Number of Cylinder normals: " +this.normals.length); // slices * (stacks + 1) * 3 <-- geral
		// 8 slices * (20 + 1) * stacks * 3 sizeOf <-- case of 20 stacks and 8 slices
		
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
