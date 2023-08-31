from rest_framework import viewsets, mixins, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from core.defaults import LOAN_DENIED, LOAN_UNDER_REVIEW
from loan.models import Loan, LoanForm, LoanProcessorApi
from loan.serializers import LoanSerializer, LoanFormSerializer
from loan.tasks import process_loan


class LoanFormViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = LoanForm.objects.all()
    serializer_class = LoanFormSerializer


class LoanViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer

    def create(self, request, *args, **kwargs):
        task_result = None
        response = Response()
        try: 
            raw_data = request.data.pop('data', {})
            request.data['data'] = []
            for field in raw_data:
                request.data['data'].append({"field": field.get('name'), "value": field.get('value')})
            task_result = process_loan.delay(client_name=request.data.get('client_name'), 
                                       client_document=request.data.get('client_document'))
        except LoanProcessorApi.DoesNotExist:
            content = {"message_error": "Não foi possivel consultar o seu documento para empréstimo"}
            response.content = content
            response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        except Exception as e:
            content = {"message_error": "Erro ao processar a consulta. Tente novamente mais tarde."}
            response.content = content
            response.status_code = status.HTTP_501_NOT_IMPLEMENTED
        else:
            if task_result.get():
                request.data['status'] = LOAN_UNDER_REVIEW
            else:
                request.data['status'] = LOAN_DENIED
            response = super().create(request, *args, **kwargs)
        return response
