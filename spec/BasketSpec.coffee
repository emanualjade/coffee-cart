describe "Basket", ->
  
  basket = laptop = mouse = undefined
  
  beforeEach ->
    basket = new Basket()
    laptop = new Item(1, "Laptop", 400)
    mouse = new Item(2, "mouse", 10)

  describe "Adding to basket", ->

    it "Should keep track of distinct items and quantities", ->

      basket.add laptop
      expect(basket.totalCount).toEqual 1
      expect(basket.distinctCount).toEqual 1

      basket.add laptop
      expect(basket.totalCount).toEqual 2
      expect(basket.distinctCount).toEqual 1

      basket.add mouse
      expect(basket.totalCount).toEqual 3
      expect(basket.distinctCount).toEqual 2

    it "should allow more than 1 item to be added", ->
      basket.add(laptop, 2)
      expect(basket.totalCount).toEqual(2)
      expect(basket.distinctCount).toEqual(1)
      expect(basket.getQuantity(laptop)).toEqual(2)

  describe "Removing from basket", ->
    it "should deduct the quantity passed in", ->
      basket.add(laptop)
      basket.add(laptop)
      basket.remove(laptop, 1)
      expect(basket.getQuantity(laptop)).toEqual(1)
      expect(basket.distinctCount).toEqual(1)
      expect(basket.totalCount).toEqual(1)
    it "should remove item completely if removing the total quantity", ->
      basket.add(laptop)
      basket.add(laptop)
      basket.remove(laptop, 2)
      expect(basket.getQuantity(laptop)).toEqual(0)
      expect(basket.itemExistsInBasket(laptop)).toBeFalsy()
    it "should deal with multiple items correctly", ->
      basket.add(laptop)
      basket.add(laptop)
      basket.add(mouse)
      basket.remove(mouse)
      expect(basket.itemExistsInBasket(mouse)).toBeFalsy()
      expect(basket.getQuantity(laptop)).toEqual(2)
    it "should not break totalCount with invalid quantities", ->
      basket.add(laptop)
      basket.add(laptop)
      basket.add(mouse)
      basket.remove(laptop, 3)
      expect(basket.totalCount).toEqual(1)

  describe "total price", ->
    it "will calculate the total price", ->
      basket.add(laptop, 2)
      basket.add(mouse, 3)
      expect(basket.totalPrice()).toEqual(830)

    it "correctly updates the price", ->
      basket.add(laptop, 2)
      basket.add(mouse, 2)
      basket.remove(laptop, 1)
      expect(basket.totalPrice()).toEqual(420)

  describe "applying discounts", ->
    beforeEach ->
      @addMatchers
        toBeDiscounted: (orig, discount) ->
          actual = @actual
          @message = -> "Expected #{actual} to be #{discount}% of #{orig}"
          actual is (orig * (1 - (discount / 100)))

    it "should apply a discount", ->
      basket.add(laptop)
      basket.setDiscount(10)
      expect(basket.totalPrice()).toBeDiscounted(400, 10)

    it "should persist the discount", ->
      basket.add(laptop)
      basket.setDiscount(10)
      basket.add(mouse, 2)
      expect(basket.totalPrice()).toBeDiscounted(420, 10)

    it "should deal with negative discounts", ->
      basket.setDiscount(-10)
      basket.add(mouse)
      expect(basket.totalPrice()).toBeDiscounted(10, 10)

    describe "coupon codes", ->
    it "gives a 10% for valid coupons", ->
      basket.add(laptop)
      basket.applyCoupon("A123")
      expect(basket.totalPrice()).toBeDiscounted(400, 10)

    it "returns false for invalid coupons", ->
      basket.add(laptop)
      expect(basket.applyCoupon("ABCDE")).toBeFalsy()
      expect(basket.totalPrice()).toEqual(400)

  describe "finding an item in basket", ->
    it "returns true if the item exists", ->
      basket.add laptop
      expect(basket.itemExistsInBasket(laptop)).toBeTruthy()
    it "returns false if the item is not in basket", ->
      expect(basket.itemExistsInBasket(laptop)).toBeFalsy()

  describe "fecthing item from basket", ->
    it "returns the item object if it exists", ->
      basket.add(laptop)
      result = basket.getItemFromBasket(laptop)
      expect(result.item).toEqual(laptop)
      expect(result.quantity).toEqual(1)
    it "returns false if the item is not in baske", ->
      expect(basket.getItemFromBasket(laptop)).toBeFalsy()

  describe "emptying a basket", ->
    it "empties a basket with items in", ->
      basket.add(laptop)
      basket.empty()
      expect(basket.items.length).toEqual 0
    it "updates count variables", ->
      basket.add(laptop)
      basket.empty()
      expect(basket.distinctCount).toEqual 0
      expect(basket.totalCount).toEqual 0

  describe "getting the quantity of item in basket", ->
    it "returns the correct quantity", ->
      basket.add laptop
      basket.add laptop
      expect(basket.getQuantity(laptop)).toEqual 2

    it "returns 0 if the item is not in the basket", ->
      expect(basket.getQuantity(laptop)).toEqual 0

  describe "getting index of item", ->
    it "returns the index", ->
      basket.add(laptop)
      expect(basket.getItemIndex(laptop)).toEqual(0)
    it "returns -1 if item doesn't exist", ->
      expect(basket.getItemIndex(laptop)).toEqual(-1)


