import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  copyrightSelectionBinding: 'controllers.application.copyrightSelection'
});
