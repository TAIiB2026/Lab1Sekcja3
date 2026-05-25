import { Injectable } from '@angular/core';
import { Person } from './classes/person';
import { IPeopleRepositoryInterface } from './interfaces/people-repository.interface';
import { Observable, of } from 'rxjs';

@Injectable()
export class PeopleRepository implements IPeopleRepositoryInterface {
  private repo: Person[] = [
    new Person(1, "Jan", "Kowalski", new Date(1990, 2, 30)),
    new Person(2, "Adam", "Nowak", new Date(1986, 3, 10)),
    new Person(3, "Anna", "Iksińska", new Date(1995, 10, 2)),
    new Person(4, "Natalia", "Kowalska", new Date(1966, 4, 14)),
    new Person(5, "Jan", "Igrekowy", new Date(2005, 1, 11)),
  ];

  public Get(): Observable<Person[]> {
    const tablica = this.repo.map(r => new Person(r.id, r.name, r.surname, r.dateOfBirth));
    return of(tablica);
  }

  public GetByID(id: number): Observable<Person> {
    const obj = this.repo.find(r => r.id === id);
    if(obj) {
      const res = new Person(obj.id, obj.name, obj.surname, obj.dateOfBirth);
      return of(res);
    }

    throw new Error("Nie odnaleziono osoby o id = " + id);
  }

  Post(name: string, surname: string, dateOfBirth: Date): Observable<boolean> {
    if(this.repo.length >= 10) {
      return of(false);
    }
                          //[1,2,3,4,5] => 1,2,3,4,5
    const newID: number = Math.max(...this.repo.map(x => x.id)) + 1;
    const newObj: Person = new Person(newID, name, surname, dateOfBirth);
    this.repo.push(newObj);
    return of(true);
  }
}