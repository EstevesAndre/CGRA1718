/**
 * MyPaperPlane
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyPaperPlane extends CGFobject
{
	constructor(scene) 
	{
		super(scene);

		this.initBuffers();
	};

	initBuffers() 
	{
		this.vertices = [
				0,0,1,  
				0.25,0,0,
				0.05,0,0,
				-0.25,0,0,
				-0.05,0,0,
				0,-0.05,0,
				0.05,0,0,
				-0.05,0,0,
				0,0,1
			];

		this.indices = [
				0, 1, 2, 
				0,4,3,
				0,2,5,
				0,5,4
			];

		this.normals = [
				0, 0, 1,
				0, 0, 1,
				-Math.cos(Math.PI/4.0), 0, 0,
				0, 0, 1,
				Math.cos(Math.PI/4.0), 0, 0,
				0,0,-1,
				0, 0, 1,
				0, 0, 1,
				0,-1,0,
			];
			
		this.texCoords = [
				0.5,1,
				1,0,
				0.60,0,
				0,0,
				0.40,0,
				0.5,0,
				0.60,0,
				0.40,0,
				1,1
			];

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
