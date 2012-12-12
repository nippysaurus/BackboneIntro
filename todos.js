$(function(){

  var ClickModel = Backbone.Model.extend({

    initialize: function() {
        this.set({"count": 0});
    },

    incCount: function() {
      this.set("count", this.get("count") + 1);
      console.log("The count is: " + this.getCount());
    },

    getCount: function(){
      return this.get("count");
    }
  });

  var ClickView = Backbone.View.extend({

    tagName:  "div",

    template: _.template($('#count_template').html()),

    render: function() {
      console.log("ClickViewRender");
      this.$el.html(this.template({ count: this.model.getCount(), suffix: (this.model.getCount() != 1) ? "s" : "" }));
      return this;
    },

    initialize: function(){
      console.log("ClickViewInit");
      this.model.on('change', this.render, this);
    }
  });


  var AppView = Backbone.View.extend({

    el: $("#todoapp"),

    events: {
      "click #click_me_button": "buttonClicked"
    },

    initialize: function() {
      console.log("AppViewInit");
      this.model = new ClickModel();
      this.clickView = new ClickView({model:this.model});
      this.$("#count").append(this.clickView.render().el);
    },

    buttonClicked: function(e) {
      this.model.incCount();
    }
  });

  var App = new AppView;
});
