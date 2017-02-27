var clothingItem = (function () {
    function clothingItem(item_id, item_name, item_type, item_attributes) {
        this.attributes = {}; //Key: attribute ; Value: int 0-10 that represents the contribution of the item towards the attribute
        this.matching_grade = {}; //Key: id of item to compare ; Value: int 0-10 that represents how well the two items match
        this.id = item_id;
        this.name = item_name;
        this.type = item_type;
        this.attributes = item_attributes;
    }
    clothingItem.prototype.get_id = function () {
        return this.id;
    };
    clothingItem.prototype.get_name = function () {
        return this.name;
    };
    clothingItem.prototype.get_type = function () {
        return this.type;
    };
    clothingItem.prototype.get_color = function () {
        return this.color;
    };
    clothingItem.prototype.get_attributes = function () {
        return this.attributes;
    };
    clothingItem.prototype.get_matching_grade = function () {
        return this.matching_grade;
    };
    clothingItem.prototype.get_user_grade = function () {
        return this.user_grade;
    };
    clothingItem.prototype.edit_attributes = function (new_attributes) {
        this.attributes = new_attributes;
    };
    clothingItem.prototype.edit_matching_grade = function (new_matching_grade) {
        this.matching_grade = new_matching_grade;
    };
    clothingItem.prototype.edit_user_grade = function (new_user_grade) {
        this.user_grade = new_user_grade;
    };
    return clothingItem;
}());
var clothingCombination = (function () {
    function clothingCombination(comb_id, comb_attributes, comb_items, comb_algorithm_grade) {
        this.attributes = {}; //Key: attribute ; Value: int 0-10 that represents the rate of the attribute within the clothingCombination
        this.items = {}; //Key: item type ; Value: item id
        this.id = comb_id;
        this.attributes = comb_attributes;
        this.items = comb_items;
        this.algorithm_grade = comb_algorithm_grade;
    }
    clothingCombination.prototype.get_id = function () {
        return this.id;
    };
    clothingCombination.prototype.get_attributes = function () {
        return this.attributes;
    };
    clothingCombination.prototype.get_items = function () {
        return this.items;
    };
    clothingCombination.prototype.get_algorithm_grade = function () {
        return this.algorithm_grade;
    };
    clothingCombination.prototype.get_user_grade = function () {
        return this.user_grade;
    };
    clothingCombination.prototype.edit_attributes = function (new_attributes) {
        this.attributes = new_attributes;
    };
    clothingCombination.prototype.edit_items = function (new_items) {
        this.items = new_items;
    };
    clothingCombination.prototype.edit_user_grade = function (new_user_grade) {
        this.user_grade = new_user_grade;
    };
    return clothingCombination;
}());
function order_clothing_combinations(combinations) {
    return combinations.sort(function (comb_a, comb_b) {
        if (comb_a.get_algorithm_grade() < comb_b.get_algorithm_grade()) {
            return -1;
        }
        if (comb_a.get_algorithm_grade() > comb_b.get_algorithm_grade()) {
            return 1;
        }
        return 0;
    });
}
