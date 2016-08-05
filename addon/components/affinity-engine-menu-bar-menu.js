import Ember from 'ember';
import layout from '../templates/components/affinity-engine-menu-bar-menu';
import { ManagedFocusMixin, classNamesConfigurable, configurable, registrant } from 'affinity-engine';
import { EKMixin, keyDown } from 'ember-keyboard';
import multiton from 'ember-multiton-service';

const {
  Component,
  computed,
  get,
  getProperties,
  typeOf
} = Ember;

const { reads } = computed;

const configurationTiers = [
  'options',
  'config.attrs.component.menuBar.menu',
  'config.attrs.component.menuBar',
  'config.attrs'
];

export default Component.extend(EKMixin, ManagedFocusMixin, {
  layout,

  classNames: ['ae-menu'],
  classNameBindings: ['customClassNames'],
  hook: 'affinity_engine_menu_bar_menu',

  choices: computed(() => Ember.A()),

  config: multiton('affinity-engine/config', 'engineId'),
  translator: registrant('affinity-engine/translator'),

  columns: configurable(configurationTiers, 'menuColumns'),
  customClassNames: classNamesConfigurable(configurationTiers, 'classNames'),
  iconFamily: configurable(configurationTiers, 'iconFamily'),
  acceptKeys: configurable(configurationTiers, 'keys.accept'),
  cancelKeys: configurable(configurationTiers, 'keys.cancel'),
  moveDownKeys: configurable(configurationTiers, 'keys.moveDown'),
  moveLeftKeys: configurable(configurationTiers, 'keys.moveLeft'),
  moveRightKeys: configurable(configurationTiers, 'keys.moveRight'),
  moveUpKeys: configurable(configurationTiers, 'keys.moveUp'),

  keyboardActivated: reads('isFocused'),
  keyboardPriority: 999999999999999999999,

  init(...args) {
    this._super(...args);

    const cancelKeys = get(this, 'cancelKeys') || [];

    cancelKeys.forEach((key) => this.on(keyDown(key), () => this.attrs.closeModal()));
  },

  translatedChoices: computed('choices.[]', {
    get() {
      const { choices, translator } = getProperties(this, 'choices', 'translator');

      return choices.map((choice, index) => {
        const key = get(choice, 'key') || index;
        const textKey = get(choice, 'text.key') || get(choice, 'text') || choice;
        const text = translator.translate(textKey, get(choice, 'text.options')) || textKey;

        return {
          ...choice,
          key,
          text: typeOf(text) === 'string' ? text : ''
        };
      });
    }
  }).readOnly(),

  translatedHeader: computed('header', {
    get() {
      const header = get(this, 'header');

      return get(this, 'translator').translate(header) || header;
    }
  }).readOnly()
});
