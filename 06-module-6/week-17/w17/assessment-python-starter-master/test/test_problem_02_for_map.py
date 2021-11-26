from inspect import getsourcelines
from random import randint
import unittest


class TestForMap(unittest.TestCase):
    def setUp(self):
        self.expected = []
        self.input = []
        for i in range(100):
            s = 'a' * randint(0, 10)
            self.input.append(s)
            self.expected.append(s.upper())

    def test_function_returns_proper_value(self):
        from problem_02_for_map import my_for_map
        result = my_for_map(self.input)
        self.assertListEqual(self.expected, result)

    def test_function_appears_to_use_a_for_loop(self):
        from problem_02_for_map import my_for_map
        lines = [line
                 for line in getsourcelines(my_for_map)[0]
                 if line.strip().startswith("for")]
        self.assertTrue(len(lines) > 0)
