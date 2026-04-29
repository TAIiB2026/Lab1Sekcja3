import { Component } from '@angular/core';
import { Person } from '../../classes/person';
import { PeopleRepository } from '../../people-repository';

@Component({
  selector: 'app-people',
  standalone: false,
  templateUrl: './people.html',
  styles: ``,
})
export class People {
  public data: Person[] = [];

  constructor(repository: PeopleRepository) {
    this.data = repository.get();
  }

  trackByID(index: number, obj: Person): number {
    return obj.id;
  }

  calculateAge(obj: Person): number {
    const currentTimestamp = Date.now();
    const dateNow = new Date(currentTimestamp);
    console.log('calculateAge');
    return dateNow.getFullYear() - obj.dateOfBirth.getFullYear();
  }
}