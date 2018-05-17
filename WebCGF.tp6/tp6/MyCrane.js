/**
 * MyCrane
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCrane extends CGFobject
{
	constructor(scene, wheelTex, metalTex)
	{
		super(scene);

		this.wheelTex = typeof wheelTex !== 'undefined' ? wheelTex : "handWheel.jpg";
		this.metalTex = typeof metalTex !== 'undefined' ? metalTex : "metal.jpg";
		

		this.lado = new MyObjectsFrontCircule(this.scene, 24,0.8);
		this.cylinderExterior = new MyCylinder(this.scene, 24,1,1);
		this.cylinderInterior = new MyCylinder(this.scene, 24,1,-1);
		this.sphere = new MySemiSphere(this.scene,24,12);
		this.cylinder = new MyCylinderwCover(this.scene,true,24,1);

		this.handwheelText = new CGFappearance(this.scene);
		this.handwheelText.loadTexture("../resources/images/" + this.wheelTex);
		this.handwheelText.setAmbient(0.3,0.3,0.3,1);
		this.handwheelText.setDiffuse(0.5,0.5,0.5,1);
		this.handwheelText.setSpecular(1,1,1,1);
		this.handwheelText.setShininess(120);	

		this.centerWheel = new CGFappearance(this.scene);
		this.centerWheel.loadTexture("../resources/images/" + this.metalTex);
		this.centerWheel.setAmbient(0.1,0.1,0.1,1);
		this.centerWheel.setDiffuse(0,0,0,1);
		this.centerWheel.setSpecular(1,1,1,1);
		this.centerWheel.setShininess(120);
	};

	display() 
	{		
		this.scene.pushMatrix();

		this.scene.popMatrix();
		
	};
};
