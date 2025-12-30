import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KodiEditorComponent } from '@issadicko/kodi-editor-angular';
import { DiagnosticError } from '@issadicko/kodi-editor-language-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, KodiEditorComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'KodiScript Editor Demo';

  theme: 'kodi-dark' | 'kodi-light' = 'kodi-dark';

  code = `// Welcome to KodiScript Editor!
// Try editing this code to see syntax highlighting and validation.

let message = "Hello, KodiScript!"
let version = 1.2
let isActive = true

// Null-safety operators
let user = null
let status = user?.status ?: "offline"

// String operations
let greeting = upper(message)
let encoded = base64Encode(greeting)

// Conditional logic
if (isActive) {
  print("System is active")
} else {
  print("System is inactive")
}

// Output the result
print("Status: " + status)
print("Version: " + version)
`;

  errors: DiagnosticError[] = [];

  onValidationErrors(errors: DiagnosticError[]): void {
    this.errors = errors;
  }

  toggleTheme(): void {
    this.theme = this.theme === 'kodi-dark' ? 'kodi-light' : 'kodi-dark';
  }

  clearCode(): void {
    this.code = '// Start coding...\nlet x = 1';
  }
}
