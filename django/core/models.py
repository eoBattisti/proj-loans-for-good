import uuid
from django.utils.translation import gettext_lazy as _
from django.db import models

from core import defaults


class BaseModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(verbose_name=_("Created at"), auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name=_("Updated at"), auto_now=True)

    class Meta:
        abstract = True


class CustomField(BaseModel):
    name = models.CharField(verbose_name=_("Name"), max_length=255)
    description = models.CharField(verbose_name=_("Description"), max_length=255)
    ftype = models.PositiveSmallIntegerField(verbose_name=_("Field Type"), choices=defaults.FIELD_TYPES)
    optional = models.BooleanField(verbose_name=_("Optional"), default=False)

    class Meta:
        verbose_name = _("Custom Field")
        verbose_name_plural = _("Custom Fields")

    def __str__(self):
        return f'{self.name} - {self.get_ftype_display()}'

    @property
    def value(self):
        # Implement convertion of types
        pass
