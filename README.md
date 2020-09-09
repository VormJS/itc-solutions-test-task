# ITC Solutions test task

This project created for recruiting test task.

Angular 6 with UI-Router.

Task:
Create nested pages with 2 more pages at the second level.  
Navigation via side menu.

Pages at the second level:
1. Table
2. Plug

The table should contain next columns:

- id: number
- full name: string
- sex: male/female (edit via radio button)
- date of birth: date
- married: boolean (edit via checkbox)
- university: string (edit via select list with 3-4 random options)
- phone: string (edit via text field with a mask)
- any other optional

Each row should have an opportunity to be edited and deleted. Edit mode transforms text from cell to form controls.
Also there is an opportunity to add new row.

Record saving should be faked like pseudo service call(e.g. via RxJS from().pipe(delay(2000)).subscribe())

Additional requirements:
- create/edit form must have validation, error handling etc
- adaptive layout

live demo: https://itc-solutions-test-task.herokuapp.com/