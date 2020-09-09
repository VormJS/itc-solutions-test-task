import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SexToEmojiPipe } from 'src/app/helpers/sex-to-emoji.pipe';
import { BooleanToEmojiPipe } from 'src/app/helpers/boolean-to-emoji.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

import { NgxMaskModule, IConfig } from 'ngx-mask'
export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

import { peopleList } from 'src/app/helpers/people-list';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  const mockData = peopleList.slice(0, 3)

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TableComponent,
        SexToEmojiPipe,
        BooleanToEmojiPipe
      ],
      imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NgxMaskModule.forRoot(),
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.peopleList.data = mockData
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render table', () => {
    expect(fixture.debugElement.nativeElement.querySelectorAll('table').length).toBeGreaterThan(0);
  });
  it('should render table with given headers', () => {
    const headerTitles = [
      'Actions',
      'ID',
      'Full Name',
      'Sex',
      'Date of Birth',
      'Married',
      'University',
      'Phone'
    ]
    const htmlHeaders = fixture.debugElement.nativeElement.querySelectorAll('th');
    headerTitles.forEach((header, index) => {
      expect(htmlHeaders[index].innerHTML).toContain(header);
    });
  });
  it('should render add button with action', fakeAsync(() => {
    const addRowButton = fixture.debugElement.query(By.css('#add-button'));
    expect(addRowButton).toBeTruthy()
    spyOn(component, 'addRecord')
    addRowButton.nativeElement.click();
    tick()
    fixture.detectChanges();
    expect(component.addRecord).toHaveBeenCalled();
  }));
  it('should render edit button with action', fakeAsync(() => {
    tick()
    fixture.detectChanges();
    let matIconButtons = fixture.debugElement.nativeElement.querySelectorAll('mat-icon')
    const oneOfEditButtons: HTMLElement = getOneOfMatIconButtonsByTitle('edit', matIconButtons)
    expect(oneOfEditButtons).toBeTruthy()
    oneOfEditButtons.click();
    tick()
    fixture.detectChanges();
    matIconButtons = fixture.debugElement.nativeElement.querySelectorAll('mat-icon')
    const undoButton = getOneOfMatIconButtonsByTitle('clear', matIconButtons)
    spyOn(component, 'abortEdit')
    undoButton.click()
    expect(component.abortEdit).toHaveBeenCalled();
    const confirmButton = getOneOfMatIconButtonsByTitle('done', matIconButtons)
    spyOn(component, 'saveRecord')
    confirmButton.click()
    expect(component.saveRecord).toHaveBeenCalled();

    function getOneOfMatIconButtonsByTitle(title: string, buttons: HTMLElement[]): HTMLElement{
      for (let i = 0; i <= buttons.length - 1; i++) {
        if (buttons[i].innerText == title) {
          return buttons[i]
        }
      }
    }
  }));
  it('should render delete button with action', fakeAsync(() => {
    tick()
    fixture.detectChanges();
    const matIconButtons = fixture.debugElement.nativeElement.querySelectorAll('mat-icon')
    let oneOfEditButtons: HTMLElement 
    for (let i = 0; i < matIconButtons.length - 1; i++) {
      if (matIconButtons[i].innerText == 'delete') {
        oneOfEditButtons = matIconButtons[i]
        break;
      }
    }
    expect(oneOfEditButtons).toBeTruthy()
    spyOn(component, 'deleteRecord')
    oneOfEditButtons.click();
    tick()
    fixture.detectChanges();
    expect(component.deleteRecord).toHaveBeenCalled();
  }));
  it('should have validations when edit form active: Full Name', () => {
    component.addRecord()
    const fullNameField = component.rowForm.controls['fullName']
    expect(fullNameField.valid).toBeFalsy();
    expect(fullNameField.errors['required']).toBeTruthy();
    fullNameField.setValue('Some Name')
    expect(fullNameField.valid).toBeTruthy();
  });
  it('should have validations when edit form active: Sex', () => {
    component.addRecord()
    const sexField = component.rowForm.controls['sex']
    // must have default value
    expect(sexField.valid).toBeTruthy();
    sexField.setValue(null)
    expect(sexField.valid).toBeFalsy();
    expect(sexField.errors['required']).toBeTruthy();
    sexField.setValue('female')
    expect(sexField.valid).toBeTruthy();
  });
  it('should have validations when edit form active: Date of Birth', () => {
    component.addRecord()
    const dateOfBirthField = component.rowForm.controls['dateOfBirth']
    expect(dateOfBirthField.valid).toBeFalsy();
    expect(dateOfBirthField.errors['required']).toBeTruthy();
    dateOfBirthField.setValue(Date.now())
    expect(dateOfBirthField.valid).toBeTruthy();
  });
  it('should have validations when edit form active: University', () => {
    component.addRecord()
    const universityField = component.rowForm.controls['university']
    expect(universityField.valid).toBeFalsy();
    expect(universityField.errors['required']).toBeTruthy();
    universityField.setValue('Random University')
    expect(universityField.valid).toBeTruthy();
  });
  it('should have validations when edit form active: Phone', () => {
    component.addRecord()
    const phoneField = component.rowForm.controls['phone']
    expect(phoneField.valid).toBeFalsy();
    expect(phoneField.errors['required']).toBeTruthy();
    phoneField.setValue('aaa')
    expect(phoneField.valid).toBeFalsy();
    expect(phoneField.errors['pattern']).toBeTruthy();
    phoneField.setValue('(000) 000-00-00')
    expect(phoneField.valid).toBeTruthy();
  });
});
