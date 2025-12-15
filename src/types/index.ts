/**
 * @author RaffyRod (https://github.com/RaffyRod)
 */

export interface AnalysisOptions {
  checkImages: boolean;
  checkLinks: boolean;
  checkButtons: boolean;
  checkInputs: boolean;
  checkRoles: boolean;
  checkAltText: boolean;
  checkAriaLabel: boolean;
  checkAriaLabelledby: boolean;
  checkAriaDescribedby: boolean;
  checkAriaHidden: boolean;
  checkAriaExpanded: boolean;
  checkAriaControls: boolean;
  checkAriaCurrent: boolean;
  checkAriaRequired: boolean;
  checkAriaInvalid: boolean;
  checkTabIndex: boolean;
  checkLang: boolean;
  checkLabels: boolean;
  checkTitle: boolean;
  checkFocusStates: boolean;
  checkHref?: boolean;
}

export interface ImageElement {
  index: number;
  src: string;
  alt: string | null;
  ariaLabel?: string | null;
  ariaLabelledby?: string | null;
  hasAlt: boolean;
  hasFocusState: boolean;
  hasAccessibility: boolean;
  outerHTML: string;
  lineNumber?: number;
  selector?: string;
  screenshot?: string;
  missingAttributes: string[];
}

export interface LinkElement {
  index: number;
  text: string;
  href: string;
  ariaLabel: string | null;
  ariaLabelledby: string | null;
  ariaHidden: string | null;
  ariaExpanded: string | null;
  ariaControls: string | null;
  ariaCurrent: string | null;
  tabIndex: string | null;
  lang: string | null;
  title: string | null;
  hasAccessibility: boolean;
  hasFocusState: boolean;
  outerHTML: string;
  lineNumber?: number;
  missingAttributes: string[];
  selector?: string;
  screenshot?: string;
}

export interface ButtonElement {
  index: number;
  text: string;
  ariaLabel: string | null;
  ariaLabelledby: string | null;
  ariaDescribedby: string | null;
  ariaHidden: string | null;
  ariaExpanded: string | null;
  ariaControls: string | null;
  ariaCurrent: string | null;
  tabIndex: string | null;
  lang: string | null;
  hasAccessibility: boolean;
  hasFocusState: boolean;
  outerHTML: string;
  lineNumber?: number;
  missingAttributes: string[];
  selector?: string;
  screenshot?: string;
}

export interface InputElement {
  index: number;
  type: string;
  name: string | null;
  ariaLabel: string | null;
  ariaLabelledby: string | null;
  ariaRequired: string | null;
  ariaInvalid: string | null;
  ariaDescribedby: string | null;
  ariaHidden: string | null;
  tabIndex: string | null;
  lang: string | null;
  label: string | null;
  hasAccessibility: boolean;
  outerHTML: string;
  lineNumber?: number;
  missingAttributes: string[];
  selector?: string;
  screenshot?: string;
}

export interface RoleElement {
  index: number;
  tag: string;
  role: string;
  ariaLabel: string | null;
  ariaLabelledby: string | null;
  ariaDescribedby: string | null;
  ariaHidden: string | null;
  ariaExpanded: string | null;
  ariaControls: string | null;
  ariaCurrent: string | null;
  tabIndex: string | null;
  lang: string | null;
  hasAccessibility: boolean;
  outerHTML: string;
  lineNumber?: number;
  missingAttributes: string[];
  selector?: string;
  screenshot?: string;
}

export interface AnalysisSummary {
  totalImages: number;
  imagesWithoutAlt: number;
  imagesWithoutFocusState: number;
  totalLinks: number;
  linksWithoutAccessibility: number;
  linksWithoutFocusState: number;
  totalButtons: number;
  buttonsWithoutAccessibility: number;
  buttonsWithoutFocusState: number;
  totalInputs: number;
  inputsWithoutAccessibility: number;
  totalRoles: number;
  rolesWithoutAccessibility: number;
}

export interface AnalysisResult {
  images: ImageElement[];
  links: LinkElement[];
  buttons: ButtonElement[];
  inputs: InputElement[];
  roles: RoleElement[];
  summary: AnalysisSummary;
  url: string;
  analyzedAt: string;
}

export interface AnalyzeRequest {
  url: string;
  options: AnalysisOptions;
}
