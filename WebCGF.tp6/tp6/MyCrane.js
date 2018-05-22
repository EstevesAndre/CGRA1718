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
		
		this.craneGrid1Texture = new CGFappearance(this.scene);
		this.craneGrid1Texture.loadTexture("../resources/images/craneTex.jpg");
		this.craneGrid1Texture.setAmbient(0.5,0.5,0.5,1);
		this.craneGrid1Texture.setDiffuse(0.2,0.2,0.2,1);
		this.craneGrid1Texture.setSpecular(1,1,1,1);
		this.craneGrid1Texture.setShininess(120);

		this.craneGrid2Texture = new CGFappearance(this.scene);
		this.craneGrid2Texture.loadTexture("../resources/images/craneTex2.jpg");
		this.craneGrid2Texture.setAmbient(0.5,0.5,0.5,1);
		this.craneGrid2Texture.setDiffuse(0.2,0.2,0.2,1);
		this.craneGrid2Texture.setSpecular(1,1,1,1);
		this.craneGrid2Texture.setShininess(120);

		this.craneGrid3Texture = new CGFappearance(this.scene);
		this.craneGrid3Texture.loadTexture("../resources/images/craneTex3.jpg");
		this.craneGrid3Texture.setAmbient(0.5,0.5,0.5,1);
		this.craneGrid3Texture.setDiffuse(0.2,0.2,0.2,1);
		this.craneGrid3Texture.setSpecular(1,1,1,1);
		this.craneGrid3Texture.setShininess(120);

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

		//default
		this.gridCrane1 = this.craneGrid1Texture;
		this.gridCrane2 = this.craneGrid2Texture;
		this.gridCrane3 = this.craneGrid3Texture;
		this.chooseParts();

		this.baseAngle = Math.PI/3.0;
		this.lanceAngle = Math.PI/10.0;

		this.lanceConstantMov = 1.5*Math.PI/10 * 1/1000;
		this.baseConstantMov = 1.5*Math.PI/10 * 1/1000;
				
		this.carAtPos = false;
		this.isMoving = false;
		this.carAttached = false;

		//states
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
		//end grids

		// bottom crane
		for(let i = 0; i < 4; i++)
		{			
			if(i % 2) this.gridCrane1.apply();
			else if(i % 3) this.gridCrane2.apply();
			else this.gridCrane3.apply();
										
			this.scene.pushMatrix();
				this.scene.rotate(i*Math.PI/2.0,0,0,1);
				this.scene.translate(-1,-1,1.5);
				this.scene.scale(0.5,0.5,0.5);
				this.craneDivisionUp.display(0x1101);
			this.scene.popMatrix();		

			if(i % 2) this.gridCrane2.apply();
			else if(i % 3) this.gridCrane3.apply();
			else this.gridCrane1.apply();

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
					if(j % 2 && i % 3) this.gridCrane2.apply();
					else if(j % 3 && i % 4) this.gridCrane3.apply();
					else this.gridCrane1.apply();
				
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
					if(j % 2 && i % 3) this.gridCrane2.apply();
					else if(j % 3 && i % 4) this.gridCrane3.apply();
					else this.gridCrane1.apply();

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
			
			this.gridCrane2.apply();
			
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
			
			this.gridCrane3.apply();
						
			this.scene.pushMatrix();
				this.scene.translate(0,-0.8,0.15);	
				this.scene.scale(0.5,0.5,0.5);
				this.scene.rotate(Math.PI/6.5,1,0,0);
				this.triangle.display(0x0111);
			this.scene.popMatrix();

			this.gridCrane1.apply();
			
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
					if(i % 4) this.gridCrane2.apply();
					else if(i % 3) this.gridCrane3.apply();
					else this.gridCrane1.apply();

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

	setLanceAngle(currTime)
	{
		this.lanceAngle += this.lanceConstantMov * currTime;		
	};

	setBaseAngle(currTime)
	{
		this.baseAngle += this.baseConstantMov * currTime;
	};

	setCarAtPos(value)
	{
		this.carAtPos = value || false;
	};	

	chooseParts()
	{
		let random = Math.floor(Math.random() * 3 + 1);
		
		if(random == 1)
		{		
			this.gridCrane1 = this.craneGrid3Texture;
			this.gridCrane2 = this.craneGrid1Texture;
			this.gridCrane3 = this.craneGrid2Texture;
		}
		else if(random == 2)
		{		
			this.gridCrane1 = this.craneGrid2Texture;
			this.gridCrane2 = this.craneGrid3Texture;
			this.gridCrane3 = this.craneGrid1Texture;
		}
		else if(random == 3)
		{		
			this.gridCrane1 = this.craneGrid1Texture;
			this.gridCrane2 = this.craneGrid3Texture;
			this.gridCrane3 = this.craneGrid2Texture;
		}
	};

	update(currTime)
	{
		if(!this.isMoving && this.carAtPos)
		{
			this.isMoving = true;
			this.moveToCatchCar = true;
		}
		
		if(this.isMoving || this.carAttached)
		{			
			if(this.moveToCatchCar)
			{
				if(this.craneMovement(currTime,0,Math.PI/4.0) == 1) 
				{
					this.carAttached = true;
					this.takeCarToDestination = true;
					this.moveToCatchCar = false;
				}
			}
			else if (this.takeCarToDestination)
			{
				if(this.craneMovement(currTime,Math.PI/2.0,0) == 1)
				{
					this.takeCarToDestination = false;
					this.moveDownOnDestination = true;
				}
			}		
			else if (this.moveDownOnDestination)
			{
				if(this.craneMovement(currTime,Math.PI/2.0,Math.PI/10.0) == 1)
				{
					this.takeCarToDestination = false;
					this.carAttached = false;
					this.scene.car.xPos = 10.0;
					this.scene.car.yPos = 7.6;
					this.scene.car.zPos = -18.0;
					this.scene.car.directionCar += Math.PI/2.0;
				}
			}				
		}
		else
		{
			this.craneMovement(currTime,this.scene.BaseAngle,this.scene.LanceAngle);
		}	
	};

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
