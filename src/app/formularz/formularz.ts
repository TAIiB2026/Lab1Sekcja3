import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PEOPLE_REPOSITORY_TOKEN } from '../tokens/people-repository.token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formularz',
  standalone: false,
  templateUrl: './formularz.html',
  styles: ``,
})
export class Formularz {
  public name!: string;
  public surname!: string;
  public dateOfBirth!: string;

  private readonly service = inject(PEOPLE_REPOSITORY_TOKEN);
  private readonly router = inject(Router);

  constructor() {
    this.ustawDomyslneWartosci();
  }

  onSubmit(formularz: NgForm): void {
    console.log(formularz.value);
    console.log('valid: ', formularz.valid);

    const dateOfBirth: Date = new Date(formularz.value['dateOfBirth']);

    this.service.Post(formularz.value['name'], formularz.value['surname'], dateOfBirth)
    .subscribe({
      next: (res) => {
        if(res) {
          this.router.navigateByUrl('osoby');
        } else {
          alert('Nie udało się dodać nowej osoby');
        }
      }
    });
  }

  public ustawDomyslneWartosci(): void {
    this.name = 'Imię...';
    this.surname = 'Nazwisko...';
    this.dateOfBirth = '1900-01-01';
  }

  public onNameChange(event: string): void {
    console.error(event);
  }
}
