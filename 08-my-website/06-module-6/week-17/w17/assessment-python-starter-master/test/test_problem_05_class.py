from random import randint
import unittest


class TestOneTitleLibrary(unittest.TestCase):
    def test_constructor_accepts_name_and_number_of_available_copies(self):
        from problem_05_class import OneTitleLibrary
        OneTitleLibrary("Corner Buecherei", 4)

    def test_repr_returns_proper_string_representation(self):
        from problem_05_class import OneTitleLibrary
        library = OneTitleLibrary("Corner Buecherei", 4)
        self.assertEqual(str(library), "<Corner Buecherei (4)>")

    def test_can_remove_books_until_gone(self):
        from problem_05_class import OneTitleLibrary
        library = OneTitleLibrary("Corner Buecherei", 4)
        self.assertEqual(str(library), "<Corner Buecherei (4)>")
        library.checkout_copy()
        self.assertEqual(str(library), "<Corner Buecherei (3)>")
        library.checkout_copy()
        self.assertEqual(str(library), "<Corner Buecherei (2)>")
        library.checkout_copy()
        self.assertEqual(str(library), "<Corner Buecherei (1)>")
        library.checkout_copy()
        self.assertEqual(str(library), "<Corner Buecherei (0)>")
        library.checkout_copy()
        self.assertEqual(str(library), "<Corner Buecherei (0)>")

    def test_cannot_add_more_books_than_initialized_with(self):
        from problem_05_class import OneTitleLibrary
        library = OneTitleLibrary("Corner Buecherei", 4)
        self.assertEqual(str(library), "<Corner Buecherei (4)>")
        library.return_copy()
        self.assertEqual(str(library), "<Corner Buecherei (4)>")
        library.checkout_copy()
        self.assertEqual(str(library), "<Corner Buecherei (3)>")
        library.return_copy()
        self.assertEqual(str(library), "<Corner Buecherei (4)>")
        library.return_copy()
        self.assertEqual(str(library), "<Corner Buecherei (4)>")
