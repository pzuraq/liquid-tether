import Ember from 'ember';

const { on, run } = Ember;

export default Ember.Component.extend({
  setupTabs: on('didInsertElement', function() {
    run.schedule('afterRender', () => {
      const $template = this.$('.template')[0];
      const $js = this.$('.js')[0];
      const $styles = this.$('.styles')[0];
      const $transitions = this.$('.transitions')[0];
      const $current = $template || $js || $styles || $transitions;


      this.set('$template', $template);
      this.set('$styles', $styles);
      this.set('$js', $js);
      this.set('$transitions', $transitions);

      this.set('currentTab', $current);

      this.$($current).show();
    });
  }),

  actions: {
    changeTab($tab) {
      this.set('currentTab', $tab);
    }
  }
});
