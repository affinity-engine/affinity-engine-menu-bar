import Ember from 'ember';
import layout from '../templates/components/affinity-engine-menu-bar';
import { configurable, ManagedFocusMixin } from 'affinity-engine';
import multiton from 'ember-multiton-service';

const {
  Component,
  computed,
  get
} = Ember;

const { reads } = computed;

const configurationTiers = [
  'config.attrs.menuBar',
  'config.attrs.globals'
];

export default Component.extend(ManagedFocusMixin, {
  layout,

  config: multiton('affinity-engine/config', 'engineId'),
  modalManager: multiton('affinity-engine/menu-bar/modal-manager', 'engineId'),

  customClassNames: configurable(configurationTiers, 'classNames'),

  componentName: reads('modalManager.componentName'),

  joinedCustomClassNames: computed('customClassNames.[]', {
    get() {
      return (get(this, 'customClassNames') || []).join(' ');
    }
  })
});
