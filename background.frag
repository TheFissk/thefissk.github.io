#version 300 es
precision mediump float;

in vec4 position;
in float IID;
out vec4 fragColor;

void main() 
{ 
    vec3 color = vec3(IID/50. + .1,0,.3);
    fragColor = vec4(color,1);
}