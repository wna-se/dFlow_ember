import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  model: function() {
    var that = this;
    // Used to load data that will not be changed during runtime
    return Ember.RSVP.hash({
      roles: that.store.find('role'),
      sources: that.store.find('source'),
      states: that.store.find('state')
    });
  },
  setupController: function(controller, model) {
    // To be able to access from specific controllers
    controller.set('model', {});
    //console.log(model.roles);
    controller.set('roleSelection', model.roles);
    controller.set('sourceSelection', model.sources);
    controller.set('copyrightSelection', [
      {label: Ember.I18n.t('jobs.copyright_values.unselected'), value: null},
      {label: Ember.I18n.t('jobs.copyright_values.true'), value: true},
      {label: Ember.I18n.t('jobs.copyright_values.false'), value: false}
      ]);

    var stateItems = [];
    for(var y = 0 ; y < model.states.length ; y++ ){
      var state = model.states[y];
      var item2 = {label: Ember.I18n.t('jobs.states.' + state), value: state};
      stateItems.pushObject(item2);
    }
    controller.set('stateSelection', stateItems);
  },
  actions: {
   sessionAuthenticationFailed: function(error) {
    this.controllerFor('login').set('error', error);
  },
  showJob: function(job_id) {
    var that = this;
    this.controller.set('job_id', null);
    this.controller.set('job_id_error', null);
    
    if (job_id) {
      that.store.find('job', job_id).then(function() {
        that.transitionTo('jobs.show', job_id);
      },
      function(){
        that.controller.set('job_id_error', Ember.I18n.t('jobs.idMissing') + ': ' + job_id);
      });
    }
  }
}
});
