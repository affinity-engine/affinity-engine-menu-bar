import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { hook, initialize as initializeHook } from 'ember-hook';

moduleForComponent('affinity-engine-menu-bar-menu', 'Integration | Component | affinity engine menu bar menu', {
  integration: true,

  beforeEach() {
    initializeHook();
  }
});

test('it displays the header', function(assert) {
  assert.expect(1);

  this.set('translator', {
    translate(key) {
      return key === 'bar' ? 'bawka' : key;
    }
  });

  this.render(hbs`{{affinity-engine-menu-bar-menu header="bar" translator=translator engineId="foo"}}`);

  assert.equal(this.$(hook('affinity_engine_menu_bar_menu_header')).text().trim(), 'bawka', 'text is correct');
});

test('it hides the header when not present', function(assert) {
  assert.expect(1);

  this.render(hbs`{{affinity-engine-menu-bar-menu engineId="foo"}}`);

  assert.equal(this.$(hook('affinity_engine_menu_bar_menu_header')).length, 0, 'header not rendered');
});

test('it displays the choices', function(assert) {
  assert.expect(4);

  this.set('choices', ['foo', 'bar', 'baz']);
  this.set('translator', {
    translate(key) {
      return key === 'bar' ? 'bawka' : key;
    }
  });

  this.render(hbs`{{affinity-engine-menu-bar-menu choices=choices columns=1 translator=translator engineId="foo"}}`);

  assert.equal(this.$(hook('ember_flex_menu_option')).length, 3, 'correct number of options');
  assert.equal(this.$(hook('ember_flex_menu_option')).eq(0).text().trim(), 'foo', 'correct text displayed');
  assert.equal(this.$(hook('ember_flex_menu_option')).eq(1).text().trim(), 'bawka', 'correct text displayed');
  assert.equal(this.$(hook('ember_flex_menu_option')).eq(2).text().trim(), 'baz', 'correct order');
});

test('it displays the correct number of columns', function(assert) {
  assert.expect(2);

  this.set('choices', ['foo', 'bar', 'baz']);

  this.render(hbs`{{affinity-engine-menu-bar-menu choices=choices columns=2 engineId="foo"}}`);

  assert.equal(this.$(hook('ember_flex_menu_option')).length, 3, 'correct number of options');
  assert.equal(this.$(hook('ember_flex_menu_row')).length, 2, 'correct number of rows');
});

test('clicking a choice returns the choice object', function(assert) {
  assert.expect(1);

  this.set('choices', ['foo', { text: 'bar' }, 'baz']);
  this.set('onChoice', (choice) => {
    assert.deepEqual(choice, { key: 1, text: 'bar', value: 'bar' }, 'choice is correct');
  });

  this.render(hbs`{{affinity-engine-menu-bar-menu choices=choices columns=1 engineId="foo" onChoice=(action onChoice)}}`);

  this.$(hook('ember_flex_menu_option_button')).eq(1).click();
});
