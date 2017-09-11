import Ember from 'ember';
import layout from '../templates/components/affinity-engine-menu-bar';
import { classNamesConfigurable, ManagedFocusMixin } from 'affinity-engine';
import multiton from 'ember-multiton-service';

const { Component } = Ember;
const { computed: { reads } } = Ember;

const configurationTiers = [
  'component.menuBar',
  'children'
];

export default Component.extend(ManagedFocusMixin, {
  layout,

  config: multiton('affinity-engine/config', 'engineId'),
  modalManager: multiton('affinity-engine/menu-bar/modal-manager', 'engineId'),

  customClassNames: classNamesConfigurable(configurationTiers, 'classNames'),

  componentName: reads('modalManager.componentName')
});
