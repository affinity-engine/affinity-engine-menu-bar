import Ember from 'ember';
import multiton from 'ember-multiton-service';

const {
  Mixin,
  set
} = Ember;

export default Mixin.create({
  modalManager: multiton('affinity-engine/menu-bar/modal-manager', 'engineId'),

  closeModal() {
    set(this, 'modalManager.componentName', undefined);
  }
});
