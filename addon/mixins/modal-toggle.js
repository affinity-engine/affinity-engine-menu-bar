import Ember from 'ember';
import multiton from 'ember-multiton-service';

const {
  Mixin,
  get,
  set
} = Ember;

export default Mixin.create({
  modalManager: multiton('affinity-engine/menu-bar/modal-manager', 'engineId'),

  click(...attrs) {
    this._super(...attrs);

    this._openModal();
  },

  touchEnd(...attrs) {
    this._super(...attrs);

    this._openModal();
  },

  _openModal() {
    set(this, 'modalManager.componentName', get(this, 'componentName'));
  }
});
