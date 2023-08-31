''' Log Level filter '''
import logging


class DebugFilter(logging.Filter):
    """Filter messages with level == DEBUG """

    def filter(self, record):
        return record.levelno == logging.DEBUG


class InfoFilter(logging.Filter):
    """Filter messages with level == INFO """

    def filter(self, record):
        return record.levelno == logging.INFO


class LessEqualInfoFilter(logging.Filter):
    """Filter messages with level <= INFO """

    def filter(self, record):
        return record.levelno <= logging.INFO

