class MyTerrain extends Plane{

	constructor(scene, nrDivs, minS, maxS, minT, maxT, altimetry) 
	{
		super(scene, nrDivs, minS, maxS, minT, maxT);
		
		if(typeof altimetry !== 'undefined' && altimetry.length == nrDivs+1 && altimetry[0].length == nrDivs+1)			
			this.altimetry = altimetry;
		else
			this.fillDefaultAltimetry(nrDivs);
	

		this.redoBuffers();
	};

	fillDefaultAltimetry(nrDivs)
	{
		this.altimetry = [];

		for(var i = 0; i <= nrDivs; i++)
		{
			var line = [];
			for(var j = 0; j <= nrDivs; j++)
			{
				line.push(0);
			}
			this.altimetry.push(line);
		}
	};

	redoBuffers()
	{
		this.vertices = [];
		this.normals = [];		
		this.texCoords = [];
		
		var x = 0;
		var y = 0;

		var yCoord = 0.5;

		for (var j = 0; j <= this.nrDivs; j++) 
		{
			var xCoord = -0.5;
			for (var i = 0; i <= this.nrDivs; i++) 
			{
				this.vertices.push(xCoord, yCoord, this.altimetry[j][i]);
				
				if(this.altimetry[j][i] != 0)
					this.normals.push(1,1,0);
				else
					this.normals.push(0,0,1);

				this.texCoords.push(i * 1.0/this.nrDivs * (this.maxS - this.minS) + this.minS, 
						j * 1.0/this.nrDivs  * (this.maxT - this.minT) + this.minT);

				xCoord += this.patchLength;
			}
			yCoord -= this.patchLength;
		}
	
		this.indices = [];
		var ind=0;


		for (var j = 0; j < this.nrDivs; j++) 
		{
			for (var i = 0; i <= this.nrDivs; i++) 
			{
				this.indices.push(ind);
				this.indices.push(ind+this.nrDivs+1);

				ind++;
			}
			if (j+1 < this.nrDivs)
			{
				this.indices.push(ind+this.nrDivs);
				this.indices.push(ind);
			}
		}
		
		this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
		this.initGLBuffers();
	};

};