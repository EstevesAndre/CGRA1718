/**
 * MyHandWheel
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyHandWheel extends CGFobject
{

	constructor(scene, wheelTex, metalTex)
	{
		super(scene);

		this.wheelTex = typeof wheelTex !== 'undefined' ? wheelTex : "handWheel.jpg";
		this.metalTex = typeof metalTex !== 'undefined' ? metalTex : "metal.jpg";
		
		this.angle = 0;

		this.lado = new MyObjectsFrontCircule(this.scene, 24,0.8);
		this.cylinderExterior = new MyCylinder(this.scene, 24,1,1);
		this.cylinderInterior = new MyCylinder(this.scene, 24,1,-1);
		this.sphere = new MySemiSphere(this.scene,24,12);
		this.cylinder = new MyCylinderwCover(this.scene,24,1);

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

	setAngle(angle)
	{
		this.angle = angle;
	};

	display() 
	{		
		this.scene.pushMatrix();

			this.handwheelText.apply();
			this.scene.rotate(this.angle,0,0,1);

			this.scene.pushMatrix();
				this.scene.translate(0,0,0.1);
				this.lado.display();		
			this.scene.popMatrix();
	
			this.scene.pushMatrix();
				this.scene.translate(0,0,-0.1);
				this.scene.rotate(Math.PI,0,1,0);
				this.lado.display();		
			this.scene.popMatrix();

			this.scene.pushMatrix();
				this.scene.translate(0,0,-0.1);
				this.scene.scale(1,1,0.2);
				this.cylinderExterior.display();		
			this.scene.popMatrix();
	
			this.scene.pushMatrix();
				this.scene.translate(0,0,-0.1);
				this.scene.scale(0.8,0.8,0.2);
				this.cylinderInterior.display();		
			this.scene.popMatrix();
	
			this.centerWheel.apply();
			
			this.scene.pushMatrix();
				this.scene.scale(0.2,0.2,0.2);
				this.sphere.display();	
				this.scene.rotate(Math.PI,0,1,0);
				this.sphere.display();					
			this.scene.popMatrix();
				
			this.scene.pushMatrix();
				this.scene.translate(0.18,0,0);
				this.scene.rotate(Math.PI/2.0,0,1,0);			
				this.scene.scale(0.1,0.1,0.62);
				this.cylinder.display();
			this.scene.popMatrix();
	
			this.scene.pushMatrix();
				this.scene.rotate(2*Math.PI/3,0,0,1);
				this.scene.translate(0.18,0,0);
				this.scene.rotate(Math.PI/2.0,0,1,0);			
				this.scene.scale(0.1,0.1,0.62);
				this.cylinder.display();
			this.scene.popMatrix();
	
			this.scene.pushMatrix();
				this.scene.rotate(4*Math.PI/3,0,0,1);
				this.scene.translate(0.18,0,0);
				this.scene.rotate(Math.PI/2.0,0,1,0);			
				this.scene.scale(0.1,0.1,0.62);
				this.cylinder.display();
			this.scene.popMatrix();
						
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0,0,-0.18);
			this.scene.rotate(Math.PI,0,1,0);			
			this.scene.scale(0.1,0.1,0.62);
			this.cylinder.display();
		this.scene.popMatrix();
		
	};
};
