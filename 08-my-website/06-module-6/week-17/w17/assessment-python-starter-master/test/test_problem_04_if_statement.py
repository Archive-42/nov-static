from inspect import getsource
import re
import unittest


class TestIfStatement(unittest.TestCase):
    def test_function_returns_proper_value(self):
        from problem_04_if_statement import simple_german_translator
        self.assertEqual(simple_german_translator("Guten, Tag"), "Hello")
        self.assertEqual(simple_german_translator("Hallo"), "Hello")
        self.assertEqual(simple_german_translator("Tschuss"), "Bye")
        self.assertEqual(simple_german_translator("Auf wiedersehen"), "Bye")
        self.assertEqual(simple_german_translator("Ich liebe dich"), "I love you")
        self.assertEqual(simple_german_translator("Wo sind Sie"), "Where are you")
        self.assertIsNone(simple_german_translator("This ain't German"))

    def test_uses_1_if_3_elifs_and_an_else(self):
        from problem_04_if_statement import simple_german_translator
        source = getsource(simple_german_translator)
        if_re = re.compile("\\bif\\b")
        elif_re = re.compile("\\belif\\b")
        else_re = re.compile("\\belse\\b")
        if_count = len(if_re.findall(source))
        elif_count = len(elif_re.findall(source))
        else_count = len(else_re.findall(source))
        print(if_count, elif_count, else_count)
        self.assertTrue(if_count == 1 and elif_count == 3 and else_count == 1,
                        "Incorrect number of if, elif, or else keywords")
