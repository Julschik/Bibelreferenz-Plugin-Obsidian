import type { BibleRefSettings, CustomBookMappingsV2 } from '../types';

/**
 * DisplayIdResolver
 *
 * Resolves the display ID for a canonical book ID
 * Handles pinned custom IDs while maintaining backwards compatibility
 */
export class DisplayIdResolver {
  private displayIdMap: Map<string, string>;  // canonicalId → displayId

  constructor(customMappingsV2?: CustomBookMappingsV2) {
    this.displayIdMap = this.buildDisplayIdMap(customMappingsV2);
  }

  /**
   * Get display ID for a canonical book ID
   * @param canonicalId Internal canonical ID (e.g., "Mat")
   * @returns Display ID to use in tags/UI (e.g., "Mt" if pinned)
   */
  getDisplayId(canonicalId: string): string {
    return this.displayIdMap.get(canonicalId) || canonicalId;
  }

  /**
   * Get canonical ID from a display ID
   * Needed for parsing tags that use custom display IDs
   * @param displayId Display ID from tag (e.g., "Mt")
   * @returns Canonical ID (e.g., "Mat")
   */
  getCanonicalId(displayId: string): string | null {
    // Check if displayId IS a canonical ID
    if (this.displayIdMap.has(displayId)) {
      return displayId;
    }

    // Check if displayId is a mapped display ID
    for (const [canonical, display] of this.displayIdMap.entries()) {
      if (display === displayId) {
        return canonical;
      }
    }

    return null;
  }

  private buildDisplayIdMap(
    customMappingsV2?: CustomBookMappingsV2
  ): Map<string, string> {
    const map = new Map<string, string>();

    if (!customMappingsV2) return map;

    for (const [canonicalId, customization] of Object.entries(customMappingsV2)) {
      if (customization.pinnedDisplayId) {
        map.set(canonicalId, customization.pinnedDisplayId);
      }
    }

    return map;
  }
}

/**
 * Factory function to create DisplayIdResolver from settings
 */
export function createDisplayIdResolver(
  settings: BibleRefSettings
): DisplayIdResolver {
  return new DisplayIdResolver(settings.customBookMappingsV2);
}
