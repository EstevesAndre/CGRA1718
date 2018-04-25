/**
 * MySemiCylinder
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MySemiCylinder extends CGFobject
{
	constructor(scene, slices, stacks, angle)
	{
		super(scene);
		this.slices = slices;
		this.stacks = stacks;		
		this.rot = angle;

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

		var angle = this.rot / this.slices;
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
				 
				this.normals.push(Math.cos(i * angle),
								  Math.sin(i * angle),
								  0);
			
				// Place to texCoords				
				this.texCoords.push(k*division,i/this.slices);
				
				if(k != 0 && i != 0)
				{
					this.indices.push((this.slices+1)*k + i - 1, 
									  (this.slices+1)*(k-1) + i - 1, 
									  (this.slices+1)*(k-1) + i );
									  
					this.indices.push((this.slices+1)*k + i - 1, 
									   (this.slices+1)*(k-1) + i,
									  (this.slices+1)*k + i);
				}
			}
		}

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
