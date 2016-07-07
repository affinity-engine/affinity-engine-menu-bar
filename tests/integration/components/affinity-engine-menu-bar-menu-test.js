import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { hook, initialize as initializeHook } from 'ember-hook';

moduleForComponent('affinity-engine-menu-bar-menu', 'Integration | Component | affinity engine menu bar menu', {
  integration: true,

  beforeEach() {
    initializeHook();
  }
});

test('it displays the choices', function(assert) {
  assert.expect(4);

  this.set('choices', ['foo', 'bar', 'baz']);
  this.set('translator', {
    translate(key) {
      return key === 'bar' ? 'bawka' : key;
    }
  });

  this.render(hbs`{{affinity-engine-menu-bar-menu choices=choices columns=1 translator=translator}}`);

  assert.equal(this.$(hook('ember_columnar_menu_option')).length, 3, 'correct number of options');
  assert.equal(this.$(hook('ember_columnar_menu_option')).eq(0).text().trim(), 'foo', 'correct text displayed');
  assert.equal(this.$(hook('ember_columnar_menu_option')).eq(1).text().trim(), 'bawka', 'correct text displayed');
  assert.equal(this.$(hook('ember_columnar_menu_option')).eq(2).text().trim(), 'baz', 'correct order');
});

test('it displays the correct number of columns', function(assert) {
  assert.expect(2);

  this.set('choices', ['foo', 'bar', 'baz']);

  this.render(hbs`{{affinity-engine-menu-bar-menu choices=choices columns=2}}`);

  assert.equal(this.$(hook('ember_columnar_menu_option')).length, 3, 'correct number of options');
  assert.equal(this.$(hook('ember_columnar_menu_row')).length, 2, 'correct number of rows');
});

test('clicking a choice returns the choice object', function(assert) {
  assert.expect(1);

  this.set('choices', ['foo', { text: 'bar' }, 'baz']);
  this.set('onChoice', (choice) => {
    assert.deepEqual(choice, { key: 1, text: 'bar', value: 'bar' }, 'choice is correct');
  });

  this.render(hbs`{{affinity-engine-menu-bar-menu choices=choices columns=1 onChoice=(action onChoice)}}`);

  this.$(hook('ember_columnar_menu_option_button')).eq(1).click();
});
