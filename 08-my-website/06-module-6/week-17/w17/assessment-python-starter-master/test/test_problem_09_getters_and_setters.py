from random import randint
import unittest


class TestValueHolder(unittest.TestCase):
    def test_has_value_passed_in(self):
        from problem_09_getters_and_setters import ValueHolder
        o = ValueHolder(99)
        self.assertEqual(o.value, 99)

    def test_can_set_and_retrieve_value(self):
        from problem_09_getters_and_setters import ValueHolder
        o = ValueHolder("hello")
        value = randint(1, 10)
        o.value = value
        self.assertEqual(o.value, value)

    def test_cannot_set_value_to_None(self):
        from problem_09_getters_and_setters import ValueHolder
        o = ValueHolder(True)
        o.value = None
        self.assertEqual(o.value, True)
