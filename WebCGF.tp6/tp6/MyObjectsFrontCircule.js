/**
 * MyObjectsFrontCircule
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyObjectsFrontCircule extends CGFobject
{
	constructor(scene, slices, radius)
	{
		super(scene);
		this.slices = slices;
		this.radius = radius;

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
		
		for(let i = 0; i <= this.slices; i++)
		{
			this.vertices.push(Math.cos(i * angle), Math.sin(i * angle), 0);
			this.normals.push(0,0,1);
			//this.texCoords.push(0.5 + Math.cos(i * angle) / 2, 0.5 - Math.sin(i * angle) / 2);
			this.texCoords.push(i/this.slices,0);
			this.vertices.push(Math.cos(i * angle)*this.radius, Math.sin(i * angle)*this.radius, 0);
			this.normals.push(0,0,1);			
			//this.texCoords.push((0.5 + Math.cos(i * angle)/2)*this.radius, (0.5 - Math.sin(i * angle) / 2)*this.radius );
			this.texCoords.push(i/this.slices,1);
			if(i != 0)
			{			
				this.indices.push(2*i,2*i-1,2*(i-1));
				this.indices.push(2*i,2*i+1,2*i-1);
			}
		}
		
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
