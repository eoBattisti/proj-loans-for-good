from django.db import models
from django.utils.translation import gettext_lazy as _

from core.models import BaseModel
from core.defaults import LOAN_STATUS


class LoanProcessorApi(BaseModel):
    url = models.CharField(verbose_name=_('URL'), max_length=255)
    username = models.CharField(verbose_name=_('Username'), blank=True, null=True, max_length=255)
    password = models.CharField(verbose_name=_('Password'), blank=True, null=True, max_length=255)
    scheme = models.CharField(verbose_name=_('Scheme'), max_length=255, default='http')

    class Meta:
        verbose_name = _('Loan Processor')
        verbose_name_plural = _('Loan Processors')

    def __str__(self):
        return f'{self.url}\n{self.username}\n{self.password}'

    def mount_url(self, endpoint: str):
        if self.username and self.password:
            return f'{self.username}:{self.password}@{self.url}/{endpoint}'
        return f'{self.scheme}://{self.url}/{endpoint}/'

class LoanForm(BaseModel):
    title = models.CharField(verbose_name=_('Title'), max_length=255)
    fields = models.ManyToManyField('core.CustomField', verbose_name=_('Fields'), related_name='loan_forms')

    class Meta:
        verbose_name = _('Loan Form')
        verbose_name_plural = _('Loan Forms')

    def __str__(self):
        return f'{self.title}'


class Loan(BaseModel):
    client_name = models.CharField(verbose_name=_('Client Name'), max_length=255)
    client_document = models.CharField(verbose_name=_('Client Document'), max_length=255)
    status = models.PositiveSmallIntegerField(verbose_name=_('Status'), choices=LOAN_STATUS, blank=True, null=True)
    data = models.JSONField(verbose_name=_('Data'), blank=True, null=True)

    class Meta:
        verbose_name = _('Loan')
        verbose_name_plural = _('Loans')

    def __str__(self):
        return f'{self.client_name} - {self.get_status_display()}'
