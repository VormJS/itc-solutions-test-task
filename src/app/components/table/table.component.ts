import { Component, OnInit, ViewChild } from '@angular/core';
import { peopleList } from 'src/app/helpers/people-list';
import { Person } from 'src/app/models/person';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { University } from 'src/app/models/university';
import { universityList } from 'src/app/helpers/university-list';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  rowForm: FormGroup;
  initialRowFormValue: FormGroup;
  peopleList: MatTableDataSource<Person>;
  universities: University[];
  displayedColumns: string[] = [
    'actions',
    'id',
    'fullName',
    'sex',
    'dateOfBirth',
    'married',
    'university',
    'phone'
  ];
  editRow: Person = new Person();
  deleteRowOnEditAbort: boolean = false;

  filter: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.peopleList = new MatTableDataSource(peopleList);
    this.universities = universityList;
  }

  ngOnInit() {
    this.rowForm = this.formBuilder.group({
      id: [''],
      fullName: ['', [Validators.required]],
      sex: ['male', [Validators.required]],
      dateOfBirth: [null, [Validators.required]],
      married: [false],
      university: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?([\d\ \-\(\)]+)$/)]],
    });
    this.initialRowFormValue = this.rowForm.value
  }
  addRecord() {
    this.clearFilter()
    const lastID = this.peopleList.data[this.peopleList.data.length - 1].id
    const newPerson = new Person
    newPerson.id = lastID + 1
    this.peopleList.data.push(newPerson)
    this.deleteRowOnEditAbort = true;
    this.rowForm.reset(this.initialRowFormValue)
    this.editRecord(newPerson)
  }

  editRecord(row: Person) {
    this.editRow = row
    this._convertModelToControl()
    this.peopleList.sort = this.sort // hack for table re-render
  }
  saveRecord(): void {
    this._convertControlToModel()
    // save chages at data service
    this.editRow = new Person()
  }
  abortEdit(): void {
    if (this.deleteRowOnEditAbort) {
      this.deleteRecord(this.editRow);
      this.deleteRowOnEditAbort = false;
    }
    this.editRow = new Person()
  }

  deleteRecord(row: Person) {
    const recordIndexToDelete = this.peopleList.data.findIndex(record => record.id == row.id)
    this.peopleList.data.splice(recordIndexToDelete, 1)
    this.peopleList.sort = this.sort // hack for table re-render
  }

  applyFilter(filterValue: string): void {
    if(this.editRow.id) this.abortEdit()
    this.peopleList.filter = filterValue.trim().toLowerCase();
  }
  clearFilter(): void {
    this.peopleList.filter = '';
    this.filter = '';
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.rowForm.controls[controlName].hasError(errorName);
  }
  private _convertModelToControl(): void {
    const row = this.editRow
    const controls = this.rowForm.controls

    // properties without transformation
    const standardProperties = [
      'id',
      'fullName',
      'sex',
      'married',
      'university'
    ]
    standardProperties.forEach(property => {
      if (row[property]) controls[property].setValue(row[property])
    });
    // properties with transformation
    if (row.phone) controls.phone.setValue(row.phone.replace('+7 ', ''))
    if (row.dateOfBirth) controls.dateOfBirth.setValue(new Date(row.dateOfBirth))
  }

  private _convertControlToModel(): void {
    const row = this.editRow
    const controlValues = this.rowForm.value
    // properties without transformation
    const standardProperties = [
      'id',
      'fullName',
      'sex',
      'married',
      'university'
    ]
    standardProperties.forEach(property => {
      row[property] = controlValues[property]
    });
    // properties with transformation
    const phoneRaw = controlValues.phone.replace(' ', '')
    row.phone = `+7 ${phoneRaw.slice(0, 3)} ${phoneRaw.slice(3, 6)} ${phoneRaw.slice(6, 8)} ${phoneRaw.slice(8, 10)}`
    row.dateOfBirth = controlValues.dateOfBirth.getTime()
  }
}