#include <GLUT/glut.h>

void Draw()
{
glClear(GL_COLOR_BUFFER_BIT);
//glPointSize(5); // Points size
//glBegin(GL_POINTS); // draw points of size 5
//glBegin(GL_LINES); // Draw line between vertex
// glBegin(GL_LINE_LOOP); // Draw line between vertex
glBegin(GL_POLYGON);
glVertex2f(-0.5, 0.5) ; // vertex from -1 to 1
glVertex2f(0.5, 0.5 );
glVertex2f(0.5, -0.5) ;
glVertex2f(-0.5, -0.5) ;
glEnd();
glFlush();
}
void MyInit()
{

glClearColor(1,0,0,1); // set background color to red
glColor3f(0,1,0); // set RGB green color
}
int main(int C, char *V[])
{
glutInit(&C,V);
glutInitWindowPosition(0,0); // initial window position
glutInitWindowSize(600,600); // window size 600 px to 800px
glutInitDisplayMode(GLUT_RGB | GLUT_SINGLE);

glutCreateWindow("Basic opengl program");
// glClearColor(0,0,0,1);
// glColor3f(1,0,0);
MyInit();

glutDisplayFunc(Draw ); // draw as a parameter
glutMainLoop(); // executing main loop

return 0;

}