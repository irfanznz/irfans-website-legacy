export const cellshadeVS = `
varying vec3 vNormal;
varying vec3 vWorldPosition;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  vNormal = mat3(modelMatrix) * normal;
  vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
}
`;

export const cellshade1FS = `
precision highp float;
uniform vec3 defaultColor;
uniform vec3 black;
uniform vec3 lightPosition;
varying vec3 vWorldPosition;
varying vec3 vNormal;

void main() {
  vec3 lightDir = normalize(lightPosition - vWorldPosition); // Example light direction
  lightDir = normalize(lightDir);

  float lightIntensity = dot(vNormal, lightDir);
  float numberOfSteps = 3.0;
  float intensity = (ceil(lightIntensity * numberOfSteps) + 1.0) / numberOfSteps;

  // Set the color to the default color (white in this case)
  vec3 color = defaultColor;

  // Apply cell shading effect
  color *= vec3(intensity);
  if (intensity < 0.1) {
    color = black;
  } 
  gl_FragColor = vec4(color, 1.0);
}
`;

export const cellshade2FS = `
uniform vec3 defaultColor;
uniform vec3 shadow1;
uniform vec3 shadow2;
uniform vec3 shadow3;

varying vec3 vNormal;

void main() {
  vec3 lightDir = vec3(0.5, 0.7, 0.2); // Example light direction
  lightDir = normalize(lightDir);

  float lightIntensity = dot(vNormal, lightDir);
  float intensity = lightIntensity;

  // Set the color to the default color (white in this case)
  vec3 color = defaultColor;

  // Apply cell shading effect

  if (intensity < 0.1) {
    color = shadow3;
  } else if (intensity < 0.4) {
    color = shadow2;
  } else if (intensity < 0.75) {
    color = shadow1;
  }
  // color *= vec3(intensity);
  gl_FragColor = vec4(color, 1.0);
}
`;
