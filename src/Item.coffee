class Item
  constructor: (@id, @title, @price) ->
    @protectedFields = ["id"]

  update: (opts) ->
    for key, val of opts
      if @[key]? and not @fieldIsProtected(key)
        @[key] = val

  addProtectedField: (field) ->
    found = false
    for pField in @protectedFields
      if pField is field
        found = true
    
    if found is false
      @protectedFields.push(field)

  fieldIsProtected: (field) ->
    for pField in @protectedFields
      return true if field is pField
    false

  getRatings: ->
    # make the API call
    # return the JSON

window.Item = Item