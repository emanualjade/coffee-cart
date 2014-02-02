// Generated by CoffeeScript 1.6.2
(function() {
  describe("Basket", function() {
    var basket, laptop, mouse;

    basket = laptop = mouse = void 0;
    beforeEach(function() {
      basket = new Basket();
      laptop = new Item(1, "Laptop", 400);
      return mouse = new Item(2, "mouse", 10);
    });
    describe("Adding to basket", function() {
      it("Should keep track of distinct items and quantities", function() {
        basket.add(laptop);
        expect(basket.totalCount).toEqual(1);
        expect(basket.distinctCount).toEqual(1);
        basket.add(laptop);
        expect(basket.totalCount).toEqual(2);
        expect(basket.distinctCount).toEqual(1);
        basket.add(mouse);
        expect(basket.totalCount).toEqual(3);
        return expect(basket.distinctCount).toEqual(2);
      });
      return it("should allow more than 1 item to be added", function() {
        basket.add(laptop, 2);
        expect(basket.totalCount).toEqual(2);
        expect(basket.distinctCount).toEqual(1);
        return expect(basket.getQuantity(laptop)).toEqual(2);
      });
    });
    describe("Removing from basket", function() {
      it("should deduct the quantity passed in", function() {
        basket.add(laptop);
        basket.add(laptop);
        basket.remove(laptop, 1);
        expect(basket.getQuantity(laptop)).toEqual(1);
        expect(basket.distinctCount).toEqual(1);
        return expect(basket.totalCount).toEqual(1);
      });
      it("should remove item completely if removing the total quantity", function() {
        basket.add(laptop);
        basket.add(laptop);
        basket.remove(laptop, 2);
        expect(basket.getQuantity(laptop)).toEqual(0);
        return expect(basket.itemExistsInBasket(laptop)).toBeFalsy();
      });
      it("should deal with multiple items correctly", function() {
        basket.add(laptop);
        basket.add(laptop);
        basket.add(mouse);
        basket.remove(mouse);
        expect(basket.itemExistsInBasket(mouse)).toBeFalsy();
        return expect(basket.getQuantity(laptop)).toEqual(2);
      });
      return it("should not break totalCount with invalid quantities", function() {
        basket.add(laptop);
        basket.add(laptop);
        basket.add(mouse);
        basket.remove(laptop, 3);
        return expect(basket.totalCount).toEqual(1);
      });
    });
    describe("total price", function() {
      it("will calculate the total price", function() {
        basket.add(laptop, 2);
        basket.add(mouse, 3);
        return expect(basket.totalPrice()).toEqual(830);
      });
      return it("correctly updates the price", function() {
        basket.add(laptop, 2);
        basket.add(mouse, 2);
        basket.remove(laptop, 1);
        return expect(basket.totalPrice()).toEqual(420);
      });
    });
    describe("applying discounts", function() {
      beforeEach(function() {
        return this.addMatchers({
          toBeDiscounted: function(orig, discount) {
            var actual;

            actual = this.actual;
            this.message = function() {
              return "Expected " + actual + " to be " + discount + "% of " + orig;
            };
            return actual === (orig * (1 - (discount / 100)));
          }
        });
      });
      it("should apply a discount", function() {
        basket.add(laptop);
        basket.setDiscount(10);
        return expect(basket.totalPrice()).toBeDiscounted(400, 10);
      });
      it("should persist the discount", function() {
        basket.add(laptop);
        basket.setDiscount(10);
        basket.add(mouse, 2);
        return expect(basket.totalPrice()).toBeDiscounted(420, 10);
      });
      it("should deal with negative discounts", function() {
        basket.setDiscount(-10);
        basket.add(mouse);
        return expect(basket.totalPrice()).toBeDiscounted(10, 10);
      });
      describe("coupon codes", function() {});
      it("gives a 10% for valid coupons", function() {
        basket.add(laptop);
        basket.applyCoupon("A123");
        return expect(basket.totalPrice()).toBeDiscounted(400, 10);
      });
      return it("returns false for invalid coupons", function() {
        basket.add(laptop);
        expect(basket.applyCoupon("ABCDE")).toBeFalsy();
        return expect(basket.totalPrice()).toEqual(400);
      });
    });
    describe("finding an item in basket", function() {
      it("returns true if the item exists", function() {
        basket.add(laptop);
        return expect(basket.itemExistsInBasket(laptop)).toBeTruthy();
      });
      return it("returns false if the item is not in basket", function() {
        return expect(basket.itemExistsInBasket(laptop)).toBeFalsy();
      });
    });
    describe("fecthing item from basket", function() {
      it("returns the item object if it exists", function() {
        var result;

        basket.add(laptop);
        result = basket.getItemFromBasket(laptop);
        expect(result.item).toEqual(laptop);
        return expect(result.quantity).toEqual(1);
      });
      return it("returns false if the item is not in baske", function() {
        return expect(basket.getItemFromBasket(laptop)).toBeFalsy();
      });
    });
    describe("emptying a basket", function() {
      it("empties a basket with items in", function() {
        basket.add(laptop);
        basket.empty();
        return expect(basket.items.length).toEqual(0);
      });
      return it("updates count variables", function() {
        basket.add(laptop);
        basket.empty();
        expect(basket.distinctCount).toEqual(0);
        return expect(basket.totalCount).toEqual(0);
      });
    });
    describe("getting the quantity of item in basket", function() {
      it("returns the correct quantity", function() {
        basket.add(laptop);
        basket.add(laptop);
        return expect(basket.getQuantity(laptop)).toEqual(2);
      });
      return it("returns 0 if the item is not in the basket", function() {
        return expect(basket.getQuantity(laptop)).toEqual(0);
      });
    });
    return describe("getting index of item", function() {
      it("returns the index", function() {
        basket.add(laptop);
        return expect(basket.getItemIndex(laptop)).toEqual(0);
      });
      return it("returns -1 if item doesn't exist", function() {
        return expect(basket.getItemIndex(laptop)).toEqual(-1);
      });
    });
  });

}).call(this);