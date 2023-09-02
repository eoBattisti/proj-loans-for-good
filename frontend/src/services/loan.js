import axios from "axios";

import { BASE_API_URL } from "../utils/urls";
import { headers } from "../utils/core";

export class LoanService {

    constructor(){
        this.apiRef = axios.create({
            baseURL: `${BASE_API_URL}/api`,
            headers: headers
        });
    }

    async addLoan(payload) {
        const { data } = await this.apiRef.post("/loan/", payload);
        return data;
    }

}

export default new LoanService();
