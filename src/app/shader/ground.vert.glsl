#version 300 es

precision highp float;

uniform mat4 u_worldMatrix;
uniform mat4 u_viewMatrix;
uniform mat4 u_projectionMatrix;

in vec3 position;
in vec2 texcoord;

out vec3 v_position;
out vec2 v_texcoord;
out vec3 v_normal;

void main() {
    v_texcoord = texcoord;
    v_position = position;
    v_normal = vec3(0., 1., 0.);
    gl_Position = u_projectionMatrix * u_viewMatrix * u_worldMatrix * vec4(position, 1.);
}