import { drawImageFragmentShader, drawImageVertexShader } from 'modules/webGL/shader/drawImageShader';
import { initShaderProgram } from 'modules/webGL/shaderUtils';
import {
  translate, scale, orthographic, translation,
} from 'core/mat4';

const renderImages = function () {
  /* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: false}}] */
  const context = this.context;
  Object.values(this.$cameras).forEach((camera) => {
    let { images } = camera.getDico();

    const sortImages = (a, b) => a.destination.z - b.destination.z;

    images = images.sort(sortImages);

    const shaderProgram = initShaderProgram(context, drawImageVertexShader, drawImageFragmentShader);

    // Tell WebGL how to convert from clip space to pixels
    context.viewport(0, 0, context.canvas.width, context.canvas.height);
    context.enable(context.BLEND);
    // context.blendFunc(context.SRC_ALPHA, context.ONE_MINUS_SRC_ALPHA);
    // context.blendFunc(context.ONE, context.ONE_MINUS_SRC_ALPHA);
    context.blendFuncSeparate(context.SRC_ALPHA, context.ONE_MINUS_SRC_ALPHA, context.ONE, context.ONE_MINUS_SRC_ALPHA);

    // Create a buffer.
    const positionBuffer = context.createBuffer();
    context.bindBuffer(context.ARRAY_BUFFER, positionBuffer);

    // Put a unit quad in the buffer
    const positions = [
      0, 0,
      0, 1,
      1, 0,
      1, 0,
      0, 1,
      1, 1,
    ];
    context.bufferData(context.ARRAY_BUFFER, new Float32Array(positions), context.STATIC_DRAW);

    // Create a buffer for texture coords
    const texcoordBuffer = context.createBuffer();
    context.bindBuffer(context.ARRAY_BUFFER, texcoordBuffer);

    // Put texcoords in the buffer
    const texcoords = [
      0, 0,
      0, 1,
      1, 0,
      1, 0,
      0, 1,
      1, 1,
    ];
    context.bufferData(context.ARRAY_BUFFER, new Float32Array(texcoords), context.STATIC_DRAW);

    // Tell WebGL to use our shader program pair
    context.useProgram(shaderProgram);

    images.forEach((image) => {
      const {
        destination, frame, opacity, source,
      } = image;

      const isVisible = camera.visible(

        destination.x * camera.screen.scale(),
        destination.y * camera.screen.scale(),
        destination.width * camera.screen.scale(),
        destination.height * camera.screen.scale(),
      );

      if (opacity > 0
            && isVisible === true) {
        const alpha = context.globalAlpha;

        context.globalAlpha = opacity;

        const canvas = {
          destination: {
            x: camera.screen.x() + destination.x * camera.screen.scale()
            - (camera.position.x() * camera.screen.scale()
            - camera.screen.width() / 2),
            y: camera.screen.y() + destination.y * camera.screen.scale()
            - (camera.position.y() * camera.screen.scale()
            - camera.screen.height() / 2),
            width: destination.width * camera.screen.scale(),
            height: destination.height * camera.screen.scale(),
          },
        };

        const offset = {
          top: Math.min(0, canvas.destination.y - camera.screen.y()),
          right: Math.max(0, canvas.destination.x + canvas.destination.width
            - (camera.screen.x() + camera.screen.width())),
          bottom: Math.max(0, canvas.destination.y + canvas.destination.height
            - (camera.screen.y() + camera.screen.height())),
          left: Math.min(0, canvas.destination.x - camera.screen.x()),
        };

        context.globalAlpha = alpha;

        drawImage(
          context,
          texcoordBuffer,
          shaderProgram,
          positionBuffer,
          source,
          frame.x - offset.left * (frame.width / canvas.destination.width),
          frame.y - offset.top * (frame.height / canvas.destination.height),
          frame.width - offset.right * (frame.width / canvas.destination.width)
          - Math.abs(offset.left * (frame.width / canvas.destination.width)),
          frame.height - offset.bottom * (frame.height / canvas.destination.height)
          - Math.abs(offset.top * (frame.height / canvas.destination.height)),
          canvas.destination.x - offset.left,
          canvas.destination.y - offset.top,
          canvas.destination.width - offset.right - Math.abs(offset.left),
          canvas.destination.height - offset.bottom - Math.abs(offset.top),
        );
      }
    });

    images = [];
  });
};

function isPOT(value) {
  return value > 0 && ((value - 1) & value) === 0;
}

const textureCache = [];
const imageCache = [];

function createTexture(context, img) {
  const tex = context.createTexture(img);

  textureCache.push(tex);
  imageCache.push(img);

  context.bindTexture(context.TEXTURE_2D, tex);

  context.texImage2D(context.TEXTURE_2D, 0, context.RGBA,
    context.RGBA, context.UNSIGNED_BYTE, img);

  // let's assume all images are not a power of 2
  context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
  context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
  context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.NEAREST);
  context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.NEAREST);

  if (isPOT(img.width) && isPOT(img.height)) {
    context.texParameteri(context.TEXTURE_2D,
      context.TEXTURE_MIN_FILTER,
      context.LINEAR_MIPMAP_LINEAR);
    context.generateMipmap(context.TEXTURE_2D);
  }

  context.bindTexture(context.TEXTURE_2D, null);
  return tex;
}

function drawImage(context, texcoordBuffer,
  program,
  positionBuffer,
  img,
  srcX, srcY, srcWidth, srcHeight,
  dstX, dstY, dstWidth, dstHeight) {
  let tex;
  const cacheIndex = imageCache.indexOf(img);

  if (cacheIndex !== -1) {
    tex = textureCache[cacheIndex];
  } else {
    tex = createTexture(context, img);
  }

  // look up where the vertex data needs to go.
  const positionLocation = context.getAttribLocation(program, 'a_position');
  const texcoordLocation = context.getAttribLocation(program, 'a_texcoord');

  // lookup uniforms
  const matrixLocation = context.getUniformLocation(program, 'u_matrix');
  const textureMatrixLocation = context.getUniformLocation(program, 'u_textureMatrix');
  const textureLocation = context.getUniformLocation(program, 'u_texture');

  // Setup the attributes to pull data from our buffers
  context.bindBuffer(context.ARRAY_BUFFER, positionBuffer);
  context.enableVertexAttribArray(positionLocation);
  context.vertexAttribPointer(positionLocation, 2, context.FLOAT, false, 0, 0);
  context.bindBuffer(context.ARRAY_BUFFER, texcoordBuffer);
  context.enableVertexAttribArray(texcoordLocation);
  context.vertexAttribPointer(texcoordLocation, 2, context.FLOAT, false, 0, 0);

  // this matrix will convert from pixels to clip space
  let matrix = orthographic(0, context.canvas.width, context.canvas.height, 0, -1, 1);

  // this matrix will translate our quad to dstX, dstY
  matrix = translate(matrix, dstX, dstY, 0);

  // this matrix will scale our 1 unit quad
  // from 1 unit to texWidth, texHeight units
  matrix = scale(matrix, dstWidth, dstHeight, 2);

  // Set the matrix.
  context.uniformMatrix4fv(matrixLocation, false, matrix);

  // Because texture coordinates go from 0 to 1
  // and because our texture coordinates are already a unit quad
  // we can select an area of the texture by scaling the unit quad
  // down
  let texMatrix = translation(srcX / img.width, srcY / img.height, 0);
  texMatrix = scale(texMatrix, srcWidth / img.width, srcHeight / img.height, 1);

  // Set the texture matrix.
  context.uniformMatrix4fv(textureMatrixLocation, false, texMatrix);

  // Tell the shader to get the texture from texture unit 0
  context.uniform1i(textureLocation, 0);

  context.bindTexture(context.TEXTURE_2D, tex);
  context.activeTexture(context.TEXTURE0);

  // draw the quad (2 triangles, 6 vertices)
  context.drawArrays(context.TRIANGLES, 0, 6);
}

export { renderImages };
