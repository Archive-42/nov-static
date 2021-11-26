# CLASS DECLARATION
#
# Declare a class named "OneTitleLibrary" with the following features:
#
# * A constructor that takes two values, a name and a total number of available
#   copies of the one title at the library
# * A method named "checkout_copy" that reduces the number of available copies
#   by one. Calling this method over and over should never result in a negative
#   number of available copies at the library.
# * A method named "return_copy" that increases the number of available copies
#   by one. Calling this method over and over should never result in a number
#   of available copies greater than the number passed into the constructor
# * A "__repr__" method that with the format
#     "<{name} ({available copies})>"
#
# Test data at the bottom.

# WRITE YOUR CODE HERE



# Test calls
library = OneTitleLibrary("Little Library", 3)
print(library)  # > "<Little Library (3)>"

library.checkout_copy()
print(library)  # > "<Little Library (2)>"

library.checkout_copy()
library.checkout_copy()
print(library)  # > "<Little Library (0)>"

library.checkout_copy()
print(library)  # > "<Little Library (0)>" Cannot have # of copies < 0

library.return_copy()
print(library)  # > "<Little Library (1)>"

library.return_copy()
library.return_copy()
print(library)  # > "<Little Library (3)>"

library.return_copy()
print(library)  # > "<Little Library (3)>" Cannot have # of copies > 3
                #                          because 3 was passed into the
                #                          constructor
