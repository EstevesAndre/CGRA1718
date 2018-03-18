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
			for(let i = 0; i < this.slices; i++)
			{
				this.vertices.push(Math.cos(i * angle), Math.sin(i * angle), k * division);
				this.normals.push(Math.cos(i * angle), Math.sin(i * angle), 0);
				if(k != 0 && i != 0)
				{
					this.indices.push(this.slices*k + i - 1, this.slices*(k-1) + i - 1, this.slices*(k-1) + i);
					this.indices.push(this.slices*k + i - 1, this.slices*(k-1) + i , this.slices*k + i);
					if(i == 7)
					{
						this.indices.push(this.slices * (k-1) + i, this.slices * (k - 1), this.slices*k+i);
						this.indices.push(this.slices*k+i, this.slices*(k-1), this.slices*k);
					}
				}
			}
		}
		
		//console.log(division);
		console.log("Number of Cylinder vertices: " + this.vertices.length); // slices * stacks * 3 <-- geral
		// 8 slices * 20 stacks * 3 sizeOf <-- case of 20 stacks and 8 slices

		console.log("Number of Cylinder indices: " + this.indices.length); // 2 * slices * (stacks-1) * 3 <-- geral
		// 2 * 8 twoTrianglesPerSlice * 19 blocksConnected * 3 sizeOf <-- case of 20 stacks and 8 slices

		console.log("Number of Cylinder normals: " +this.normals.length); // slices * stacks * 3 <-- geral
		// 8 slices * 20 stacks * 3 sizeOf <-- case of 20 stacks and 8 slices
		
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
