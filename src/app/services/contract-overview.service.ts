import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ContractOverview } from '../models/contract-overview';
@Injectable({
  providedIn: 'root'
})
export class ContractOverviewService {

 
  url = "http://localhost:8080/api/v1.0/contract";
  constructor(private http: HttpClient) { }

  getContractOverview(){
    return this.http.get<ContractOverview[]>(this.url);
  }
  
  updateLeasingContract(contractOverview: ContractOverview, id: any){
    return this.http.put<ContractOverview[]>(this.url + "/" + id, contractOverview);
  }
}
