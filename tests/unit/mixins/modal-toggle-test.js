import Ember from 'ember';
import { ModalToggleMixin } from 'affinity-engine-menu-bar';
import { module, test } from 'qunit';

module('Unit | Mixin | modal toggle');

test('it sets the modelManager componentName on click', function(assert) {
  assert.expect(1);

  const ModalToggleObject = Ember.Object.extend(ModalToggleMixin, { modalManager: { } });
  const subject = ModalToggleObject.create({ componentName: 'foo' });

  subject.click();

  assert.equal(subject.get('modalManager.componentName'), 'foo', 'name was set correctly');
});

test('it sets the modelManager componentName on touchEnd', function(assert) {
  assert.expect(1);

  const ModalToggleObject = Ember.Object.extend(ModalToggleMixin, { modalManager: { } });
  const subject = ModalToggleObject.create({ componentName: 'foo' });

  subject.touchEnd();

  assert.equal(subject.get('modalManager.componentName'), 'foo', 'name was set correctly');
});
