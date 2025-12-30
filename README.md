# KodiScript Editor

A specialized code editor for KodiScript language, built with Monaco Editor.

## Packages

| Package | Description | npm |
|---------|-------------|-----|
| `@kodi/editor-language` | Language definition (syntax highlighting, themes) | - |
| `@kodi/editor-language-service` | Language services (completion, diagnostics, hover) | - |
| `@kodi/editor-angular` | Angular component | - |

## Quick Start (Angular)

### 1. Install

```bash
npm install @kodi/editor-angular monaco-editor
```

### 2. Import component

```typescript
import { KodiEditorComponent } from '@kodi/editor-angular';

@Component({
  standalone: true,
  imports: [KodiEditorComponent],
  template: `
    <kodi-editor
      [(ngModel)]="code"
      [theme]="'kodi-dark'"
      (validationErrors)="onErrors($event)">
    </kodi-editor>
  `
})
export class MyComponent {
  code = 'let message = "Hello, KodiScript!"';

  onErrors(errors: DiagnosticError[]) {
    console.log('Validation:', errors);
  }
}
```

## Features

- 🎨 Syntax highlighting for KodiScript
- ✅ Real-time validation (syntactic + semantic)
- 💡 Autocompletion for keywords and functions
- 📖 Hover documentation
- 🌓 Dark/Light themes
- 📝 Angular Forms integration (ngModel, formControl)

## Development

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run demo app
cd apps/demo-angular
pnpm start
```

## License

MIT
