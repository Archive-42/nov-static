from inspect import getsourcelines
from random import randint
import re
import unittest


class TestFilterSmallLists(unittest.TestCase):
    def test_filter_small_lists_works_on_empty_list(self):
        from problem_08_builtins import filter_small_lists

        result = filter_small_lists([])

        self.assertListEqual(result, [])

    def test_filter_small_lists_actually_filters_small_lists(self):
        from problem_08_builtins import filter_small_lists
        lst = []
        expected = []
        for _ in range(0, 100):
            sublst = [1] * randint(0, 10)
            lst.append(sublst)
            if len(sublst) > 2:
                expected.append(sublst)

        result = filter_small_lists(lst)

        self.assertListEqual(result, expected)

    def test_appears_to_use_filter_function(self):
        from problem_08_builtins import filter_small_lists
        filter_re = re.compile("filter")
        strip_comments = re.compile("#.*")
        lines = getsourcelines(filter_small_lists)[0][1:]
        lines = [strip_comments.sub("", line).strip()
                 for line in lines]
        lines = [line for line in lines if filter_re.findall(line)]
        self.assertGreaterEqual(len(lines), 1)
