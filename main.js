$(function() {
    /* Data */
    Todo = Backbone.Model.extend({})

    Todos = Backbone.Collection.extend({
        model:
    })

    /* Views */
    TodoList = Backbone.View.extend({
        el: '.todo-list-wrap',
        list: '.js-active-list',
        initialize: function() {
            var self = this
            this.listenTo(this.collection, {
                add: this.appendTodo,
                remove: function() {
                    if (!self.collection.length)
                        setTimeout(function(){ 
                            self.$(".placeholder").fadeIn("fast")
                        }, 200);
                }
            })
            this.render()
        },
        render: function() {
            var self = this
            _.each(this.collection.models, function(todo) {
                self.appendTodo(todo);
            });
        },
        appendTodo: function(todo) {
            this.$(".placeholder").hide()
            todoitem = new TodoListItem({model: todo}).render().el
            this.$(this.list).prepend($(todoitem).hide().fadeIn("fast"))
        },
        events: {
            "keyup .js-todo-name": function(e) {
                var $this, label = ($this = $(e.currentTarget)).val()
                var key = e.keyCode || e.which
                if (key == 13) {
                    $this.val("")
                    this.collection.add(new Todo({label: label}))
                }
            },
            "click .js-add-todo": function() {
                var $todoname = this.$(".js-todo-name")
                var label = $todoname.val()
                if (label != "") {
                    this.collection.add(new Todo({label: label}))  
                    $todoname.val("")
                }
            }
        }
    })

    TodoListItem = Backbone.View.extend({
        tagName: 'li',
        template: $("#list-item").html(),
        initialize: function() {
            _.bindAll(this, "render");
            var self = this
            this.listenTo(this.model, {
                "destroy": function() {
                    self.$el.fadeOut("fast")
                }
            })
        },
        render: function() {
            this.$el.html(_.template(this.template, this.model.toJSON()))
            return this
        },
        events: {
            "click .js-mark-complete": function() {
                this.model.destroy()
            }
        }
    })
    new TodoList({collection: new Todos})
})