import inspect
from random import randint
import unittest


class TestNoneCheck(unittest.TestCase):
    def test_takes_one_arguments_and_returns_a_function_with_one_named_parameter(self):
        from problem_10_functions import none_check

        result = none_check(lambda x: x)
        spec = inspect.getfullargspec(result)

        self.assertTrue(callable(result))
        self.assertEqual(len(spec.args), 1)
        self.assertIsNone(spec.varargs)
        self.assertIsNone(spec.varkw)
        self.assertIsNone(spec.defaults)
        self.assertEqual(spec.kwonlyargs, [])
        self.assertIsNone(spec.kwonlydefaults)
        self.assertEqual(spec.annotations, {})

    def test_binds_argument_to_function_and_calls_on_invocation_of_return_value(self):
        from problem_10_functions import none_check

        delta = randint(1, 100)
        result = none_check(lambda x: x + delta)

        self.assertEqual(result(1), 1 + delta)
        self.assertIsNone(result(None))
