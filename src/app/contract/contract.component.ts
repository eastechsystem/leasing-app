import { Component, OnInit } from '@angular/core';
import { ContractOverview } from '../models/contract-overview';
import { ContractOverviewService } from '../services/contract-overview.service';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TitleStrategy } from '@angular/router';
import { Customer } from '../models/customer';
import { Vehicle } from '../models/vehicle';
import { SubscriptionLoggable } from 'rxjs/internal/testing/SubscriptionLoggable';
import { Brand } from '../models/brand';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})


export class ContractComponent implements OnInit {

  contractOverviewRecords: ContractOverview[] = [];
  contractOverview: ContractOverview  = <ContractOverview>{};
  customer: Customer  = <Customer>{};
  vehicle: Vehicle = <Vehicle>{};

  submitted:boolean = false;
  submittedCustomer:boolean = false;
  submittedVehicle:boolean = false;
  contractOverviewDialog:boolean = false;
  customerDialog:boolean = false;
  vehicleDialog:boolean = false;
  selectedBrand:string = "";
  brands: Brand[] = [];
  constructor(private contractOverviewService: ContractOverviewService, private messageService: MessageService) {
    this.customer = {
      firstName : "",
      lastName : "",
      birthdate : ""
    }
    this.vehicle = {
      brand: "",
      model: "",
      modelYear: "",
      price : 0
    }
    this.contractOverview = {
      id : -1,
      contractNumber : -1,
      monthlyRate: 0,
      customer: this.customer,
      vehicle : this.vehicle
    };
    
    this.brands = [
      { name: "BMW" }, { name:  "Audi" }, { name: "Porsche"}
    ]
   }
  
  ngOnInit(): void {
    
    this.getContractRecords();
  }

  openNew() {
    this.contractOverview = <ContractOverview>{};
    this.submitted = false;
    this.contractOverviewDialog = true;
  }

  openNewCustomer() {
    this.customer = {};
    this.submittedCustomer = false;
    this.hideDialog();
  }

  openNewVehicle() {
    this.vehicle = {};
    this.submittedVehicle = false;
  }

  hideDialog() {
    this.contractOverviewDialog = false;
    this.submitted = false;
  }

  hideCustomerDialog() {
    this.customerDialog = false;
    this.submittedCustomer = false;
  }
  
  hideVehicleDialog() {
    this.vehicleDialog = false;
    this.submittedVehicle = false;
  }

  getContractRecords(){
    this.contractOverviewService.getContractOverview().subscribe({
      next: (data) => {
            
          if(data){
            this.contractOverviewRecords = data;
            console.log(typeof(this.contractOverviewRecords));
          }
      },
      error: () => {
        this.messageService.add({severity:'danger', summary:'Error', detail:'Failed to Fetch Contractd'});
      }
    });
  }

  editContractRecord(contractOverview: ContractOverview){
    this.contractOverview = {...contractOverview};
    this.customer = {...contractOverview.customer};
    this.vehicle = {...contractOverview.vehicle};
    this.contractOverviewDialog = true;
  }

  editCustomer(customer: Customer){
    this.customer = {...customer};
    this.customerDialog = true;
  }

  editVehicle(vehicle: Vehicle){
    this.vehicle = {...vehicle};
    this.vehicleDialog = true;
  }

  deleteVehicle(vehicle: Vehicle){
    this.vehicle = <Vehicle>{
      id : -1,
      brand : "",
      model : "",
      modelYear : ""
    };
  }

  deleteCustomer(customer: Customer){
    this.customer = <Customer>{
      id : -1,
      firstName : "",
      lastName : "",
      birthdate : ""
    };
  }

  saveContract() {
    this.submitted = true;

    if (this.contractOverview) {
        if (this.contractOverview.id) {
            this.contractOverviewRecords[this.findIndexById(this.contractOverview.id)] = this.contractOverview;                
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Contract Updated', life: 3000});
             
            // call api to saveContract(contractOverview);
            this.contractOverviewService.updateLeasingContract(this.contractOverview, this.contractOverview.id).subscribe({
              next: (data) => {
                  if(data){
                    this.contractOverviewRecords = data;
                    console.log(typeof(this.contractOverviewRecords));
                  }
              },
              error: () => {
                this.messageService.add({severity:'danger', summary:'Error', detail:'Failed to Update the leasing contractd'});
              }
            });
          }

        this.contractOverviewRecords = [...this.contractOverviewRecords];
        this.contractOverviewDialog = false;
        this.contractOverview = <ContractOverview>{};
        this.customer = <Customer>{};
    }
  }

  saveCustomer(){
    this.submittedCustomer = true;

    if (this.customer.firstName?.trim() || this.customer.firstName == "") {
        if (this.customer.id) {
          this.contractOverview.customer = this.customer;
          this.customerDialog = false;
          if (this.contractOverview.id) {
              this.contractOverviewRecords[this.findIndexById(this.contractOverview.id)] = this.contractOverview;                
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Contract Updated', life: 3000});
          }
          this.contractOverviewRecords = [...this.contractOverviewRecords];
        }
    }
  }

  saveVehicle(){
    this.submittedVehicle = true;

    if (this.vehicle.brand?.trim()) {
        if (this.vehicle.id) {
          this.contractOverview.vehicle = this.vehicle;
          this.vehicleDialog = false;
          if (this.contractOverview.id) {
              this.contractOverviewRecords[this.findIndexById(this.contractOverview.id)] = this.contractOverview;                
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Contract Updated', life: 3000});
          }
          this.contractOverviewRecords = [...this.contractOverviewRecords];
        }
    }
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.contractOverviewRecords.length; i++) {
        if (this.contractOverviewRecords[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
