import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { deepStub } from 'affinity-engine';
import { hook, initialize as initializeHook } from 'ember-hook';

const { getProperties } = Ember;

moduleForComponent('affinity-engine-menu-bar', 'Integration | Component | affinity engine menu bar', {
  integration: true,

  beforeEach() {
    initializeHook();
  }
});

test('it yields content into affinity_engine_menu_bar_content', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#affinity-engine-menu-bar}}
      Hello!
    {{/affinity-engine-menu-bar}}
  `);

  assert.equal(this.$(hook('affinity_engine_menu_bar_content')).text().trim(), 'Hello!', 'text yielded correctly');
});

test('it renders a component if a componentName is provided by the modalManager', function(assert) {
  assert.expect(1);

  this.set('modalManager', { componentName: 'foo-bar' });

  this.render(hbs`{{affinity-engine-menu-bar modalManager=modalManager}}`);

  assert.equal(this.$(hook('affinity_engine_menu_bar_modal')).text().trim(), 'I am a foo-bar!', 'modal rendered correct component');
});

const configurationTiers = [
  'config.attrs.menuBar',
  'config.attrs.globals'
];

configurationTiers.forEach((tier) => {
  test(`applies the classNames found in ${tier}`, function(assert) {
    assert.expect(2);

    const stub = deepStub(tier, 'classNames', ['foo', 'bar']);

    this.setProperties(getProperties(stub, 'config'));

    this.render(hbs`{{affinity-engine-menu-bar config=config}}`);

    assert.ok(this.$(hook('affinity_engine_menu_bar_container')).hasClass('foo'), 'has class foo');
    assert.ok(this.$(hook('affinity_engine_menu_bar_container')).hasClass('bar'), 'has class bar');
  });
});
