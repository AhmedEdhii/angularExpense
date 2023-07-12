import { Component, OnInit } from '@angular/core';
import { Expense } from './types';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Project';
  isPKR: boolean = false;
  total: string = '';
  accessToken: string = ''
  expenses: Expense[] = [];
  conversionRate: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const token = localStorage.getItem("accessToken");
    if (token != null) {
      this.accessToken = token
    }
    const items = localStorage.getItem("expenses");
    console.log("hereeeee")
    if (items == null) {
      this.expenses = [];
    }
    else {
      // this.expenses = JSON.parse(this.localItem);
      this.expenses = JSON.parse(items);
    }
    this.getTotal()
    console.log(this.expenses)
  }

  addExpense(expense: Expense) {
    console.log("addedddddd");
    console.log(expense);
    this.expenses.push(expense);
    this.getTotal();
    localStorage.setItem("expenses", JSON.stringify(this.expenses));
  }

  async fetchConversionRate () {
    const apiUrl = 'https://api.fastforex.io/fetch-one';
    const apiKey = 'da13627d1f-e7f8f89f53-rxobtv';
    const fromCurrency = 'PKR';
    const toCurrency = 'USD';

    const url = `${apiUrl}?from=${fromCurrency}&to=${toCurrency}&api_key=${apiKey}`;

    console.log(url)
    await new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (response: any) => {
          this.conversionRate = response.result[`${toCurrency}`];
          console.log(this.conversionRate);
          resolve(undefined); // Resolve the promise when the subscription is complete
        },
        (error: any) => {
          reject(error); // Reject the promise if there's an error
        }
      );
    });
  }

  getToken(token: string) {
    this.accessToken = token
    return token;
  }

  async getTotal() {
    var sum = 0
    console.log("lengthhhh")
    console.log(this.expenses.length)
    await this.fetchConversionRate()
    for (const expense of this.expenses) {
      console.log(this.expenses)
      console.log(expense.amount)
      sum += parseInt(expense.amount);
    }

    console.log(sum)
    if(this.isPKR){
      this.total = "Rs." + sum.toString();
    }
    else {
      console.log("rateeeeee")
      console.log(this.conversionRate)
      this.total = "USD " + (sum * this.conversionRate).toString();
    }

    console.log(this.total)
  }

  onToggleChange() {
    setTimeout(() => {
      this.getTotal()
    }, 10);
  }
}
