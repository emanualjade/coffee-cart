class Basket
  
  constructor: ->
    @items = []
    @distinctCount = 0
    @totalCount = 0
    @discountAmount = 0
    @coupons = ["A123", "B123", "C123"]

  add: (item, quantity = 1) ->
    if @itemExistsInBasket(item)
      currentItem = @getItemFromBasket(item)
      currentItem.quantity += quantity
    else
      @items.push {
        item: item
        quantity: quantity
      }
    
    @updateCounts()
  
  remove: (item, quantity = 1) ->
    return unless @itemExistsInBasket(item)
    basketItem = @getItemFromBasket(item)
    basketItem.quantity -= quantity

    if basketItem.quantity < 1
      itemLoc = @getItemIndex(item)
      @items.splice(itemLoc, 1)

    @updateCounts()

  totalPrice: ->
    price = 0
    for item in @items
      price += item.quantity * item.item.price
    
    price * (1 - (@discountAmount / 100))

  setDiscount: (amount) ->
    @discountAmount = Math.abs amount

  updateCounts: ->
    total = 0
    for item in @items
      total += item.quantity

    @distinctCount = @items.length
    @totalCount = total

  applyCoupon: (code) ->
    if code in @coupons
      @setDiscount(10)
      true
    else
      false

  itemExistsInBasket: (item) ->
    for basketItem in @items
      return true if basketItem.item.id is item.id
    false

  getItemFromBasket: (item) ->
    for basketItem in @items
      return basketItem if basketItem.item.id is item.id
    false
  
  getQuantity: (item) ->
    if @itemExistsInBasket(item)
      @getItemFromBasket(item).quantity
    else
      0
  
  getItemIndex: (item) ->
    count = 0
    for basketItem in @items
      return count if basketItem.item.id is item.id
      count++
    -1

  empty: -> 
    @items = []
    @distinctCount = 0
    @totalCount = 0

window.Basket = Basket