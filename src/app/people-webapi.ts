import { inject, Injectable } from '@angular/core';
import { IPeopleRepositoryInterface } from './interfaces/people-repository.interface';
import { map, Observable } from 'rxjs';
import { Person } from './classes/person';
import { HttpClient } from '@angular/common/http';
import { NewPersonDTO } from './interfaces/new-person.interface';
import { PersonInterface } from './interfaces/person.interface';

@Injectable()
export class PeopleWebapi implements IPeopleRepositoryInterface {
  private readonly URL = 'http://localhost:5110/api/people';
  private readonly httpClient = inject(HttpClient);


  Post(name: string, surname: string, dateOfBirth: Date): Observable<boolean> {
    const body: NewPersonDTO = { dateOfBirth: dateOfBirth, name: name, surname: surname };
    return this.httpClient.post<boolean>(this.URL, body);
  }

  Get(): Observable<Person[]> {
    return this.httpClient.get<PersonInterface[]>(this.URL).pipe(map(x => {
      return x.map(y => this.parsePerson(y))
    }));
  }

  private parsePerson(dto: PersonInterface): Person {
    const [year, month, date] = dto.dateOfBirth.split('-').map(Number);
    const dateOfBirth = new Date(year, month - 1, date);
    return new Person(dto.id, dto.name, dto.surname, dateOfBirth);
  }

  GetByID(id: number): Observable<Person> {
    const url = `${this.URL}/${id}`;
    return this.httpClient.get<PersonInterface>(url).pipe(map(x => this.parsePerson(x)));
  }
}
