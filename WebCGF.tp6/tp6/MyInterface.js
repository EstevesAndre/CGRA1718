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

		// add a group of controls (and open/expand by defult)

		var groupScene=this.gui.addFolder("Scene");
		groupScene.open();

		groupScene.add(this.scene, 'toggleAxis');
		groupScene.add(this.scene, 'toggleTestObjects');

		var groupCar=this.gui.addFolder("Car");
		groupCar.open();

		groupCar.add(this.scene, 'Paint', [ 'Flames', 'Camo' , 'Prof']);
		groupCar.add(this.scene, 'MaxFrontSpeed', 0.0, 0.5);
		groupCar.add(this.scene, 'MaxBackSpeed', 0.0, 0.5);

		var groupLights=this.gui.addFolder("Lights");
		groupLights.open();

		groupLights.add(this.scene, 'Sun');
		groupLights.add(this.scene, 'CarLights');
		
		var groupCrane=this.gui.addFolder("Crane");
		groupCrane.open();

		groupCrane.add(this.scene, 'BaseAngle', 0.0,2*Math.PI);
		groupCrane.add(this.scene, 'LanceAngle', -0.8, 0.65);

		var groupTerrain=this.gui.addFolder("Terrain");
		groupTerrain.open();

		groupTerrain.add(this.scene, 'floorHeight', 0.1,2.0);

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
