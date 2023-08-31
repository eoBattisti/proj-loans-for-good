from django.contrib import admin

from loan.models import Loan, LoanForm, LoanProcessorApi

admin.site.register(Loan)
admin.site.register(LoanForm)
admin.site.register(LoanProcessorApi)
