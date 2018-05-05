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

		return true;
	};

	/**
	 * processKeyboard
	 * @param event {Event}
	 */
	processKeyboard(event) {
		// call CGFinterface default code (omit if you want to override)
		super.processKeyboard(event);

		// Check key codes e.g. here: http://www.asciitable.com/
		// or use String.fromCharCode(event.keyCode) to compare chars

		// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
		switch (event.keyCode)
		{
			case (65):	// only works for capital 'A', as it is
				console.log("Key 'A' pressed");
		};
	};
};
