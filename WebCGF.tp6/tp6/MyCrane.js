/**
 * MyCrane
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCrane extends CGFobject
{
	constructor(scene, metalTex,)
	{
		super(scene);
		
		// Objects
			this.base = new MyTrapezium(this.scene,5,5,0.5,5,0);
			this.support = new MyCylinderwCover(this.scene,24,1);
			this.bars = new MyTrapeziumCylindric(this.scene,16,16,16,0);
			this.bars2 = new MyTrapeziumCylindric(this.scene,0.01,16,5,0);
			this.craneDivisionUp   = new MyTrapeziumCylindric(this.scene, 4,0.01,4,0);
			this.craneDivisionDown = new MyTrapeziumCylindric(this.scene, 0.01,4,4,0);
			this.lanceUp   = new MyTrapeziumCylindric(this.scene,3,0.01,3,0);
			this.lanceDown = new MyTrapeziumCylindric(this.scene,0.01,3,3,0);
			this.triangle = new MyTrapeziumCylindric(this.scene,3,0.01,3,1.5);
			this.rope = new MyCylinderwCover(this.scene,8,2);
			this.iman = new MyCylinderwCover(this.scene,24,1);
		
		// Textures
			this.metalTexture = new CGFappearance(this.scene);
			this.metalTexture.loadTexture("../resources/images/metal.jpg");
			this.metalTexture.setAmbient(0.3,0.5,0.3,1);
			this.metalTexture.setDiffuse(0.2,0.2,0.2,1);
			this.metalTexture.setSpecular(1,1,1,1);
			this.metalTexture.setShininess(120);	

			this.concreteTexture = new CGFappearance(this.scene);
			this.concreteTexture.loadTexture("../resources/images/concrete.jpg");
			this.concreteTexture.setAmbient(0.5,0.5,0.5,1);
			this.concreteTexture.setDiffuse(0.2,0.2,0.2,1);
			this.concreteTexture.setSpecular(0.5,0.5,0.5,1);
			this.concreteTexture.setShininess(120);

			this.craneGridPartOneTexture = new CGFappearance(this.scene);
			this.craneGridPartOneTexture.loadTexture("../resources/images/craneTex.jpg");
			this.craneGridPartOneTexture.setAmbient(0.5,0.5,0.5,1);
			this.craneGridPartOneTexture.setDiffuse(0.2,0.2,0.2,1);
			this.craneGridPartOneTexture.setSpecular(1,1,1,1);
			this.craneGridPartOneTexture.setShininess(120);

			this.craneGridPartTwoTexture = new CGFappearance(this.scene);
			this.craneGridPartTwoTexture.loadTexture("../resources/images/craneTex2.jpg");
			this.craneGridPartTwoTexture.setAmbient(0.5,0.5,0.5,1);
			this.craneGridPartTwoTexture.setDiffuse(0.2,0.2,0.2,1);
			this.craneGridPartTwoTexture.setSpecular(1,1,1,1);
			this.craneGridPartTwoTexture.setShininess(120);

			this.craneGridPartThreeTexture = new CGFappearance(this.scene);
			this.craneGridPartThreeTexture.loadTexture("../resources/images/craneTex3.jpg");
			this.craneGridPartThreeTexture.setAmbient(0.5,0.5,0.5,1);
			this.craneGridPartThreeTexture.setDiffuse(0.2,0.2,0.2,1);
			this.craneGridPartThreeTexture.setSpecular(1,1,1,1);
			this.craneGridPartThreeTexture.setShininess(120);

			this.imanTexture = new CGFappearance(this.scene);
			this.imanTexture.loadTexture("../resources/images/iman.jpg");
			this.imanTexture.setAmbient(0.5,0.5,0.5,1);
			this.imanTexture.setDiffuse(0.2,0.2,0.2,1);
			this.imanTexture.setSpecular(1,1,1,1);
			this.imanTexture.setShininess(120);

			this.default = new CGFappearance(this.scene);
			this.default.setAmbient(0.1,0.1,0.6,1);
			this.default.setDiffuse(0.5,0.5,0.5,1);
			this.default.setSpecular(1,1,1,1);
			this.default.setShininess(120);	

		// Default texture on the parts
			this.gridCranePartOne = this.craneGridPartOneTexture;
			this.gridCranePartTwo = this.craneGridPartTwoTexture;
			this.gridCranePartThree = this.craneGridPartThreeTexture;
		
		// Choose the parts randomly
			this.chooseParts();

		// Variables
			this.baseAngle = Math.PI/3.0;
			this.lanceAngle = Math.PI/10.0;
			this.lanceConstantMov = 1.5*Math.PI/10 * 1/1000;
			this.baseConstantMov = 1.5*Math.PI/10 * 1/1000;
				
		// Verification variables
			this.carAtPos = false;
			this.isMoving = false;
			this.carAttached = false;

		// States
			this.moveToCatchCar = false;
			this.takeCarToDestination = false;
			this.moveDownOnDestination = false;
	};

	display() 
	{		
		//concrete		
		this.concreteTexture.apply();
		this.scene.pushMatrix();
			this.scene.translate(-2,-2,0);
			this.support.display();			
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(2,-2,0);
			this.support.display();			
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-2,2,0);
			this.support.display();			
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(2,2,0);
			this.support.display();			
		this.scene.popMatrix();
		// end concrete

		// platform
		this.scene.pushMatrix();
			this.scene.translate(-2.5,2.5,1);
			this.scene.rotate(Math.PI/2.0,1,0,0);
			this.base.display();			
		this.scene.popMatrix();
		// end platform

		// floor grids
		this.metalTexture.apply();
		this.scene.pushMatrix();
			this.scene.translate(-4,4,2.5);
			this.scene.rotate(Math.PI/2.0,1,0,0);
			this.scene.scale(0.5,0.5,0.5);
			this.bars.display();
		this.scene.popMatrix();
		
		for(let i = 0; i < 4; i++)
		{
			this.scene.pushMatrix();
				this.scene.rotate(-i*Math.PI/2.0,0,0,1);
				this.scene.translate(-4,4,0);
				this.scene.scale(0.5,0.5,0.5);
				this.bars2.display(0x0101);
			this.scene.popMatrix();		
		}
		//end floor grids

		// bottom crane
		for(let i = 0; i < 4; i++)
		{			
			if(i % 2) this.gridCranePartOne.apply();
			else if(i % 3) this.gridCranePartTwo.apply();
			else this.gridCranePartThree.apply();
										
			this.scene.pushMatrix();
				this.scene.rotate(i*Math.PI/2.0,0,0,1);
				this.scene.translate(-1,-1,1.5);
				this.scene.scale(0.5,0.5,0.5);
				this.craneDivisionUp.display(0x1101);
			this.scene.popMatrix();		

			if(i % 2) this.gridCranePartTwo.apply();
			else if(i % 3) this.gridCranePartThree.apply();
			else this.gridCranePartOne.apply();

			this.scene.pushMatrix();
				this.scene.rotate(i*Math.PI/2.0,0,0,1);
				this.scene.translate(-1,1,3.5);
				this.scene.scale(0.5,0.5,0.5);
				this.craneDivisionDown.display(0x1101);
			this.scene.popMatrix();		
		}
		// end bottom crane

		// base part that moves		
		this.scene.pushMatrix();
			this.scene.rotate(this.baseAngle,0,0,1);
			this.basePart();
		this.scene.popMatrix();
		
		// upside part, lance
		this.scene.pushMatrix();		
			this.scene.rotate(this.baseAngle,0,0,1);
			this.lancePart();
		this.scene.popMatrix();						

		// rope part
		this.scene.pushMatrix();
			this.scene.rotate(this.baseAngle,0,0,1);
			this.ropePart();
		this.scene.popMatrix();
	};

	basePart()
	{
		// support, concrete
		this.concreteTexture.apply();
		this.scene.pushMatrix();
			this.scene.translate(0,0,5.5);
			this.scene.scale(1.5,1.5,1);
			this.support.display();
		this.scene.popMatrix();
		
		// crane grids
		for(let i = 0, alt = 6.5; i < 12; i++, alt += 1.5)
		{
			this.scene.pushMatrix();
				this.scene.translate(0,3.5,0.5);
				this.scene.rotate(Math.PI/6.0,1,0,0);
				
				for(let j = 0; j < 4; j++)
				{
					// the random value defined to apply on crane grid
					if(j % 2 && i % 3) this.gridCranePartTwo.apply();
					else if(j % 3 && i % 4) this.gridCranePartThree.apply();
					else this.gridCranePartOne.apply();
				
					this.scene.pushMatrix();
						this.scene.rotate(j*Math.PI/2.0,0,0,1);

						if(i % 2) this.scene.translate(-0.75,-0.75,alt);
						else this.scene.translate(-0.75,0.75,alt);

						this.scene.scale(0.5,0.5,0.5);

						if(i % 2) this.lanceUp.display(0x0111);
						else this.lanceDown.display(0x0111);

					this.scene.popMatrix();
				}
			this.scene.popMatrix();
		}
	};
	
	lancePart()
	{
		// support concrete
		this.concreteTexture.apply();
		this.scene.pushMatrix();
			this.scene.translate(-1,-9.2,22.5);
			this.scene.rotate(Math.PI/6.0,1,0,0);			
			this.scene.rotate(Math.PI/2.0,0,1,0);		
			this.scene.rotate(this.lanceAngle,0,0,1);	
			this.scene.scale(1.3,1.3,2);
			this.support.display();
		this.scene.popMatrix();
		
		let alt = 26.4;

		// crane grids
		this.scene.pushMatrix();
			this.scene.translate(0,3.5,0.5);
			this.scene.rotate(Math.PI/6.0,1,0,0);	
			this.scene.translate(0,0,25.4);
			this.scene.rotate(this.lanceAngle + Math.PI/3,1,0,0);			
			this.scene.translate(0,0,-25.4);

			for(let i = 0; i < 11; i++, alt += 1.5)
			{
				for(let j = 0; j < 4; j++)
				{	
					if(j % 2 && i % 3) this.gridCranePartTwo.apply();
					else if(j % 3 && i % 4) this.gridCranePartThree.apply();
					else this.gridCranePartOne.apply();

					this.scene.pushMatrix();					
						this.scene.rotate(j*Math.PI/2.0,0,0,1);

						if(i % 2) this.scene.translate(-0.75,-0.75,alt);
						else this.scene.translate(-0.75,0.75,alt);

						this.scene.scale(0.5,0.5,0.5);

						if(i % 2) this.lanceUp.display(0x0111);
						else this.lanceDown.display(0x0111);
					this.scene.popMatrix();
				}
			}		
			
			this.scene.translate(-0.75,-0.75,alt+1.5);
			this.scene.rotate(Math.PI,1,0,0);
			
			this.gridCranePartTwo.apply();
			
			this.scene.pushMatrix();		
				this.scene.translate(0,-0.7,0.15);	
				this.scene.scale(0.5,0.5,0.5);
				this.scene.rotate(-Math.PI/6.5,1,0,0);
				this.triangle.display(0x0111);
			this.scene.popMatrix();

			this.scene.pushMatrix();
				this.scene.rotate(-Math.PI/2.0,0,0,1);
				this.scene.scale(0.5,0.5,0.5);
				this.triangle.display(0x0010);
			this.scene.popMatrix();
			
			this.gridCranePartThree.apply();
						
			this.scene.pushMatrix();
				this.scene.translate(0,-0.8,0.15);	
				this.scene.scale(0.5,0.5,0.5);
				this.scene.rotate(Math.PI/6.5,1,0,0);
				this.triangle.display(0x0111);
			this.scene.popMatrix();

			this.gridCranePartOne.apply();
			
			this.scene.pushMatrix();
				this.scene.rotate(-Math.PI/2.0,0,0,1);			
				this.scene.translate(0,1.5,0);
				this.scene.scale(0.5,0.5,0.5);
				this.triangle.display(0x0010);
			this.scene.popMatrix();
		this.scene.popMatrix();
	};
	
	ropePart()
	{
		this.scene.pushMatrix();
			this.scene.translate(0,3.5,0.5);
			this.scene.rotate(Math.PI/6.0,1,0,0);	
			this.scene.translate(0,0,25.4);
			this.scene.rotate(this.lanceAngle + Math.PI/3,1,0,0);			
			this.scene.translate(0,0.01,18.9);
			this.scene.rotate(Math.PI/2 - this.lanceAngle,1,0,0);
			
			this.scene.pushMatrix();
				this.scene.scale(0.05,0.05,1);
				for(let i = 0; i < 9; i++)
				{	
					if(i % 4) this.gridCranePartTwo.apply();
					else if(i % 3) this.gridCranePartThree.apply();
					else this.gridCranePartOne.apply();

					this.rope.display();
					this.scene.translate(0,0,1);
				}			
			this.scene.popMatrix();
			
			this.scene.pushMatrix();			
				this.imanTexture.apply();
				this.scene.translate(0,0,9);
				this.scene.scale(1,1,0.5);
				this.iman.display();
			this.scene.popMatrix();
			
			if(this.carAttached)
			{	
				this.scene.translate(0,0,11.55);
				this.scene.rotate(-Math.PI/2.0,1,0,0);
				this.scene.rotate(this.scene.car.directionCar - Math.PI,0,1,0);
				this.scene.car.display();
			}
		this.scene.popMatrix();
	};

	/*
		Updates the lance Angle
	*/
	setLanceAngle(currTime)
	{
		this.lanceAngle += this.lanceConstantMov * currTime;		
	};

	/*
		Updates the base Angle
	*/
	setBaseAngle(currTime)
	{
		this.baseAngle += this.baseConstantMov * currTime;
	};

	/*
		Sets the boolean variable which make start the crane movement to move the car
	*/
	setCarAtPos(value)
	{
		this.carAtPos = value || false;
	};	

	/*
		Choose the random part for the crane, 3 diferent textures
	*/
	chooseParts()
	{
		let random = Math.floor(Math.random() * 3 + 1);
		
		if(random == 1)
		{		
			this.gridCranePartOne = this.craneGridPartThreeTexture;
			this.gridCranePartTwo = this.craneGridPartOneTexture;
			this.gridCranePartThree = this.craneGridPartTwoTexture;
		}
		else if(random == 2)
		{		
			this.gridCranePartOne = this.craneGridPartTwoTexture;
			this.gridCranePartTwo = this.craneGridPartThreeTexture;
			this.gridCranePartThree = this.craneGridPartOneTexture;
		}
		else if(random == 3)
		{		
			this.gridCranePartOne = this.craneGridPartOneTexture;
			this.gridCranePartTwo = this.craneGridPartThreeTexture;
			this.gridCranePartThree = this.craneGridPartTwoTexture;
		}
	};

	update(currTime)
	{
		if(!this.isMoving && this.carAtPos) // condition to start the crane movement (state machine)
		{
			this.isMoving = true;
			this.moveToCatchCar = true;
		}
		
		if(this.isMoving || this.carAttached) // verification to move crane
		{			
			if(this.moveToCatchCar) // state one
			{
				if(this.craneMovement(currTime,0,Math.PI/4.0) == 1) 
				{
					this.carAttached = true;
					this.takeCarToDestination = true;
					this.moveToCatchCar = false;
				}
			}
			else if (this.takeCarToDestination) // state two
			{
				if(this.craneMovement(currTime,Math.PI/2.0,0) == 1)
				{
					this.takeCarToDestination = false;
					this.moveDownOnDestination = true;
				}
			}		
			else if (this.moveDownOnDestination) // last state
			{
				if(this.craneMovement(currTime,Math.PI/2.0,Math.PI/10.0) == 1)
				{					
					this.takeCarToDestination = false;
					this.carAttached = false;

					// sets position car to destination place
					this.scene.car.xPos = 10.0;
					this.scene.car.yPos = 7.2;
					this.scene.car.zPos = -18.0;

					// angle of rotation of the crane movement
					this.scene.car.directionCar += Math.PI/2.0;
				}
			}				
		}
		else
		{
			/*
				Moves the crane to the given angles on the GUI
			*/
			this.craneMovement(currTime,this.scene.BaseAngle,this.scene.LanceAngle);
		}	
	};

	/*
		Checks if the car position is on the platform to start the crane movement
	*/
	checkCarPos(xPos,yPos,zPos)
	{
		if(xPos <= -15 && xPos >= -19 && yPos == 0 &&
		   zPos >= 5 && zPos <= 7)
		{
			if(!this.carAtPos)
				this.carAtPos = true;	
		}	
		else if(this.carAtPos)
		{
			this.carAtPos = false;
			if(this.isMoving)
				this.isMoving = false;
		}
	};

	/*
		Main function to move crane given the currTime, base angle and lance angle

		Returns 0 if still doesn't reach the given angles (final position)

		Return 1 if completed his movement
	*/
	craneMovement(currTime, baseAngle, lanceAngle)
	{
		if(this.lanceAngle < lanceAngle - Math.abs(this.lanceConstantMov)*currTime/2.0 &&
		   this.baseAngle != baseAngle)
		{
			this.moveBase(currTime,baseAngle);			
		}
		else if(this.lanceAngle > lanceAngle + Math.abs(this.lanceConstantMov)*currTime/2.0 &&
				this.lanceAngle != lanceAngle)
		{
			this.moveLance(currTime,lanceAngle);
		}	
		else if(this.lanceAngle < lanceAngle + Math.abs(this.lanceConstantMov)*currTime/2.0 && 
				this.lanceAngle > lanceAngle - Math.abs(this.lanceConstantMov)*currTime/2.0 &&
				this.baseAngle != baseAngle)
		{
			this.moveBase(currTime,baseAngle);
		}
		else if(this.baseAngle < baseAngle + Math.abs(this.baseConstantMov)*currTime/2.0 && 
				this.baseAngle > baseAngle - Math.abs(this.baseConstantMov)*currTime/2.0 &&
				this.lanceAngle != lanceAngle)
		{
			this.moveLance(currTime,lanceAngle);
		}
		else
		{
			return 1;
		}

		return 0;
	};

	/*
		Moves the lance with the given angle (final angle)
	*/
	moveLance(currTime,lanceAngle)
	{
		if(this.lanceAngle > lanceAngle + Math.abs(this.lanceConstantMov)*currTime/2.0)
		{
			this.lanceConstantMov = this.lanceConstantMov < 0 ? this.lanceConstantMov : -this.lanceConstantMov;
			this.setLanceAngle(currTime);		
		}
		else if(this.lanceAngle < lanceAngle - Math.abs(this.lanceConstantMov)*currTime/2.0)
		{
			this.lanceConstantMov =  this.lanceConstantMov > 0 ? this.lanceConstantMov : -this.lanceConstantMov;
			this.setLanceAngle(currTime);		
		}
		else
		{
			this.lanceAngle = lanceAngle;
		}

	};

	/*
		Moves the base given the angle (final angle)
	*/
	moveBase(currTime, baseAngle)
	{
		if(this.baseAngle > baseAngle + Math.abs(this.baseConstantMov)*currTime/2.0)
		{
			this.baseConstantMov = this.baseConstantMov < 0 ? this.baseConstantMov : -this.baseConstantMov;			
			this.setBaseAngle(currTime);
		}
		else if(this.baseAngle < baseAngle - Math.abs(this.baseConstantMov)*currTime/2.0)
		{
			this.baseConstantMov =  this.baseConstantMov > 0 ? this.baseConstantMov : -this.baseConstantMov;
			this.setBaseAngle(currTime);
		}
		else
		{
			this.baseAngle = baseAngle;
		}
	};
};
