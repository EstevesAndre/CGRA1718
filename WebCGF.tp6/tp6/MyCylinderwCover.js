/**
 * MyCylinderwCover
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCylinderwCover extends CGFobject
{
	constructor(scene, slices, stacks, side = 1)
	{
		super(scene);
		
		this.cylinder = new MyCylinder(this.scene,slices,stacks);
		this.cover = new MyObjectsFrontCircule(this.scene,slices,0);
	}


	display() 
	{
		this.scene.pushMatrix();
			this.cylinder.display();
			this.scene.translate(0,0,1);
			this.cover.display();
			this.scene.translate(0,0,-1);
			this.scene.rotate(Math.PI,0,1,0);
			this.cover.display();
		this.scene.popMatrix();
	};
};
