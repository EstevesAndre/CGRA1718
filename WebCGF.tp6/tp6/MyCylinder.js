/**
 * MyCylinder
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCylinder extends CGFobject
{
	constructor(scene, slices, stacks, side = 1)
	{
		super(scene);
		this.slices = slices;
		this.stacks = stacks;		
		this.side = side;
		
		if(side != -1 && side != 1)
		{
			this.side = 1;
		}
		
		this.initBuffers();
	};


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
				this.vertices.push(Math.cos(i * angle), 
								   Math.sin(i * angle),
								   k * division);
				 
				this.normals.push(this.side == 1 ? Math.cos(i * angle) : - Math.cos(i * angle),
								  this.side == 1 ? Math.sin(i * angle) : - Math.sin(i * angle),
								  0);
			
				// Place to texCoords				
				this.texCoords.push(1-i/this.slices,k*division);
				
				if(k != 0 && i != 0)
				{
					this.indices.push((this.slices+1)*k + i - 1, 
									  this.side == 1 ? (this.slices+1)*(k-1) + i - 1 : (this.slices+1)*(k-1) + i, 
									  this.side == 1 ? (this.slices+1)*(k-1) + i : (this.slices+1)*(k-1) + i - 1);
									  
					this.indices.push((this.slices+1)*k + i - 1, 
									  this.side == 1 ? (this.slices+1)*(k-1) + i : (this.slices+1)*k + i,
									  this.side == 1 ? (this.slices+1)*k + i : (this.slices+1)*(k-1) + i);
				}
			}
		}

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
