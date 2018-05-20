var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

var FPS = 50;

var SPEED_CONSTANT = 0.0005;

var WHEEL_DIRECTION_CONSTANT = Math.PI/2000.0;
var WHEEL_DIRECTION_MAX = Math.PI/10.0;

var GROUND_SIZE_WIDTH = 50;
var GROUND_SIZE_WEIGHT = 50;

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

		this.Sun = true;
		this.CarLights = true;
		this.axisDisplay = false;
		this.testDisplay = false;

		this.MaxFrontSpeed = 0.2;
		this.MaxBackSpeed = 0.1;

		this.gl.clearColor(0.7, 0.7, 1.0, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);

		let ccc = 0.0;
		
		this.altimetry= [[ ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc ],
						 [ ccc, 4.0, 4.0, 3.0, 4.0, 4.0, 2.0, 2.0, 4.0, 4.0, 4.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 4.0, 4.0, 6.0, 6.0, 6.0, 4.0, 4.0, 2.0, 2.0, 2.0, 2.0, 4.0, 4.0, 4.0, 4.0, 3.0, 3.0, 3.0, 2.0, 2.0, 4.0, 4.0, 4.0, 3.0, 3.0, 3.0, 4.0, 4.0, 3.0, 3.0, 4.0, 4.0, ccc ],
						 [ ccc, 4.0, 4.0, 3.0, 4.0, 4.0, 2.0, 2.0, 4.0, 4.0, 4.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 4.0, 4.0, 6.0, 6.0, 6.0, 4.0, 4.0, 2.0, 2.0, 2.0, 2.0, 4.0, 4.0, 4.0, 4.0, 3.0, 3.0, 3.0, 2.0, 2.0, 4.0, 4.0, 4.0, 3.0, 3.0, 3.0, 4.0, 4.0, 3.0, 3.0, 4.0, 4.0, ccc ],
						 [ ccc, 3.0, 3.0, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 3.5, 4.5, 5.0, ccc ],
						 [ ccc, 3.0, 3.0, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 3.5, 4.5, 5.0, ccc ],
						 [ ccc, 4.5, 3.0, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 4.5, 5.5, 6.0, ccc ],
						 [ ccc, 4.5, 3.0, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 4.5, 5.5, 6.0, ccc ],
						 [ ccc, 4.5, 3.0, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 4.5, 3.5, 4.0, ccc ],
				   /*09*/[ ccc, 5.5, 2.0, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 4.5, 3.5, 4.0, ccc ],
						 [ ccc, 5.5, 4.0, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 2.0, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 2.5, 3.0, ccc ],
						 [ ccc, 6.0, 3.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 1.5, 1.5, 1.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 2.0, 2.0, 2.5, 2.5, 2.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 2.5, 3.0, ccc ],
						 [ ccc, 6.0, 4.0, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 2.0, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 2.5, 3.0, ccc ],
						 [ ccc, 4.5, 3.0, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 2.5, 3.0, ccc ],
				   /*14*/[ ccc, 4.5, 3.0, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 2.5, 3.0, ccc ],
						 [ ccc, 4.5, 3.0, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 3.5, 4.5, 5.0, ccc ],
						 [ ccc, 6.5, 3.0, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 3.5, 4.5, 5.0, ccc ],
						 [ ccc, 6.5, 3.0, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 3.5, 4.5, 5.0, ccc ],
						 [ ccc, 6.5, 3.0, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 3.5, 4.5, 5.0, ccc ],
						 [ ccc, 4.5, 3.0, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 5.5, 6.5, 7.0, ccc ],
						 [ ccc, 4.5, 3.0, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 5.5, 6.5, 7.0, ccc ],
						 [ ccc, 5.5, 3.0, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 5.5, 6.5, 7.0, ccc ],
						 [ ccc, 5.5, 3.0, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 5.5, 6.5, 7.0, ccc ],
						 [ ccc, 5.5, 3.0, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 3.5, 4.5, 5.0, ccc ],
				   /*24*/[ ccc, 4.5, 3.0, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 2.0, 2.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 2.0, 2.0, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 3.5, 4.5, 5.0, ccc ],
						 [ ccc, 4.5, 3.0, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 2.0, 2.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 2.0, 2.0, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 3.5, 4.5, 5.0, ccc ],
						 [ ccc, 3.5, 3.0, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 2.0, 2.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 2.0, 2.0, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 3.5, 4.5, 5.0, ccc ],
						 [ ccc, 3.5, 3.0, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 2.0, 2.0, 4.0, 4.0, 2.0, 2.0, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 2.0, 2.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 2.0, 2.0, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 4.5, 5.5, 6.0, ccc ],
						 [ ccc, 3.5, 3.0, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 2.0, 2.0, 4.0, 4.0, 4.0, 4.0, 2.0, 2.0, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 2.0, 2.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 2.0, 2.0, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 4.5, 5.5, 6.0, ccc ],
						 [ ccc, 3.5, 3.0, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 2.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 2.0, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 4.5, 5.5, 6.0, ccc ],
						 [ ccc, 4.5, 3.0, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 2.0, 2.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 2.0, 2.0, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 2.5, 3.5, 4.0, ccc ],
						 [ ccc, 4.5, 3.0, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 2.0, 2.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 2.0, 2.0, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 2.5, 3.5, 4.0, ccc ],
						 [ ccc, 4.5, 3.0, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 2.0, 2.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 2.0, 2.0, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 2.5, 3.5, 4.0, ccc ],
						 [ ccc, 5.5, 3.0, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 2.0, 2.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 2.0, 2.0, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 2.5, 3.5, 4.0, ccc ],
				   /*34*/[ ccc, 5.5, 3.0, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 2.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 2.0, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 3.5, 4.5, 5.0, ccc ],
						 [ ccc, 5.5, 3.0, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 2.0, 2.0, 4.0, 4.0, 4.0, 4.0, 2.0, 2.0, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 3.5, 4.5, 5.0, ccc ],
						 [ ccc, 5.5, 3.0, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 2.0, 2.0, 4.0, 4.0, 2.0, 2.0, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 3.5, 4.5, 5.0, ccc ],
						 [ ccc, 4.5, 3.0, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 3.5, 4.5, 5.0, ccc ],
						 [ ccc, 4.5, 3.0, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 3.5, 4.5, 5.0, ccc ],
						 [ ccc, 6.5, 3.0, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 4.5, 5.5, 6.0, ccc ],
						 [ ccc, 6.5, 3.0, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 4.5, 5.5, 6.0, ccc ],
						 [ ccc, 6.5, 3.0, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 2.0, 2.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 2.0, 4.5, 5.5, 6.0, ccc ],
						 [ ccc, 6.5, 3.0, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 2.0, 2.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 2.0, 3.5, 4.5, 5.0, ccc ],
						 [ ccc, 4.5, 3.0, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 2.0, 2.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 2.0, 3.5, 4.5, 5.0, ccc ],
				   /*44*/[ ccc, 4.5, 3.0, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 2.0, 2.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 2.0, 3.5, 4.5, 5.0, ccc ],
						 [ ccc, 3.5, 3.0, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 2.0, 2.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 2.0, 5.5, 6.5, 7.0, ccc ],
						 [ ccc, 3.5, 3.0, 2.5, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, 2.0, 2.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 2.0, 5.5, 6.5, 7.0, ccc ],
						 [ ccc, 3.5, 3.5, 2.5, 1.0, 2.0, 2.0, 2.0, 2.5, 2.5, 3.5, 3.5, 3.5, 5.5, 5.5, 5.5, 5.5, 5.5, ccc, ccc, ccc, ccc, ccc, ccc, 5.5, 5.5, 5.5, 5.5, 5.5, 3.5, 3.5, 3.5, 3.5, 2.5, 2.5, 2.5, 2.5, 1.0, 1.0, 4.0, 4.0, 4.0, 4.0, 3.0, 3.0, 3.0, 3.5, 5.0, 5.0, ccc ],
						 [ ccc, 3.5, 3.5, 2.5, 2.5, 3.5, 3.5, 3.5, 4.0, 4.0, 5.0, 5.0, 5.0, 7.0, 7.0, 7.0, 7.0, 7.0, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 7.0, 7.0, 7.0, 7.0, 7.0, 5.0, 5.0, 5.0, 5.0, 4.0, 4.0, 4.0, 4.0, 3.5, 3.5, 5.5, 5.5, 5.5, 5.5, 4.5, 4.5, 4.5, 3.5, 5.0, 5.0, ccc ],
						 [ ccc, 3.5, 3.5, 2.5, 2.5, 3.5, 3.5, 3.5, 4.0, 4.0, 5.0, 5.0, 5.0, 7.0, 7.0, 7.0, 7.0, 7.0, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 7.0, 7.0, 7.0, 7.0, 7.0, 5.0, 5.0, 5.0, 5.0, 4.0, 4.0, 4.0, 4.0, 3.5, 3.5, 5.5, 5.5, 5.5, 5.5, 4.5, 4.5, 4.5, 3.5, 5.0, 5.0, ccc ],				             
						 [ ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc, ccc ]    
						 ];

		let sizeTerrain = (this.altimetry[0].length - 1) || 0;

		// Scene elements
		this.floor = new MyTerrain(this,sizeTerrain, 0,10,0,10, this.altimetry);
		this.floorBack = new MyTerrain(this,sizeTerrain, 0,10,0,10);
		
		this.car = new MyOffRoadCar(this, this.MaxFrontSpeed, this.MaxBackSpeed);

		// Test elements
		this.cylinder = new MyCylinderwCover(this,24,6);
		this.trapezium = new MyTrapezium(this,2,1,1,1,0.5);
		this.semiSphere = new MySemiSphere(this,24,10,false);
		this.cover = new MyObjectsFront(this,24,0);
		
		// Materials
		this.materialDefault = new CGFappearance(this);
		this.materialDefault.setDiffuse(0.25,0.25,0.25,1);
		this.materialDefault.setAmbient(0.2,0.2,0.2,1);
		
		this.materialTest = new CGFappearance(this);
		this.materialTest.loadTexture("../resources/images/feup.png");

		//testDisplay
		this.crane = new MyCrane(this);	
	
		// Textures
		this.enableTextures(true);

		this.terrainAppearance = new CGFappearance(this);
		this.terrainAppearance.loadTexture("../resources/images/terrain.png");
		this.terrainAppearance.setAmbient(0.4,0.4,0.4,1);
		
		this.setUpdatePeriod(1000/FPS);
	};

	initCameras() 
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
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
			this.scale(GROUND_SIZE_WIDTH, GROUND_SIZE_WEIGHT, 1);
			this.floor.display();
		this.popMatrix();

		
		this.pushMatrix();		
			this.terrainAppearance.apply();
			this.rotate(90 * degToRad, 1, 0, 0);
			this.scale(GROUND_SIZE_WIDTH, GROUND_SIZE_WEIGHT, 1);
			this.floorBack.display();
		this.popMatrix();

		this.pushMatrix();
			if(this.Paint != this.PaintControl)
			{
				this.car.setPaint(this.Paint);
				this.PaintControl = this.Paint;
			}
			this.car.updatePos();
			this.translate(this.car.xPos,0,this.car.zPos);
			this.rotate(this.car.directionCar - Math.PI,0,1,0);			
			this.lights[1].setPosition(this.car.xPos,2.2, this.car.zPos, 1);
			
			if(this.car.speed == 0)	
				this.crane.checkCarPos(this.car.xPos,this.car.yPos,this.car.zPos);
			else if(this.crane.isMoving)
				this.crane.isMoving = false;
				
			this.car.display();
		this.popMatrix();

		this.materialTest.apply();

		if(this.testDisplay) 
		{
			this.pushMatrix();
				this.translate(-9,4,8);
				this.rotate(Math.PI/2.0,0,1,0);
				this.scale(2,2,2);
				this.trapezium.display();
			this.popMatrix();

			this.pushMatrix();
				this.translate(17,8,19);
				this.rotate(Math.PI/2.0,0,1,0);
				this.rotate(Math.PI/2.0,1,0,0);
				this.scale(1,1,4);
				this.cylinder.display();
			this.popMatrix();

			this.pushMatrix();
				this.translate(10,5.1,0.5);
				this.rotate(-Math.PI/2.0,0,1,0);
				this.semiSphere.display();
				this.rotate(Math.PI,0,1,0);
				this.cover.display();
			this.popMatrix();
		}

		this.pushMatrix();
			this.translate(-17,2.5,-18);
			this.rotate(-Math.PI/2.0,1,0,0);			
			this.crane.display();
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

		if(this.deltaTime <= 1000)
		{
			this.car.update(this.deltaTime);		
			this.checkKeys(this.deltaTime);
			this.crane.update(this.deltaTime);	
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

		if (keysPressed)
			console.log(text);
	};
};


