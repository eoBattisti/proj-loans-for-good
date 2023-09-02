import ast
import requests
from requests.adapters import HTTPAdapter, Retry

from setup.celery import app
from loan.models import Loan, LoanProcessorApi

@app.task
def process_loan(client_name, client_document) -> bool:
    loan_processor: LoanProcessorApi = LoanProcessorApi.objects.first()

    if not loan_processor:
        raise LoanProcessorApi.DoesNotExist("Loan Processor is not available.")

    session: requests.Session = requests.Session()
    retries: Retry = Retry(total=5, allowed_methods=["POST"], backoff_factor=1, status_forcelist=[500, 502, 503, 504, 404])
    session.mount(loan_processor.scheme, HTTPAdapter(max_retries=retries))

    payload: dict = {'name': client_name, 'document': client_document}
    headers: dict = {'Content-Type': 'application/json', 'Accept': 'application/json'}

    response: requests.Response = session.post(loan_processor.mount_url(endpoint='loan'),
                                              params=payload,
                                              headers=headers)
    print('Response: ', response, flush=True)
    if response.status_code != 200:
        raise Exception('Error processing loan: {}'.format(response.text))
    return response.json().get('approved', False)
