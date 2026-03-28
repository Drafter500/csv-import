# CSV Files Import 

## With preview and correction/editing function

Live: https://csv-import.zemtsov.dev/

## Architecture overview

This is a simple React based SPA. Components structure:
```
App
└── CsvImporter            — orchestrator: owns data, wires components together
     ├── FileSelector      — drag-and-drop / click-to-browse CSV upload
     ├── ValidationSummary — banner showing error count and first few messages
     └── EditableTable     — virtualized table (react-virtual)
         └── TableCell     — individual input with inline validation
```
