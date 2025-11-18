- Description: Renders PlantUML diagrams within your Obsidian notes.
- Setup: Install the plugin, then use PlantUML syntax within code blocks to create diagrams.
# Demo
## Normal PlantUML
```plantuml
Bob -> Alice : hello
Alice -> Wonderland: hello
Wonderland -> next: hello
next -> Last: hello
Last -> next: hello
next -> Wonderland : hello
Wonderland -> Alice : hello
Alice -> Bob: hello
```

## PlantUML SVG
```plantuml-svg
Bob -> Alice : hello
Alice -> Wonderland: hello
Wonderland -> next: hello
next -> Last: hello
Last -> next: hello
next -> Wonderland : hello
Wonderland -> Alice : hello
Alice -> Bob: hello
```

## PlantUML ASCII
```plantuml-ascii
Bob -> Alice : hello
Alice -> Wonderland: hello
Wonderland -> next: hello
next -> Wonderland : hello
Wonderland -> Alice : hello
Alice -> Bob: hello
```
