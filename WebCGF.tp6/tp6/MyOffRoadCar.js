/**
 * MyOffRoadCar
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyOffRoadCar extends CGFobject
{

	constructor(scene, MaxFrontSpeed, MaxBackSpeed)
	{
		super(scene);

		// Objects
			this.wheelRot = new MyWheel(this.scene,true);		
			this.wheelBack = new MyWheel(this.scene,false);		
			this.chassi = new MyCarChassi(this.scene,0);	
			this.model = new MyCarModel(this.scene);
			this.handWheel = new MyHandWheel(this.scene);
			this.seat = new MySeat(this.scene);
			this.wheelDamper = new MyWheelDamper(this.scene);
			this.crate = new MyUnitCubeQuad(this.scene);

		// Texture
			this.chassiAppearance = new CGFappearance(this.scene);
			this.chassiAppearance.loadTexture("../resources/images/chassi.jpg");
			this.chassiAppearance.setAmbient(0.25,0.25,0.25,1);
			this.chassiAppearance.setDiffuse(0,0,0,1);

			this.crateTex = new CGFappearance(this.scene);
			this.crateTex.loadTexture("../resources/images/crate.jpg");
		
		// Variables for car
			this.MaxFrontSpeed = MaxFrontSpeed;
			this.MaxBackSpeed = MaxBackSpeed;
			// Position
			this.xPos = 0.0;
			this.yPos = 0.0;
			this.zPos = 0.0;

			this.speed = 0.0;
			this.directionCar = Math.PI;
			this.wheelDirection = 0.0;
	};

	/*
		Increments/Decrements the current speed of the car as well as the wheels speed given the constante to add (currTime * speed_Constant)
		
		If the car is attached to the crane or y position is diferent of zero '0' the velocity is set to zero.		
	*/
	setSpeed(speed_Constant)
	{
		if(this.scene.crane.carAttached || this.yPos != 0)
		{
			this.setVelocity(0.0);
		}
		else
		{
			this.speed += speed_Constant;

			if(this.speed > this.MaxFrontSpeed)
				this.speed = this.MaxFrontSpeed;

			else if(this.speed < -this.MaxBackSpeed)
				this.speed = -this.MaxBackSpeed;

			if(this.speed < 0.01 && this.speed > -0.01)
				this.setVelocity(0.0);

			this.wheelRot.speed = this.speed;
			this.wheelBack.speed = this.speed;
		}
	};

	/*
		Increments/Decrements the wheel direction.

		Delimit the wheel direction verifying the direction with the limit angles.
	*/
	setWheelDirection(wheel_Direction_Constant)
	{
		this.wheelDirection += wheel_Direction_Constant;

		if(this.wheelDirection > WHEEL_DIRECTION_MAX)
		{
			this.wheelDirection = WHEEL_DIRECTION_MAX;
		}
		else if (this.wheelDirection < - WHEEL_DIRECTION_MAX)
		{
			this.wheelDirection = - WHEEL_DIRECTION_MAX;
		}

		this.wheelRot.updateDirection(this.wheelDirection);
	};

	/*
		Updates the direction Car according to the wheelDirection variable

		Keeps the directionCar variable between 0 and 2*Math.PI radians
	*/
	setDirectionCar()
	{
		if(this.speed < 0)			
			this.directionCar -= this.wheelDirection/10;
		else
			this.directionCar += this.wheelDirection/10;
		
		this.directionCar = this.directionCar >= 0 ? this.directionCar % (2*Math.PI) : this.directionCar % (2*Math.PI) + (2*Math.PI);			
	};

	/*
		Updates the car position.
		path parameter is the possible path of the car to check the colisions on the terrain
	*/
	updatePos(path)
	{			
		// next position of the car	
		this.xPos += this.speed * Math.cos(this.directionCar);
		this.zPos -= this.speed * Math.sin(this.directionCar);
		// auxiliar
		let ratio = path.length / GROUND_SIZE_WIDTH;
		let x = 0;
		let z = 0;
				
		if(this.speed > 0)
		{
			if(this.directionCar > 3*Math.PI/2.0 || this.directionCar < Math.PI/2.0) // 1º and 4º quadrant -> Ox axis
			{
				x = Math.round( (this.xPos + GROUND_SIZE_WIDTH/2.0) * ratio + Math.abs(Math.cos(this.directionCar)) - 0.1);
			}
			else // 2º and 3º quadrant -> Ox axis
			{
				x = Math.round( (this.xPos + GROUND_SIZE_WIDTH/2.0) * ratio - Math.abs(Math.cos(this.directionCar)) - 0.6);
			}

			if(this.directionCar > Math.PI && this.directionCar < 2*Math.PI) // 3º and 4º quadrant -> Oz axis
			{
				z = Math.round( (this.zPos + GROUND_SIZE_HEIGHT/2.0) * ratio + Math.abs(Math.sin(this.directionCar))  - 0.1);
			}
			else // 1º and 2º quadrant -> Oz axis
			{
				z = Math.round( (this.zPos + GROUND_SIZE_HEIGHT/2.0) * ratio - Math.abs(Math.sin(this.directionCar)) - 0.6);
			}
		}
		else // speed <= 0
		{
			if(this.directionCar > 3*Math.PI/2.0 || this.directionCar < Math.PI/2.0) // 1º and 4º quadrant -> Ox axis
			{
				x = Math.round( (this.xPos + GROUND_SIZE_WIDTH/2.0) * ratio - Math.abs(Math.cos(this.directionCar)) - 0.8);
			}
			else // 2º and 3º quadrant -> Ox axis
			{
				x = Math.round( (this.xPos + GROUND_SIZE_WIDTH/2.0) * ratio + Math.abs(Math.cos(this.directionCar)));
			}

			if(this.directionCar > Math.PI && this.directionCar < 2*Math.PI) // 3º and 4º quadrant -> Oz axis
			{
				z = Math.round( (this.zPos + GROUND_SIZE_HEIGHT/2.0) * ratio - Math.abs(Math.sin(this.directionCar)) - 0.8);
			}
			else // 1º and 2º quadrant -> Oz axis
			{
				z = Math.round( (this.zPos + GROUND_SIZE_HEIGHT/2.0) * ratio + Math.abs(Math.sin(this.directionCar)) - 0.2);
			}
		}

		/*
			verifies if the position of the car on the block is possible
			If the block is 0 the car change the position.
			Otherwise the car keeps the same position as the last render.
		*/
		if(path[z][x] != 0)
		{
			this.xPos -= this.speed * Math.cos(this.directionCar);
			this.zPos += this.speed * Math.sin(this.directionCar);			
			this.setVelocity(0.0);
		}
		else // verifies if the car is at the end of the ground, don't let the car pass the ground, in this case 50x50
		{
			if(this.xPos > GROUND_SIZE_WIDTH/2.0 - 1.5)
			{
				this.xPos = GROUND_SIZE_WIDTH/2.0 - 1.5;
				this.setVelocity(0.0);
			}

			else if(this.xPos < -GROUND_SIZE_WIDTH/2.0 + 1.5)
			{
				this.xPos = -GROUND_SIZE_WIDTH/2.0 + 1.5;
				this.setVelocity(0.0);
			}

			else if (this.zPos > GROUND_SIZE_HEIGHT/2.0 - 1.5)
			{
				this.zPos = GROUND_SIZE_HEIGHT/2.0 - 1.5;
				this.setVelocity(0.0);
			}

			else if (this.zPos < -GROUND_SIZE_HEIGHT/2.0 + 1.5)
			{
				this.zPos = -GROUND_SIZE_HEIGHT/2.0 + 1.5;			
				this.setVelocity(0.0);
			}
			
			// the direction of the car is set just if the speed is greater than 0.01 or less than -0.01
			if(this.speed >= 0.01 || this.speed <= -0.01) 
			{
				this.setDirectionCar();
			}
		}
		
	};

	setVelocity(speed)
	{
		this.speed = speed;	
		this.wheelRot.speed = speed;
		this.wheelBack.speed = speed;
	};

	display() 
	{					
		this.scene.pushMatrix();
			this.scene.translate(-1.2,0.51,-1.1);			
			this.scene.scale(0.45,0.45,0.45);
			this.scene.rotate(this.wheelRot.direction,0,1,0);
			this.scene.rotate(this.wheelRot.angle,0,0,1);	
			this.wheelRot.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();				
			this.scene.translate(-1.2,0.52,-0.68);			
			this.scene.scale(0.3,0.3,0.3);
			this.scene.rotate(-Math.PI/5,1,0,0);
			this.wheelDamper.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();			
			this.scene.translate(1.2,0.51,-1.1);			
			this.scene.scale(0.45,0.45,0.45);
			this.scene.rotate(this.wheelBack.angle,0,0,1);	
			this.wheelBack.display();
		this.scene.popMatrix();	
			
		this.scene.pushMatrix();				
			this.scene.translate(1.2,0.51,-0.68);			
			this.scene.scale(0.3,0.3,0.3);
			this.scene.rotate(-Math.PI/5,1,0,0);			
			this.wheelDamper.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();	
			this.scene.translate(1.2,0.51,1.1);			
			this.scene.scale(0.45,0.45,0.45);
			this.scene.rotate(Math.PI,1,0,0);			
			this.scene.rotate(-this.wheelBack.angle,0,0,1);	
			this.wheelBack.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();				
			this.scene.translate(1.2,0.51,0.68);				
			this.scene.scale(0.3,0.3,0.3);
			this.scene.rotate(Math.PI,1,0,0);
			this.scene.rotate(Math.PI/5,1,0,0);			
			this.wheelDamper.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();			
			this.scene.translate(-1.2,0.51,1.1);			
			this.scene.scale(0.45,0.45,0.45);
			this.scene.rotate(Math.PI,1,0,0);
			this.scene.rotate(-this.wheelRot.direction,0,1,0);	
			this.scene.rotate(-this.wheelRot.angle,0,0,1);	
			this.wheelRot.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();							
			this.scene.translate(-1.2,0.51,0.68);							
			this.scene.scale(0.3,0.3,0.3);
			this.scene.rotate(Math.PI,1,0,0);
			this.scene.rotate(Math.PI/5,1,0,0);			
			this.wheelDamper.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();				
			this.scene.scale(0.20,0.25,0.25);
			this.scene.translate(1.4,3,0.1);
			this.seat.display();
			this.scene.translate(0,0,-2.2);
			this.seat.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();		
			this.scene.translate(-0.25,1.35,0.3);
			this.scene.scale(0.25,0.25,0.25);	
			this.scene.rotate(Math.PI/6,0,0,1);
			this.scene.rotate(Math.PI/2,0,1,0);
			this.handWheel.display();
		this.scene.popMatrix();
		
		this.chassiAppearance.apply();
		
		this.scene.pushMatrix();
			this.scene.translate(0,0.45,0);
			this.scene.scale(0.25,0.28,0.3);
			this.chassi.display();
			this.scene.scale(1,1,-1);
			this.chassi.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
			this.scene.translate(0,0.45,0);			
			this.scene.scale(0.25,0.28,0.3);
			this.model.display();
			this.scene.scale(1,1,-1);
			this.model.display();
		this.scene.popMatrix();
		
		this.crateTex.apply();

		this.scene.pushMatrix();
			this.scene.translate(1.55,1.19,0);	
			this.scene.scale(0.7,0.7,0.7);	
			this.scene.rotate(-Math.PI/45.0,0,0,1);
			this.crate.display();
		this.scene.popMatrix();
	};

	update(currTime)
	{
		this.wheelRot.update(currTime);
		this.wheelBack.update(currTime);
		this.handWheel.setAngle(this.wheelDirection*10);

		// if the car isn't on the ground the fall function is called
		if(this.yPos != 0)
			this.fall(currTime);		
	};
	
	/*
		Fall of the car when crane doesn't have car attached
	*/
	fall(currTime)
	{
		this.yPos -= 10 * currTime / 1000;
		
		if(this.yPos < 0)
			this.yPos = 0.0;
	};

	/*
		Function that changes the car textures
	*/
	setPaint(Paint)
	{
		if(Paint == 'Flames') // STANDARD
		{
			this.model.setTextures();
		}
		else if(Paint == 'Camo') // CAMO
		{			
			this.model.setTextures(
						"camouflageTex.jpg",
						"camouflageTex.jpg",
						"",
						"camouflageTex.jpg",
						"",
						"",
						"camouflageTex.jpg"
						);
		}
		else // Professor
		{
			this.model.setTextures(
						"carTexture3.jpg",
						"carTexture3.jpg",
						"",
						"carTexture3.jpg",
						"",
						"",
						"carTexture3.jpg"
						);
		}
	};
};
