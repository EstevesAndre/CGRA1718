/**
 * MyUnitCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyUnitCube extends CGFobject
{
  constructor(scene) 
	{
		super(scene);
		this.initBuffers();
	};

	initBuffers() 
	{
		this.vertices = [
				-0.5, -0.5, -0.5, // 4 vertices abaixo do eixo Oz
				0.5, -0.5, -0.5,
				-0.5, 0.5, -0.5,
				0.5, 0.5, -0.5,

				-0.5, -0.5, 0.5, // 4 vertices acima do eixo Oz
				0.5, -0.5, 0.5,
				-0.5, 0.5, 0.5,
				0.5, 0.5, 0.5
				
				];

		this.indices = [
	           // face paralela ao eixo xOy , z > 0
	           5, 7, 6, // (0.5,-0.5,0.5) ; (0.5,0.5,0.5) ; (-0.5,0.5,0.5)
	           6, 4, 5, // (-0.5,0.5,0.5) ; (-0.5,-0.5,0.5) ; (0.5,-0.5,0.5)

	           // face paralela ao eixo xOy , z < 0
	           2, 3, 1, // (-0.5,0.5,-0.5) ; (0.5,0.5,-0.5) ; (0.5,-0.5,-0.5)
	           1, 0, 2, // (0.5,-0.5,-0.5) ; (-0.5,-0.5,-0.5) ; (-0.5,0.5,-0.5)

	           // face paralela ao eixo yOz , x > 0
	           3, 7, 5, // (0.5, 0.5, -0.5) ; (0.5, 0.5, 0.5) ; (0.5, -0.5, 0.5)
	           5, 1, 3, // (0.5, -0.5, 0.5) ; (0.5, -0.5, -0.5) ; (0.5, 0.5, -0.5)

	           // face paralela ao eixo yOz , x < 0
	           4, 6, 2, // (-0.5, -0.5, 0.5) ; (-0.5, 0.5, 0.5) ; (-0.5, 0.5, -0.5)
	           2, 0, 4, // (-0.5, 0.5, -0.5) ; (-0.5, -0.5, -0.5) ; (-0.5, -0.5, 0.5)

	           // face paralela ao eixo xOz , y > 0
	           3, 2, 6, // (0.5, 0.5, -0.5) ; (-0.5, 0.5, -0.5) ; (-0.5, 0.5, 0.5)
	           6, 7, 3, // (-0.5, 0.5, 0.5) ; (0.5, 0.5, 0.5) ; (0.5, 0.5, -0.5)

	           // face paralela ao eixo xOz , y < 0
	           1, 5, 4, // (0.5, -0.5, -0.5) ; (0.5, -0.5, 0.5) ; (-0.5, -0.5, 0.5)
	           4, 0, 1 // (-0.5, -0.5, 0.5) ; (-0.5, -0.5, -0.5) ; (0.5, -0.5, -0.5)

			];
			
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};  

};