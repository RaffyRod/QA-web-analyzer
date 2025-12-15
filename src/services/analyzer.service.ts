/**
 * @author RaffyRod (https://github.com/RaffyRod)
 */

import { chromium } from 'playwright';
import type {
  AnalysisOptions,
  AnalysisResult,
  ImageElement,
  LinkElement,
  ButtonElement,
  InputElement,
  RoleElement,
  AnalysisSummary,
} from '../types/index.js';

export class AnalyzerService {
  /**
   * Analyzes a web page for accessibility issues based on provided options
   */
  async analyzePage(url: string, options: AnalysisOptions): Promise<AnalysisResult> {
    let browser;
    try {
      browser = await chromium.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
    } catch (error) {
      throw new Error(
        `Failed to launch browser: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }

    const page = await browser.newPage();

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

      const results = await page.evaluate((opts) => {
        let elementCounter = 0;

        function generateSelector(element: Element): string {
          elementCounter++;
          element.setAttribute('data-qa-analyzer-id', elementCounter.toString());
          return elementCounter.toString();
        }

        function checkFocusState(element: HTMLElement): boolean {
          const tagName = element.tagName.toLowerCase();
          if (tagName !== 'a' && tagName !== 'button' && tagName !== 'img' && tagName !== 'input') {
            return true;
          }

          if (tagName === 'img' && !(element as HTMLImageElement).hasAttribute('tabindex')) {
            return true;
          }

          const stylesheets = Array.from(document.styleSheets);
          let hasFocusRule = false;
          const elementSelector =
            tagName +
            (element.id ? '#' + element.id : '') +
            (element.className && typeof element.className === 'string'
              ? '.' + element.className.split(' ').join('.')
              : '');

          for (const sheet of stylesheets) {
            try {
              const rules = Array.from(sheet.cssRules || []);
              for (const rule of rules) {
                if (rule instanceof CSSStyleRule) {
                  const selector = rule.selectorText;
                  if (
                    selector &&
                    (selector.includes(':focus') || selector.includes(':focus-visible'))
                  ) {
                    const baseSelector = selector.split(':')[0].trim();
                    if (
                      baseSelector === tagName ||
                      baseSelector === elementSelector ||
                      element.matches(baseSelector)
                    ) {
                      const focusRule = rule.style;
                      const hasOutline = !!(
                        focusRule.outline &&
                        focusRule.outline !== 'none' &&
                        focusRule.outlineWidth !== '0px'
                      );
                      const hasBoxShadow = !!(
                        focusRule.boxShadow && focusRule.boxShadow !== 'none'
                      );
                      const hasBorder = !!(
                        focusRule.border &&
                        focusRule.border !== 'none' &&
                        focusRule.borderWidth !== '0px'
                      );

                      if (hasOutline || hasBoxShadow || hasBorder) {
                        hasFocusRule = true;
                        break;
                      }
                    }
                  }
                }
              }
            } catch (e) {}
          }

          if (hasFocusRule) return true;

          try {
            const previousActiveElement = document.activeElement;
            const previousTabIndex = element.getAttribute('tabindex');
            let shouldRemoveTabIndex = false;

            if (tagName === 'img' && !previousTabIndex) {
              element.setAttribute('tabindex', '0');
              shouldRemoveTabIndex = true;
            }

            if (element instanceof HTMLElement) {
              element.focus();

              const computedStyle = window.getComputedStyle(element);
              const hasComputedOutline = !!(
                computedStyle.outline &&
                computedStyle.outline !== 'none' &&
                computedStyle.outlineWidth !== '0px'
              );
              const hasComputedBoxShadow = !!(
                computedStyle.boxShadow && computedStyle.boxShadow !== 'none'
              );
              const hasComputedBorder = !!(
                computedStyle.border &&
                computedStyle.border !== 'none' &&
                computedStyle.borderWidth !== '0px'
              );

              const hasFocus = hasComputedOutline || hasComputedBoxShadow || hasComputedBorder;

              if (previousActiveElement && previousActiveElement instanceof HTMLElement) {
                previousActiveElement.focus();
              } else {
                element.blur();
              }

              if (shouldRemoveTabIndex) {
                element.removeAttribute('tabindex');
              }

              return hasFocus;
            }

            const computedStyle = window.getComputedStyle(element);
            const hasComputedOutline = !!(
              computedStyle.outline &&
              computedStyle.outline !== 'none' &&
              computedStyle.outlineWidth !== '0px'
            );
            const hasComputedBoxShadow = !!(
              computedStyle.boxShadow && computedStyle.boxShadow !== 'none'
            );
            const hasComputedBorder = !!(
              computedStyle.border &&
              computedStyle.border !== 'none' &&
              computedStyle.borderWidth !== '0px'
            );

            return hasComputedOutline || hasComputedBoxShadow || hasComputedBorder;
          } catch (e) {
            return false;
          }
        }

        const analysis: {
          images: ImageElement[];
          links: LinkElement[];
          buttons: ButtonElement[];
          inputs: InputElement[];
          roles: RoleElement[];
          summary: AnalysisSummary;
        } = {
          images: [],
          links: [],
          buttons: [],
          inputs: [],
          roles: [],
          summary: {
            totalImages: 0,
            imagesWithoutAlt: 0,
            imagesWithoutFocusState: 0,
            totalLinks: 0,
            linksWithoutAccessibility: 0,
            linksWithoutFocusState: 0,
            totalButtons: 0,
            buttonsWithoutAccessibility: 0,
            buttonsWithoutFocusState: 0,
            totalInputs: 0,
            inputsWithoutAccessibility: 0,
            totalRoles: 0,
            rolesWithoutAccessibility: 0,
          },
        };

        if (opts.checkImages) {
          document.querySelectorAll('img').forEach((img: HTMLImageElement, i: number) => {
            const altAttribute = img.getAttribute('alt');
            const ariaLabel = img.getAttribute('aria-label');
            const ariaLabelledby = img.getAttribute('aria-labelledby');
            const hasFocusState = opts.checkFocusStates ? checkFocusState(img) : true;
            const outerHTML = img.outerHTML;
            const selector = generateSelector(img);

            // According to WCAG 2.2 AA, images can have alternative text via:
            // 1. alt attribute (preferred)
            // 2. aria-label
            // 3. aria-labelledby
            const hasAlt = altAttribute !== null && altAttribute.trim() !== '';
            const hasAriaLabel = ariaLabel !== null && ariaLabel.trim() !== '';
            const hasAriaLabelledby = ariaLabelledby !== null && ariaLabelledby.trim() !== '';
            const hasAlternativeText = hasAlt || hasAriaLabel || hasAriaLabelledby;

            const missingAttributes: string[] = [];

            // Check alt text (if option is enabled)
            if (opts.checkAltText) {
              if (!hasAlternativeText) {
                // No alternative text at all
                missingAttributes.push('alt (missing - use alt, aria-label, or aria-labelledby)');
              } else if (!hasAlt && (hasAriaLabel || hasAriaLabelledby)) {
                // Has aria-label or aria-labelledby but no alt (warning, not error)
                // This is valid per WCAG but alt is preferred
                if (hasAriaLabel) {
                  missingAttributes.push(
                    'alt (missing - aria-label present, but alt is preferred)'
                  );
                } else if (hasAriaLabelledby) {
                  missingAttributes.push(
                    'alt (missing - aria-labelledby present, but alt is preferred)'
                  );
                }
              } else if (altAttribute !== null && altAttribute.trim() === '') {
                missingAttributes.push('alt (empty - consider if image is decorative)');
              }
            }

            // Check aria-label (if option is enabled)
            // According to WCAG: if image has alt, aria-label is not required
            // aria-label is only required if alt is missing
            if (opts.checkAriaLabel) {
              if (!hasAlt && !hasAriaLabel && !hasAriaLabelledby) {
                // No alternative text at all - aria-label would be one valid option
                missingAttributes.push(
                  'aria-label (missing - no alternative text found, use alt or aria-label)'
                );
              } else if (!hasAlt && !hasAriaLabel && hasAriaLabelledby) {
                // Has aria-labelledby but no alt or aria-label - alt is preferred but aria-label would also work
                // This is valid per WCAG, but we note that alt is preferred
              }
            }

            // Check aria-labelledby (if option is enabled)
            // According to WCAG: if image has alt, aria-labelledby is not required
            if (opts.checkAriaLabelledby) {
              if (!hasAlt && !hasAriaLabelledby && !hasAriaLabel) {
                // No alternative text at all - aria-labelledby would be one valid option
                missingAttributes.push(
                  'aria-labelledby (missing - no alternative text found, use alt or aria-labelledby)'
                );
              }
            }

            if (!hasFocusState && opts.checkFocusStates) missingAttributes.push('focus-state');

            const hasAccessibility = missingAttributes.length === 0 && hasAlternativeText;

            analysis.images.push({
              index: i + 1,
              src: img.src,
              alt: img.alt || null,
              ariaLabel: ariaLabel || null,
              ariaLabelledby: ariaLabelledby || null,
              hasAlt: hasAlternativeText, // Updated to reflect any alternative text method
              hasFocusState,
              hasAccessibility,
              outerHTML,
              selector,
              missingAttributes,
            });

            analysis.summary.totalImages++;
            if (
              !hasAlternativeText &&
              (opts.checkAltText || opts.checkAriaLabel || opts.checkAriaLabelledby)
            ) {
              analysis.summary.imagesWithoutAlt++;
            }
            if (!hasFocusState && opts.checkFocusStates) {
              analysis.summary.imagesWithoutFocusState++;
            }
          });
        }

        if (opts.checkLinks) {
          document.querySelectorAll('a').forEach((link: HTMLAnchorElement, i: number) => {
            const ariaLabel = link.getAttribute('aria-label');
            const ariaLabelledby = link.getAttribute('aria-labelledby');
            const ariaHidden = link.getAttribute('aria-hidden');
            const ariaExpanded = link.getAttribute('aria-expanded');
            const ariaControls = link.getAttribute('aria-controls');
            const ariaCurrent = link.getAttribute('aria-current');
            const tabIndex = link.getAttribute('tabindex');
            const lang = link.getAttribute('lang');
            const title = link.getAttribute('title');
            const text = link.textContent?.trim() || '';

            const missingAttributes: string[] = [];

            // Validate href attribute - only if checkHref is enabled
            const href = link.getAttribute('href');
            if (opts.checkHref && (!href || href.trim() === '' || href === '#')) {
              missingAttributes.push('href (missing or empty)');
            }

            if (opts.checkAriaLabel && !ariaLabel) missingAttributes.push('aria-label');
            if (opts.checkAriaLabelledby && !ariaLabelledby)
              missingAttributes.push('aria-labelledby');
            if (opts.checkTitle && !title) missingAttributes.push('title');

            if (
              opts.checkAriaHidden &&
              ariaHidden === 'true' &&
              (text || ariaLabel || ariaLabelledby)
            ) {
              missingAttributes.push('aria-hidden (should not be true for accessible elements)');
            }

            if (opts.checkAriaExpanded && (ariaExpanded === 'true' || ariaExpanded === 'false')) {
              if (!ariaControls && !link.querySelector('[aria-controls]')) {
                missingAttributes.push('aria-expanded (should have aria-controls)');
              }
            }

            if (opts.checkTabIndex && tabIndex && parseInt(tabIndex) > 0) {
              missingAttributes.push('tabindex (positive values are anti-pattern)');
            }

            if (opts.checkLang && !lang && !link.closest('[lang]')) {
              const htmlLang = document.documentElement.getAttribute('lang');
              if (!htmlLang) {
                missingAttributes.push('lang (language not specified)');
              }
            }

            const hasFocusState = opts.checkFocusStates ? checkFocusState(link) : true;
            const outerHTML = link.outerHTML;
            const selector = generateSelector(link);

            if (!hasFocusState && opts.checkFocusStates) missingAttributes.push('focus-state');

            const hasAccessibility =
              missingAttributes.length === 0 &&
              !!(
                text ||
                (opts.checkAriaLabel ? ariaLabel : true) ||
                (opts.checkAriaLabelledby ? ariaLabelledby : true) ||
                (opts.checkTitle ? title : true)
              );

            analysis.links.push({
              index: i + 1,
              text,
              href: link.href,
              ariaLabel: ariaLabel || null,
              ariaLabelledby: ariaLabelledby || null,
              ariaHidden: ariaHidden || null,
              ariaExpanded: ariaExpanded || null,
              ariaControls: ariaControls || null,
              ariaCurrent: ariaCurrent || null,
              tabIndex: tabIndex || null,
              lang: lang || null,
              title: title || null,
              hasAccessibility,
              hasFocusState,
              outerHTML,
              missingAttributes,
              selector,
            });

            analysis.summary.totalLinks++;
            if (!hasAccessibility) {
              analysis.summary.linksWithoutAccessibility++;
            }
            if (!hasFocusState && opts.checkFocusStates) {
              analysis.summary.linksWithoutFocusState++;
            }
          });
        }

        if (opts.checkButtons) {
          document.querySelectorAll('button').forEach((btn: HTMLButtonElement, i: number) => {
            const ariaLabel = btn.getAttribute('aria-label');
            const ariaLabelledby = btn.getAttribute('aria-labelledby');
            const ariaDescribedby = btn.getAttribute('aria-describedby');
            const ariaHidden = btn.getAttribute('aria-hidden');
            const ariaExpanded = btn.getAttribute('aria-expanded');
            const ariaControls = btn.getAttribute('aria-controls');
            const ariaCurrent = btn.getAttribute('aria-current');
            const tabIndex = btn.getAttribute('tabindex');
            const lang = btn.getAttribute('lang');
            const text = btn.textContent?.trim() || '';

            const missingAttributes: string[] = [];

            if (opts.checkAriaLabel && !ariaLabel) missingAttributes.push('aria-label');
            if (opts.checkAriaLabelledby && !ariaLabelledby)
              missingAttributes.push('aria-labelledby');
            if (opts.checkAriaDescribedby && !ariaDescribedby)
              missingAttributes.push('aria-describedby');

            if (
              opts.checkAriaHidden &&
              ariaHidden === 'true' &&
              (text || ariaLabel || ariaLabelledby)
            ) {
              missingAttributes.push('aria-hidden (should not be true for accessible elements)');
            }

            if (opts.checkAriaExpanded && (ariaExpanded === 'true' || ariaExpanded === 'false')) {
              if (!ariaControls && !btn.querySelector('[aria-controls]')) {
                missingAttributes.push('aria-expanded (should have aria-controls)');
              }
            }

            if (opts.checkTabIndex && tabIndex && parseInt(tabIndex) > 0) {
              missingAttributes.push('tabindex (positive values are anti-pattern)');
            }

            if (opts.checkLang && !lang && !btn.closest('[lang]')) {
              const htmlLang = document.documentElement.getAttribute('lang');
              if (!htmlLang) {
                missingAttributes.push('lang (language not specified)');
              }
            }

            const hasFocusState = opts.checkFocusStates ? checkFocusState(btn) : true;
            const outerHTML = btn.outerHTML;
            const selector = generateSelector(btn);

            if (!hasFocusState && opts.checkFocusStates) missingAttributes.push('focus-state');

            const hasAccessibility =
              missingAttributes.length === 0 &&
              (!!text ||
                (opts.checkAriaLabel ? !!ariaLabel : true) ||
                (opts.checkAriaLabelledby ? !!ariaLabelledby : true) ||
                (opts.checkAriaDescribedby ? !!ariaDescribedby : true));

            analysis.buttons.push({
              index: i + 1,
              text,
              ariaLabel: ariaLabel || null,
              ariaLabelledby: ariaLabelledby || null,
              ariaDescribedby: ariaDescribedby || null,
              ariaHidden: ariaHidden || null,
              ariaExpanded: ariaExpanded || null,
              ariaControls: ariaControls || null,
              ariaCurrent: ariaCurrent || null,
              tabIndex: tabIndex || null,
              lang: lang || null,
              hasAccessibility,
              hasFocusState,
              outerHTML,
              missingAttributes,
              selector,
            });

            analysis.summary.totalButtons++;
            if (!hasAccessibility) {
              analysis.summary.buttonsWithoutAccessibility++;
            }
            if (!hasFocusState && opts.checkFocusStates) {
              analysis.summary.buttonsWithoutFocusState++;
            }
          });
        }

        if (opts.checkInputs) {
          document
            .querySelectorAll('input, textarea, select')
            .forEach((element: Element, i: number) => {
              const ariaLabel = element.getAttribute('aria-label');
              const ariaLabelledby = element.getAttribute('aria-labelledby');
              const ariaRequired = element.getAttribute('aria-required');
              const ariaInvalid = element.getAttribute('aria-invalid');
              const ariaDescribedby = element.getAttribute('aria-describedby');
              const ariaHidden = element.getAttribute('aria-hidden');
              const tabIndex = element.getAttribute('tabindex');
              const lang = element.getAttribute('lang');
              const inputElement = element as
                | HTMLInputElement
                | HTMLTextAreaElement
                | HTMLSelectElement;
              const label = inputElement.labels?.[0]?.textContent?.trim() || null;
              const isRequired =
                (inputElement as HTMLInputElement).required || ariaRequired === 'true';

              const missingAttributes: string[] = [];

              if (opts.checkAriaLabel && !ariaLabel && !label) missingAttributes.push('aria-label');
              if (opts.checkAriaLabelledby && !ariaLabelledby && !label)
                missingAttributes.push('aria-labelledby');
              if (opts.checkLabels && !label) missingAttributes.push('label');

              if (opts.checkAriaRequired && isRequired && !ariaRequired) {
                missingAttributes.push('aria-required (should be set for required inputs)');
              }

              if (opts.checkAriaInvalid && ariaInvalid === 'true' && !ariaDescribedby) {
                missingAttributes.push(
                  'aria-invalid (should have aria-describedby for error messages)'
                );
              }

              if (opts.checkAriaHidden && ariaHidden === 'true') {
                missingAttributes.push('aria-hidden (should not be true for form inputs)');
              }

              if (opts.checkTabIndex && tabIndex && parseInt(tabIndex) > 0) {
                missingAttributes.push('tabindex (positive values are anti-pattern)');
              }

              if (opts.checkLang && !lang && !element.closest('[lang]')) {
                const htmlLang = document.documentElement.getAttribute('lang');
                if (!htmlLang) {
                  missingAttributes.push('lang (language not specified)');
                }
              }

              const hasAccessibility =
                missingAttributes.length === 0 && (!!ariaLabel || !!ariaLabelledby || !!label);
              const outerHTML = element.outerHTML;
              const selector = generateSelector(element);

              let inputType: string;
              let inputName: string | null = null;

              if (element.tagName === 'INPUT') {
                const htmlInput = element as HTMLInputElement;
                inputType = htmlInput.type || 'text';
                inputName = htmlInput.name || null;
              } else if (element.tagName === 'TEXTAREA') {
                inputType = 'textarea';
                const htmlTextarea = element as HTMLTextAreaElement;
                inputName = htmlTextarea.name || null;
              } else if (element.tagName === 'SELECT') {
                inputType = 'select';
                const htmlSelect = element as HTMLSelectElement;
                inputName = htmlSelect.name || null;
              } else {
                inputType = element.tagName.toLowerCase();
              }

              analysis.inputs.push({
                index: i + 1,
                type: inputType,
                name: inputName,
                ariaLabel: ariaLabel || null,
                ariaLabelledby: ariaLabelledby || null,
                ariaRequired: ariaRequired || null,
                ariaInvalid: ariaInvalid || null,
                ariaDescribedby: ariaDescribedby || null,
                ariaHidden: ariaHidden || null,
                tabIndex: tabIndex || null,
                lang: lang || null,
                label: label || null,
                hasAccessibility,
                outerHTML,
                missingAttributes,
                selector,
              });

              analysis.summary.totalInputs++;
              if (!hasAccessibility) {
                analysis.summary.inputsWithoutAccessibility++;
              }
            });
        }

        if (opts.checkRoles) {
          document.querySelectorAll('[role]').forEach((el: Element, i: number) => {
            const role = el.getAttribute('role');
            const ariaLabel = el.getAttribute('aria-label');
            const ariaLabelledby = el.getAttribute('aria-labelledby');
            const ariaDescribedby = el.getAttribute('aria-describedby');
            const ariaHidden = el.getAttribute('aria-hidden');
            const ariaExpanded = el.getAttribute('aria-expanded');
            const ariaControls = el.getAttribute('aria-controls');
            const ariaCurrent = el.getAttribute('aria-current');
            const tabIndex = el.getAttribute('tabindex');
            const lang = el.getAttribute('lang');
            const text = el.textContent?.trim() || '';

            const missingAttributes: string[] = [];

            if (opts.checkAriaLabel && !ariaLabel) missingAttributes.push('aria-label');
            if (opts.checkAriaLabelledby && !ariaLabelledby)
              missingAttributes.push('aria-labelledby');

            if (
              opts.checkAriaHidden &&
              ariaHidden === 'true' &&
              (text || ariaLabel || ariaLabelledby)
            ) {
              missingAttributes.push('aria-hidden (should not be true for accessible elements)');
            }

            if (opts.checkAriaExpanded && (ariaExpanded === 'true' || ariaExpanded === 'false')) {
              if (!ariaControls && !el.querySelector('[aria-controls]')) {
                missingAttributes.push('aria-expanded (should have aria-controls)');
              }
            }

            if (opts.checkTabIndex && tabIndex && parseInt(tabIndex) > 0) {
              missingAttributes.push('tabindex (positive values are anti-pattern)');
            }

            if (opts.checkLang && !lang && !el.closest('[lang]')) {
              const htmlLang = document.documentElement.getAttribute('lang');
              if (!htmlLang) {
                missingAttributes.push('lang (language not specified)');
              }
            }

            const hasAccessibility =
              missingAttributes.length === 0 &&
              (!!text ||
                (opts.checkAriaLabel ? !!ariaLabel : true) ||
                (opts.checkAriaLabelledby ? !!ariaLabelledby : true));
            const outerHTML = el.outerHTML;
            const selector = generateSelector(el);

            analysis.roles.push({
              index: i + 1,
              tag: el.tagName,
              role: role || '',
              ariaLabel: ariaLabel || null,
              ariaLabelledby: ariaLabelledby || null,
              ariaDescribedby: ariaDescribedby || null,
              ariaHidden: ariaHidden || null,
              ariaExpanded: ariaExpanded || null,
              ariaControls: ariaControls || null,
              ariaCurrent: ariaCurrent || null,
              tabIndex: tabIndex || null,
              lang: lang || null,
              hasAccessibility,
              outerHTML,
              missingAttributes,
              selector,
            });

            analysis.summary.totalRoles++;
            if (!hasAccessibility) {
              analysis.summary.rolesWithoutAccessibility++;
            }
          });
        }

        return analysis;
      }, options);

      // Capture screenshots for ALL elements, not just those with issues
      const elementsToScreenshot: Array<{ selector: string; type: string }> = [];

      // Add all images
      results.images.forEach((img) => {
        if (img.selector) {
          elementsToScreenshot.push({ selector: img.selector, type: 'image' });
        }
      });

      // Add all links
      results.links.forEach((link) => {
        if (link.selector) {
          elementsToScreenshot.push({ selector: link.selector, type: 'link' });
        }
      });

      // Add all buttons
      results.buttons.forEach((btn) => {
        if (btn.selector) {
          elementsToScreenshot.push({ selector: btn.selector, type: 'button' });
        }
      });

      // Add all inputs
      results.inputs.forEach((input) => {
        if (input.selector) {
          elementsToScreenshot.push({ selector: input.selector, type: 'input' });
        }
      });

      // Add all roles
      results.roles.forEach((role) => {
        if (role.selector) {
          elementsToScreenshot.push({ selector: role.selector, type: 'role' });
        }
      });

      for (const element of elementsToScreenshot) {
        try {
          const selectorId = element.selector;
          if (!selectorId) continue;

          const elementHandle = await page.locator(`[data-qa-analyzer-id="${selectorId}"]`).first();

          if ((await elementHandle.count()) > 0) {
            await elementHandle.evaluate((el: Element) => {
              const htmlEl = el as HTMLElement;
              htmlEl.style.outline = '3px solid #ef4444';
              htmlEl.style.outlineOffset = '2px';
              htmlEl.style.boxShadow = '0 0 0 2px rgba(239, 68, 68, 0.3)';
            });

            await page.waitForTimeout(100);

            const screenshot = await elementHandle.screenshot({
              type: 'png',
            });

            const base64Screenshot = screenshot.toString('base64');
            const dataUrl = `data:image/png;base64,${base64Screenshot}`;

            if (element.type === 'image') {
              const img = results.images.find((i) => i.selector === element.selector);
              if (img) img.screenshot = dataUrl;
            } else if (element.type === 'link') {
              const link = results.links.find((l) => l.selector === element.selector);
              if (link) link.screenshot = dataUrl;
            } else if (element.type === 'button') {
              const btn = results.buttons.find((b) => b.selector === element.selector);
              if (btn) btn.screenshot = dataUrl;
            } else if (element.type === 'input') {
              const input = results.inputs.find((inp) => inp.selector === element.selector);
              if (input) input.screenshot = dataUrl;
            } else if (element.type === 'role') {
              const role = results.roles.find((r) => r.selector === element.selector);
              if (role) role.screenshot = dataUrl;
            }

            await elementHandle.evaluate((el: Element) => {
              const htmlEl = el as HTMLElement;
              htmlEl.style.outline = '';
              htmlEl.style.outlineOffset = '';
              htmlEl.style.boxShadow = '';
            });
          }
        } catch (error) {
          console.error(`Error taking screenshot for ${element.selector}:`, error);
        }
      }

      await browser.close();

      return {
        ...results,
        url,
        analyzedAt: new Date().toISOString(),
      };
    } catch (error) {
      if (browser) {
        await browser.close().catch((closeError) => {
          console.error('Error closing browser:', closeError);
        });
      }
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      const enhancedError = new Error(`Analysis failed: ${errorMessage}`);
      if (error instanceof Error && error.stack) {
        enhancedError.stack = error.stack;
      }
      throw enhancedError;
    }
  }
}
