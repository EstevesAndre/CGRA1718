/**
 * MyCarModel
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCarModel extends CGFobject
{
	constructor(scene,texture,texture2,texture3)
	{
		super(scene);

		texture = typeof texture !== 'undefined' ? texture : "flames.jpg";
		texture2 = typeof texture2 !== 'undefined' ? texture2 : "yellow.jpg";
		texture3 = typeof texture3 !== 'undefined' ? texture3 : "grey.jpg";
		
		this.modelTexture = new CGFappearance(this.scene);
		this.modelTexture.loadTexture("../resources/images/"+texture);
		this.modelTexture.setAmbient(0.4,0.4,0.4,1);
		this.modelTexture.setDiffuse(0.1,0.1,0.1,1);

		this.modelhexsTexture = new CGFappearance(this.scene);
		this.modelhexsTexture.loadTexture("../resources/images/carrr.jpg");
		this.modelhexsTexture.setAmbient(0.2,0.2,0.2,1);
		this.modelhexsTexture.setDiffuse(0,0,0,1);
	
		this.modelYellowTexture = new CGFappearance(this.scene);
		this.modelYellowTexture.loadTexture("../resources/images/"+texture2);
		this.modelYellowTexture.setAmbient(0.4,0.4,0.4,1);
		this.modelYellowTexture.setDiffuse(0.1,0.1,0.1,1);

		this.modelGreyTexture = new CGFappearance(this.scene);
		this.modelGreyTexture.loadTexture("../resources/images/"+texture3);
		this.modelGreyTexture.setAmbient(0.4,0.4,0.4,1);
		this.modelGreyTexture.setDiffuse(0.1,0.1,0.1,1);

		this.modelFrontTexture = new CGFappearance(this.scene);
		this.modelFrontTexture.loadTexture("../resources/images/lights.jpg");
		this.modelFrontTexture.setAmbient(0.3,0.3,0.3,1);
		this.modelFrontTexture.setDiffuse(0.2,0.2,0.2,1);

		this.modelInsideTexture = new CGFappearance(this.scene);
		this.modelInsideTexture.setAmbient(0.05,0.05,0.05,1);
		this.modelInsideTexture.setDiffuse(0,0,0,1);

		this.modelUpsideTexture = new CGFappearance(this.scene);
		this.modelUpsideTexture.setAmbient(0.05,0.05,0.05,1);
		this.modelUpsideTexture.setDiffuse(0,0,0,1);

		// modelTexture
		this.sidehex1 = new MyTrapezium(this.scene,2.05,3.5,2.04,0.01,-0.5);
		this.sidehex2 = new MyTrapezium(this.scene,1.9,0,1.8,0.01,1.35);
		this.sidehex3 = new MyTrapezium(this.scene,2.05,2.05,2.04,0.01,-0.5);
		this.sideup4 = new MyTrapezium(this.scene,4,5.5,1.7,0.01,-0.8);
		this.sideup5 = new MyTrapezium(this.scene,1.9,0,1.83,0.01,0.95);
		this.sideup6 = new MyTrapezium(this.scene,2.05,2.05,1.6,0.01,0);
		this.sideup7 = new MyTrapezium(this.scene,0,1.42,1.6,0.01,0);
		this.sideup8 = new MyTrapezium(this.scene,1.57,2.5,1.6,0.01,0);
		this.inside8 = new MyTrapezium(this.scene,1.65,2.4,1.3,0.01,0);
		
		// modelYellowTexture
		this.middle2 = new MyTrapezium(this.scene,1.5,2,0.85,0.01,-0.5);
		this.middle3 = new MyTrapezium(this.scene,1.5,2.05,0.85,0.01,0);
		this.middle4 = new MyTrapezium(this.scene,2,3,0.5,0.01,-0.5);
		this.middle5 = new MyTrapezium(this.scene,0.4,1.9,0.85,0.01,0.55);
		this.middle6 = new MyTrapezium(this.scene,0,2,0.5,0.01,0.5);

		// modelGreyTexture
		this.down1 = new MyTrapezium(this.scene,2.05,2.05,1.57,0.01,0);
		this.down2 = new MyTrapezium(this.scene,3,3,1.57,0.01,0);
		this.down3 = new MyTrapezium(this.scene,1.05,1.05,1.57,0.01,0);
		this.down4 = new MyTrapezium(this.scene,3,3,1.57,0.01,0);
		this.down5 = new MyTrapezium(this.scene,4.05,4.05,1.57,0.01,0);

		// modelhexsTexture
		this.hex1 = new MyTrapezium(this.scene,0.4,0.4,2.4,0.01,0.5);
		this.hex2 = new MyTrapezium(this.scene,0.4,0.4,2,0.01,0);

		// modelFrontTexture
		this.front = new MyTrapezium(this.scene,1.6,1.6,1.6,0.01,0);

		// modelUpsideTexture
		this.up1 = new MyTrapezium(this.scene,1.61,1.61,4,0.01,0);
		this.up2 = new MyTrapezium(this.scene,1.61,2.45,1.2,0.01,0);
		this.up3 = new MyTrapezium(this.scene,2.3,2.3,4,0.01,0);
		
		// modelInsideTexture
		this.inside1 = new MyTrapezium(this.scene,2.3,2.3,1.5,0.01,0);
		this.inside2 = new MyTrapezium(this.scene,2.3,2.1,2.1,0.01,-0.5);
		this.inside3 = new MyTrapezium(this.scene,1.5,1.5,1.8,0.01,0);
		this.inside4 = new MyTrapezium(this.scene,1.5,1.5,3,0.01,0);
		this.inside5 = new MyTrapezium(this.scene,1.5,1.5,2,0.01,0);
		this.inside6 = new MyTrapezium(this.scene,1.5,1.5,0.9,0.01,0);
		this.inside7 = new MyTrapezium(this.scene,1.5,1.5,3.2,0.01,0);
		
		
		// aux
		this.chassi = new MyCarChassi(this.scene,1);	
		

	};


	display() 
	{	
		this.modelTexture.apply();

		this.scene.pushMatrix();
			this.scene.translate(0,0.9,2.4);
			this.sidehex1.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-2.05,0.9,2.4);
			this.sidehex3.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(3.64,1.4,1.55);
			this.scene.rotate(-Math.PI/42,0,0,1);
			this.scene.rotate(Math.PI/5.8,1,0,0);
			this.sideup4.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(2.04,0.88,2.39);
			this.scene.rotate(Math.PI/6.5,0,1,0);
			this.scene.rotate(Math.PI/11,0,0,1);
			this.scene.rotate(Math.PI/11.4,1,0,0);
			this.sidehex2.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
			this.scene.translate(-3.65,1.4,1.54);
			this.scene.rotate(Math.PI/13,1,0,0);
			this.scene.rotate(-Math.PI/18,0,0,1);
			this.scene.rotate(-Math.PI/6,0,1,0);
			this.sideup5.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-7.7,1.4,1.6);
			this.sideup6.display();
			this.scene.translate(2.05,0,0);			
			this.sideup6.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-3.61,1.39,1.61);
			this.scene.rotate(-Math.PI/5,0,1,0);
			this.sideup7.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(7.65,1.1,0);
			this.scene.rotate(-Math.PI/6.0,0,0,1);
			this.scene.rotate(-Math.PI/2.0,0,1,0);
			this.sideup8.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(4.48,1.55,0);
			this.scene.rotate(9.8*Math.PI/16.0,0,0,1);
			this.scene.rotate(-Math.PI/2.0,1,0,0);
			this.scene.rotate(-Math.PI/2.0,0,0,1);
			this.inside8.display();
		this.scene.popMatrix();	

		this.modelYellowTexture.apply();

		this.scene.pushMatrix();
			this.scene.translate(-1.5,0.16,2);
			this.scene.rotate(Math.PI/6.1,1,0,0);
			this.middle2.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0,0.16,2);
			this.scene.rotate(Math.PI/6.1,1,0,0);
			this.middle3.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-1,-0.09,1.57);
			this.scene.rotate(Math.PI/3,1,0,0);
			this.middle4.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(1.5,0.15,2);
			this.scene.rotate(Math.PI/5,1,0,0);	
			this.scene.rotate(Math.PI/15,0,0,1);		
			this.scene.rotate(Math.PI/15,0,1,0);
			this.scene.rotate(Math.PI/6.1,1,0,0);	
			//this.middle5.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(1,-0.09,1.57);
			this.scene.rotate(-Math.PI/25,1,0,0);	
			this.scene.rotate(Math.PI/6.5,0,0,1);		
			this.scene.rotate(Math.PI/40,0,1,0);
			this.scene.rotate(Math.PI/1.8,1,0,0);	
			//this.middle6.display();
		this.scene.popMatrix();

		this.modelGreyTexture.apply();

		this.scene.pushMatrix();
			this.scene.translate(-1.05,-0.11,1.57);
			this.scene.rotate(-Math.PI/2.0,1,0,0);
			this.down1.display();
		this.scene.popMatrix();	

		this.scene.pushMatrix();
			this.scene.translate(-3.65,1.4,1.57);
			this.scene.rotate(-Math.PI/6.0,0,0,1);
			this.scene.rotate(-Math.PI/2.0,1,0,0);
			this.down2.display();
		this.scene.popMatrix();	

		this.scene.pushMatrix();
			this.scene.translate(1.0,-0.107,0);
			this.scene.rotate(Math.PI/6.0,0,0,1);
			this.scene.rotate(Math.PI/2.0,1,0,0);
			this.down2.display();
		this.scene.popMatrix();	
		
		this.scene.pushMatrix();
			this.scene.translate(3.60,1.38,1.57);
			this.scene.rotate(-Math.PI/45,0,0,1);				
			this.scene.rotate(-Math.PI/2.0,1,0,0);
			this.down3.display();
		this.scene.popMatrix();	

		this.scene.pushMatrix();
			this.scene.translate(4.64,1.31,1.57);
			this.scene.rotate(-Math.PI/45,0,0,1);				
			this.scene.rotate(-Math.PI/2.0,1,0,0);
			this.down4.display();
		this.scene.popMatrix();	

		this.scene.pushMatrix();
			this.scene.translate(-7.7,1.4,1.57);
			this.scene.rotate(-Math.PI/2.0,1,0,0);
			this.down5.display();
		this.scene.popMatrix();	

		this.modelhexsTexture.apply();
		
		this.scene.pushMatrix();
			this.scene.translate(2.5,3,2.3);
			this.hex1.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(3,5.5,2.2);
			this.scene.rotate(-Math.PI/2.0,1,0,0);
			this.hex2.display();
		this.scene.popMatrix();
		
		this.modelFrontTexture.apply();

		this.scene.pushMatrix();
			this.scene.translate(-7.7,1.4,0);
			this.scene.rotate(-Math.PI/2.0,0,1,0);
			this.front.display();
		this.scene.popMatrix();

		this.modelUpsideTexture.apply();

		this.scene.pushMatrix();
			this.scene.translate(-7.7,3,0);
			this.scene.rotate(-Math.PI/2.0,1,0,0);
			this.scene.rotate(-Math.PI/2.0,0,0,1);
			this.up1.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-3.7,3,0);
			this.scene.rotate(-Math.PI/2.0,1,0,0);
			this.scene.rotate(-Math.PI/2.0,0,0,1);
			this.up2.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-1,5.6,0);
			this.scene.rotate(-Math.PI/2.0,1,0,0);
			this.scene.rotate(-Math.PI/2.0,0,0,1);
			this.up3.display();
		this.scene.popMatrix();

		this.modelInsideTexture.apply();

		this.scene.pushMatrix();
			this.scene.translate(-2.5,3,0);
			this.scene.rotate(-Math.PI/8,0,0,1);
			this.scene.rotate(-Math.PI/2.0,1,0,0);
			this.scene.rotate(-Math.PI/2.0,0,0,1);
			this.inside1.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-1.1,2.45,0);
			this.scene.rotate(-3*Math.PI/4,0,0,1);
			this.scene.rotate(-Math.PI/2.0,1,0,0);
			this.scene.rotate(-Math.PI/2.0,0,0,1);
			this.inside2.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-1,0.12,0);
			this.scene.rotate(13.3*Math.PI/16,0,0,1);
			this.scene.rotate(-Math.PI/2.0,1,0,0);
			this.scene.rotate(-Math.PI/2.0,0,0,1);
			this.inside3.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
			this.scene.translate(1.0,0.1,0);	
			this.scene.rotate(2.7*Math.PI/16.0,0,0,1);	
			this.scene.rotate(-Math.PI/2.0,1,0,0);
			this.scene.rotate(-Math.PI/2.0,0,0,1);
			this.inside4.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
			this.scene.translate(-1.0,0.1,0);
			this.scene.rotate(-Math.PI/2.0,1,0,0);
			this.scene.rotate(-Math.PI/2.0,0,0,1);
			this.inside5.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
			this.scene.translate(3.55,1.6,0);
			this.scene.rotate(-Math.PI/2.0,1,0,0);
			this.scene.rotate(-Math.PI/2.0,0,0,1);
			this.inside6.display();
		this.scene.popMatrix();	

		this.scene.pushMatrix();
			this.scene.translate(4.45,1.5,0);
			this.scene.rotate(-Math.PI/45.0,0,0,1);
			this.scene.rotate(-Math.PI/2.0,1,0,0);
			this.scene.rotate(-Math.PI/2.0,0,0,1);
			this.inside7.display();
		this.scene.popMatrix();	

	};
};
