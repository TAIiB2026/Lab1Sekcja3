import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  constructor() {
    this.ustawDomyslneWartosci();
  }

  onSubmit(formularz: NgForm): void {
    console.log(formularz.value);
    console.log('valid: ', formularz.valid);
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
