import unittest


class TestMyFilter(unittest.TestCase):
    def test_my_filter_filters_an_empty_dictionary(self):
        from problem_07_dictionary import my_filter

        result = my_filter({})

        self.assertEqual(len(result), 0)

    def test_my_filter_filters_short_keys(self):
        from problem_07_dictionary import my_filter

        result = my_filter({5: "asdfg", 8: "asdfasdf", 12: "qwe", 10: "loo"})

        self.assertDictEqual(result, {12: "qwe", 10: "loo"})
