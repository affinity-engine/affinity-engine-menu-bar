import Ember from 'ember';
import layout from '../templates/components/affinity-engine-menu-bar-menu';
import { ManagedFocusMixin, classNamesConfigurable, configurable } from 'affinity-engine';
import multiton from 'ember-multiton-service';

const {
  Component,
  computed,
  get,
  getProperties,
  typeOf
} = Ember;

const { reads } = computed;
const { inject: { service } } = Ember;

const configurationTiers = [
  'options',
  'config.attrs.menuBar.menu',
  'config.attrs.menuBar',
  'config.attrs.globals'
];

export default Component.extend(ManagedFocusMixin, {
  layout,

  classNames: ['ae-menu'],
  classNameBindings: ['customClassNames'],
  hook: 'affinity_engine_menu_bar_menu',

  choices: computed(() => Ember.A()),

  config: multiton('affinity-engine/config', 'engineId'),
  translator: service('affinity-engine/translator'),

  columns: configurable(configurationTiers, 'menuColumns'),
  customClassNames: classNamesConfigurable(configurationTiers, 'classNames'),
  iconFamily: configurable(configurationTiers, 'iconFamily'),
  acceptKeys: configurable(configurationTiers, 'keys.accept'),
  cancelKeys: configurable(configurationTiers, 'keys.escape'),
  moveDownKeys: configurable(configurationTiers, 'keys.moveDown'),
  moveLeftKeys: configurable(configurationTiers, 'keys.moveLeft'),
  moveRightKeys: configurable(configurationTiers, 'keys.moveRight'),
  moveUpKeys: configurable(configurationTiers, 'keys.moveUp'),

  keyboardActivated: reads('isFocused'),
  keyboardPriority: 999999999999999999999,

  translatedChoices: computed('choices.[]', {
    get() {
      const { choices, translator } = getProperties(this, 'choices', 'translator');

      return choices.map((choice, index) => {
        const key = get(choice, 'key') || index;
        const text = translator.translate(choice);

        return {
          ...choice,
          key,
          text: typeOf(text) === 'string' ? text : ''
        };
      });
    }
  }).readOnly()
});
