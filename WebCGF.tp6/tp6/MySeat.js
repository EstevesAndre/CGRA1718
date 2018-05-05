class MySeat extends CGFobject
{
	constructor(scene,texture)
	{
		super(scene);

		texture = typeof texture !== 'undefined' ? texture : "seat.jpg";
		
		this.modelTexture = new CGFappearance(this.scene);
		this.modelTexture.loadTexture("../resources/images/"+texture);
		this.modelTexture.setAmbient(0.4,0.4,0.4,1);
		this.modelTexture.setDiffuse(0.1,0.1,0.1,1);

		// modelTexture
		this.seat = new MyUnitCubeQuad(this.scene);
		this.back = new MyTrapezium(this.scene, 0.5, 0.5, 3.5, 2, 0.5);	

	};


	display() 
	{	

		this.modelTexture.apply();
		this.scene.pushMatrix();
			this.scene.translate(-1, 0.25, 1);
			this.scene.scale(2, 0.5, 2);
			this.seat.display();
		this.scene.popMatrix();
		this.back.display();

	};
};
