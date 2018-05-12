class MyInterface extends CGFinterface {


	/**
	 * MyInterface
	 * @constructor
	 */
 	constructor () {
 		super();
 	};

	/**
	 * init
	 * @param {CGFapplication} application
	 */
	init(application) {
		// call CGFinterface init
		super.init(application);

		// init GUI. For more information on the methods, check:
		//  http://workshop.chromeexperiments.com/examples/gui

		this.gui = new dat.GUI();

		this.gui.add(this.scene, 'toggleAxis');

		// add a group of controls (and open/expand by defult)

		var groupCar=this.gui.addFolder("Car");
		groupCar.open();

		groupCar.add(this.scene, 'Paint', [ 'Flames', 'Camo' ]);

		var groupLights=this.gui.addFolder("Lights");
		groupLights.open();

		groupLights.add(this.scene, 'Sun');
		groupLights.add(this.scene, 'CarLights');
		
		this.initKeys();
		
		return true;
	};

	initKeys()
	{
		this.scene.gui = this;
		this.processKeyboard = function() {};
		this.activeKeys = {};
	};
	
	processKeyDown(event)
	{
		this.activeKeys[event.code] = true;
	};

	processKeyUp(event)
	{
		this.activeKeys[event.code] = false;
	};

	isKeyPressed(keyCode)
	{
		return this.activeKeys[keyCode] || false;
	};
};
