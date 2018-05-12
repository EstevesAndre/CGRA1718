/**
 * MyCarModel
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCarModel extends CGFobject
{
	constructor(scene,	textureSide,
						textureSideDown,
						textureDown,
						textureFrontTop,
						textureInside,
						textureInsideDown,
						textureTop,
						textureLights )
	{
		super(scene);

		textureSide = (	(typeof textureSide !== 'undefined') && 
						(textureSide !== "")
						) ? textureSide : "flames.jpg";	
				this.modelSideTexture = new CGFappearance(this.scene);
				this.modelSideTexture.loadTexture("../resources/images/"+textureSide);
				this.modelSideTexture.setAmbient(0.4,0.4,0.4,1);
				this.modelSideTexture.setDiffuse(0.1,0.1,0.1,1);


		textureSideDown = ( (typeof textureSideDown !== 'undefined') &&
							(textureSideDown !== "")
							) ? textureSideDown : "yellow.jpg";
				this.modelSideDownTexture = new CGFappearance(this.scene);
				this.modelSideDownTexture.loadTexture("../resources/images/"+textureSideDown);
				this.modelSideDownTexture.setAmbient(0.4,0.4,0.4,1);
				this.modelSideDownTexture.setDiffuse(0.4,0.4,0.4,1);


		textureDown = ( (typeof textureDown !== 'undefined') &&
						(textureDown !== "")
						) ? textureDown : "grey.jpg";		
				this.modelDownTexture = new CGFappearance(this.scene);
				this.modelDownTexture.loadTexture("../resources/images/"+textureDown);
				this.modelDownTexture.setAmbient(0.4,0.4,0.4,1);
				this.modelDownTexture.setDiffuse(0.1,0.1,0.1,1);


		textureFrontTop = typeof textureFrontTop !== 'undefined' ? textureFrontTop : "";
				if(textureFrontTop == "")
				{
					this.modelFrontTopTexture = new CGFappearance(this.scene);
					this.modelFrontTopTexture.setAmbient(0.05,0.05,0.05,1);
					this.modelFrontTopTexture.setDiffuse(0,0,0,1);
				}
				else
				{
					this.modelFrontTopTexture = new CGFappearance(this.scene);
					this.modelFrontTopTexture.loadTexture("../resources/images/"+textureFrontTop);
					this.modelFrontTopTexture.setAmbient(0.5,0.5,0.5,1);
					this.modelFrontTopTexture.setDiffuse(0.2,0.2,0.2,1);
				}

		textureTop = typeof textureTop !== 'undefined' ? textureTop : "";
				if(textureTop == "")
				{
					this.modelTopTexture = new CGFappearance(this.scene);
					this.modelTopTexture.setAmbient(0.05,0.05,0.05,1);
					this.modelTopTexture.setDiffuse(0,0,0,1);
				}
				else
				{
					this.modelTopTexture = new CGFappearance(this.scene);
					this.modelTopTexture.loadTexture("../resources/images/"+textureTop);
					this.modelTopTexture.setAmbient(0.5,0.5,0.5,1);
					this.modelTopTexture.setDiffuse(0.2,0.2,0.2,1);
				}


		textureInside = ( (typeof textureInside !== 'undefined') &&
						  (textureInside !== "")
						  ) ? textureInside : "interior.jpg";
				this.modelInsideTexture = new CGFappearance(this.scene);
				this.modelInsideTexture.loadTexture("../resources/images/"+textureInside);
				this.modelInsideTexture.setAmbient(0.5,0.5,0.5,1);
				this.modelInsideTexture.setDiffuse(0,0,0,1);


		textureInsideDown = ( (typeof textureInsideDown !== 'undefined') &&
							  (textureInsideDown !== "")
							  ) ? textureInsideDown : "interiorGround.jpg";
				this.modelInsideDownTexture = new CGFappearance(this.scene);
				this.modelInsideDownTexture.loadTexture("../resources/images/"+textureInsideDown);
				this.modelInsideDownTexture.setAmbient(0.5,0.5,0.5,1);
				this.modelInsideDownTexture.setDiffuse(0,0,0,1);

	
		textureLights = ( (typeof textureLights !== 'undefined') &&
						  (textureLights !== "")
						  ) ? textureLights : "lights.jpg";
				this.modelLigtsFrontTexture = new CGFappearance(this.scene);
				this.modelLigtsFrontTexture.loadTexture("../resources/images/"+textureLights);
				this.modelLigtsFrontTexture.setAmbient(0.3,0.3,0.3,1);
				this.modelLigtsFrontTexture.setDiffuse(0.2,0.2,0.2,1);


		// generic detail
				this.modelhexsTexture = new CGFappearance(this.scene);
				this.modelhexsTexture.loadTexture("../resources/images/hex.jpg");
				this.modelhexsTexture.setAmbient(0.4,0.4,0.4,1);
				this.modelhexsTexture.setDiffuse(0.4,0.4,0.4,1);
	

		// modelSideTexture
		this.sideUpMiddle = new MyTrapezium(this.scene,2.05,3.5,2.04,0.01,-0.5);
		this.sideUpMiddleBack = new MyTrapezium(this.scene,1.9,0,1.8,0.01,1.35);
		this.sideUpSideWheel = new MyTrapezium(this.scene,2.05,2.05,2.04,0.01,-0.5);
		
		this.sideUpSideBack = new MyTrapezium(this.scene,4,5.5,1.7,0.01,-0.8);
		this.sideUpMiddleFront = new MyTrapezium(this.scene,1.9,0,1.83,0.01,0.95);
		this.sideUpFront = new MyTrapezium(this.scene,2.05,2.05,1.6,0.01,0);
		this.sideUpNearFront = new MyTrapezium(this.scene,0,1.42,1.6,0.01,0);
		this.sideUpBack = new MyTrapezium(this.scene,1.57,2.5,1.6,0.01,0);
		this.divisionSeatsBag = new MyTrapezium(this.scene,1.65,2.4,1.3,0.01,0);
		
		// modelSideDownTexture
		this.sideMiddleLeft = new MyTrapezium(this.scene,1.5,2,0.85,0.01,-0.5);
		this.sideMiddleRight = new MyTrapezium(this.scene,1.5,2.05,0.85,0.01,0);
		this.sideDown = new MyTrapezium(this.scene,2,3,0.5,0.01,-0.5);
		
		//those are commented
		this.sideDownLR = new MyTrapezium(this.scene,1,1.9,0.85,0.01,0.45);
		this.sideDownLeft = new MyTrapezium(this.scene,0,1.08,0.64,0.01,0.3);
		this.sideDownRight = new MyTrapezium(this.scene,0,1,0.62,0.01,0.3);

		// modelDownTexture
		this.downMiddle = new MyTrapezium(this.scene,2.05,2.05,1.57,0.01,0);
		this.downMiddleSides = new MyTrapezium(this.scene,3,3,1.57,0.01,0);
		this.downMiddleBack = new MyTrapezium(this.scene,1.05,1.05,1.57,0.01,0);
		this.downBack = new MyTrapezium(this.scene,3,3,1.57,0.01,0);
		this.downFront = new MyTrapezium(this.scene,4.05,4.05,1.57,0.01,0);

		// modelhexsTexture
		this.upBar = new MyTrapezium(this.scene,0.4,0.4,2.4,0.01,0.5);
		this.sideBar = new MyTrapezium(this.scene,0.4,0.4,2,0.01,0);

		// modelLigtsFrontTexture
		this.front = new MyTrapezium(this.scene,1.6,1.6,1.6,0.01,0);

		// modelFrontTopTexture
		this.frontUp = new MyTrapezium(this.scene,1.61,1.61,4,0.01,0);
		this.frontUpBack = new MyTrapezium(this.scene,1.61,2.45,1.2,0.01,0);
		
		// modelTopTexture
		this.roof = new MyTrapezium(this.scene,2.3,2.3,4,0.01,0);

		// modelInsideTexture
		this.insideAtHandWheel = new MyTrapezium(this.scene,2.2,2.3,1.5,0.01,0);
		this.insideUnderWheel = new MyTrapezium(this.scene,2.4,1.5,2.1,0.01,0);
		
		// modelInsideDownTexture
		this.insideDownFront = new MyTrapezium(this.scene,1.5,1.5,1.8,0.01,0);
		this.insideDownBackSeat = new MyTrapezium(this.scene,1.5,1.5,3,0.01,0);
		this.insideDownUnderSeats = new MyTrapezium(this.scene,1.5,1.5,2,0.01,0);
		this.insideBack = new MyTrapezium(this.scene,1.5,1.5,0.9,0.01,0);
		this.insideUnderCrate = new MyTrapezium(this.scene,1.5,1.5,3.2,0.01,0);

	};


	display() 
	{	
		this.modelSideTexture.apply();

		this.scene.pushMatrix();
			this.scene.translate(0,0.9,2.4);
			this.sideUpMiddle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-2.05,0.9,2.4);
			this.sideUpSideWheel.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(3.64,1.4,1.55);
			this.scene.rotate(-Math.PI/42,0,0,1);
			this.scene.rotate(Math.PI/5.8,1,0,0);
			this.sideUpSideBack.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(2.04,0.88,2.39);
			this.scene.rotate(Math.PI/6.5,0,1,0);
			this.scene.rotate(Math.PI/11,0,0,1);
			this.scene.rotate(Math.PI/11.4,1,0,0);
			this.sideUpMiddleBack.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
			this.scene.translate(-3.65,1.4,1.54);
			this.scene.rotate(Math.PI/13,1,0,0);
			this.scene.rotate(-Math.PI/18,0,0,1);
			this.scene.rotate(-Math.PI/6,0,1,0);
			this.sideUpMiddleFront.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-7.7,1.4,1.6);
			this.sideUpFront.display();
			this.scene.translate(2.05,0,0);			
			this.sideUpFront.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-3.61,1.39,1.61);
			this.scene.rotate(-Math.PI/5,0,1,0);
			this.sideUpNearFront.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(7.65,1.1,0);
			this.scene.rotate(-Math.PI/6.0,0,0,1);
			this.scene.rotate(-Math.PI/2.0,0,1,0);
			this.sideUpBack.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(4.48,1.55,0);
			this.scene.rotate(9.8*Math.PI/16.0,0,0,1);
			this.scene.rotate(-Math.PI/2.0,1,0,0);
			this.scene.rotate(-Math.PI/2.0,0,0,1);
			this.divisionSeatsBag.display();
		this.scene.popMatrix();	

		this.modelSideDownTexture.apply();

		this.scene.pushMatrix();
			this.scene.translate(-1.5,0.16,2);
			this.scene.rotate(Math.PI/6.1,1,0,0);
			this.sideMiddleLeft.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0,0.16,2);
			this.scene.rotate(Math.PI/6.1,1,0,0);
			this.sideMiddleRight.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-1,-0.09,1.57);
			this.scene.rotate(Math.PI/3,1,0,0);
			this.sideDown.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(1.52,0.17,2.02);
			this.scene.rotate(Math.PI/5.4,1,0,0);	
			this.scene.rotate(Math.PI/5.4,0,1,0);
			this.scene.rotate(Math.PI/10.4,1,0,0);	
			this.sideDownLR.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
			this.scene.translate(-1.47,0.16,2.04);
			this.scene.rotate(Math.PI,0,1,0);	
			this.scene.rotate(-Math.PI/4.8,1,0,0);	
			this.scene.rotate(-Math.PI/6.1,0,1,0);
			this.scene.rotate(-Math.PI/14,1,0,0);	
			this.sideDownLR.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(1,-0.1,1.57);
			this.scene.rotate(Math.PI/25,1,1,0);	
			this.scene.rotate(-Math.PI/3.5,1,0,0);	
			this.scene.rotate(Math.PI/7,0,0,1);	
			this.scene.rotate(Math.PI/1.45,1,0,0);	
			this.sideDownRight.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
			this.scene.translate(-1,-0.15,1.64);
			this.scene.rotate(Math.PI,0,1,0);	
			this.scene.rotate(-Math.PI/20,1,1,0);	
			this.scene.rotate(Math.PI/3.3,1,0,0);	
			this.scene.rotate(Math.PI/7,0,0,1);	
			this.scene.rotate(-Math.PI/1.5,1,0,0);	
			this.sideDownLeft.display();
		this.scene.popMatrix();

		this.modelDownTexture.apply();

		this.scene.pushMatrix();
			this.scene.translate(-1.05,-0.11,1.57);
			this.scene.rotate(-Math.PI/2.0,1,0,0);
			this.downMiddle.display();
		this.scene.popMatrix();	

		this.scene.pushMatrix();
			this.scene.translate(-3.65,1.4,1.57);
			this.scene.rotate(-Math.PI/6.0,0,0,1);
			this.scene.rotate(-Math.PI/2.0,1,0,0);
			this.downMiddleSides.display();
		this.scene.popMatrix();	

		this.scene.pushMatrix();
			this.scene.translate(1.0,-0.107,0);
			this.scene.rotate(Math.PI/6.0,0,0,1);
			this.scene.rotate(Math.PI/2.0,1,0,0);
			this.downMiddleSides.display();
		this.scene.popMatrix();	
		
		this.scene.pushMatrix();
			this.scene.translate(3.60,1.38,1.57);
			this.scene.rotate(-Math.PI/45,0,0,1);				
			this.scene.rotate(-Math.PI/2.0,1,0,0);
			this.downMiddleBack.display();
		this.scene.popMatrix();	

		this.scene.pushMatrix();
			this.scene.translate(4.64,1.31,1.57);
			this.scene.rotate(-Math.PI/45,0,0,1);				
			this.scene.rotate(-Math.PI/2.0,1,0,0);
			this.downBack.display();
		this.scene.popMatrix();	

		this.scene.pushMatrix();
			this.scene.translate(-7.7,1.4,1.57);
			this.scene.rotate(-Math.PI/2.0,1,0,0);
			this.downFront.display();
		this.scene.popMatrix();	

		this.modelhexsTexture.apply();
		
		this.scene.pushMatrix();
			this.scene.translate(2.5,3,2.3);
			this.upBar.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(3,5.5,2.2);
			this.scene.rotate(-Math.PI/2.0,1,0,0);
			this.sideBar.display();
		this.scene.popMatrix();
		
		this.modelLigtsFrontTexture.apply();

		this.scene.pushMatrix();
			this.scene.translate(-7.7,1.4,0);
			this.scene.rotate(-Math.PI/2.0,0,1,0);
			this.front.display();
		this.scene.popMatrix();

		this.modelFrontTopTexture.apply();

		this.scene.pushMatrix();
			this.scene.translate(-7.7,3,0);
			this.scene.rotate(-Math.PI/2.0,1,0,0);
			this.scene.rotate(-Math.PI/2.0,0,0,1);
			this.frontUp.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-3.7,3,0);
			this.scene.rotate(-Math.PI/2.0,1,0,0);
			this.scene.rotate(-Math.PI/2.0,0,0,1);
			this.frontUpBack.display();
		this.scene.popMatrix();

		this.modelTopTexture.apply();

		this.scene.pushMatrix();
			this.scene.translate(-1,5.6,0);
			this.scene.rotate(-Math.PI/2.0,1,0,0);
			this.scene.rotate(-Math.PI/2.0,0,0,1);
			this.roof.display();
		this.scene.popMatrix();

		this.modelInsideTexture.apply();

		this.scene.pushMatrix();
			this.scene.translate(-2.5,3,0);
			this.scene.rotate(-Math.PI/8,0,0,1);
			this.scene.rotate(-Math.PI/2.0,1,0,0);
			this.scene.rotate(-Math.PI/2.0,0,0,1);
			this.insideAtHandWheel.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-1.1,2.45,0);
			this.scene.rotate(-3.02*Math.PI/4.0,0,0,1);
			this.scene.rotate(-Math.PI/2.0,1,0,0);
			this.scene.rotate(-Math.PI/2.0,0,0,1);
			this.insideUnderWheel.display();
		this.scene.popMatrix();

		this.modelInsideDownTexture.apply();
		
		this.scene.pushMatrix();
			this.scene.translate(-1,0.12,0);
			this.scene.rotate(13.3*Math.PI/16,0,0,1);
			this.scene.rotate(-Math.PI/2.0,1,0,0);
			this.scene.rotate(-Math.PI/2.0,0,0,1);
			this.insideDownFront.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
			this.scene.translate(1.0,0.1,0);	
			this.scene.rotate(2.7*Math.PI/16.0,0,0,1);	
			this.scene.rotate(-Math.PI/2.0,1,0,0);
			this.scene.rotate(-Math.PI/2.0,0,0,1);
			this.insideDownBackSeat.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
			this.scene.translate(-1.0,0.1,0);
			this.scene.rotate(-Math.PI/2.0,1,0,0);
			this.scene.rotate(-Math.PI/2.0,0,0,1);
			this.insideDownUnderSeats.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
			this.scene.translate(3.55,1.6,0);
			this.scene.rotate(-Math.PI/2.0,1,0,0);
			this.scene.rotate(-Math.PI/2.0,0,0,1);
			this.insideBack.display();
		this.scene.popMatrix();	

		this.scene.pushMatrix();
			this.scene.translate(4.45,1.5,0);
			this.scene.rotate(-Math.PI/45.0,0,0,1);
			this.scene.rotate(-Math.PI/2.0,1,0,0);
			this.scene.rotate(-Math.PI/2.0,0,0,1);
			this.insideUnderCrate.display();
		this.scene.popMatrix();	

	};
};
