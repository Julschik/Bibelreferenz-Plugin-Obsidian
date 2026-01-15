/**
 * Mock for the obsidian module
 * Used in vitest tests to avoid import errors
 */

export class App {}
export class Plugin {}
export class Component {}
export class Notice {}
export class MarkdownView {}
export class ItemView {}
export class WorkspaceLeaf {}
export class Setting {}
export class PluginSettingTab {}
export class Modal {}

export class TFile {
  path: string;
  basename: string;
  extension: string;
  stat: { mtime: number };

  constructor() {
    this.path = '';
    this.basename = '';
    this.extension = 'md';
    this.stat = { mtime: Date.now() };
  }
}

export class TFolder {
  path: string;
  name: string;

  constructor() {
    this.path = '';
    this.name = '';
  }
}

// Debounce function mock
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  _delay: number,
  _leading?: boolean
): T & { cancel: () => void } {
  // Return a function that calls immediately for testing
  const debouncedFn = ((...args: Parameters<T>) => fn(...args)) as T & { cancel: () => void };
  debouncedFn.cancel = () => {};
  return debouncedFn;
}

// Events interface
export interface Events {
  on(name: string, callback: (...args: any[]) => any): void;
  off(name: string, callback: (...args: any[]) => any): void;
  offref(ref: any): void;
  trigger(name: string, ...data: any[]): void;
}

// Export types
export type Debouncer<T extends unknown[], U> = ((...args: T) => U) & { cancel: () => void };
