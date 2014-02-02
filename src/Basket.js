// Generated by CoffeeScript 1.6.2
(function() {
  var Basket,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Basket = (function() {
    function Basket() {
      this.items = [];
      this.distinctCount = 0;
      this.totalCount = 0;
      this.discountAmount = 0;
      this.coupons = ["A123", "B123", "C123"];
    }

    Basket.prototype.add = function(item, quantity) {
      var currentItem;

      if (quantity == null) {
        quantity = 1;
      }
      if (this.itemExistsInBasket(item)) {
        currentItem = this.getItemFromBasket(item);
        currentItem.quantity += quantity;
      } else {
        this.items.push({
          item: item,
          quantity: quantity
        });
      }
      return this.updateCounts();
    };

    Basket.prototype.remove = function(item, quantity) {
      var basketItem, itemLoc;

      if (quantity == null) {
        quantity = 1;
      }
      if (!this.itemExistsInBasket(item)) {
        return;
      }
      basketItem = this.getItemFromBasket(item);
      basketItem.quantity -= quantity;
      if (basketItem.quantity < 1) {
        itemLoc = this.getItemIndex(item);
        this.items.splice(itemLoc, 1);
      }
      return this.updateCounts();
    };

    Basket.prototype.totalPrice = function() {
      var item, price, _i, _len, _ref;

      price = 0;
      _ref = this.items;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        price += item.quantity * item.item.price;
      }
      return price * (1 - (this.discountAmount / 100));
    };

    Basket.prototype.setDiscount = function(amount) {
      return this.discountAmount = Math.abs(amount);
    };

    Basket.prototype.updateCounts = function() {
      var item, total, _i, _len, _ref;

      total = 0;
      _ref = this.items;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        total += item.quantity;
      }
      this.distinctCount = this.items.length;
      return this.totalCount = total;
    };

    Basket.prototype.applyCoupon = function(code) {
      if (__indexOf.call(this.coupons, code) >= 0) {
        this.setDiscount(10);
        return true;
      } else {
        return false;
      }
    };

    Basket.prototype.itemExistsInBasket = function(item) {
      var basketItem, _i, _len, _ref;

      _ref = this.items;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        basketItem = _ref[_i];
        if (basketItem.item.id === item.id) {
          return true;
        }
      }
      return false;
    };

    Basket.prototype.getItemFromBasket = function(item) {
      var basketItem, _i, _len, _ref;

      _ref = this.items;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        basketItem = _ref[_i];
        if (basketItem.item.id === item.id) {
          return basketItem;
        }
      }
      return false;
    };

    Basket.prototype.getQuantity = function(item) {
      if (this.itemExistsInBasket(item)) {
        return this.getItemFromBasket(item).quantity;
      } else {
        return 0;
      }
    };

    Basket.prototype.getItemIndex = function(item) {
      var basketItem, count, _i, _len, _ref;

      count = 0;
      _ref = this.items;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        basketItem = _ref[_i];
        if (basketItem.item.id === item.id) {
          return count;
        }
        count++;
      }
      return -1;
    };

    Basket.prototype.empty = function() {
      this.items = [];
      this.distinctCount = 0;
      return this.totalCount = 0;
    };

    return Basket;

  })();

  window.Basket = Basket;

}).call(this);
