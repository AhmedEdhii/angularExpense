import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Expense } from 'src/app/types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  isChecked: boolean = false;
  description: string = '';
  amount: string = '';
  @Output() expenseAdd: EventEmitter<Expense> = new EventEmitter();

  addExpense() {

    const newExpense: Expense = {
      description: this.description,
      amount: this.amount
    }
    this.expenseAdd.emit(newExpense);
  }

}
