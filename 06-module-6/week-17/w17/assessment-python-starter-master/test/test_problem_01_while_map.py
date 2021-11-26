from inspect import getsourcelines
from random import randint
import unittest

class TestWhileMap(unittest.TestCase):
    def setUp(self):
        self.expected = []
        self.input = []
        for i in range(100):
            s = 'a' * randint(0, 10)
            self.input.append(s)
            self.expected.append(s.upper())

    def test_function_returns_proper_value(self):
        from problem_01_while_map import my_while_map
        result = my_while_map(self.input)
        self.assertListEqual(self.expected, result)

    def test_function_appears_to_use_a_while_loop(self):
        from problem_01_while_map import my_while_map
        lines = [line
                 for line in getsourcelines(my_while_map)[0]
                 if line.strip().startswith("while")]
        self.assertTrue(len(lines) > 0)
