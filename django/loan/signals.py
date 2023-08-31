from django.db.models.signals import post_save
from django.dispatch import receiver

from core import defaults
from loan.models import Loan
from loan.tasks import process_loan

