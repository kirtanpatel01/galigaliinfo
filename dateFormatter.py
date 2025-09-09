def is_valid_date(dd, mm, yyyy):
    if yyyy >= 1:
        if mm >= 1:
            if mm <= 12:
                if mm == 1 or mm == 3 or mm == 5 or mm == 7 or mm == 8 or mm == 10 or mm == 12:
                    if dd >= 1:
                        if dd <= 31:
                            return True
                        else:
                            return False
                    else:
                        return False
                elif mm == 4 or mm == 6 or mm == 9 or mm == 11:
                    if dd >= 1:
                        if dd <= 30:
                            return True
                        else:
                            return False
                    else:
                        return False
                elif mm == 2:
                    if (yyyy % 400 == 0) or (yyyy % 4 == 0 and yyyy % 100 != 0):
                        if dd >= 1:
                            if dd <= 29:
                                return True
                            else:
                                return False
                        else:
                            return False
                    else:
                        if dd >= 1:
                            if dd <= 28:
                                return True
                            else:
                                return False
                        else:
                            return False
                else:
                    return False
            else:
                return False
        else:
            return False
    else:
        return False

def test_is_valid_date():
    # Valid normal cases
    assert is_valid_date(31, 1, 2023) == True    # 31st Jan (valid, 31-day month)
    assert is_valid_date(30, 4, 2023) == True    # 30th Apr (valid, 30-day month)
    assert is_valid_date(28, 2, 2023) == True    # 28th Feb (valid, non-leap year)
    assert is_valid_date(29, 2, 2024) == True    # 29th Feb (valid, leap year)
    # Invalid year
    assert is_valid_date(15, 6, 0) == False      # year < 1
    # Invalid month
    assert is_valid_date(10, 0, 2023) == False   # month < 1
    assert is_valid_date(10, 13, 2023) == False  # month > 12
    # Invalid days
    assert is_valid_date(32, 1, 2023) == False   # day > 31
    assert is_valid_date(31, 4, 2023) == False   # day > 30 in April
    assert is_valid_date(29, 2, 2023) == False   # 29 Feb in non-leap year
    assert is_valid_date(30, 2, 2024) == False   # day > 29 in leap year
    
    print("All test cases passed!")
test_is_valid_date()
