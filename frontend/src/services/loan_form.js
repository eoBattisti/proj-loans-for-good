import axios from "axios";

import { BASE_API_URL } from "../utils/urls";
import { headers } from "../utils/core";

export class LoanFormService {

    constructor(){
        this.apiRef = axios.create({
            baseURL: `${BASE_API_URL}/api`,
            headers: headers
        });
    }

    async getLoanForms() {
        const { data } = await this.apiRef.get("/loan_form/");
        return data;
    }

}

export default new LoanFormService();
