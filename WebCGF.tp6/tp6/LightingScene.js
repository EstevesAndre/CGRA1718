var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

var FPS = 40;

var SPEED_CONSTANT = 0.0005;

var WHEEL_DIRECTION_CONSTANT = Math.PI/2000.0;
var WHEEL_DIRECTION_MAX = Math.PI/10.0;

var GROUND_SIZE_WIDTH = 50;
var GROUND_SIZE_HEIGHT = 50;

class LightingScene extends CGFscene 
{
	constructor()
	{
		super();
	};

	init(application) 
	{
		super.init(application);

		this.initCameras();

		this.initLights();

		this.Paint = "Flames";
		this.PaintControl = this.Paint;

		/*
			Sun Light, starts at true
		*/
		this.Sun = true;

		/*
			Car Lights, starts at true
		*/
		this.CarLights = true;

		/*
			Axis, starts at false, i.e. not displayed on Scene
		*/
		this.axisDisplay = false;

		/*
			Test Objects, starts at false, i.e. not displayed on Scene
		*/
		this.testDisplay = false;

		/*
			Limits for Car speed
		*/
		this.MaxFrontSpeed = 0.3;
		this.MaxBackSpeed = 0.2;

		/*
			Inicial angles for Crane (Base and Lance)
		*/
		this.BaseAngle = Math.PI/3.0;
		this.LanceAngle = Math.PI/10.0;

		/*
			Inicial multiplier for altimetry
		*/
		this.floorHeight = 1;
		
		/*
			Clear Color, light blue
		*/
		this.gl.clearColor(0.7, 0.7, 1.0, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);

		/*	
			Altimetry of terrain
		*/
		this.altimetry= [[ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
						 [ 0.0, 4.0, 4.0, 3.0, 4.0, 4.0, 2.0, 2.0, 4.0, 4.0, 4.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 4.0, 4.0, 4.0, 2.0, 2.0, 2.0, 2.0, 4.0, 4.0, 4.0, 4.0, 3.0, 3.0, 3.0, 2.0, 2.0, 4.0, 4.0, 4.0, 3.0, 3.0, 4.0, 4.0, 0.0 ],
						 [ 0.0, 4.0, 4.0, 3.0, 4.0, 4.0, 2.0, 2.0, 4.0, 4.0, 4.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 4.0, 4.0, 4.0, 2.0, 2.0, 2.0, 2.0, 4.0, 4.0, 4.0, 4.0, 3.0, 3.0, 3.0, 2.0, 2.0, 4.0, 4.0, 4.0, 3.0, 3.0, 4.0, 4.0, 0.0 ],
						 [ 0.0, 3.0, 3.0, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 3.5, 4.5, 5.0, 0.0 ],
						 [ 0.0, 3.0, 3.0, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 3.5, 4.5, 5.0, 0.0 ],
						 [ 0.0, 4.5, 3.0, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 4.5, 5.5, 6.0, 0.0 ],
						 [ 0.0, 4.5, 3.0, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 4.5, 5.5, 6.0, 0.0 ],
						 [ 0.0, 4.5, 3.0, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 4.5, 3.5, 4.0, 0.0 ],
				   		 [ 0.0, 5.5, 2.0, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 4.5, 3.5, 4.0, 0.0 ],
						 [ 0.0, 5.5, 4.0, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.5, 2.5, 3.0, 0.0 ],
						 [ 0.0, 6.0, 3.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.5, 2.5, 3.0, 0.0 ],
						 [ 0.0, 6.0, 4.0, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.5, 2.5, 3.0, 0.0 ],
						 [ 0.0, 6.5, 4.0, 2.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 3.5, 4.5, 5.0, 0.0 ],
						 [ 0.0, 6.5, 4.0, 2.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 3.5, 4.5, 5.0, 0.0 ],
						 [ 0.0, 4.5, 3.0, 2.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 5.5, 6.5, 7.0, 0.0 ],
						 [ 0.0, 4.5, 3.0, 2.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 5.5, 6.5, 7.0, 0.0 ],
						 [ 0.0, 5.5, 3.0, 2.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 5.5, 6.5, 7.0, 0.0 ],
						 [ 0.0, 5.5, 3.0, 2.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 5.5, 6.5, 7.0, 0.0 ],
						 [ 0.0, 5.5, 3.0, 2.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 3.5, 4.5, 5.0, 0.0 ],
				         [ 0.0, 4.5, 3.0, 2.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 3.5, 4.5, 5.0, 0.0 ],
						 [ 0.0, 4.5, 3.0, 2.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0, 4.0, 4.0, 2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 3.5, 4.5, 5.0, 0.0 ],
						 [ 0.0, 3.5, 3.0, 2.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0, 4.0, 4.0, 2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 3.5, 4.5, 5.0, 0.0 ],
						 [ 0.0, 3.5, 3.0, 2.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0, 4.0, 4.0, 2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 4.5, 5.5, 6.0, 0.0 ],
						 [ 0.0, 3.5, 3.0, 2.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 4.5, 5.5, 6.0, 0.0 ],
						 [ 0.0, 3.5, 3.0, 2.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 4.5, 5.5, 6.0, 0.0 ],
						 [ 0.0, 4.5, 3.0, 2.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.5, 3.5, 4.0, 0.0 ],
						 [ 0.0, 4.5, 3.0, 2.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 4.0, 4.0, 4.0, 4.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.5, 3.5, 4.0, 0.0 ],
						 [ 0.0, 4.5, 3.0, 2.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 4.0, 4.0, 4.0, 4.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.5, 3.5, 4.0, 0.0 ],
						 [ 0.0, 5.5, 3.0, 2.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 4.0, 4.0, 4.0, 4.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.5, 3.5, 4.0, 0.0 ],
				         [ 0.0, 5.5, 3.0, 2.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 4.0, 4.0, 4.0, 4.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 3.5, 4.5, 5.0, 0.0 ],
						 [ 0.0, 5.5, 3.0, 2.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 4.0, 4.0, 4.0, 4.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 3.5, 4.5, 5.0, 0.0 ],
						 [ 0.0, 5.5, 3.0, 2.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 3.5, 4.5, 5.0, 0.0 ],
						 [ 0.0, 4.5, 3.0, 2.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.5, 4.5, 5.0, 0.0 ],
						 [ 0.0, 4.5, 3.0, 2.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 2.0, 3.5, 4.5, 5.0, 0.0 ],
				         [ 0.0, 4.5, 3.0, 2.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 2.0, 3.5, 4.5, 5.0, 0.0 ],
						 [ 0.0, 3.5, 3.0, 2.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 2.0, 5.5, 6.5, 7.0, 0.0 ],
						 [ 0.0, 3.5, 3.0, 2.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 2.0, 5.5, 6.5, 7.0, 0.0 ],
						 [ 0.0, 3.5, 3.5, 2.5, 2.5, 2.5, 3.5, 3.5, 3.5, 5.5, 5.5, 5.5, 5.5, 5.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 5.5, 5.5, 5.5, 5.5, 5.5, 3.5, 3.5, 3.5, 3.5, 2.5, 2.5, 2.5, 2.5, 4.0, 3.0, 3.0, 3.0, 3.5, 5.0, 5.0, 0.0 ],
						 [ 0.0, 3.5, 3.5, 2.5, 4.0, 4.0, 5.0, 5.0, 5.0, 7.0, 7.0, 7.0, 7.0, 7.0, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 7.0, 7.0, 7.0, 7.0, 7.0, 5.0, 5.0, 5.0, 5.0, 4.0, 4.0, 4.0, 4.0, 4.5, 4.5, 4.5, 4.5, 3.5, 5.0, 5.0, 0.0 ],
						 [ 0.0, 3.5, 3.5, 2.5, 4.0, 4.0, 5.0, 5.0, 5.0, 7.0, 7.0, 7.0, 7.0, 7.0, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 7.0, 7.0, 7.0, 7.0, 7.0, 5.0, 5.0, 5.0, 5.0, 4.0, 4.0, 4.0, 4.0, 4.5, 4.5, 4.5, 4.5, 3.5, 5.0, 5.0, 0.0 ],				             
						 [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ]    
						 ];

		/*
			Size of Terrain
		*/
		this.sizeTerrain = (this.altimetry.length - 1) || 0;


		// Scene elements
			/*
				Terrain with given altimetry
			*/
			this.terrain = new MyTerrain(this,this.sizeTerrain, 0,10,0,10, this.altimetry);		
			/*
				Offroad Car
			*/
			this.car = new MyOffRoadCar(this, this.MaxFrontSpeed, this.MaxBackSpeed);

			/*
				Crane
			*/
			this.crane = new MyCrane(this);	

			/*
				Platform where car will be attached and disattached
			*/
			this.platform = new MyUnitCubeQuad(this);

		// Test elements
			this.cylinder = new MyCylinderwCover(this,24,6);
			this.trapezium = new MyTrapezium(this,2,1,1,1,0.5);
			this.semiSphere = new MySemiSphere(this,24,10,false);
			this.cover = new MyObjectsFront(this,24,0);
	
		// Materials
			this.materialDefault = new CGFappearance(this);
			this.materialDefault.setDiffuse(0.25,0.25,0.25,1);
			this.materialDefault.setAmbient(0.2,0.2,0.2,1);
			
		// Textures
			this.enableTextures(true);

			this.terrainAppearance = new CGFappearance(this);
			this.terrainAppearance.loadTexture("../resources/images/terrain.jpg");
			this.terrainAppearance.setAmbient(0.4,0.4,0.4,1);

			this.materialTest = new CGFappearance(this);
			this.materialTest.loadTexture("../resources/images/feup.png");

			this.materialStartPlatform = new CGFappearance(this);
			this.materialStartPlatform.loadTexture("../resources/images/startPlatform.png");

			this.materialEndPlatform = new CGFappearance(this);
			this.materialEndPlatform.loadTexture("../resources/images/endPlatform.png");

		this.setUpdatePeriod(1000/FPS);
	};

	initCameras() 
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(70, 70, 70), vec3.fromValues(0, 0, 0));
	};

	initLights() 
	{
		this.setGlobalAmbientLight(1,1,1, 1.0);
		
		this.lights[0].setPosition(0, 50, 0, 1);
		this.lights[0].setVisible(true);
		
		this.lights[0].setAmbient(1.0, 1.0, 0.8, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].enable();

		this.lights[1].setPosition(-2, 1, 0, 1);
		this.lights[1].setVisible(true);
		
		this.lights[1].setAmbient(1.0, 1.0, 0.4, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 0.0, 1.0);
		this.lights[1].enable();
	};

	updateLights() 
	{
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();
	};


	display() 
	{
		// ---- BEGIN Background, camera and axis setup

		// Clear image and depth buffer everytime we update the scene
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// Initialize Model-View matrix as identity (no transformation)
		this.updateProjectionMatrix();
		this.loadIdentity();

		// Apply transformations corresponding to the camera position relative to the origin
		this.applyViewMatrix();

		// Update all lights used
		this.evalLights();
		this.updateLights();

		// Draw axis
		if(this.axisDisplay)
			this.axis.display();


		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section

		// Floor
		this.pushMatrix();		
			this.terrainAppearance.apply();
			this.rotate(-90 * degToRad, 1, 0, 0);
			this.scale(GROUND_SIZE_WIDTH, GROUND_SIZE_HEIGHT, 1);
			this.terrain.display();
		this.popMatrix();
		
		// Car display
		this.pushMatrix();
			if(this.Paint != this.PaintControl)
			{
				this.car.setPaint(this.Paint);
				this.PaintControl = this.Paint;
			}
			
			if(!this.crane.carAttached)
			{				
				this.car.updatePos(this.terrain.path);
				this.translate(this.car.xPos,this.car.yPos,this.car.zPos);
				this.rotate(this.car.directionCar - Math.PI,0,1,0);	
				if(this.car.yPos == 0) this.lights[1].setPosition(this.car.xPos,this.car.yPos + 2.2, this.car.zPos, 1);
				this.car.display();
			}

			if(!this.crane.carAttached && this.car.speed == 0)
			{
				this.crane.checkCarPos(this.car.xPos,this.car.yPos,this.car.zPos);
			}
			else if(this.car.speed != 0 && this.crane.isMoving)
			{
				this.crane.isMoving = false;
				this.crane.carAtPos = false;
			}							
		this.popMatrix();
		
		// Test Objects
		this.materialTest.apply();		
		if(this.testDisplay) 
		{
			// trapezium
			this.pushMatrix();
				this.translate(-7,4,12.5);
				this.rotate(Math.PI/2.0,0,1,0);
				this.scale(2.5,2.5,2.5);
				this.trapezium.display();
			this.popMatrix();

			// cylinder
			this.pushMatrix();
				this.translate(15.5,12,18.5);
				this.rotate(Math.PI/2.0,0,1,0);
				this.rotate(Math.PI/2.0,1,0,0);
				this.scale(2,2,8);
				this.cylinder.display();
			this.popMatrix();

			// Semisphere and cover
			this.pushMatrix();
				this.translate(9.5,6,1.5);
				this.rotate(-Math.PI/2.0,0,1,0);
				this.scale(2,2,2);
				this.semiSphere.display();
				this.rotate(Math.PI,0,1,0);
				this.cover.display();
			this.popMatrix();
		}

		// crane
		this.pushMatrix();				
			this.translate(-17,1.25,-16);

			// if the terrain high is less that the high platform of the crane is displayed a support platform on the ground	
			if(this.floorHeight < 1 || this.sizeTerrain == 0)
			{
				this.pushMatrix();
					this.scale(10, 2.5, 10);
					this.terrainAppearance.apply();
					this.platform.display();
				this.popMatrix();
			}						
			this.rotate(-Math.PI/2.0,1,0,0);			
			this.crane.display();
		this.popMatrix();		

		// Start platform
		this.pushMatrix();
			this.translate(-17,0,6.0);
			this.rotate(Math.PI,0,1,0);
			this.scale(5, 0.1, 3);
			this.materialStartPlatform.apply();
			this.platform.display();
		this.popMatrix();

		// End platform
		this.pushMatrix();
			this.translate(10,0,-18);
			this.rotate(-Math.PI/2.0,0,1,0);
			this.scale(5, 0.1, 3);
			this.materialEndPlatform.apply();
			this.platform.display();
		this.popMatrix();

		// ---- END Scene drawing section	
	};


	update(currTime)
	{
		this.lastTime = this.lastTime || 0;

		this.deltaTime = currTime - this.lastTime;

		this.lastTime = currTime;
		
		if(this.car.MaxFrontSpeed != this.MaxFrontSpeed)
		{
			this.car.MaxFrontSpeed = this.MaxFrontSpeed;
		}

		if(this.car.MaxBackSpeed != this.MaxBackSpeed)
		{
			this.car.MaxBackSpeed = this.MaxBackSpeed;
		}
		
		// Updates car and crane positions
		if(this.deltaTime <= 1000)
		{
			this.car.update(this.deltaTime);		
			this.checkKeys(this.deltaTime);
			this.crane.update(this.deltaTime);	
		}	
		
		// Scales the terrain
		if(this.floorHeight != this.terrain.scale)
		{
			this.terrain.redoBuffers(this.floorHeight);	
			this.terrain.scale = this.floorHeight;
		}
		
	};

	toggleAxis()
	{
		this.axisDisplay = !this.axisDisplay;
	};

	toggleTestObjects()
	{
		this.testDisplay = !this.testDisplay;
	};

	evalLights()
	{
		if(this.Sun)
		{
			this.lights[0].enable();
		}
		else
		{
			this.lights[0].disable();
		}

		if(this.CarLights)
		{
			this.lights[1].enable();
		}
		else
		{
			this.lights[1].disable();
		}
	};

	checkKeys (deltaTime)
	{
		var text="Keys pressed: ";
		var keysPressed=false;
		
		if (this.gui.isKeyPressed("KeyW"))
		{
			text+=" W ";
			this.car.setSpeed(SPEED_CONSTANT*deltaTime);
			keysPressed=true;
		}

		if (this.gui.isKeyPressed("KeyS"))
		{
			text+=" S ";
			this.car.setSpeed(-SPEED_CONSTANT*deltaTime);
			keysPressed=true;
		}

		if (this.gui.isKeyPressed("KeyD"))
		{
			text+=" D ";
			this.car.setWheelDirection(-WHEEL_DIRECTION_CONSTANT*deltaTime);
			keysPressed=true;
		}

		if (this.gui.isKeyPressed("KeyA"))
		{
			text+=" A ";
			this.car.setWheelDirection(WHEEL_DIRECTION_CONSTANT*deltaTime);
			keysPressed=true;
		}

		if (this.gui.isKeyPressed("KeyC"))
		{
			text+=" C ";
			this.car.setSpeed(-this.car.speed);
			keysPressed=true;
		}

		if (keysPressed)
			console.log(text);
			
	};
};


