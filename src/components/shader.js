export const VERTEX_SHADER = `
uniform float time;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vPosition = position;
  vec4 modelPos = modelViewMatrix * vec4(position, 1.0);
  float cameraLength = length(vec3(modelPos));

  gl_PointSize = min(12.0 / cameraLength, 4.0) * 15.0;
  vec3 newPosition = vec3(position);
  newPosition.z = sin(newPosition.x * 2.0 + time) + cos(newPosition.y * 2.0 + time);
  newPosition.z = newPosition.z * 0.3;
  vNormal = vec3(newPosition);
  vNormal.z += 0.9;
  vNormal = normalize(vNormal);
  // newPosition.y = 1.0;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;
export const FRAGMENT_SHADER = `
uniform sampler2D texture1;
uniform float time;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
  vec4 color = texture2D(texture1, vUv);

  if (color.x > 0.0) {
    vec3 hsv = vec3(fract((vPosition.x + time + 4.0) / 8.0), 1.0, 0.8);
    color = vec4(hsv2rgb(hsv), 1.0);
  } else {
    vec3 hsv = vec3(1. - fract((vPosition.x + time + 4.0) / 8.0), 1.0, 1.);
    color = vec4(hsv2rgb(hsv), 0.02);
  }

  gl_FragColor = color;
  // gl_FragColor = vec4(0.1, 0.3, 0.6, 1.0);
}
`;
