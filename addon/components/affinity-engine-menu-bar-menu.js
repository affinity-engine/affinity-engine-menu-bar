import Ember from 'ember';
import layout from '../templates/components/affinity-engine-menu-bar-menu';
import { ManagedFocusMixin, registrant } from 'affinity-engine';
import { EKMixin, keyDown } from 'ember-keyboard';

const {
  Component,
  assign,
  computed,
  get,
  getProperties,
  typeOf
} = Ember;

const { reads } = computed;

export default Component.extend(EKMixin, ManagedFocusMixin, {
  layout,

  hook: 'affinity_engine_menu_bar_menu',

  choices: computed(() => Ember.A()),
  closeModal() {},

  translator: registrant('affinity-engine/translator'),

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

        return assign({}, choice, {
          key,
          text: typeOf(text) === 'string' ? text : ''
        });
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
