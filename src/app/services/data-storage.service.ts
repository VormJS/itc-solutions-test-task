import { Injectable } from '@angular/core';
import { Person } from '../models/person';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { delay, map } from 'rxjs/internal/operators';
import { peopleList } from 'src/app/helpers/people-list';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private _people = new BehaviorSubject<Person[]>([])
  private _peopleStore: Person[] = []
  readonly people: Observable<Person[]> = this._people.asObservable()

  constructor() {
    this.getInitPeople();
  }
  getInitPeople() {
    return of(peopleList).pipe(
      delay(1000),
      map(people => {
        this._peopleStore = people;
        this._people.next(this._peopleStore);
      })).subscribe()
  }
  refreshData(): void {
    this._people.next(this._peopleStore);
  }
  createRecord(newPerson: Person): Subscription {
    return of(newPerson).pipe(
      delay(1000),
      map(person => {
        person.id = Math.max(...this._peopleStore.map((record: Person) => record.id), 1);
        this._peopleStore.push(person);
        this._people.next(this._peopleStore);
      })).subscribe();
  }
  updateRecord(updatedPerson: Person) {
    return of(updatedPerson).pipe(
      delay(1000),
      map(person => {
        this._peopleStore.splice(this._peopleStore.findIndex(dBperson => dBperson.id === person.id), 1, person)
        this._people.next(this._peopleStore);
      })).subscribe();
  }
  deleteRecord(personID: Number) {
    return of(personID).pipe(
      delay(1000),
      map(id => {
        this._peopleStore.splice(this._peopleStore.findIndex(contact => contact.id === id), 1)
        this._people.next(this._peopleStore);
      })).subscribe();
  }
}
