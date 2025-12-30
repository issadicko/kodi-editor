import {
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
    AfterViewInit,
    ChangeDetectionStrategy,
    NgZone,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import type { editor } from 'monaco-editor';
import { KodiEditorService } from './kodi-editor.service';
import { DiagnosticError } from '@issadicko/kodi-editor-language-service';
import { LANGUAGE_ID, THEME_DARK, THEME_LIGHT } from '@issadicko/kodi-editor-language';

export type KodiEditorTheme = 'kodi-dark' | 'kodi-light';

export interface KodiEditorOptions {
    readOnly?: boolean;
    minimap?: boolean;
    lineNumbers?: boolean;
    wordWrap?: boolean;
    fontSize?: number;
}

/**
 * KodiScript code editor component for Angular.
 *
 * @example
 * ```html
 * <kodi-editor
 *   [(ngModel)]="code"
 *   [theme]="'kodi-dark'"
 *   [options]="{ readOnly: false, minimap: false }"
 *   (validationErrors)="onErrors($event)">
 * </kodi-editor>
 * ```
 */
@Component({
    selector: 'kodi-editor',
    standalone: true,
    template: `
    <div
      #editorContainer
      class="kodi-editor-container"
      [style.height]="height"
      [style.width]="width">
    </div>
  `,
    styles: [`
    .kodi-editor-container {
      display: block;
      border: 1px solid #333;
      border-radius: 4px;
      overflow: hidden;
    }
  `],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => KodiEditorComponent),
            multi: true,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KodiEditorComponent implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
    @ViewChild('editorContainer', { static: true }) editorContainer!: ElementRef<HTMLDivElement>;

    /** Editor theme */
    @Input() theme: KodiEditorTheme = 'kodi-dark';

    /** Editor height (CSS value) */
    @Input() height = '400px';

    /** Editor width (CSS value) */
    @Input() width = '100%';

    /** Additional editor options */
    @Input() options: KodiEditorOptions = {};

    /** Validation debounce time in ms */
    @Input() validationDelay = 500;

    /** Emits validation errors when code is validated */
    @Output() validationErrors = new EventEmitter<DiagnosticError[]>();

    /** Emits when the editor is ready */
    @Output() editorReady = new EventEmitter<editor.IStandaloneCodeEditor>();

    private editor: editor.IStandaloneCodeEditor | null = null;
    private value = '';
    private validationTimeout: ReturnType<typeof setTimeout> | null = null;

    // ControlValueAccessor
    private onChange: (value: string) => void = () => { };
    private onTouched: () => void = () => { };

    constructor(
        private editorService: KodiEditorService,
        private ngZone: NgZone,
    ) { }

    ngOnInit(): void {
        // Initialization moved to ngAfterViewInit
    }

    async ngAfterViewInit(): Promise<void> {
        await this.initEditor();
    }

    ngOnDestroy(): void {
        if (this.validationTimeout) {
            clearTimeout(this.validationTimeout);
        }
        if (this.editor) {
            this.editor.dispose();
            this.editor = null;
        }
    }

    private async initEditor(): Promise<void> {
        const monaco = await this.editorService.loadMonaco();

        // Run outside Angular zone for performance
        this.ngZone.runOutsideAngular(() => {
            const editorOptions: editor.IStandaloneEditorConstructionOptions = {
                value: this.value,
                language: LANGUAGE_ID,
                theme: this.theme === 'kodi-light' ? THEME_LIGHT : THEME_DARK,
                automaticLayout: true,
                readOnly: this.options.readOnly ?? false,
                minimap: { enabled: this.options.minimap ?? false },
                lineNumbers: this.options.lineNumbers !== false ? 'on' : 'off',
                wordWrap: this.options.wordWrap ? 'on' : 'off',
                fontSize: this.options.fontSize ?? 14,
                scrollBeyondLastLine: false,
                renderWhitespace: 'selection',
                tabSize: 2,
                insertSpaces: true,
                folding: true,
                bracketPairColorization: { enabled: true },
            };

            this.editor = monaco.editor.create(
                this.editorContainer.nativeElement,
                editorOptions,
            ) as unknown as editor.IStandaloneCodeEditor;

            // Listen for content changes
            this.editor.onDidChangeModelContent(() => {
                const newValue = this.editor!.getValue();
                this.ngZone.run(() => {
                    this.value = newValue;
                    this.onChange(newValue);
                    this.scheduleValidation();
                });
            });

            // Listen for blur events
            this.editor.onDidBlurEditorWidget(() => {
                this.ngZone.run(() => {
                    this.onTouched();
                });
            });

            // Initial validation
            this.scheduleValidation();
        });

        // Emit ready event
        this.editorReady.emit(this.editor!);
    }

    /**
     * Schedules validation with debouncing.
     */
    private scheduleValidation(): void {
        if (this.validationTimeout) {
            clearTimeout(this.validationTimeout);
        }

        this.validationTimeout = setTimeout(async () => {
            await this.validate();
        }, this.validationDelay);
    }

    /**
     * Validates the current editor content.
     */
    async validate(): Promise<DiagnosticError[]> {
        const diagnosticsService = this.editorService.getDiagnosticsService();
        if (!diagnosticsService || !this.editor) {
            return [];
        }

        const model = this.editor.getModel();
        if (!model) {
            return [];
        }

        const errors = await diagnosticsService.validate(model);
        this.validationErrors.emit(errors);
        return errors;
    }

    /**
     * Sets the editor theme dynamically.
     */
    setTheme(theme: KodiEditorTheme): void {
        this.theme = theme;
        // Theme change is handled by Monaco editor when it updates
    }

    /**
     * Focuses the editor.
     */
    focus(): void {
        this.editor?.focus();
    }

    /**
     * Gets the current editor instance.
     */
    getEditor(): editor.IStandaloneCodeEditor | null {
        return this.editor;
    }

    // ControlValueAccessor implementation

    writeValue(value: string): void {
        this.value = value || '';
        if (this.editor && this.editor.getValue() !== this.value) {
            this.editor.setValue(this.value);
        }
    }

    registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        if (this.editor) {
            this.editor.updateOptions({ readOnly: isDisabled });
        }
    }
}
