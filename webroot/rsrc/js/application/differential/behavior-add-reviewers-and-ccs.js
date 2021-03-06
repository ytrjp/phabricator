/**
 * @provides javelin-behavior-differential-add-reviewers-and-ccs
 * @requires javelin-behavior
 *           javelin-dom
 *           phabricator-prefab
 */

JX.behavior('differential-add-reviewers-and-ccs', function(config) {

  var dynamic = {};
  for (var k in config.dynamic) {
    var props = config.dynamic[k];
    props.id = k;

    var tokenizer = JX.Prefab.buildTokenizer(props).tokenizer;
    tokenizer.start();

    dynamic[k] = {
      row : JX.$(props.row),
      tokenizer : tokenizer,
      actions : props.actions
    };
  }

  JX.DOM.listen(
    JX.$(config.select),
    'change',
    null,
    function(e) {
      var v = JX.$(config.select).value;
      for (var k in dynamic) {
        if (dynamic[k].actions[v]) {
          JX.DOM.show(dynamic[k].row);
          dynamic[k].tokenizer.refresh();
        } else {
          JX.DOM.hide(dynamic[k].row);
        }
      }
    });
});

