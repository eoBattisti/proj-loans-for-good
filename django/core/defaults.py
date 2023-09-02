from django.utils.translation import gettext_lazy as _

LOAN_APPROVED = 1
LOAN_DENIED = 2
LOAN_UNDER_REVIEW = 3
LOAN_WAITING_PROCESS = 4
LOAN_STATUS = (
    (LOAN_APPROVED, _('Approved')),
    (LOAN_DENIED, _('Denied')),
    (LOAN_UNDER_REVIEW, _('Under Review')),
    (LOAN_WAITING_PROCESS, _('Waiting Process')),
)


TEXT_FIELD_TYPE = 0
NUMBER_FIELD_TYPE = 1
DATE_FIELD_TYPE = 2
EMAIL_FIELD_TYPE = 3
PHONE_FIELD_TYPE = 4
FIELD_TYPES = (
    (TEXT_FIELD_TYPE, _('text')),
    (NUMBER_FIELD_TYPE, _('number')),
    (DATE_FIELD_TYPE, _('date')),
    (EMAIL_FIELD_TYPE, _('email')),
    (PHONE_FIELD_TYPE, _('phone')),
)
