# Description
The plugin uses code blocks with the "graph" language to create graphs. Users define graphs using YAML syntax within these code blocks
Graphs are configured using the following main components:

1. Bounds: Define the initial size of the graph using an array of four numbers: xmin, ymax, xmax, ymin.
2. Elements: Various graphical elements can be added to the graph, each with its own type, definition, and optional attributes
The plugin supports a wide range of element types, including:
- Basic shapes: Points, lines, circles, ellipses, polygons
- Mathematical functions: Function graphs, implicit curves, parametric curves
- Geometric constructions: Tangents, perpendiculars, intersections
- Statistical elements: Boxplots, charts (bar, line, pie, etc.)
- Calculus visualizations: Integrals, Riemann sums
- Interactive elements: Sliders, gliders, tape measures

### Element Creation

Elements are created by specifying their type, definition, and optional attributes. For example:
```
elements:
  - type: "functiongraph"
    def: ["f:Math.sin(x)"]
```

### Advanced Features

1. Composing Elements: Elements can be combined to create more complex constructions
2. Mathematical Functions: The plugin supports various mathematical operations and functions, including trigonometric and exponential functions
3. Styling: Elements can be customized with attributes like color, opacity, and stroke style
4. Interactive Elements: Sliders and gliders allow for dynamic manipulation of graph elements
5. LaTeX Support: Mathematical expressions can be included in text elements using LaTeX syntax
# Examples
https://jsxgraph.uni-bayreuth.de/share/
https://jsxgraph.org/wiki/index.php/More_examples
# Demos
## Demo 1
```graph
bounds: [-10, 10, 10, -10]
bounds3d: [[-5,5],[-5,5],[-5,5]]
axis: false
keepaspectratio: true
elements: [
	{type: vectorfield3d, def: [["f:sin(x)", "f:sin(y)", "f:sin(z)"], [-5, 5, 5], [-5, 5, 5], [-5, 5, 5]]}
]
```

## Demo 2
```graph
bounds: [-5, 5, 5, -5]
elements:
  - type: "point"
    name: "A"
    def: [0, 0]
    color: "red"
  - type: "point"
    name: "B"
    def: [3, 0]
    color: "blue"
  - type: "circle"
    name: "c"
    def: ["A", "B"]
    color: "green"
  - type: "functiongraph"
    def: ["f:Math.sin(x)"]
    color: "purple"
  - type: "text"
    def: [2, 4, "Cool Graph!"]
```

## Demo 3
```graph
bounds: [-10, 10, 10, -10]
bounds3d: [[-5,5],[-5,5],[-5,5]]
axis: false
keepAspectRatio: true
elements: [
	{type: parametricsurface3d, def: ["f:(2+cos(x))*cos(y)" , "f:(2+cos(x))*sin(y)", "f:sin(x)", [-5, "f:2*PI"], [-5, "f:PI"]]},
]
```


```graph
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

# Create a figure
fig = plt.figure(figsize=(10, 8))
ax = fig.add_subplot(111, projection='3d')

# Create grid points
x = np.linspace(-2, 2, 100)
y = np.linspace(-1, 1, 50)
X, Y = np.meshgrid(x, y)

# Ship hull (main body)
Z1 = -0.5 * (X**2 + Y**2) + 1.5
Z1 = np.maximum(Z1, 0.5)  # Flatten the bottom

# Create the main body of the ship
ax.plot_surface(X, Y, Z1, color='blue', alpha=0.7)

# Create the deck of the ship
deck_height = 1.5
deck_mask = Z1 > deck_height
Z2 = np.where(deck_mask, Z1, deck_height)
ax.plot_surface(X, Y, Z2, color='red', alpha=0.7)

# Create the smokestack
stack_x = np.linspace(-0.2, 0.2, 2)
stack_y = np.linspace(-0.2, 0.2, 2)
stack_X, stack_Y = np.meshgrid(stack_x, stack_y)
stack_Z = np.full_like(stack_X, deck_height)

ax.plot_surface(stack_X, stack_Y, stack_Z + 0.5, color='black')
for i in range(2):
    for j in range(2):
        ax.plot([stack_X[i,j], stack_X[i,j]], 
                [stack_Y[i,j], stack_Y[i,j]], 
                [deck_height, deck_height + 0.5], color='black')

# Set labels and title
ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_zlabel('Z')
ax.set_title('Simplified 3D Ship Model')

# Set limits for better view
ax.set_xlim([-2, 2])
ax.set_ylim([-1, 1])
ax.set_zlim([0, 2.5])

# Adjust viewing angle
ax.view_init(elev=20, azim=45)

plt.tight_layout()
plt.show()
```