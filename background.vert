#version 300 es
precision mediump float;

#define PI 3.1415926538

in float xPosition;
uniform float time;
uniform mat4 perspective;
out float IID;
out vec4 position;

void main() 
{
    gl_PointSize = 20.0;
    IID = float(gl_InstanceID);
    float pointNormal = xPosition + IID + (time/10000.);

    float yPosition = (sin(pointNormal) + sin(pointNormal * 3.))/1.5;
    vec4 position = vec4(xPosition, yPosition,0,1);
    gl_Position = position;
}