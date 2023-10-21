def change(amount, coins):
    """Given an amount that is a non-negative integer and a list of postive
    number coins, change returns a non-negative integer indicating the minimum
    number of coins required to make up the given amount"""
    if amount <= 0:
        return 0
    if coins == []:
        return float("inf")
    elif coins[0] > amount:
        return change(amount, coins[1:])
    else:
        use_it = 1 + change(amount - coins[0], coins)
        lose_it = change(amount, coins[1:])
        return min(use_it, lose_it)
