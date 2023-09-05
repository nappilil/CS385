# 09/30/21
# Lilli Nappi
def knapsack(capacity, itemList):
    """Input a capacity and a list of items, returns both the maximum value
and the list of items that make the value without exceeding the capacity of the knapsack"""
    if len(itemList) == 0 or capacity <= 0:
        return [0, []]
    elif itemList[0][0] > capacity:
        return knapsack(capacity, itemList[1:])
    else:
        use_it = knapsack(capacity - itemList[0][0], itemList[1:])
        lose_it = knapsack(capacity, itemList[1:])
        use_it[0] += itemList[0][1]
        use_it[1] += [itemList[0]]
        if use_it[0] > lose_it[0]: return use_it
        if use_it[0] <= lose_it[0]: return lose_it

print(knapsack(6, [[1, 4], [5, 150], [4, 180]]))
#[184, [[1, 4], [4, 180]]]
print(knapsack(76, [[36, 35], [10, 28], [39, 47], [8, 1], [7, 24]]))
#[100, [[10, 28], [39, 47], [8, 1], [7, 24]]]
