$(function() {
    /* Data */
    Todo = Backbone.Model.extend({
        
    });

    Todos = Backbone.Collection.extend({
        model: Todo
    });

    /* Views */
    TodoList = Backbone.View.extend({
        el: '.todo-list-wrap',
        initialize: function() {
            this.listenTo(this.collection, {
                add: this.appendChild,
                remove: function() {
                    if (!this.collection.length)
                        this.$(".placeholder").show()
                }
            })
        },
        appendChild: function(model) {
            var item = new TodoListItem({model: model})
            this.$(".placeholder").hide()
            this.$("ul").prepend(item.render().el)
        },
        events: {
            "keyup .js-todo-name": function(e) {
                var key = e.keyCode || e.which
                var $this = $(e.currentTarget)
                if (key == 13 && $this.val() != "") {
                    this.collection.add(new Todo({label: $this.val()}))
                    $this.val("")
                }
            }
        }
    });

    TodoListItem = Backbone.View.extend({
        template: $("#list-item").html(),
        tagName: 'li',
        initialize: function() {
            this.listenTo(this.model, {
                destroy: function() {
                    this.remove()
                }
            })
        },
        render: function() {
            this.$el.html(_.template(this.template, this.model.toJSON()))
            return this;
        },
        events: {
            "click .js-mark-complete": function() {
                this.model.destroy()
            }
        }      
    });
    new TodoList({collection: (window.coll = new Todos)})
})