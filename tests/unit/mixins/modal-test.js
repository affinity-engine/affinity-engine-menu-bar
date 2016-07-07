import Ember from 'ember';
import { ModalMixin } from 'affinity-engine-menu-bar';
import { module, test } from 'qunit';

module('Unit | Mixin | modal');

test('closeModal deletes modalManager.componentName', function(assert) {
  assert.expect(2);

  const ModalObject = Ember.Object.extend(ModalMixin, { modalManager: { componentName: 'foo' } });
  const subject = ModalObject.create();

  assert.equal(subject.get('modalManager.componentName'), 'foo', 'name was set correctly');

  subject.closeModal();

  assert.equal(subject.get('modalManager.componentName'), undefined, 'name was deleted correctly');
});
