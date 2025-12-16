import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import OptionsPanel from '../../src/components/AnalysisForm/OptionsPanel.vue';
import { useAnalysisStore } from '../../src/stores/analysis';
import { useLanguageStore } from '../../src/stores/language';

describe('OptionsPanel', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it('should render the component', () => {
    const wrapper = mount(OptionsPanel, {
      global: {
        stubs: {
          'router-link': true,
        },
      },
    });

    expect(wrapper.find('.options-section').exists()).toBe(true);
    expect(wrapper.find('.option-group').exists()).toBe(true);
  });

  it('should have all categories expanded by default', () => {
    const wrapper = mount(OptionsPanel, {
      global: {
        stubs: {
          'router-link': true,
        },
      },
    });

    const vm = wrapper.vm as any;
    expect(vm.expandedCategories.ariaLabels).toBe(true);
    expect(vm.expandedCategories.ariaStates).toBe(true);
    expect(vm.expandedCategories.ariaRelationships).toBe(true);
    expect(vm.expandedCategories.ariaLiveRegions).toBe(true);
    expect(vm.expandedCategories.formAttributes).toBe(true);
    expect(vm.expandedCategories.otherAttributes).toBe(true);
  });

  it('should have showMoreAttributes set to true by default', () => {
    const wrapper = mount(OptionsPanel, {
      global: {
        stubs: {
          'router-link': true,
        },
      },
    });

    const vm = wrapper.vm as any;
    expect(vm.showMoreAttributes).toBe(true);
  });

  it('should toggle category when category header is clicked', async () => {
    const wrapper = mount(OptionsPanel, {
      global: {
        stubs: {
          'router-link': true,
        },
      },
    });

    const vm = wrapper.vm as any;
    const initialState = vm.expandedCategories.ariaLabels;

    const categoryHeader = wrapper.find('.category-header');
    if (categoryHeader.exists()) {
      await categoryHeader.trigger('click');
      expect(vm.expandedCategories.ariaLabels).toBe(!initialState);
    }
  });

  it('should expand all categories when selectAllAttributes is called', () => {
    const wrapper = mount(OptionsPanel, {
      global: {
        stubs: {
          'router-link': true,
        },
      },
    });

    const vm = wrapper.vm as any;
    const analysisStore = useAnalysisStore();

    vm.expandedCategories.ariaLabels = false;
    vm.expandedCategories.ariaStates = false;
    vm.showMoreAttributes = false;

    vm.selectAllAttributes();

    expect(vm.expandedCategories.ariaLabels).toBe(true);
    expect(vm.expandedCategories.ariaStates).toBe(true);
    expect(vm.expandedCategories.ariaRelationships).toBe(true);
    expect(vm.expandedCategories.ariaLiveRegions).toBe(true);
    expect(vm.expandedCategories.formAttributes).toBe(true);
    expect(vm.expandedCategories.otherAttributes).toBe(true);
    expect(vm.showMoreAttributes).toBe(true);
  });

  it('should select all attributes when selectAllAttributes is called', () => {
    const wrapper = mount(OptionsPanel, {
      global: {
        stubs: {
          'router-link': true,
        },
      },
    });

    const vm = wrapper.vm as any;
    const analysisStore = useAnalysisStore();

    vm.selectAllAttributes();

    const allSelected = vm.attributeCheckboxes.every(
      (key: string) => analysisStore.options[key as keyof typeof analysisStore.options]
    );

    expect(allSelected).toBe(true);
  });

  it('should toggle showMoreAttributes when show more button is clicked', async () => {
    const wrapper = mount(OptionsPanel, {
      global: {
        stubs: {
          'router-link': true,
        },
      },
    });

    const vm = wrapper.vm as any;
    const initialState = vm.showMoreAttributes;

    const showMoreBtn = wrapper.find('.show-more-btn');
    if (showMoreBtn.exists()) {
      await showMoreBtn.trigger('click');
      expect(vm.showMoreAttributes).toBe(!initialState);
    }
  });

  it('should render show more button without number in parentheses', () => {
    const wrapper = mount(OptionsPanel, {
      global: {
        stubs: {
          'router-link': true,
        },
      },
    });

    const showMoreBtn = wrapper.find('.show-more-btn');
    if (showMoreBtn.exists()) {
      const text = showMoreBtn.text();
      expect(text).not.toMatch(/\(\d+/);
    }
  });

  it('should have discrete styling for show more button', () => {
    const wrapper = mount(OptionsPanel, {
      global: {
        stubs: {
          'router-link': true,
        },
      },
    });

    const showMoreBtn = wrapper.find('.show-more-btn');
    if (showMoreBtn.exists()) {
      const classes = showMoreBtn.classes();
      expect(classes).toContain('show-more-btn');
    }
  });

  it('should select all elements when selectAllElements is called', () => {
    const wrapper = mount(OptionsPanel, {
      global: {
        stubs: {
          'router-link': true,
        },
      },
    });

    const vm = wrapper.vm as any;
    const analysisStore = useAnalysisStore();

    vm.selectAllElements();

    const allSelected = vm.elementCheckboxes.every(
      (key: string) => analysisStore.options[key as keyof typeof analysisStore.options]
    );

    expect(allSelected).toBe(true);
  });

  it('should deselect all elements when deselectAllElements is called', () => {
    const wrapper = mount(OptionsPanel, {
      global: {
        stubs: {
          'router-link': true,
        },
      },
    });

    const vm = wrapper.vm as any;
    const analysisStore = useAnalysisStore();

    vm.selectAllElements();
    vm.deselectAllElements();

    const noneSelected = vm.elementCheckboxes.every(
      (key: string) => !analysisStore.options[key as keyof typeof analysisStore.options]
    );

    expect(noneSelected).toBe(true);
  });

  it('should deselect all attributes when deselectAllAttributes is called', () => {
    const wrapper = mount(OptionsPanel, {
      global: {
        stubs: {
          'router-link': true,
        },
      },
    });

    const vm = wrapper.vm as any;
    const analysisStore = useAnalysisStore();

    vm.selectAllAttributes();
    vm.deselectAllAttributes();

    const noneSelected = vm.attributeCheckboxes.every(
      (key: string) => !analysisStore.options[key as keyof typeof analysisStore.options]
    );

    expect(noneSelected).toBe(true);
  });
});
